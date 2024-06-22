import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MuiAccordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CourseLeaderboardModal from '../CourseLeaderboardModal';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { ClipLoader } from "react-spinners";
import { fetchProgress, addProgress } from '../../redux/progressSlice';
import api from '../../api/axiosConfig';
import jwtToken from '../../api/jwtToken';
import './style.css';

const drawerWidth = 320;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: `${drawerWidth}px`,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  backgroundColor: '#1A2130',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const LessonTypography = styled(Typography)(({ selected }) => ({
  cursor: 'pointer',
  backgroundColor: selected ? '#5A72A0' : '#1A2130',
  color: 'white',
  padding: '8px',
  borderRadius: '4px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '&:hover': {
    backgroundColor: '#5A72A0',
  },
}));

const Accordion = styled(MuiAccordion)(({ theme }) => ({
  backgroundColor: '#1A2130',
  color: 'white',
}));

export default function CourseSidebar(props) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const progress = useSelector((state) => state.progress.progress);
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('Welcome to the course! Select a lesson to view its content.');
  const [selectedLesson, setSelectedLesson] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchProgress(props.courseid));
  }, [dispatch, props.courseid]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLessonClick = async (lessonId, lesson, moduleId, lessonPoints, lessonType) => {
    setLoading(true);
    setSelectedLesson(lesson);
    try {
      const response = await api.get(`/lesson/preview/${lessonId}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + jwtToken,
        },
      });

      const lessonData = await response.data;

      if (lessonData.text_content) {
        setContent(lessonData.text_content);

        if (lessonType === 'text_content' && !isLessonCompleted(moduleId, lessonId)){
          dispatch(addProgress({
            courseId: props.courseid,
            moduleId: moduleId,
            lessonId: lessonId,
            lessonPoints: lessonPoints
          }));
        }
      } else if (lessonData.problem_id) {
        setContent(lessonData.problem_id.problem_description);
      } else {
        setContent('No content available for this lesson.');
      }
    } catch (error) {
      setContent('An error occurred while fetching the lesson content.');
    }
    setLoading(false);
  };

  const isLessonCompleted = (moduleId, lessonId) => {
    const module = progress.find((mod) => mod.moduleid === moduleId);
    if (module) {
      return module.lessons.some((lesson) => lesson.lessonid === lessonId);
    }
    return false;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CssBaseline />

      <AppBar position="sticky" sx={{ height: '70px' }} open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Course Name
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <CourseLeaderboardModal courseid={props.courseid} />
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#1A2130',
            zIndex: 1400,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{ color: 'white' }}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

        {props.modules.map((module, moduleIndex) => (
          <Accordion key={module._id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
              aria-controls={`panel${moduleIndex}-content`}
              id={`panel${moduleIndex}-header`}
            >
              <Typography sx={{ color: 'white' }}>{module.module_title}</Typography>
            </AccordionSummary>
            <Divider />
            <div className="container">
              {module.lessons.map((lesson) => (
                <AccordionDetails key={lesson._id}>
                  <LessonTypography
                    onClick={() => handleLessonClick(lesson._id, lesson.lesson_title, module._id, lesson.lesson_points, 'text_content')}
                    selected={selectedLesson === `${module._id}_${lesson._id}`}
                  >
                    <div>
                      {lesson.lesson_title}
                      {isLessonCompleted(module._id, lesson._id) && (
                        <EventAvailableIcon sx={{ color: 'white', ml: 1.5 , width: "15px" } } />
                      )}
                    </div>
                  </LessonTypography>
                </AccordionDetails>
              ))}
            </div>
          </Accordion>
        ))}
      </Drawer>

      <Main open={open}>
        {loading ? (
          <div className="loading-container">
            <ClipLoader size={50} color={"#123abc"} loading={loading} />
          </div>
        ) : (
          <>
            <DrawerHeader />
            <Typography paragraph dangerouslySetInnerHTML={{ __html: content }} />
          </>
        )}
      </Main>
    </Box>
  );
}

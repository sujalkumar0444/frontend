import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { alpha, styled } from '@mui/material/styles';
import { FaFileDownload } from 'react-icons/fa';
import './style.css';

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-row.even': {
    backgroundColor: theme.palette.grey[200],
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      '&:hover': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
}));

const columns = [
  {
    field: 'rank',
    headerName: 'Rank',
    width: 130,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    cellClassName: 'super-app-theme--cell',
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 300,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    cellClassName: 'super-app-theme--name',
  },
  {
    field: 'roll_no',
    headerName: 'Roll Number',
    width: 200,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    cellClassName: 'super-app-theme--cell',
  },
  {
    field: 'score',
    headerName: 'Total Score',
    type: 'number',
    width: 220,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    cellClassName: 'super-app-theme--cell',
  },
];

function convertToCSV(data) {
  if (!data || data.length === 0) {
    return ''; // Return an empty string if data is undefined, null, or empty
  }
  const header = [...Object.keys(data[0]), 'id'].join(',');
  const rows = data.map((row, index) => ({ ...row, id: index + 1 })).map(row => Object.values(row).join(','));
  return `${header}\n${rows.join('\n')}`;
}

export default function CourseLeaderboardTable({ data }) {
  const [csvData, setCsvData] = useState('');

  useEffect(() => {
    if (data && data.length > 0) {
      setCsvData(convertToCSV(data));
    }
  }, [data]);

  // Calculate rank based on index
  const rankedData = data.map((row, index) => ({ ...row, id: index + 1, rank: index + 1 }));

  function handleDownload() {
    const csvContent = `data:text/csv;charset=utf-8,\uFEFF${encodeURIComponent(csvData)}`;
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);
    link.click();
  }

  return (
    <div>
      <div className="leaderboard-header">
        <h1 className="ms-auto heading-text">Course Leaderboard</h1>
        <button className="btn btn-dark ms-auto mb-1" onClick={handleDownload}>
          <FaFileDownload />
          CSV
        </button>
      </div>
      <StripedDataGrid
        rows={rankedData}
        columns={columns}
        getRowClassName={params => (params.index % 2 === 0 ? 'even' : 'odd')}
        sx={{
          m: 2,
          '& .super-app-theme--header': {
            fontWeight: 'bold',
            fontSize: '20px',
            borderRight: '1px solid rgba(224, 224, 224, 1)',
          },
          '& .super-app-theme--cell': {
            display: 'flex',
            fontWeight: 'bold',
            fontSize: '18px',
            justifyContent: 'center',
            borderRight: '1px solid rgba(224, 224, 224, 1)',
          },
          '& .super-app-theme--name': {
            fontSize: '18px',
            fontWeight: 'bold',
            borderRight: '1px solid rgba(224, 224, 224, 1)',
          },
          '& .super-app-theme--even': {
            backgroundColor: 'rgba(0, 0, 0, 0.05)', // Grey background for even rows
          },
        }}
      />
    </div>
  );
}

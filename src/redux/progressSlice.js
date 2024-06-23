// src/redux/progressSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosConfig';
import jwtToken from '../api/jwtToken';

export const fetchProgress = createAsyncThunk('progress/fetchProgress', async (courseId) => {
    console.log(courseId);
  const response = await api.get(`/fetch/progress/${courseId}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + jwtToken(),
    },
  });
  return response.data;
});

export const addProgress = createAsyncThunk('progress/addProgress', async ({ courseId, moduleId, lessonId, lessonPoints }) => {
  const response = await api.post('/add/progress', {
    courseid: courseId,
    moduleid: moduleId,
    lessonid: lessonId,
    lessonpoints: lessonPoints,
  }, {
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + jwtToken(),
    },
  });
  return { moduleId, lessonId };
});

const progressSlice = createSlice({
  name: 'progress',
  initialState: {
    progress: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProgress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProgress.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.progress = action.payload.progress;
      })
      .addCase(fetchProgress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProgress.fulfilled, (state, action) => {
        const { moduleId, lessonId } = action.payload;
        const module = state.progress.find((mod) => mod.moduleid === moduleId);
        if (module) {
          module.lessons.push({ lessonid: lessonId });
        } else {
          state.progress.push({ moduleid: moduleId, lessons: [{ lessonid: lessonId }] });
        }
      });
  },
});

export default progressSlice.reducer;

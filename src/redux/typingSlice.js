import { createSlice } from '@reduxjs/toolkit';

// 5 Minutes = 300 Seconds practice window
const PRACTICE_TIME_SECONDS = 300;

const initialState = {
  drillText: 'asdf jkl; asdf jkl; all fall asks flask',
  currentIndex: 0,
  charHistory: [], // array of { char, typed, isCorrect }
  totalKeysPressed: 0,
  correctKeysPressed: 0,
  incorrectKeysPressed: 0,
  durationSeconds: PRACTICE_TIME_SECONDS,
  timeRemaining: PRACTICE_TIME_SECONDS,
  status: 'idle', // 'idle' | 'running' | 'paused' | 'completed'
  lessonLevel: 'words', // 'basic' | 'words'
  soundEnabled: true,
  isLoading: false,
  error: null,
};

export const typingSlice = createSlice({
  name: 'typing',
  initialState,
  reducers: {
    // SAGA Triggers
    fetchNewDrillRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchNewDrillSuccess: (state, action) => {
      state.isLoading = false;
      state.drillText = action.payload;
      state.currentIndex = 0;
      state.charHistory = [];
    },
    fetchNewDrillFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Session controls
    startPractice: (state) => {
      state.status = 'running';
    },
    pausePractice: (state) => {
      state.status = 'paused';
    },
    resetPractice: (state) => {
      state.status = 'idle';
      state.timeRemaining = state.durationSeconds;
      state.currentIndex = 0;
      state.charHistory = [];
      state.totalKeysPressed = 0;
      state.correctKeysPressed = 0;
      state.incorrectKeysPressed = 0;
    },
    completePractice: (state) => {
      state.status = 'completed';
    },

    // Practice tick (1s countdown)
    tickTimer: (state) => {
      if (state.status === 'running') {
        if (state.timeRemaining > 0) {
          state.timeRemaining -= 1;
        }
        if (state.timeRemaining === 0) {
          state.status = 'completed';
        }
      }
    },

    // Key stroke registration
    recordKeyPress: (state, action) => {
      if (state.status === 'idle') {
        state.status = 'running';
      }
      if (state.status !== 'running') return;

      const typedKey = action.payload;
      const expectedKey = state.drillText[state.currentIndex];
      const isCorrect = typedKey === expectedKey;

      state.totalKeysPressed += 1;
      if (isCorrect) {
        state.correctKeysPressed += 1;
      } else {
        state.incorrectKeysPressed += 1;
      }

      state.charHistory.push({
        char: expectedKey,
        typed: typedKey,
        isCorrect,
      });

      state.currentIndex += 1;
    },

    setDuration: (state, action) => {
      state.durationSeconds = action.payload;
      state.timeRemaining = action.payload;
    },
    setLessonLevel: (state, action) => {
      state.lessonLevel = action.payload;
    },
    toggleSound: (state) => {
      state.soundEnabled = !state.soundEnabled;
    },
  },
});

export const {
  fetchNewDrillRequest,
  fetchNewDrillSuccess,
  fetchNewDrillFailure,
  startPractice,
  pausePractice,
  resetPractice,
  completePractice,
  tickTimer,
  recordKeyPress,
  setDuration,
  setLessonLevel,
  toggleSound,
} = typingSlice.actions;

export default typingSlice.reducer;
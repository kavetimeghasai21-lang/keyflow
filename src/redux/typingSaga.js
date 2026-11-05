import { takeLatest, put, delay, select } from 'redux-saga/effects';
import {
  fetchNewDrillRequest,
  fetchNewDrillSuccess,
  fetchNewDrillFailure,
  recordKeyPress,
} from './typingSlice';
import { generatePracticeBatch } from '../utils/textGenerator';

// Asynchronous saga: simulates or handles fetching practice drills from API/generator
function* handleFetchNewDrill() {
  try {
    // Artificial micro-delay to simulate clean async network/resource loading
    yield delay(150);
    const state = yield select((s) => s.typing);
    const newDrill = generatePracticeBatch(state.lessonLevel);
    yield put(fetchNewDrillSuccess(newDrill));
  } catch (err) {
    yield put(fetchNewDrillFailure(err.message || 'Failed to fetch drill'));
  }
}

// Saga watcher checking if drill needs replenishing when user reaches end of line
function* handleKeyPressCheck() {
  const state = yield select((s) => s.typing);
  if (state.currentIndex >= state.drillText.length - 5) {
    const additionalDrill = generatePracticeBatch(state.lessonLevel);
    yield put(fetchNewDrillSuccess(state.drillText + ' ' + additionalDrill));
  }
}

export function* typingSaga() {
  yield takeLatest(fetchNewDrillRequest.type, handleFetchNewDrill);
  yield takeLatest(recordKeyPress.type, handleKeyPressCheck);
}
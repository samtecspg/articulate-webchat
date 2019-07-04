import "regenerator-runtime/runtime";
import { call, takeLatest } from 'redux-saga/effects';
import Guid from 'guid';

import * as actions from '../actions/actionTypes';
import * as api from './api';

export function* postConverse(payload) {
  const { text, converseUrl } = payload;
  const storedSessionId = localStorage.getItem('sessionId');
  let sessionId;
  if (storedSessionId){
    sessionId = storedSessionId;
  }
  else {
    const newSessionId = Guid.create().toString();
    sessionId = newSessionId;
    localStorage.setItem('newSessionId', newSessionId);
  }
  try {
    const postPayload = {
      sessionId,
      text: text,
    };
    yield call(
      api.postConverse,
      converseUrl,
      postPayload,
    );
  } catch (err) {
    console.log(err);
  }
}

export default function* rootSaga() {
  yield takeLatest(actions.ADD_NEW_USER_MESSAGE, postConverse);
}

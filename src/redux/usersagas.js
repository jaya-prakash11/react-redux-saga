import * as types from "./actionTypes";

import {
  take,
  takeEvery,
  takeLatest,
  put,
  all,
  delay,
  fork,
  call,
} from "redux-saga/effects";

import {
  loadUserSuccess,
  loadUserError,
  createUserSuccess,
  cretaeUserError,
  deleteUserSuccess,
  deleteUserError,
  updateUserSuccess,
  updateUserError,
} from "./action";
import {
  cretaeUsersApi,
  deleteUserApi,
  loadUsersApi,
  updateUserApi,
} from "./api";

function* loadUsersAsync() {
  try {
    const response = yield call(loadUsersApi);

    if (response.status === 200) {
      yield delay(500);

      yield put(loadUserSuccess(response.data));
    }
  } catch (err) {
    yield put(loadUserError(err.response.data));
  }
}

function* deleteUsersAsync(userId) {
  console.log("userId", userId);
  try {
    const response = yield call(deleteUserApi, userId);

    if (response.status === 200) {
      yield delay(500);
      yield put(deleteUserSuccess(userId));
    }
  } catch (err) {
    console.error("Delete error:", err.response?.data || err);

    yield put(deleteUserError(err));
  }
}

function* createUsersAsync({ payload }) {
  try {
    const response = yield call(cretaeUsersApi, payload);
    if (response.status === 200) {
      yield put(createUserSuccess());
    }
  } catch (err) {
    yield put(cretaeUserError(err));
  }
}

function* updateUsersAsync({ type, payload: { id, formValue } }) {
  try {
    const response = yield call(updateUserApi, id, formValue);
    if (response.status === 200) {
      yield put(updateUserSuccess());
    }
  } catch (err) {
    yield put(updateUserError(err));
  }
}

function* onloadUsers() {
  yield takeEvery(types.LOAD_USERS_START, loadUsersAsync);
}

function* onCreateUsers() {
  yield takeLatest(types.CREATE_USER_START, createUsersAsync);
}

function* onDeleteUsers() {
  while (true) {
    const { payload: userId } = yield take(types.DELETE_USER_START);
    yield call(deleteUsersAsync, userId);
  }
}

function* onUpdateUsers() {
  yield takeLatest(types.UPDATE_USER_START, updateUsersAsync);
}

const userSagas = [
  fork(onloadUsers),
  fork(onCreateUsers),
  fork(onDeleteUsers),
  fork(onUpdateUsers),
];

export default function* rootSaga() {
  yield all([...userSagas]);
}

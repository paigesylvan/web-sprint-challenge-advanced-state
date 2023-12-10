//// You don't need to add extra action creators to achieve MVP
import {
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM,
} from "./action-types";
import axios from "axios";

export function moveClockwise() {
  return { type: MOVE_CLOCKWISE };
}

export function moveCounterClockwise() {
  return { type: MOVE_COUNTERCLOCKWISE };
}

export function setSelectedAnswer(answerId) {
  return { type: SET_SELECTED_ANSWER, payload: answerId };
}

export function setMessage(message) {
  return { type: SET_INFO_MESSAGE, payload: message };
}

export function setQuiz(quizData) {
  return { type: SET_QUIZ_INTO_STATE, payload: quizData };
}

export function inputChange({ field, value }) {
  return {
    type: INPUT_CHANGE,
    payload: {
      field,
      value,
    },
  };
}

export function resetForm() {
  return { type: RESET_FORM };
}

//// Async action creators
export const fetchQuiz = () => (dispatch) => {
  const URL = "http://localhost:9000/api/quiz/next";
  dispatch(setQuiz(null));
  axios
    .get(URL)
    .then((res) => {
      dispatch(setQuiz(res.data));
    })
    .catch((err) => console.log(err));
};

export const postAnswer = (payload) => (dispatch) => {
  const URL = "http://localhost:9000/api/quiz/answer";
  axios
    .post(URL, {
      quiz_id: payload.quiz_id,
      answer_id: payload.answer_id,
    })
    .then((res) => {
      dispatch(setSelectedAnswer(null));
      dispatch(setMessage(res.data.message));
      dispatch(fetchQuiz());
    })
    .catch((err) => console.log(err));
};

export const postQuiz = (payload) => (dispatch) => {
  const URL = "http://localhost:9000/api/quiz/new";
  axios
    .post(URL, {
      question_text: payload.question_text,
      true_answer_text: payload.true_answer_text,
      false_answer_text: payload.false_answer_text,
    })
    .then(() => {
      dispatch(
        setMessage(`Congrats: "${payload.question_text}" is a great question!`)
      );
      dispatch(resetForm());
    })
    .catch((err) => console.log(err));
};

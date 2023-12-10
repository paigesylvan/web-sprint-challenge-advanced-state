// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'

import {
  RESET_FORM,
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
} from "./action-types";


const initialWheelState = 0
function wheel(state = initialWheelState, action) {
  switch(action.type) {
    case MOVE_CLOCKWISE:
      return (state + 1) % 6;
    case MOVE_COUNTERCLOCKWISE:
      return (state - 1 + 6) % 6;

    default:
      return state;
  }
}

//Quiz
const initialQuizState = null;
const quiz = (state = initialQuizState, action) => {
  switch (action.type) {
    case SET_QUIZ_INTO_STATE:
      // TODO Possibly add {...state} here
      return action.payload;
    default:
      return state;
  }
};

//Selected Answer 
const initialSelectedAnswerState = null;
const selectedAnswer = (state = initialSelectedAnswerState, action) => {
  switch (action.type) {
    case SET_SELECTED_ANSWER:
      return action.payload;
    default:
      return state;
  }
};

//Message
const initialMessageState = ''
  const infoMessage = (state = initialMessageState, action) => {
    switch (action.type) {
      case SET_INFO_MESSAGE:
        return action.payload;
      default:
        return state;
    }
};

//Form
const initialFormState = {
  newQuestion: "",
  newTrueAnswer: "",
  newFalseAnswer: "",
};
const form = (state = initialFormState, action) => {
  switch (action.type) {
    case RESET_FORM:
      return initialFormState;

    case INPUT_CHANGE:
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    default:
      return state;
  }
};

export default combineReducers({
  wheel,
  quiz,
  selectedAnswer,
  infoMessage,
  form,
});


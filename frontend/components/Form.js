import React from "react";
import { connect } from "react-redux";
import { postQuiz, inputChange } from "../state/action-creators";

const Form = (props) => {
  const { form, inputChange, postQuiz } = props;

  const onChange = (e) => {
    const { id, value } = e.target;
    inputChange({ field: id, value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    postQuiz({
      question_text: form.newQuestion,
      true_answer_text: form.newTrueAnswer,
      false_answer_text: form.newFalseAnswer,
    });
  };

  const isValid =
    form.newQuestion.trim().length > 0 &&
    form.newTrueAnswer.trim().length > 0 &&
    form.newFalseAnswer.trim().length > 0
      ? true
      : false;

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input
        maxLength={50}
        onChange={onChange}
        id="newQuestion"
        placeholder="Enter question"
        value={form.newQuestion}
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newTrueAnswer"
        placeholder="Enter true answer"
        value={form.newTrueAnswer}
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newFalseAnswer"
        placeholder="Enter false answer"
        value={form.newFalseAnswer}
      />
      <button disabled={!isValid} id="submitNewQuizBtn">
        Submit new quiz
      </button>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    infoMessage: state.infoMessage,
    form: state.form,
  };
};

export default connect(mapStateToProps, {
  postQuiz,
  inputChange,
})(Form);

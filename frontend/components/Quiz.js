import React from 'react';
import { connect } from "react-redux";
import { useEffect } from "react";
import {
  setSelectedAnswer,
  setQuiz,
  fetchQuiz,
  postAnswer,
} from "../state/action-creators";

const Quiz = (props) => {
  const { selectedAnswer, fetchQuiz, quizData, postAnswer, setSelectedAnswer } =
    props;

    useEffect(() => {
      if (!quizData) fetchQuiz();
    }, [fetchQuiz]);
  
    const handleAnswerClick = (answerId) => {
      setSelectedAnswer(answerId);
    };
  
    const handleSubmitClick = () => {
      postAnswer({ quiz_id: quizData.quiz_id, answer_id: selectedAnswer });
    };
  
    return (
      <div id="wrapper">
        {
          //** quiz already in state? Let's use that, otherwise render "Loading next quiz..." */
          quizData ? (
            <>
              <h2>{quizData.question}</h2>
              <div id="quizAnswers">
                {quizData.answers.map((answer) => (
                  <div
                    key={answer.answer_id}
                    className={`answer ${
                      selectedAnswer === answer.answer_id ? "selected" : ""
                    }`}
                  >
                    {answer.text}
                    <button onClick={() => handleAnswerClick(answer.answer_id)}>
                      {selectedAnswer === answer.answer_id
                        ? "SELECTED"
                        : "Select"}
                    </button>
                  </div>
                ))}
              </div>
              <button
                disabled={!selectedAnswer ? true : false}
                id="submitAnswerBtn"
                onClick={handleSubmitClick}
              >
                Submit answer
              </button>
            </>
          ) : (
            "Loading next quiz..."
          )
        }
      </div>
    );
  };
  
  const mapStateToProps = (state) => {
    return {
      quizData: state.quiz,
      selectedAnswer: state.selectedAnswer,
    };
  };
  
  export default connect(mapStateToProps, {
    setSelectedAnswer,
    setQuiz,
    fetchQuiz,
    postAnswer,
  })(Quiz);
  
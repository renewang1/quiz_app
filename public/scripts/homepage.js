$(document).ready(function() {
  const loadQuizzes = function() {
    $.ajax("/homepage/data", { method: 'GET' })
      .done(function(data) {
        renderQuizzes(data);
      });
  };

  loadQuizzes();
});

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createQuizElement = function(quiz) {
  const $quiz = $(`
  <div class="quizbox">
    <div class="withinthebox">
      <div class="leftsidebuttonsquizbox">
        <span class="titleofquiz">${escape(quiz.title)}</span>
        <form method="GET" action="/:id">
        <button class="attemptquizbutton">Attempt Quiz</button>
        </form>
      </div>
      <span class="descriptionofquiz">${escape(quiz.description)}</span>
      <div class="rightsidebuttonsquizbox">
        <button class="sharebutton">Share</button>
        <span class="creator"> Created by: ${escape(quiz.username)}</span>
      </div>
    </div>
  </div>`)
  return $quiz;
}

const renderQuizzes = function(data) {
  $('.quiz-container').empty();
  for (let quiz of data) {
    let $quiz = createQuizElement(quiz);
    $('.quiz-container').append($quiz);
  }
}

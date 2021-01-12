$(document).ready(function() {
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
        <span class="descriptionofquiz">${escape(quiz.descripition)}</span>
      </div>
      <div class="rightsidebuttonsquizbox">
        <button class="sharebutton">Share</button>
        <span class="creator">${escape(quiz.creator)}</span>
      </div>
    </div>
  </div>`);
  return $quiz;
}

const loadQuizzes = function() {
  $.ajax("http://localhost:8080/homepage", { method: 'GET' })
    .done(function(data) {
      renderQuizzes(data);
    });
};

const renderQuizzes = function(data) {
  $('.quiz-container').empty();
  for (let quiz of data) {
    let $quiz = createQuizElement(quiz);
    $('.quiz-container').append($quiz);
  }
}

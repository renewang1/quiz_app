$(document).ready(function() {
  const loadQuizzes = function() {
    $.ajax("/quizzes/data", { method: 'GET' })
      .done(function(data) {
        console.log('data', data)
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
        <span class="descriptionofquiz">${escape(quiz.description)}</span>
      </div>
      <div class="rightsidebuttonsquizbox">
        <button class="sharebutton">Share</button>
        <span class="creator">${escape(quiz.username)}</span>
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

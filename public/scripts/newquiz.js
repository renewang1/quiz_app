$(document).ready(function() {

  $(document).on('click', '.addquestionbutton', function() {
    console.log(this)
    appendQuestion(this);
    restoreButtons();
    questionNumber++;
  })

  $(document).on('click', '.addanswerbutton', function() {
    appendAnswer(this);
  })

});

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

let questionNumber = 2;

const createQuestionElement = function() {
  const $question = $(`
  <div class="question${questionNumber}">
    <div>
      <label for="question${questionNumber}">Question:</label>
      <input type="text" name="question${questionNumber}" class="question${questionNumber}">
    </div>
    <span>
      <input type="text" name="answers" class="answers">
      <input type="radio" name="answer${questionNumber}">
    </span>
    <span>
      <input type="text" name="answers" class="answers">
      <input type="radio" name="answer${questionNumber}">
    </span>
  </div>
  <button type="button" class="addanswerbutton" name="button${questionNumber}">Add another answer</button>
  <div>
    &nbsp;
  </div>
  `)
  return $question;
}

const createAnswerElement = function(num) {
  const $answer = $(`
    <span>
      <input type="text" name="answers" class="answers">
      <input type="radio" name="answer${num}">
    </span>
  `);
  return $answer;
}

const createBottomButtons = function() {
  const $bottomButtons = $(`
  <button type="button" class="addquestionbutton">Add another question</button>
  <div class="bottombuttons">
    <div class="makeprivatesections">
      <label for="makeprivatebox" class="makequizprivate">Make private</label>
      <input type="checkbox" name="makeprivatebox">
    </div>
    <button type="submit" class="createquizbutton">Finish quiz</button>
  </div>
  `);
  return $bottomButtons;
}

const appendQuestion = function() {
  let $question = createQuestionElement();
  $('.maininputform').append($question);
}

const appendAnswer = function(data) {
  const questionNum = data.parentElement[2].name.slice(-1);
  let $answer = createAnswerElement(questionNum);
  $(`.question${data.name.slice(-1)}`).append($answer);
}

const restoreButtons = function() {
  $(".bottombuttons").empty();
  $(".addquestionbutton").remove();
  let $bottomButtons = createBottomButtons();
  $(".maininputform").append($bottomButtons);
}

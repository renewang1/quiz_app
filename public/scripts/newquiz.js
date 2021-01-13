$(document).ready(function() {

  $(document).on('click', '.addquestionbutton', function() {
    appendQuestion(this);
    restoreButtons();
    questionNumber++;
  })

  $(document).on('click', '.addanswerbutton', function() {
    appendAnswer(this);
  })

  // $(document).on('submit', '#mainform', function() {
    //     // $.post()
    // })

  $("#mainform").submit(function(event) {
    event.preventDefault();
    let questionNumber = $("input[type=radio]:checked", "#mainform")
    let checked = $("input[type=radio]:checked", "#mainform")
    let questions = []
    let answers = []
    let object = {}

    for (let check of checked) {
      answers.push(check.name)
    }
    for (let question of questionNumber) {
      questions.push(question.parentElement.parentElement.className)
    }
    for (let i = 0; i < questions.length; i++) {
      object[questions[i]] = answers[i];
    }
    let form = this;
    $.post("/quizzes/update", object).done(function() {
      form.submit();
    })
  })

});

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

let questionNumber = 2;
let answerNumber = 1;

const createQuestionElement = function() {
  const $question = $(`
  <div class="question${questionNumber}" name="question${questionNumber}">
    <div>
      <label for="question${questionNumber}">Question:</label>
      <input type="text" name="question${questionNumber}" class="question${questionNumber}">
    </div>
    <span>
      <input type="text" name="answers" class="answers">
      <input type="radio" name="${answerNumber}">
    </span>
    <span>
      <input type="text" name="answers" class="answers">
      <input type="radio" name="${answerNumber + 1}">
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
      <input type="radio" name="${num}">
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
  </div>
  <button type="submit" class="bottombuttons" name="createquizbutton">Finish quiz</button>
  `);
  return $bottomButtons;
}

const appendQuestion = function() {
  let $question = createQuestionElement();
  $('.maininputform').append($question);
}

const appendAnswer = function(data) {
  let value = $(`button[name="button${data.name.slice(-1)}"]`).prev().children().last().children().last().attr("name");
  const questionNum = Number(value) + 1;
  let $answer = createAnswerElement(questionNum);
  $(`.question${data.name.slice(-1)}`).append($answer);
}

const restoreButtons = function() {
  $(".bottombuttons").remove();
  $(".addquestionbutton").remove();
  let $bottomButtons = createBottomButtons();
  $(".maininputform").append($bottomButtons);
}

$(document).ready(function() {
  $(document).on('click', '.addquestionbutton', function() {
    appendQuestion(this);
    restoreButtons();
    //questionNumber++;
  })
  $(document).on('click', '.addanswerbutton', function(event) {
    const $fieldset = $(event.target).parent();
    appendAnswer($fieldset);
  })
  $("#mainform").submit(function(event) {
    event.preventDefault();
    let formInfo = {};
    formInfo["quizTitle"] = $(this).children("div.titleinfo").children("input.inputboxfortitle").val();
    formInfo["quizDescription"] = $(this).children("div.descriptioninfo").children("textarea.descriptionofquiz").val();
    formInfo["private"] = $(this).children("div.bottombuttons").children("div.makeprivatesections").children("input[type='checkbox']").prop("checked");
    formInfo["questions"] = {};

    let questionCount = $(this).children("fieldset.question1").length;
    for (let i = 1; i <= questionCount; i++) {
      let $question = $(this).children(`fieldset#question${i}`);
      let questionPrompt = $question.children("div").children("input").val();
      let questionObject = {prompt: questionPrompt, answers: {}};
      let $questionAnswers = $question.children("fieldset").children("span");
      for (let j = 1; j <= $questionAnswers.length; j++) {
        let answerText = $($questionAnswers[j-1]).children("input[type=text]").val();
        let answerCorrect = $($questionAnswers[j-1]).children("input[type=radio]:checked").val() === "on" ? true : false;
        questionObject.answers[`answer${j}`] = {answer: answerText, correct: answerCorrect};
      }
      formInfo.questions[`question${i}`] = questionObject;
    }

    // console.log(formInfo)
    const get = function () {
      $.get(`/quizzes`, function(data) {
        // console.log('now inside')
        document.write(data)
      });
    }

    $.post("/quizzes", formInfo)
      .done(() => {
        get();
      })

    // let form = this;
    // console.log('before post')
    // $.post("/quizzes/update", object).always(function() {
    //   console.log('submit')
    //   form.submit();
    // })
    // let form = this;
    // console.log('before post')
    // $.post("/quizzes/update", formInfo).always(function() {
    //   console.log('submit')
    //   form.submit();
    // })

    // let formInfo = JSON.parse(JSON.stringify($(this).serializeArray()));
    // console.log(formInfo);
    // let formJSON = {};
    // for (let entry of formInfoArray) {
    //   if (!formJSON[entry.name]) {
    //     formJSON[entry.name] = entry.value;
    //   }
    // }
    // console.log(formInfoArray);
    // let questionNumber = $("input[type=radio]:checked", "#mainform")
    // let checked = $("input[type=radio]:checked", "#mainform")
    // let questions = []
    // let answers = []
    // let object = {}
    // for (let check of checked) {
    //   answers.push(check.name)
    // }
    // for (let question of questionNumber) {
    //   questions.push(question.parentElement.parentElement.className)
    // }
    // for (let i = 0; i < questions.length; i++) {
    //   object[questions[i]] = answers[i];
    // }
    // console.log(object);
    // // let form = this;
    // // $.post("/quizzes/update", object).done(function() {
    // //   form.submit();
    // // })
  })
});
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
// let questionNumber = 2;
// let answerNumber = 1;
const createQuestionElement = function(num) {
  // const $question = $(`
  // <div class="question${questionNumber}" name="question${questionNumber}">
  //   <div>
  //     <label for="question${questionNumber}">Question:</label>
  //     <input type="text" name="question${questionNumber}" class="question${questionNumber}">
  //   </div>
  //   <span>
  //     <input type="text" name="answers" class="answers">
  //     <input type="radio" name="${answerNumber}">
  //   </span>
  //   <span>
  //     <input type="text" name="answers" class="answers">
  //     <input type="radio" name="${answerNumber + 1}">
  //   </span>
  // </div>
  // <button type="button" class="addanswerbutton" name="button${questionNumber}">Add another answer</button>
  // <div>
  //   &nbsp;
  // </div>
  // `)
  const $question = $(`
    <fieldset class="question1" id="question${num}">
      <div>
        <label for="question1">Question:</label>
        <input type="text" name="question${num}" class="question1">
      </div>
      <fieldset>
        <button type="button" class="addanswerbutton" name="button1">Add another answer</button>
      </fieldset>
    </fieldset>
  `)
  return $question;
}
const createAnswerElement = function(questionNum, answerNum) {
  const $answer = $(`
    <span>
      <input type="text" name="question${questionNum}answer${answerNum}" class="answers">
      <input type="radio" name="question${questionNum}answer${answerNum}">
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
  let questionCount = $("fieldset.question1").length;
  let $question = createQuestionElement(questionCount + 1);
  $('.maininputform').append($question);
}
const appendAnswer = function($element) {
  const questionNumber = $element.siblings("div").children("input").attr("name").slice(-1);
  const answerCount = $element.children("span").length;
  if (answerCount < 4) {
    $element.prepend(createAnswerElement(questionNumber, answerCount + 1));
  }
  // let value = $(`button[name="button${data.name.slice(-1)}"]`).prev().children().last().children().last().attr("name");
  // const questionNum = Number(value) + 1;
  // let $answer = createAnswerElement(questionNum);
  // $(`.question${data.name.slice(-1)}`).append($answer);
}
const restoreButtons = function() {
  $(".bottombuttons").remove();
  $(".addquestionbutton").remove();
  let $bottomButtons = createBottomButtons();
  $(".maininputform").append($bottomButtons);
}

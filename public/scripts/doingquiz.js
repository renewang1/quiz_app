$(document).ready(function() {

  $("#doingquiz").submit(function(event) {
    event.preventDefault();
    let forminfo = []
    $("#doingquiz").children("div.questioninfo").children("div.answersinfo").find("input[type=radio]:checked").each((i,v) => {
      console.log(v)
      const parsedval = v.getAttribute("item")
      const parse = parsedval.split('-')
      forminfo.push({quiz_id: parse[0], question_id: parse[1], answer_id: parse[2]})
    })
    $.post(`/quizzes/${forminfo[0].quiz_id}/1`, {forminfo});
    // console.log($("#doingquiz").children("div.questioninfo").children("div.answersinfo").find("input[type=radio]:checked").val() === "on")
  })
})
//   const loadQuizzes = function() {
//     $.get("/doingquiz/data", 1)
//       .done(function(data) {
//         renderQuiz(data);
//       });
//   };
//   loadQuizzes();
// });
// const escape =  function(str) {
//   let div = document.createElement('div');
//   div.appendChild(document.createTextNode(str));
//   return div.innerHTML;
// };
// const loadquiz = function () {
//   const $topofquiz = $(`
//     <form action="" method="POST" class="mainform">
//     <div class="titleinfo">${escape(quiz.title)}</div>
//     <div class="descriptioninfo">${escape(quiz.description)}</div>
//     <div class="questioninfo">
//     `)
//   return $topofquiz
// }
// const loadquestion = function (question) {
//   const $question = $(`<div class="questiontitle">${question}</div>)
//     `)
//   return $question
// }
// const loadanswer = function (answer) {
//   const $answer = $(`<div class=answersinfo>
//   <span class="possibleanswers">
//     <div class="answersforquestion">${answer}</div>
//     <input type="radio" name="answer1">
//   </span>
//   `)
//   return $answer
// }
// for(question of data.questions) {
//   loadquestion(question)
//   for(answer of data.answers) {
//     if(questions.id === answers.question_id){
//       loadanswer(answer)
//     }
//   }
// }
// const renderQuiz = function(data) {}


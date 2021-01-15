$(document).ready(function() {

  $("#doingquiz").submit(function(event) {
    event.preventDefault();
    let forminfo = []
    $("#doingquiz").children("div.questioninfo").children("div.answersinfo").find("input[type=radio]:checked").each((i,v) => {
      // console.log(v)
      const parsedval = v.getAttribute("item")
      const parse = parsedval.split('-')
      forminfo.push({quiz_id: parse[0], question_id: parse[1], answer_id: parse[2]})
    })
    const get = function () {
      $.get(`/quizzes/${forminfo[0].quiz_id}/6`, function(data) {
        console.log('now inside')
        document.write(data)
      });
    }
    $.post(`/quizzes/${forminfo[0].quiz_id}/6`, {forminfo})
      .done(() => {
        get();
      })
    // console.log($("#doingquiz").children("div.questioninfo").children("div.answersinfo").find("input[type=radio]:checked").val() === "on")
  })
})

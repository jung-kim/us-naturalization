let data         // Array of questions and answer pairs
let current      // current index being asked.
let state = 0    // state of questioning phases
                  //    0: question is asked
                  //    1: answer revealed

window.superagent
  .get('https://jung-kim.github.io/us-naturalization/data.json')
  .set('accept', 'json')
  .end((err, res) => {
    if (err) {
      console.warn("unable to load data.json")
      return
    }
    data = res.body
    console.log(data)
    state = 0
    nextQuestion()
  })

const nextQuestion = () => {
  current = Math.floor(Math.random() * data.length)
  setQuestionText(data[current].question)
}
const setAnswerText = (text) => {
  setClassElementText('card-text', text)
}
const setQuestionText = (text) => {
  setClassElementText('card-title', text)
}
const setClassElementText = (element, text) => {
  document.getElementsByClassName(element)[0].innerHTML = text
}

const clickOperation = function() {
  if (state === 0) {
    // answer reveal is requested
    setAnswerText(data[current].answer.join('<br>'))
    state = 1
  } else {
    // next question is requested
    console.warn("invalid state, returning to 0")
    setAnswerText('')
    nextQuestion()
    state = 0
  }
}

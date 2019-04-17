function renderQuiz() {
  return `<div class="card off-right" id="quiz-card">
<heading class="card-heading">
<h2>star<br>wars</h2>
</heading>
<div class="card-content">
${renderGroup()}
</div>
</div>`;
}

function renderGroup() {
  const group = quiz.getCurrentGroup();

  return `<div class="row question-group">
<figure class="col-6"><img src="${group.img}"></figure>
<form class="col-6">
${renderQuestion()}
</form>
</div>`;
}

function renderQuestion() {
  const question = quiz.getCurrentQuestion();

  return `<div>
<legend>${question.text}</legend>
<ul>
${question.choices.map(n => renderChoice(n)).join('')}
</ul>
<button class="answer-question">Answer the question</button>
<div class="message"><div>
</div>`;
}

function renderChoice(item) {
  return `<li><label><input type="radio" name="answerChoice" value="${item.id}"><span class="icon fa-rebel-alliance radio-icon"></span><span class="answer-text">${item.text}</span></label></li>`;
}

function renderResults() {
  return `<div class="card off-right" id="results-card">
<heading class="card-heading">
<h2>star<br>wars</h2>
</heading>
<h1>Congratulations!</h1>
<p>You answered ${quiz.correctAnswers} questions out ${quiz.totalQuestions} of correctly.</p>
<button id="restart-quiz">Play Again</button>
</div>`;
}

function renderNextQuestionButton() {
  return '<button type="button" class="next-question">Next Question</button>';
}

function renderPopup(message){
  return `<div class="popup-background"><div class="popup card"><p>${message}</p><button >OK</button></div></div>`
}
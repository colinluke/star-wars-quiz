$(function () {
  $('#start-quiz').click(startQuiz);
});

function startQuiz(event) {
  event.preventDefault();

  quiz.startQuiz();

  swapcard($('#welcome-card'), () => {
    $('body').prepend(renderQuiz());
    $('#quiz-card')
      .on('submit', '.question-group > form', answerQuestion)
      .on('click', '.popup > button', dismissPopup);
    changecard($('#quiz-card'));
  });
}

function dismissPopup(event) {
  $('.popup-background').remove();
}

function answerQuestion(event) {
  event.preventDefault();

  const $answer = $('.question-group > form ul > li input[type="radio"]:checked');

  if ($answer.length === 0) {
    $('#quiz-card').prepend(renderPopup("Pick something!"));
    return;
  }

  $('.answer-text').addClass('disabled-answer');
  $('.question-group > form ul > li input[type="radio"]').prop('disabled', true);

  const $correctAnswerChoice = $('.question-group > form').find(`input[type="radio"][value=${quiz.correctAnswer().id}]`);

  $correctAnswerChoice.closest('li').addClass('correct-answer correct-highlight').find('.answer-text').removeClass('disabled-answer');
  $correctAnswerChoice.next('span.fa-rebel-alliance').addClass("correct-icon");

  $('.question-group > form div.message').css('display', 'block');

  if (quiz.checkAnswer(+$answer.val())) {
    $('.question-group > form div.message').addClass('correct');
    $('.question-group > form div.message > div').text('Correct!!');
  } else {
    $answer.closest('li').addClass('wrong-answer');
    $('.question-group > form div.message').addClass('wrong').effect("shake");
    $('.question-group > form div.message > div').text('Wrong!!');
    $answer.next('span.fa-rebel-alliance').removeClass('fa-rebel-alliance').addClass('fa-darth-vather').addClass('wrong-icon');
    $answer.closest('li').addClass("wrong-highlight").find('.answer-text').removeClass('disabled-answer').addClass('wrong-answer');
  }

  setTimeout(() => {
    $('.question-group > form div.message').css('display', '');
  }, 1000);

  const $nextQuestionButton = $(renderNextQuestionButton())
    .click(nextQuestion);
  $('.answer-question').replaceWith($nextQuestionButton);
}

function nextQuestion(event) {
  event.preventDefault();

  var currentGroup = quiz.currentGroup;

  if (quiz.nextQuestion() === undefined) {
    showResults();
  }
  else {
    if (currentGroup !== quiz.currentGroup) {
      swapcard($('.question-group'), () => {
        const $newcard = $(renderGroup()).addClass('off-right');
        $('.card-content').append($newcard);
        changecard($('.question-group'));
      });
    } else {
      swapcard($('.question-group > form > div'), () => {
        const $newcard = $(renderQuestion()).addClass('off-right');
        $('.question-group > form').append($newcard);
        changecard($('.question-group > form > div'));
      });
    }
  }
}

function showResults() {
  swapcard($('#quiz-card'), () => {
    $('body').prepend(renderResults());
    $('#restart-quiz').click(restartQuiz);
    changecard($('#results-card'));
  });
}

function restartQuiz(event) {
  event.preventDefault();

  quiz.startQuiz();

  swapcard($('#results-card'), () => {
    $('body').append(renderQuiz());
    $('#quiz-card').on('submit', '.question-group > form', answerQuestion);
    changecard($('#quiz-card'));
  });
}

function swapcard($cardOut, initilize) {
  $cardOut.addClass('move-out');
  setTimeout(function () {
    $cardOut.remove();
    initilize();
  }, 600);
}

function changecard($card) {
  $card.addClass('move-in');
  setTimeout(function () {
    $card.removeClass('off-right');
  });
}
const quiz = {
  currentGroup: 0,
  currentQuestion: 0,
  correctAnswers: 0,
  totalQuestions: 0,
  startQuiz: function () {
    this.currentGroup = 0;
    this.currentQuestion = 0;
    this.correctAnswers = 0;
    this.totalQuestions = 0;
  },
  getCurrentGroup: function () {
    return this.groups[this.currentGroup];
  },
  getCurrentQuestion: function () {
    return this.groups[this.currentGroup].questions[this.currentQuestion];
  },
  nextGroup: function () {
    this.currentQuestion = 0;
    this.currentGroup++;

    if (this.currentGroup === this.groups.length) {
      this.currentGroup = 0;
      return undefined;
    }

    return this.getCurrentGroup();
  },
  nextQuestion: function () {
    this.currentQuestion++;
    this.totalQuestions++;

    if (this.currentQuestion === this.getCurrentGroup().questions.length) {
      if (this.nextGroup() === undefined) {
        return undefined;
      }
    }

    return this.getCurrentQuestion();
  },
  correctAnswer: function () {
    const question = this.getCurrentQuestion();
    return question.choices[question.answer];
  },
  checkAnswer: function (answerChoice) {
    if (answerChoice === this.correctAnswer().id) {
      this.correctAnswers++;
      return true;
    }

    return false;
  },
  groups: [
    {
      img: 'https://tf-assets-prod.s3.amazonaws.com/tf-curric/WEB-DEV-001/2.6.3_challenge_responsive_layout/rey_square.png',
      questions: [
        {
          text: 'Who is this character?',
          answer: 2,
          choices: [
            {
              id: 1,
              text: 'Finn'
            },
            {
              id: 2,
              text: 'Yoda'
            },
            {
              id: 3,
              text: 'Rey'
            },
            {
              id: 4,
              text: 'Luke'
            }
          ]
        },
        {
          text: 'What planet does she live on?',
          answer: 2,
          choices: [
            {
              id: 1,
              text: 'Earth'
            },
            {
              id: 2,
              text: 'Alderan'
            },
            {
              id: 3,
              text: 'Jakkuu'
            },
            {
              id: 4,
              text: 'Tatooine'
            }
          ]
        }
      ]
    },
    {
      img: "https://tf-assets-prod.s3.amazonaws.com/tf-curric/WEB-DEV-001/2.6.3_challenge_responsive_layout/finn_square.png",
      questions: [
        {
          text: 'Who is this character?',
          answer: 0,
          choices: [
            {
              id: 1,
              text: 'Finn'
            },
            {
              id: 2,
              text: 'Yoda'
            },
            {
              id: 3,
              text: 'Rey'
            },
            {
              id: 4,
              text: 'Luke'
            }
          ]
        },
        {
          text: 'What planet does he live on?',
          answer: 0,
          choices: [
            {
              id: 1,
              text: 'Unknown'
            },
            {
              id: 2,
              text: 'Alderan'
            },
            {
              id: 3,
              text: 'Jakkuu'
            },
            {
              id: 4,
              text: 'Tatooine'
            }
          ]
        }
      ]
    }
  ]
};
/// Усього 12 запитань

/// Для тесту рандомно оберуться 10

var quizData = [

  /// Запитання з однією правильною відповіддю

  // 1
  {
        type: "normal",
        question: "Як створити внутрішню (вбудовану) таблицю у CSS?",
        answers: [
            "table { display: inline; }",
            "table { display: internal; }",
            "table { display: nested; }",
            "table { display: table; }",
        ],
        correct: "table { display: table; }",
  },

  // 2
  {
      type: "normal",
      question: "Яка основна мета використання CSS?",
      answers: [
          "Щоб додати динамічну поведінку на веб-сторінці.",
          "Для забезпечення стилізації та оформлення веб-сторінок.",
          "Додавання анімації на веб-сторінку.",
          "По приколу.",
      ],
      correct: "Для забезпечення стилізації та оформлення веб-сторінок.",
  },

  // 3
  {
        type: "normal",
        question: "Як правильно використовувати клас в CSS?",
        answers: [
            "class:style { }",
            ".class { }",
            "class-name: { }",
            "#class { }",
        ],
        correct: ".class { }",
  },

  // 4
  {
      type: "normal",
      question: "Що означає абревіатура CSS?",
      answers: [
          "Creative Style Sheets",
          "Cascading Style Sheets",
          "Computer Style Sheets",
          "Colorful Style Sheets",
      ],
      correct: "Cascading Style Sheets",
  },

  // 5
  {
      type: "normal",
      question: "Яка команда використовується для визначення кольору тексту в CSS?",
      answers: [
          "text-color",
          "color",
          "font-color",
          "text-style",
      ],
      correct: "color",
  },

  /// Запитання з декількома правильними відповідями

  // 6
  {
      type: "muliple choice",
      question: "Які з наступних одиниць вимірювання можна використовувати для властивості width??",
      answers: [
          "px",
          "em",
          "%",
          "rem",
      ],
      correct: ["px", "em", "%"],
  },

  // 7
  {
      type: "muliple choice",
      question: "Які властивості використовуються для центрування блока в горизонтальному та вертикальному напрямках?",
      answers: [
          "margin",
          "padding",
          "text-align",
          "position",
      ],
      correct: ["margin", "position"],
  },

  // 8
  {
      type: "muliple choice",
      question: "Які способи вказання стилів в CSS є правильними?",
      answers: [
          "Внутрішній (вбудований) стиль.",
          "Зовнішній (підключений) стиль.",
          "Встроєний (inline) стиль.",
          "Секційний (sectional) стиль.",
      ],
      correct: ["Внутрішній (вбудований) стиль.", "Зовнішній (підключений) стиль.", "Mixins.", "Встроєний (inline) стиль."],
  },

  /// Запитання з введенням тексту

  // 9
  {
      type: "enter text",
      question: "Як визначити внутрішні відступи для всіх сторін блоку?",
      correct: "padding: 10px;",
  },

  // 10
  {
      type: "enter text",
      question: "Як зробити текст жирним у CSS?",
      correct: "font-weight: bold;",
  },

  // 11
  {
      type: "enter text",
      question: "Як змінити курсивність тексту в CSS?",
      correct: "font-style: italic;",
  },

  /// Запитання з випадним списком відповідей

  // 12
  {
      type: "select",
      question: "Оберіть правильні варанти відповідей:",
      text: "Display: %answer%<br><br>використовуєтся набагато частіше в написані простих сайтів ніж dsplay: %answer%",
      answers: [
          "flex;",
          "grid;",
      ],
      correct: ["flex", "grid"],
  },

];

///
/// Оголошення селекторів
///
const modal = document.querySelector(".modal");
const openModalBtn = document.querySelector(".login_btn");
const overlay = document.querySelector(".overlay");
const submitBtn = document.querySelector(".submit_btn");
const quizInner = document.querySelector(".quiz_inner");
///
/// Контейнери
///
var headerContainer;
var taskContainer
var listContainer;
///
var loginInputs;
///
/// Інфа про студента
///
var loginInfo = {};
///
/// Бал студента
///
let score = 0;
///
let questionIndex = 0;


// відкриття модальних вікон
openModalBtn.addEventListener("click", openModal);
overlay.addEventListener("click", closeModal);

// відстеження відповіді -> наступне запитання
submitBtn.addEventListener("click", () => {
    submitBtn.onclick = checkAnswer;
    saveInfo();
    changeModal();
    shuffle(quizData);
    showQuestion();

}, {once: true});

// відкрити модальне
function openModal() {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
}

// закрити модальне
function closeModal() {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}

// збререження відповіді
function saveInfo() {
    loginInputs = document.querySelectorAll(".login_input");
    for (i = 0; i < loginInputs.length; i++) {
        var element = loginInputs[i];
        var name = element.name;
        var value = element.value;
        if (name) {
            loginInfo[name] = value;
        }
    }
}

// зміна модального
function changeModal() {
    quizInner.innerHTML =
        `<div class="header_container"></div>
         <div class="task_container">
            <ul class="quiz_list">
            </ul>
         </div>`;
    headerContainer = document.querySelector(".header_container");
    taskContainer = document.querySelector(".task_container");
    listContainer = document.querySelector(".quiz_list");
    submitBtn.innerHTML = 'Відповісти';
    quizInner.style.display = 'block';
}

// clear
function clearPage() {
    headerContainer.innerHTML = '';
    listContainer.innerHTML = '';
}

// Рандомний вибір
function shuffle(array) {
    let j, temp;
    for (let i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[j];
        array[j] = array[i];
        array[i] = temp;
    }
    return array;
}

///
/// Вивід запитань
///
function showQuestion() {
    const headerTemplate = `<h2 class="title">%title%</h2>`;
    const title = headerTemplate.replace('%title%', quizData[questionIndex]['question']);
    headerContainer.innerHTML = title;

    ///
    /// Перевірка типів
    ///
    if (quizData[questionIndex]['type'] === 'normal') { // Звичайне запитання
        /// перемішування
        shuffle(quizData[questionIndex]['answers']);

        /// вивід
        for (answerText of quizData[questionIndex]['answers']) {
            const questionTemplate =
                `<li>
                    <label>
                        <input value="%answer%" type="radio" class="answer" name="answer" />
                        <span>%answer%</span>
                    </label>
                </li>`;
            const answerHtml = questionTemplate.replace('%answer%', answerText).replace('%answer%', answerText);
            listContainer.innerHTML += answerHtml;
        }

    } else if (quizData[questionIndex]['type'] === 'muliple choice') { // Декілька відповідей
        /// перемішування
        shuffle(quizData[questionIndex]['answers']);
        /// вивід
        for (answerText of quizData[questionIndex]['answers']) {
            const questionTemplate =
                `<li>
                    <label>
                        <input value="%answer%" type="checkbox" class="answer" name="answer" />
                        <span>%answer%</span>
                    </label>
                </li>`;
            const answerHtml = questionTemplate.replace('%answer%', answerText).replace('%answer%', answerText);
            listContainer.innerHTML += answerHtml;
        }

        // вписувати відповідь
      } else if (quizData[questionIndex]['type'] === 'enter text') {
        /// вивід
        const answerHtml =
            `<li>
                <label>
                    <input type="text" class="answer" name="answer" placeholder="Поле для вводу" />
                </label>
            </li>`;
        listContainer.innerHTML = answerHtml;

    } else if (quizData[questionIndex]['type'] === 'select') { // з випадним списком відповідей
        /// перемішування
        shuffle(quizData[questionIndex]['answers']);

        // вивід
        const selectTemplate = `<select class="quiz_select"></select>`;
        let textTemplate = quizData[questionIndex]['text'];
        for (i = 0; i < quizData[questionIndex]['answers'].length; i++)
            textTemplate = textTemplate.replace('%answer%', selectTemplate);
        const text = `<p class="select_text"> ${textTemplate}</p>`;
        listContainer.innerHTML = text;
        const selectContainer = taskContainer.querySelectorAll('.quiz_select');
        for (j = 0; j < selectContainer.length; j++) {
            selectContainer[j].innerHTML += `<option selected="selected" disabled="disabled">Select</option>`
            for (i = 0; i < quizData[questionIndex]['answers'].length; i++)
                selectContainer[j].innerHTML += `<option>${quizData[questionIndex]['answers'][i]}</option>`;
        }
    }
}

///
/// Перевірка відповідей
///

function checkAnswer() {
    ///
    /// Аналогічно як до показу запитань, перевірка кожного з типів
    ///
    if (quizData[questionIndex]['type'] === 'normal') {
        const checkedRadio = taskContainer.querySelector('input[type="radio"]:checked');
        const userAnswer = checkedRadio.value;
        if (userAnswer === quizData[questionIndex]['correct']) {
            score++;
        }
    } else if (quizData[questionIndex]['type'] === 'muliple choice') {
        const checkedCheckBox = Array.from(taskContainer.querySelectorAll('input[type="checkbox"]:checked'));
        let userAnswer = [];
        for (i = 0; i < checkedCheckBox.length; i++) {
            userAnswer[i] = checkedCheckBox[i].value;
        }

        if (JSON.stringify(quizData[questionIndex]['correct'].sort()) === JSON.stringify(userAnswer.sort())) {
            score++;
        }
    } else if (quizData[questionIndex]['type'] === 'enter text') {
        let userAnswer = taskContainer.querySelector('input[type="text"]');

        if (quizData[questionIndex]['correct'] === userAnswer.value) {
            score++;
        }
    } else if (quizData[questionIndex]['type'] === 'select') {
        const userAnswerTemplate = Array.from(taskContainer.querySelectorAll('.quiz_select'));
        let userAnswer = [];
        for (i = 0; i < userAnswerTemplate.length; i++) {
            userAnswer[i] = userAnswerTemplate[i].value;
        }

        if (JSON.stringify(quizData[questionIndex]['correct']) === JSON.stringify(userAnswer)) {
            score++;
        }
    }

    ///
    /// Не більше 10 запитань
    ///
    if (questionIndex !== 9) {
        questionIndex++;
        clearPage();
        showQuestion();
        return;
    } else {
        clearPage();
        showResults();
        sendResults();
    }
}

///
/// Вивід результату тестування
///
function showResults() {
    const headerTemplate = `<h2 class="title">Тест заверешено!</h2>`;
    headerContainer.innerHTML = headerTemplate;

    const resultTemplate = `<h3 class="result_msg">%result%</h3>`;
    let result = `${loginInfo.name}, ви набрали ${score}/10 балів!`;
    const finalResult = resultTemplate.replace('%result%', result);
    taskContainer.innerHTML = finalResult;
    loginInfo.score = `${score}/10`;

    submitBtn.style.display = 'none';
    submitBtn.onclick = null;
}
const Questions = [
    {
        question: "wie rechtliche und politische Probleme in Deutschland zusammenhängen?",
        answers: [
            {label: "yes", point: "1"},
            {label: "no", point: "0"}
        ]
    },
    {
        question: "inwiefern Verfassungs- und Europarecht vor Diskriminierungen schützen?",
        answers: [
            {label: "yes", point: "1"},
            {label: "no", point: "0"}
        ]
    },
    {
        question: "an einer internationalen Universität direkt an der deutsch-polnischen Grenze zu studieren?",
        answers: [
            {label: "yes", point: "1"},
            {label: "no", point: "0"}
        ]
    },
    {
        question: "welchen Grenzen das freie Recht auf Meinungsäußerung unterliegt?",
        answers: [
            {label: "yes", point: "1"},
            {label: "no", point: "0"}
        ]
    },
    {
        question: "wie sich die Politik in Deutschland seit der Wiedervereinigung entwickelt hat?",
        answers: [
            {label: "yes", point: "1"},
            {label: "no", point: "0"}
        ]
    },
    {
        question: "nach dem Studium als Rechtsanwalt oder Richter zu arbeiten?",
        answers: [
            {label: "yes", point: "0"},
            {label: "no", point: "1"}
        ]
    },
    {
        question: "nach dem Studium als Diplomat zu arbeiten?",
        answers: [
            {label: "yes", point: "0"},
            {label: "no", point: "1"}
        ]
    },
    {
        question: "nach dem Studium in Medien, Verbänden oder politischen Institutionen zu arbeiten?",
        answers: [
            {label: "yes", point: "1"},
            {label: "no", point: "0"}
        ]
    },
    {
        question: "wie Krieg und Frieden entstehen?",
        answers: [
            {label: "yes", point: "1"},
            {label: "no", point: "0"}
        ]
    },
    {
        question: "was die EU für die Bürger der Mitgliedstaaten bedeutet?",
        answers: [
            {label: "yes", point: "1"},
            {label: "no", point: "0"}
        ]
    },
    {
        question: "nach dem BA-Studium ein MA-Studium der Politikwissenschaft weiterzuführen?",
        answers: [
            {label: "yes", point: "1"},
            {label: "no", point: "0"}
        ]
    },
    {
        question: "wie sich kulturelle Unterschiede auf das Zusammenleben in Deutschland und Europa auswirken?",
        answers: [
            {label: "yes", point: "0"},
            {label: "no", point: "1"}
        ]
    },
    {
        question: "die Möglichkeit zu haben, ein Auslandssemester während des Studiums an einer unserer rund 250 Partneruniversitäten zu absolvieren?",
        answers: [
            {label: "yes", point: "1"},
            {label: "no", point: "0"}
        ]
    },
];

const redirect_yes = "https://www.europa-uni.de/de/studium/informieren-orientieren/bewerbung-einschreibung/ba-recht-politik-politik-recht/index.html";
const redirect_no = "https://www.europa-uni.de/de/studium/studienangebot/index.html";

function make_question_set(question_set) {
    let element = document.querySelector('template.question-set-template').content.children[0].cloneNode(true);

    let question = element.querySelector('.question');
    let answer_container = element.querySelector('.answer');
    let answer = element.querySelector('.answer-button');

    // modify the question text
    question.textContent = question_set.question;

    // add each answer
    question_set.answers.forEach(a => {
        let ans = answer.cloneNode(true);
        ans.textContent = a.label;
        ans.setAttribute('aria-point', a.point);
        answer_container.appendChild(ans);
    });

    // remove the answer template
    answer.remove();

    // return the ready node
    return element;
}

var total_points = 0;
function modify_point(point) {
    if (point !== -1 && point !== 1 && point != 0) {
        console.error("Point should be either one or zero. Got: " + point);
    } else if ( point === -1 && total_points == 0) {
        console.error("Already zero. Cannot substract");
    } else if ( point === 1 && total_points >= Questions.length )  {
        console.error("Already maximum. Cannot substract");
    } else {
        total_points += point;
    }
}

// Close the popup of result response
function close_result() {
    let container = document.querySelector('#result-response-container');
    container.classList.add('hidden');
    container.classList.remove('flex');
}

// Calculate the result
function response_text() {
    let question_count = Questions.length;
    let percentage = total_points * 100 / question_count;

    let inner_html = "Error! please report this to site admin";

    if ( percentage > 81 ) {
        inner_html = `${total_points}/${question_count}. Perfekt, der Studiengang ist genau das Richtige für Dich! Komm an die Viadrina und Du findest ein <a target="_blank" class="clickable-link" href="${redirect_yes}">Studienangebot</a>, das Dich begeistern wird.`
    } else if ( percentage > 51 ) {
        inner_html = `${total_points}/${question_count}. Sehr gut, das passt ziemlich gut zu Deinen Interessen! Wir freuen uns auf Deine <a target="_blank" class="clickable-link" href="${redirect_yes}">Bewerbung!</a>`
    } else if ( percentage > 31 ) {
        inner_html = `${total_points}/${question_count}. Das ist noch ausbaufähig… Aber genau das ist unsere Mission: Dich für die Inhalte unseres <a target="_blank" class="clickable-link" href="${redirect_yes}">Studiums</a> zu begeistern. Bewirb Dich und lass uns Deine Neugierde wecken!`;
    } else {
        inner_html = `${total_points}/${question_count}. So ganz scheinen wir nicht das Richtige für Dich im Angebot zu haben. Aber vielleicht findest Du bei den anderen <a target="_blank" class="clickable-link" href="${redirect_no}">Studiengängen</a> der Viadrina etwas Passenderes. Schau Dich doch einfach mal weiter um!`;
    }


    return inner_html;
}

// reset all selected options
function reset_response() {
    // make all selected answers inactive
    document.querySelectorAll('label.answer-button').forEach(ans => {
        ans.classList.remove('active');
    });
    // make the total points to zero
    total_points = 0;
}

function submit_response(){
    let text_continer = document.querySelector('.submit-response');
    let given_answers = document.querySelectorAll('label.answer-button.active').length;

    // make sure all answers have been answered
    if (given_answers < Questions.length ) {
        text_continer.innerHTML = "Please answer all question";
    } else {
        text_continer.innerHTML = response_text();
    }

    let container = document.querySelector('#result-response-container');
    container.classList.add('flex');
    container.classList.remove('hidden');
}

function select_answer(answer) {
    // Get the parent
    let parent = answer.parentElement;

    // get the currently active sibling
    let prev_active = parent.querySelector('.answer-button.active');

    // if there exists a option that was selected previously
    if (prev_active != null ) {
        // Substract the point of previous option
        let prev_point = parseInt(prev_active.getAttribute('aria-point'));
        modify_point(-1 * prev_point); // multiply by -1 to substract

        // previous active option is not longer seen as active
        prev_active.classList.remove('active');
    }

    // increase the point of this option
    let this_point = parseInt(answer.getAttribute('aria-point'));
    modify_point(this_point);

    // make this option looks like active
    answer.classList.add('active');
}

function fill_question_sets() {
    // first get all nodes of questions defined
    let question_sets = [];
    Questions.forEach(question_set => {
        question_sets.push(make_question_set(question_set));
    });

    // once got all node,
    // we can add all at once
    let question_set_container = document.querySelector('#question-set-container');
    question_sets.forEach(question_set => {
        question_set_container.appendChild(question_set);
    });
}

// activity to do as soon as window is loaded
window.onload = function() {
    // fill the questions
    fill_question_sets();
};
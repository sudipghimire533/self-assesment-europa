const Questions=[{question:"wie rechtliche und politische Probleme in Deutschland zusammenhängen?",answers:[{label:"ja",point:"1"},{label:"nein",point:"0"}]},{question:"inwiefern Verfassungs- und Europarecht vor Diskriminierungen schützen?",answers:[{label:"ja",point:"1"},{label:"nein",point:"0"}]},{question:"an einer internationalen Universität direkt an der deutsch-polnischen Grenze zu studieren?",answers:[{label:"ja",point:"1"},{label:"nein",point:"0"}]},{question:"welchen Grenzen das freie Recht auf Meinungsäußerung unterliegt?",answers:[{label:"ja",point:"1"},{label:"nein",point:"0"}]},{question:"wie sich die Politik in Deutschland seit der Wiedervereinigung entwickelt hat?",answers:[{label:"ja",point:"1"},{label:"nein",point:"0"}]},{question:"nach dem Studium als Rechtsanwalt oder Richter zu arbeiten?",answers:[{label:"ja",point:"0"},{label:"nein",point:"1"}]},{question:"nach dem Studium als Diplomat zu arbeiten?",answers:[{label:"ja",point:"0"},{label:"nein",point:"1"}]},{question:"nach dem Studium in Medien, Verbänden oder politischen Institutionen zu arbeiten?",answers:[{label:"ja",point:"1"},{label:"nein",point:"0"}]},{question:"wie Krieg und Frieden entstehen?",answers:[{label:"ja",point:"1"},{label:"nein",point:"0"}]},{question:"was die EU für die Bürger der Mitgliedstaaten bedeutet?",answers:[{label:"ja",point:"1"},{label:"nein",point:"0"}]},{question:"nach dem BA-Studium ein MA-Studium der Politikwissenschaft weiterzuführen?",answers:[{label:"ja",point:"1"},{label:"nein",point:"0"}]},{question:"wie sich kulturelle Unterschiede auf das Zusammenleben in Deutschland und Europa auswirken?",answers:[{label:"ja",point:"0"},{label:"nein",point:"1"}]},{question:"die Möglichkeit zu haben, ein Auslandssemester während des Studiums an einer unserer rund 250 Partneruniversitäten zu absolvieren?",answers:[{label:"ja",point:"1"},{label:"nein",point:"0"}]}],redirect_ja="https://www.europa-uni.de/de/studium/informieren-orientieren/bewerbung-einschreibung/ba-recht-politik-politik-recht/index.html",redirect_no="https://www.europa-uni.de/de/studium/studienangebot/index.html";function make_question_set(b){let a=document.querySelector('template.question-set-template').content.children[0].cloneNode(!0),d=a.querySelector('.question'),e=a.querySelector('.answer'),c=a.querySelector('.answer-button');return d.textContent=b.question,b.answers.forEach(b=>{let a=c.cloneNode(!0);a.textContent=b.label,a.setAttribute('aria-point',b.point),e.appendChild(a)}),c.remove(),a}var total_points=0;function modify_point(a){a!==-1&&a!==1&&a!=0?console.error("Point should be either one or zero. Got: "+a):a===-1&&total_points==0?console.error("Already zero. Cannot substract"):a===1&&total_points>=Questions.length?console.error("Already maximum. Cannot substract"):total_points+=a}function close_result(){let a=document.querySelector('#result-response-container');a.classList.add('hidden'),a.classList.remove('flex')}function response_text(){let a=Questions.length,c=total_points*100/a,b="Error! please report this to site admin";return c>81?b=`${total_points}/${a}. Perfekt, der Studiengang ist genau das Richtige für Dich! Komm an die Viadrina und Du findest ein <a target="_blank" class="clickable-link" href="${redirect_ja}">Studienangebot</a>, das Dich begeistern wird.`:c>51?b=`${total_points}/${a}. Sehr gut, das passt ziemlich gut zu Deinen Interessen! Wir freuen uns auf Deine <a target="_blank" class="clickable-link" href="${redirect_ja}">Bewerbung!</a>`:c>31?b=`${total_points}/${a}. Das ist noch ausbaufähig… Aber genau das ist unsere Mission: Dich für die Inhalte unseres <a target="_blank" class="clickable-link" href="${redirect_ja}">Studiums</a> zu begeistern. Bewirb Dich und lass uns Deine Neugierde wecken!`:b=`${total_points}/${a}. So ganz scheinen wir nicht das Richtige für Dich im Angebot zu haben. Aber vielleicht findest Du bei den anderen <a target="_blank" class="clickable-link" href="${redirect_no}">Studiengängen</a> der Viadrina etwas Passenderes. Schau Dich doch einfach mal weiter um!`,b}function reset_response(){document.querySelectorAll('label.answer-button').forEach(a=>{a.classList.remove('active')}),total_points=0}function submit_response(){let a=document.querySelector('.submit-response'),c=document.querySelectorAll('label.answer-button.active').length;c<Questions.length?a.innerHTML="Please answer all question":a.innerHTML=response_text();let b=document.querySelector('#result-response-container');b.classList.add('flex'),b.classList.remove('hidden')}function select_answer(a){let c=a.parentElement,b=c.querySelector('.answer-button.active');if(b!=null){let a=parseInt(b.getAttribute('aria-point'));modify_point(-1*a),b.classList.remove('active')}let d=parseInt(a.getAttribute('aria-point'));modify_point(d),a.classList.add('active')}function fill_question_sets(){let a=[];Questions.forEach(b=>{a.push(make_question_set(b))});let b=document.querySelector('#question-set-container');a.forEach(a=>{b.appendChild(a)})}window.onload=function(){fill_question_sets()}
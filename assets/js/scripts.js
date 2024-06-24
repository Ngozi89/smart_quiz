// Add all required elements
let start_game = document.querySelector(".start_game button");
let game_info_list = document.querySelector(".game_info_list");
let exit_btn = game_info_list.querySelector(".buttons .exit");
let continue_btn = game_info_list.querySelector(".buttons .continue");
let quiz_box = document.querySelector(".quiz_box");
let timmer = quiz_box.querySelector(".timer .timer_sec");
let timeheaderLine = quiz_box.querySelector("header .time_line");
let timeUp = quiz_box.querySelector("header .time_left");

const option_list = document.querySelector(".option_list");

// Activate start game button
start_game.onclick = ()=>{
    game_info_list.classList.add("activeInfo");
};

exit_btn.onclick = ()=>{
    game_info_list.classList.remove("activeInfo");
}

continue_btn.onclick = ()=> {
    game_info_list.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
    startTime(10);
    startHeaderTimeLine(0);
}

let que_count = 0;
let que_number = 1;
let playerScore = 0;
let timming;
let headerLine;
let timeValue = 10;
let widthValue = 0;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .continue");
const quit_quiz = result_box.querySelector(".buttons .exit");

restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    let que_count = 0;
    let que_number = 1;
    let timeValue = 10;
    let playerScore = 0;
    let widthValue = 0;
    showQuestions(que_count);
    queCounter(que_number);
    clearInterval(timming);
    startTime(timeValue);
    clearInterval(headerLine);
    startHeaderTimeLine(widthValue);
    next_btn.style.display = "none";
    timeUp.textContent = "Time Left";
}

quit_quiz.onclick = ()=>{
    window.location.reload();
}

//If player clicks nect button
next_btn.onclick = ()=>{
    if (que_count < questions.length - 1){
        que_count++;
        que_number++;
        showQuestions(que_count);
        queCounter(que_number);
        clearInterval(timming);
        startTime(timeValue);
        clearInterval(headerLine);
        startHeaderTimeLine(widthValue);
        next_btn.style.display = "none";
        timeUp.textContent = "Time Left";
    }else{
        clearInterval(timming);
        clearInterval(headerLine);
        console.log("You have completed the quiz");
        showResultBox();
    }
}

// Display Questions and options function
function showQuestions(index){
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>'+ questions[index].number + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option">'+ questions[index].options[0] +'<span></span></div>'
                     + '<div class="option">'+ questions[index].options[1] +'<span></span></div>'
                     + '<div class="option">'+ questions[index].options[2] +'<span></span></div>'
                     + '<div class="option">'+ questions[index].options[3] +'<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag
    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer) {
    clearInterval(timming);
    clearInterval(headerLine);
    let userAnswer = answer.textContent;
    let correctAnswer = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if (userAnswer == correctAnswer) {
        playerScore += 1;
        console.log(playerScore);
        answer.classList.add("correct");
        console.log("Your answer is correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    }else{
        answer.classList.add("incorrect");
        console.log("Incorrect answer");
        answer.insertAdjacentHTML("beforeend", crossIcon);

         //Choose correct answer
        for (let i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correctAnswer) {
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
    }
}

//Disable other options when play chooses answer
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";
}

function showResultBox(){
    game_info_list.classList.remove("activeInfo"); //Hide quiz info box
    quiz_box.classList.remove("activeQuiz"); //Hide the quiz box
    result_box.classList.add("activeResult"); //Display Quiz result-box
    const showScore = result_box.querySelector(".score_text");
    if(playerScore > 3){
        let playerTag = '<span>and congrat! You scored <p>'+ playerScore +'</p> out of <p>'+ questions.length +'</p></span>';
        showScore.innerHTML = playerTag;
    }
    else if(playerScore > 1){
        let playerTag = '<span>and nice, You scored <p>'+ playerScore +'</p> out of <p>'+ questions.length +'</p></span>';
        showScore.innerHTML = playerTag;
    }
    else{
        let playerTag = '<span>and you scored <p>'+ playerScore +'</p> out of <p>'+ questions.length +'</p></span>';
        showScore.innerHTML = playerTag;
    }
}

function startTime(time){
    timming = setInterval(timer, 1000);
    function timer(){
        timmer.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timmer.textContent;
            timmer.textContent = "0" + addZero;
        }
        if (time < 0){
            clearInterval(timming);
            timmer.textContent = "00";
            timeUp.textContent = "Time Up";

            let correctAnswer = questions[que_count].answer;
            let allOptions = option_list.children.length;

            for (let i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correctAnswer) {
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
            }
            for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.style.display = "block";
        }
    }
}

function startHeaderTimeLine(time){
    headerLine = setInterval(timer, 20);
    function timer(){
        time += 1;
        timeheaderLine.style.width = time + "px";
        if (time > 549) {
            clearInterval(headerLine);
        }
    }
}

function queCounter(index){
    const bottom_ques_counter = quiz_box.querySelector(".total-question")
    let totalQuesCountTag ='<span><p>'+ index +'</p>of<p>'+ questions.length +'</p>Que</span>';
    bottom_ques_counter.innerHTML = totalQuesCountTag;
}

// Add all required elements
let start_game = document.querySelector(".start_game button");
let game_info_list = document.querySelector(".game_info_list");
let exit_btn = game_info_list.querySelector(".buttons .exit");
let continue_btn = game_info_list.querySelector(".buttons .continue");
let quiz_box = document.querySelector(".quiz_box");

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
}

let que_count = 0;
let que_number = 1;

const next_btn = quiz_box.querySelector(".next_btn")

next_btn.onclick = ()=>{
    if (que_count < questions.length - 1){
        que_count++;
        que_number++;
        showQuestions(que_count);
        queCounter(1);
    }else{
        console.log("You have completed the questions")
    }
}

// Display Questions and options function
function showQuestions(index){
    const que_text = document.querySelector(".que_text");
    const option_list = document.querySelector(".option_list");
    let que_tag = '<span>'+ questions[index].number + "." + questions[index].question +'</span>';
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

function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[que_count].answer;
    if (userAnswer == correctAnswer) {
        answer.classList.add("correct");
        console.log("Your answer is correct");
    }else{
        answer.classList.add("incorrect");
        console.log("Incorrect answer");
    }
}

function queCounter(index){
    const bottom_ques_counter = quiz_box.querySelector(".total-question")
    let totalQuesCountTag ="<span><p>" + index + "</p>of<p>" + questions.length + "</p>Que</span>";
    bottom_ques_counter.innerHTML = totalQuesCountTag;
}
// Java Script file
let result = document.getElementById("result");
let buttons = document.querySelectorAll(".btn");
let historyBtn = document.getElementById("history-btn");
let historyPopup = document.getElementById("historyPopup");
let closePopup = document.getElementById("closePopup");
let historyList = document.getElementById("historyList");

let currentInput = "";
let history = [];
let justCalculated = false;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        let value = button.textContent;

        if (value === "C") {
            currentInput = "";
            result.value = "";
        } else if (value === "←") {
            currentInput = currentInput.slice(0, -1);
            result.value = currentInput;
        } else if (value === "=") {
            try {
                let calcResult = eval(
                    currentInput.replace("÷","/").replace("×","*").replace("−","-")
                );
                result.value = calcResult;
                history.push(`${currentInput} = ${calcResult}`);
                currentInput = calcResult.toString();
                justCalculated = true;
            } catch {
                result.value = "Error";
            }
        } else {
            if (justCalculated && !isNaN(value)) {
                currentInput = value;
                result.value = currentInput;
                justCalculated = false;
            } else {
                currentInput += value;
                result.value = currentInput;
                justCalculated = false;
            }
        }
    });
});

// Show history inside calculator
historyBtn.addEventListener("click", () => {
    historyList.innerHTML = "";
    history.forEach(entry => {
        let li = document.createElement("li");
        li.textContent = entry;
        historyList.appendChild(li);
    });

    historyPopup.classList.toggle("show");
});

// Close history panel
closePopup.addEventListener("click", () => {
    historyPopup.classList.remove("show");

});

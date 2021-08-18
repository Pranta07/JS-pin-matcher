// random pin generation
function generatePin() {
    const pin = parseInt(Math.random() * 10000);
    //console.log(pin);
    const pinString = pin + "";
    if (pinString.length == 4) return pin;
    else return generatePin();
}

// generate pin button handling
const displayPin = document.getElementById("display-pin");
document
    .getElementById("pin-generate-btn")
    .addEventListener("click", function () {
        const pin = generatePin();
        displayPin.value = pin;
    });

// keypad hadnling
const displayNumbers = document.getElementById("display-numbers");
document.getElementById("keypad").addEventListener("click", function (event) {
    // console.log(event.target.innerText);
    const typedNumber = event.target.innerText;
    if (isNaN(typedNumber)) {
        if (typedNumber == "C") {
            displayNumbers.value = "";
        } else if (typedNumber == "<") {
            const displayString = displayNumbers.value + "";
            displayNumbers.value = displayString.substr(
                0,
                displayString.length - 1
            );
        }
        return;
    }
    let prevNumbers = displayNumbers.value;
    displayNumbers.value = prevNumbers + typedNumber;
    // console.log(displayNumbers.value);
});

// submit button handling
const unmatched = document.getElementById("unmatched-notify");
const matched = document.getElementById("matched-notify");
document.getElementById("pin-submit").addEventListener("click", function () {
    if (displayPin.value == displayNumbers.value) {
        // console.log("pin matched");
        matched.style.display = "block";
        unmatched.style.display = "none";
    } else {
        // console.log("Try again!");
        unmatched.style.display = "block";
        matched.style.display = "none";
        // try left handling
        const tryLeft = document.getElementById("try-left");
        tryLeft.innerText = parseInt(tryLeft.innerText) - 1;
        if (tryLeft.innerText == "0") {
            document
                .getElementById("pin-submit")
                .setAttribute("disabled", true);
        }
    }
});

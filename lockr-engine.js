let history = []
let exPasswordList = document.getElementById("ex-password-list")

let output = document.getElementById("gen-pass")
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const lowerCase = "abcdefghijklmnopqrstuvwxyz"
const numbers = "0123456789"
const symbols = "!@#$%&*(){}><"
// let history = []

let addUpperCase = document.getElementById("add-uppercase")
let addLowerCase = document.getElementById("add-lowercase")
let addNumber = document.getElementById("add-number")
let addSymbol = document.getElementById("add-symbol")

let rangeSlide = document.getElementById("range")
let length = Number(rangeSlide.value)
let lengthDisplay = document.getElementById("length-display")
lengthDisplay.innerHTML = length

rangeSlide.addEventListener("input", () => {
    length = Number(rangeSlide.value)
    lengthDisplay.textContent = length
})

let themeSwitch = document.getElementById("theme-switch")

themeSwitch.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme")
    if (document.body.classList === "dark-theme") {

    } else {

    }
})

const generatePassword = () => {
    let password = ""
    let allChar = ""
    let grade = 0

    if (addUpperCase.checked) {
        allChar += upperCase
        grade += 4
    } if (addLowerCase.checked) {
        allChar += lowerCase
        grade += 4
    } if (addNumber.checked) {
        allChar += numbers
        grade += 4
    } if (addSymbol.checked) {
        allChar += symbols
        grade += 4
    } if (length >= 8) {
        grade += 4
    } else {
        grade += 0
    }

    while (length > password.length) {
        let calcEngine = Math.floor(Math.random() * allChar.length)
        password += allChar[calcEngine]
    }
    output.innerHTML = password

    const bars = document.getElementsByClassName("bar")
    const weakBar = document.getElementById("weak-bar")
    const mediumBar = document.getElementById("medium-bar")
    const strongBar = document.getElementById("strong-bar")
    const veryStrongBar = document.getElementById("very-strong-bar")
    const strengthDisplay = document.getElementById("strength-grade")

    const meterDisplay = () => {
        if (grade <= 5) {
            mediumBar.classList.toggle("no-display")
            strengthDisplay.innerText = "Weak"
            strengthDisplay.style.color = "#d60e0e"
            for (let bar of bars) {
                bar.style.backgroundColor = "#d60e0e"
            }

        } else if (grade <= 10) {
            strongBar.classList.toggle("no-display")
            strengthDisplay.innerText = "Medium"
            strengthDisplay.style.color = "#ff6053"
            for (let bar of bars) {
                bar.style.backgroundColor = "#ff6053"
            }

        } else if (grade <= 15) {
            veryStrongBar.classList.toggle("no-display")
            strengthDisplay.innerText = "Strong"
            strengthDisplay.style.color = "#fee648"
            for (let bar of bars) {
                bar.style.backgroundColor = "#fee648"
            }
        } else {
            strengthDisplay.innerText = "Very Strong"
            strengthDisplay.style.color = "#00aa65"
            for (let bar of bars) {
                bar.style.backgroundColor = "#00aa65"
            }
        }
    }
    meterDisplay()

    const saveToHistory = (index) => {
        exPasswordList.innerHTML = ""
        history.unshift(password)
        if (history.length > 3) {
            history.pop()
        }

        for (let i = 0; i < history.length; i++) {
            let exPassword = document.createElement("li")
            exPassword.innerHTML += `
            <p>${history[i]}</p>
            <span id="copy-ex-password" class="material-symbols-outlined copy-icon icons">content_copy</span>`
            exPasswordList.appendChild(exPassword)

            const copyExPassword = document.getElementById("copy-ex-password")
            copyExPassword.addEventListener("click", () => {
                navigator.clipboard.writeText(history[i])
                console.log("Clicked");
            })
        }
    }
    saveToHistory()
    emptyHistory()
}

const copyPassword = () => {
    navigator.clipboard.writeText(output.textContent);
}

clearAllBtn.addEventListener("click", (e) => {
    history.splice(0, history.length)
    emptyHistory()
})

const emptyHistory = () => {
    if (history.length === 0) {
        exPasswordList.style.gridTemplateColumns = "1fr"
        exPasswordList.innerHTML = `<p id="empty-msg">History is empty.</p>`
    } else {
        exPasswordList.style.gridTemplateColumns = "1fr 1fr 1fr"
    }
}
emptyHistory()
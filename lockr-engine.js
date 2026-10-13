let history = []
let exPasswordList = document.getElementById("ex-password-list")
let clearAllBtn = document.getElementById("clearAllBtn")

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
})

const generatePassword = () => {
    let password = ""
    let allChar = ""
    let grade = 0
    const bars = document.getElementsByClassName("bar")
    const strengthDisplay = document.getElementById("strength-grade")

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

    if (!allChar.length) {
        output.textContent = ""
        strengthDisplay.innerText = "Select a character type"
        strengthDisplay.style.color = ""
        for (let bar of bars) {
            bar.style.backgroundColor = "#334155"
        }
        return
    }

    while (length > password.length) {
        let calcEngine = Math.floor(Math.random() * allChar.length)
        password += allChar[calcEngine]
    }
    output.textContent = password

    const meterDisplay = () => {
        let activeBars
        let strength
        let color

        if (grade <= 5) {
            activeBars = 1
            strength = "Weak"
            color = "#d60e0e"
        } else if (grade <= 10) {
            activeBars = 2
            strength = "Medium"
            color = "#ff6053"
        } else if (grade <= 15) {
            activeBars = 3
            strength = "Strong"
            color = "#fee648"
        } else {
            activeBars = 4
            strength = "Very Strong"
            color = "#00aa65"
        }

        strengthDisplay.innerText = strength
        strengthDisplay.style.color = color
        Array.from(bars).forEach((bar, index) => {
            bar.style.backgroundColor = index < activeBars ? color : "#334155"
        })
    }
    meterDisplay()

    const saveToHistory = () => {
        exPasswordList.innerHTML = ""
        history.unshift(password)
        if (history.length > 3) {
            history.pop()
        }

        for (let i = 0; i < history.length; i++) {
            let exPassword = document.createElement("li")
            let passwordText = document.createElement("p")
            passwordText.textContent = history[i]
            let copyExPassword = document.createElement("span")
            copyExPassword.className = "material-symbols-outlined copy-icon icons"
            copyExPassword.textContent = "content_copy"
            exPassword.append(passwordText, copyExPassword)
            exPasswordList.appendChild(exPassword)

            copyExPassword.addEventListener("click", () => {
                navigator.clipboard.writeText(history[i])
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
        exPasswordList.innerHTML = `<p id="empty-msg">History is empty.</p>`
    }
}
emptyHistory()
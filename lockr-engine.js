const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const lowerCase = "abcdefghijklmnopqrstuvwxyz"
const number = "1234567890"
const symbol = "!@#$%^&*()[]/"
const allChar = upperCase + lowerCase + number + symbol
let genPass = document.getElementById("password")

const length = "10"
const generatePassword = () => {
    let password = ''

    while (password.length < length) {
        password += allChar[Math.floor(Math.random() * allChar.length)]
    }
    genPass.value = password
}

const copyPassword = () => {
    genPass.select()
    document.execCommand("copy");
}
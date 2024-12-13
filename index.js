const ui = document.getElementById('ui')

function start() {
    let text = document.createElement('p')
    text.innerText = 'Web CLI by Natelyt. 2024 All right reserved=))'
    text.style.color = 'yellow'
    ui.appendChild(text)
}

document.addEventListener("DOMContentLoaded", () => {
    start()
})
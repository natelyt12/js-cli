
let a = 0

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        text(`Bạn đã rời màn hình ${a} lần`)
        a+=1
    }
})



// lib
function text(text) {
    let t = document.createElement('p')
    t.innerText = text
    ui.appendChild(t)
}

function errorr(text) {
    let t = document.createElement('p')
    t.style.color = 'rgb(255, 70, 70)'
    t.innerText = text
    ui.appendChild(t)
}

function input(placeholder, type, id, value) {
    let i = document.createElement('input')
    i.placeholder = placeholder
    i.type = type
    i.id = id
    i.value = value
    ui.appendChild(i)
}

function button(text, onclick) {
    let b = document.createElement('button')
    b.innerText = text
    b.setAttribute('onclick', onclick)
    ui.appendChild(b)
}
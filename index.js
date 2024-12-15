const ui = document.getElementById('ui')

let ap = document.getElementById('ap')
let delap = document.getElementById('delap')
let col = document.getElementById('col')
let sent = document.getElementById('sent')


sent.addEventListener('click', () => {
    if (col.value < 3 || col.value > 10) {
        errorr(`Số cột bạn nhập là ${col.value}, hãy sửa lại`)
        return
    } else if (delap.value <= 0) {
        errorr('Không được là số âm hoặc 0')
    } else {
        for (let i = 0; i < col.value; i++) {
            input(`Nhập tần số cột ${i + 1}`, 'number', `col_${i+1}`)
        }
        button('Tính toán', 'submit()')
        sent.disabled = 'true'
    }
})

function submit() {
    text('\n')
    text('Bảng số liệu của bạn trông sẽ như thế này')
    n_list = []
    for (let i = 1; i <= col.value; i++) {
        n_list.push(document.getElementById(`col_${i}`).value)
    }

    ap_list = []
    xavr = []
    let z = Number(ap.value)
    for (let i = 1; i <= Number(col.value); i++) {
        ap_list.push(`[${z};${Math.round((z + Number(delap.value))*100)/100})`)
        xavr.push(
            Math.round(((z + (z+Number(delap.value)))/2)*100)/100
        )
        z = Math.round((z + Number(delap.value))*100)/100
    }

    let t = document.createElement('table')
    let tr1 = document.createElement('tr')
    let tr2 = document.createElement('tr')
    let tr3 = document.createElement('tr')
    tr3.style.color = 'grey'

    let tdt = document.createElement('td')
    tdt.innerText = 'Tần số'
    tr1.appendChild(tdt)
    for (let i = 0; i < n_list.length; i++) {
        let td = document.createElement('td')
        if (n_list[i] == '') {
            n_list[i] = 0
        }
        td.innerText = n_list[i]
        tr1.appendChild(td)
    }

    let tdn = document.createElement('td')
    tdn.innerText = 'Nhóm'
    tr2.appendChild(tdn)
    for (let i = 0; i < ap_list.length; i++) {
        let td = document.createElement('td')
        td.innerText = ap_list[i]
        tr2.appendChild(td)
    }

    let gtdd = document.createElement('td')
    gtdd.innerText = 'GTĐD'
    tr3.appendChild(gtdd)
    for (let i = 0; i < xavr.length; i++) {
        let td = document.createElement('td')
        td.innerText = xavr[i]
        tr3.appendChild(td)
    }

    
    t.appendChild(tr2)
    t.appendChild(tr1)
    t.appendChild(tr3)
    ui.appendChild(t)

    calc()
}

function calc() {
    text('\n')
    text('Thông tin mẫu số liệu:')

    // n
    n = 0 
    for (let i = 0; i < n_list.length; i++) {
        n += Number(n_list[i])
    }
    text(`n: ${n}`)

    //Q1
    k1 = (n/2)
}

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

function input(placeholder, type, id) {
    let i = document.createElement('input')
    i.placeholder = placeholder
    i.type = type
    i.id = id
    ui.appendChild(i)
}

function button(text, onclick) {
    let b = document.createElement('button')
    b.innerText = text
    b.setAttribute('onclick', onclick)
    ui.appendChild(b)
}
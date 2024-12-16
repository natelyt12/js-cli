const ui = document.getElementById('ui')

let ap = document.getElementById('ap')
let delap = document.getElementById('delap')
let col = document.getElementById('col')
let sent = document.getElementById('sent')

test = [3,12,15,20,10]

sent.addEventListener('click', () => {
    if (col.value < 3 || col.value > 10) {
        errorr(`Số cột bạn nhập là ${col.value}, hãy sửa lại`)
        return
    } else if (delap.value <= 0) {
        errorr('Không được là số âm hoặc 0')
    } else {
        for (let i = 0; i < col.value; i++) {
            input(`Nhập tần số cột ${i + 1}`, 'number', `col_${i+1}`, test[i])
        }
        button('Tính toán', 'submit()')
        sent.disabled = 'true'
    }
})

function rnd(num, lmtron) {
    return Math.round(num * lmtron) / lmtron
}

function submit() {
    text('_____________________________________')
    text('Bảng số liệu của bạn trông sẽ như thế này')

    n_list = []
    ap_list = []
    ap_list_obj = []
    xavr = []

    for (let i = 1; i <= col.value; i++) {
        n_list.push(document.getElementById(`col_${i}`).value)
    }

    let z = Number(ap.value)
    for (let i = 1; i <= Number(col.value); i++) {
        stZ = z
        enZ = Math.round((z + Number(delap.value)) * 100) / 100
        obj = new Object()
        obj.start = stZ
        obj.end = enZ
        ap_list_obj.push(obj)
        ap_list.push(`[${stZ};${enZ})`)
        xavr.push((stZ+enZ)/2)
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

    // Trung vị?
    a = 0
    for (let i = 0; i < xavr.length; i++) {
        a = a + Number(xavr[i] * n_list[i])
    }
    b = Number(rnd(a/n,1000))
    text(`Trung vị (x): ${b}`)

    // q1
    k1 = rnd(n / 4, 1000)
    c = 0
    for (let i = 0; i < n_list.length; i++) {
        c += Number(n_list[i])
        if (c > k1) {
            text(`Q1 nằm tại cột ${i+1}, và bằng ${k1}`)
            e = c - n_list[i]
            tpv1 = rnd(Number(ap_list_obj[i].start) + ((k1 - e) * Number(delap.value) / n_list[i]), 1000)
            break
        }
    }

    // q2
    k2 = Number((2 * n) / 4)
    e = 0
    for (let i = 0; i < n_list.length; i++) {
        e += Number(n_list[i])
        if (e > k2) {
            text(`Q2 nằm tại cột ${i + 1}, và bằng ${k2}`)
            g = e - n_list[i]
            tpv2 = rnd(Number(ap_list_obj[i].start) + ((k2 - g) * Number(delap.value) / n_list[i]), 1000)
            break
        }
    }

    // q3
    k3 = rnd((3 * n) / 4, 1000)
    d = 0
    for (let i = 0; i < n_list.length; i++) {
        d += Number(n_list[i])
        if (d > k3) {
            text(`Q3 nằm tại cột ${i + 1}, và bằng ${k3}`)
            // tpv3
            f = d - n_list[i]
            tpv3 = rnd(Number(ap_list_obj[i].start) + ((k3 - f) * Number(delap.value) / n_list[i]), 1000)
            break
        }
    }

    text(`Tứ phân vị thứ nhất: ${tpv1}`)
    text(`Tứ phân vị thứ hai: ${tpv2}`)
    text(`Tứ phân vị thứ ba: ${tpv3}`)

    //kbt
    text(`Khoảng biến thiên: ${tpv3-tpv1}`)

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
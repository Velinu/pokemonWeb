const btn = document.querySelector('button')
const inp = document.querySelector('#input')
const tab = document.querySelector('#tabela')

var local = []
local = JSON.parse(localStorage.getItem('todo'))
local.forEach((e) => {
    const li = document.createElement('li')
    li.innerText = e
    tab.appendChild(li)
})
btn.addEventListener('click', ()=> {
    const valor = inp.value
    local.push(valor)
    localStorage.setItem('todo', JSON.stringify(local))
    const li = document.createElement('li')
    li.innerText = valor
    tab.appendChild(li)
})
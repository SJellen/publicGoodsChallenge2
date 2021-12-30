
let counterStorage = localStorage.getItem('counter')
counterStorage = JSON.parse(counterStorage)

let counter;
if (counterStorage === undefined) {
    counter = 0
} else {
    counter = counterStorage
}

const url = "https://cat-fact.herokuapp.com/facts"

const fetchDataBtn = document.querySelector("#fetchData")
const ul = document.getElementById('facts-list')
const list = document.createDocumentFragment()
const mainContainer = document.querySelector(".main-container")
const closeBtn = document.querySelector(".close-container")

async function getData() {
    await fetch(url)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        let facts = data
        facts.map((fact) => {
            let li = document.createElement('li')
            li.innerText = `${fact.text}`
            list.appendChild(li)
            ul.appendChild(list)
        })
    })
    .catch((error) => {
        console.log(error)
    })
}

function showMain() {
    if (counter >= 2) return
    setTimeout(() => {
        mainContainer.classList.toggle("visible")
    },3000)
}

showMain()

function hideMain() {
    mainContainer.classList.toggle("hide")
    setTimeout(() => {
       mainContainer.classList.toggle("visible") 
    },2000)
    counter++
    localStorage.setItem("counter", counter)
}

fetchDataBtn.addEventListener("click", getData)
closeBtn.addEventListener("click", hideMain)
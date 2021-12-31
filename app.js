
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
const mainContainer = document.querySelector(".main-container")
const buttonContainer = document.querySelector(".button-container")
const closeBtn = document.querySelector(".close-container")

async function getData() {
    await fetch(url)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        buttonContainer.style.visibility = "hidden"
        const facts = data
        facts.map((fact) => {
            let li = document.createElement('li')
            li.innerText = `${fact.text}`
            ul.appendChild(li)
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
        buttonContainer.style.visibility = "visible"
    },3000)
}

showMain()

function hideMain() {
    
    buttonContainer.classList.toggle("hide")
    mainContainer.classList.toggle("hide")
    setTimeout(() => {
       mainContainer.classList.toggle("visible") 
       buttonContainer.style.visibility = "hidden"
    },2000)
    counter++
    localStorage.setItem("counter", counter)
}

fetchDataBtn.addEventListener("click", getData)
closeBtn.addEventListener("click", hideMain)
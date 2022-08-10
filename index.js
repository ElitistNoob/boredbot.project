const robot = document.getElementById('image-container')
const button = document.getElementById("button")
const responseContainer = document.getElementById('response-container')

const responseArray = [ "That sounds fun!", "Awesome idea!", "Can't wait to get started!", "Hmm, I don't know about that idea.", "Nah, don't feel like doing that. Click again.", "Wow! can't believe I didn't think of that!", "You're full of ideas!", "Sounds boring.", "I like that", "Could you be any more boring!", "Okay, leave me alone now.", "I've already done that.", "That's great!", "That's certainly something I could do, but I won't.", "Great! I'll go do that now.", "You cured my boredom!" ]

let isRobotHappy = false
let isWaiting = false

robot.innerHTML = `<img class="img" src="images/robot.svg">`

/* Generates a random response from the response Array */
function getResponse() {
  const randomResponse = Math.floor(Math.random() * responseArray.length)
  return responseContainer.innerHTML = responseArray[randomResponse]
}

/* Toggles the robots eyes */
function changeEyes() {
  document.querySelector('.left-eye').classList.toggle('green-eyes')
  document.querySelector('.right-eye').classList.toggle('green-eyes')
}

/* Sends the signal when Antenna is clicked */
function transmiting() {
  button.classList.toggle('transmiting')
  setTimeout(() => button.classList.toggle('transmiting'), 600)
}

function changeRobot() {
    isWaiting = true
    changeEyes()
    setTimeout(() => {
      getResponse()
      responseContainer.style.display = "block"
      robot.innerHTML = `<img class="img" src="images/robot-happy.svg">`
    }, 500)
    setTimeout(() => {
      robot.innerHTML = `<img class="img" src="images/robot.svg">`
      changeEyes()
      isWaiting = false
    }, 1500)
}

button.addEventListener("click", function() {
  transmiting()
  if(!isWaiting) {
    fetch("https://apis.scrimba.com/bored/api/activity")
    .then(response => response.json())
    .then(data => {
      document.getElementById("activity").textContent = data.activity
    })
    changeRobot()
  }
})
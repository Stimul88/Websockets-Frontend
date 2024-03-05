import BindToDom from "./BindToDom"
import Websocket from "./Websocket";

const websocket = new Websocket()

const container = document.querySelector('.container');
const form = new BindToDom(container);
export const URL = 'http://localhost:7070'
// export const URL = 'https://websockets-backend.onrender.com'


document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault()
  form.bindToDOM();
})


container.addEventListener('click', (e) => {
  e.preventDefault()

  const userName = container.querySelector('.user-name')
  const nameInput = container.querySelector('.name-input')

  const btn = e.target.closest('.continue')
  if(!btn || nameInput.value.trim() === "") return;
  userName.textContent = nameInput.value;

  websocket.userGet(nameInput.value);
})

websocket.init()


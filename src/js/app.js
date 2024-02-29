import BindToDom from "./BindToDom"
import UserApi from "./UserApi"
import SendChat from "./SendChat";

const sendChat = new SendChat()

const container = document.querySelector('.container');
const form = new BindToDom(container);
export const URL = 'http://localhost:8080'


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

  urlConfig.get(nameInput.value);
})

sendChat.init()

window.api = new UserApi(URL);
const urlConfig = window.api;


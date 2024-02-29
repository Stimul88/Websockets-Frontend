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
  // form.element.addEventListener('', card.onSubmit);

})






container.addEventListener('click', (e) => {
  e.preventDefault()

  const userName = container.querySelector('.user-name')
  const nameInput = container.querySelector('.name-input')

  const btn = e.target.closest('.continue')
  if(!btn || nameInput.value.trim() === "") return;
  userName.textContent = nameInput.value;

  urlConfig.get(nameInput.value);




  // const userName = res.filter(name => name.name === nameInput.value)


  // console.log(res.then(result => result.data))

  // const res = window.api.add({name: nameInput.value})

})












// container.addEventListener('submit', (e) => {
//   e.preventDefault()
//
//   const chatWindow = document.querySelector('.chat-window')
//   const text = chatWindow.querySelector('.text')
//   const message = text.value;
//   console.log(message)
//
//   if(!message) return;
//
//   ws.send(message);
//
//   text.value = '';
// })


// ws.addEventListener('open', (e) => {
//   console.log(e)
//
//   console.log('ws open')
// })
//
//
// ws.addEventListener('error', (e) => {
//   console.log(e)
//
//   console.log('ws error')
// })

// ws.addEventListener('message', (e) => {
//   const chatMessages = document.querySelector('.chat-messages')
//
//   const data = JSON.parse(e.data);
//
//   const { chat: messages } = data;
//
//   messages.forEach(message => {
//
//     chatMessages.appendChild(document.createTextNode(message + `\n`))
//   });
//
//   console.log('ws message')
// })
// sendChat.sendMessage(userName)
sendChat.init()




window.api = new UserApi(URL);
const urlConfig = window.api;






// console.log(UrlConfig.nikName)


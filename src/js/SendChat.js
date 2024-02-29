const ws = new WebSocket(`ws://localhost:8080/ws`);
import UserApi from "./UserApi"


export default class SendChat {
  constructor() {
    this.container = document.querySelector('.container');
  }

  init () {
    // const container = document.querySelector('.container');
    this.container.addEventListener('submit', this.sendMessage)
    ws.addEventListener('message', this.wsMessage)
  }

  sendMessage (e) {
    e.preventDefault()
    const container = document.querySelector('.container');
    const chatWindow = document.querySelector('.chat-window')
    const userName = container.querySelector('.user-name')
    const text = chatWindow.querySelector('.text')
    const message = text.value;

    if(!message) return;

    const obj = userName.textContent + ' ' + message


    // console.log(userName.textContent)

    ws.send(obj);

    // ws.send({name: userName.textContent, message: message});

    text.value = '';
  }

  wsMessage (e) {
    const container = document.querySelector('.container');
    const chatMessages = container.querySelector('.chat-messages')
    const userName = container.querySelector('.user-name')

    const data = JSON.parse(e.data);

    console.log(data)

    const { chat: messages } = data;
    // const { name, messages } = data;

    // const { mes: item } = messages




    messages.forEach(message => {
      if(message.name === userName.textContent) {
        console.log(message.name)

        const newMessage = `
                  <div class="message-container message-container-you ">
                    <div class="name-and-text">
                      <div class="name-and-data name-and-data-red"> You, ${new Date().toLocaleString()}</div>
                      <span class="message-text">${message.message}</span>
                    </div>
                  </div>
    `
        chatMessages.insertAdjacentHTML('afterbegin', newMessage)
        // chatMessages.appendChild(document.createTextNode(message + `\n`))
        return;
      }

      const newMessage = `
                  <div class="message-container">
                    <div class="name-and-text">
                      <div class="name-and-data"> ${message.name}, ${new Date().toLocaleString()}</div>
                      <span class="message-text">${message.message}</span>
                    </div>
                  </div>
    `
      chatMessages.insertAdjacentHTML('afterbegin', newMessage)


    });


    console.log('ws message')
  }
}

// ws.addEventListener('message', (e) => {
//   const chatMessages = this.container.querySelector('.chat-messages')
//   const userName = this.container.querySelector('.user-name')
//
//   const data = JSON.parse(e.data);
//
//   const { chat: messages } = data;
//
//   messages.forEach(message => {
//
//     const newMessage = `
//                   <div class="message-container">
//                     <div class="name-and-text">
//                       <div class="name-and-data name-and-data-red"> You, ${new Date().toLocaleString()}</div>
//                       <span class="message-text">${message}</span>
//                     </div>
//                   </div>
//     `
//     chatMessages.insertAdjacentHTML('afterbegin', newMessage)
//     // chatMessages.appendChild(document.createTextNode(message + `\n`))
//   });
//
//   console.log('ws message')
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
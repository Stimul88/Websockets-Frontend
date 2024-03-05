// const ws = new WebSocket(`ws://localhost:7070/ws`);
const ws = new WebSocket(`wss://websockets-backend.onrender.com/ws`);


export default class Websocket {
  constructor() {
    this.container = document.querySelector('.container');
  }

  init() {
    ws.addEventListener('open', this.wsOpen)
    this.container.addEventListener('submit', this.getMessage)
    ws.addEventListener('message', this.wsMessage)
    ws.addEventListener('close', this.wsClose)
    ws.addEventListener('error', this.wsError)
  }

  userGet (name) {
    const userObj = `{"user":{"name": "${name}"}}`
    ws.send(userObj);
  }

  getMessage (e) {
    e.preventDefault()
    const container = document.querySelector('.container');
    const chatWindow = document.querySelector('.chat-window')
    const userName = container.querySelector('.user-name')
    const text = chatWindow.querySelector('.text')
    const message = text.value;

    if(!message) return;

    const chat = `{
    "chat":{
    "name": "${userName.textContent}",
    "message": "${message}",
    "time": "${new Date().toLocaleString()}"
    }}`

    ws.send(chat);

    text.value = '';
  }

  wsOpen() {

    console.log('ws open')
  }

  wsMessage(e) {

    const container = document.querySelector('.container');
    const chatMessages = container.querySelector('.chat-messages')
    const userName = container.querySelector('.user-name')
    const containerChat = document.querySelector('.container-chat');
    const formName = document.querySelector('.form-name');
    const nameList = containerChat.querySelector('.name-list');

    const getInfo = JSON.parse(e.data);


    const { user } = getInfo;

    const { chat } = getInfo;

    const { dbUsers } = getInfo;

    const { dbChat } = getInfo;

    const { busy } = getInfo;


    if(user) {

      containerChat.classList.remove('hidden')
      formName.classList.add('hidden')

      if(user.name === userName.textContent) {

        const newDiv = `<li class="name-and-avatar">
                          <div class="avatar"></div>
                          <span class="name-text name-text-red">You</span>
                      </li>`
        nameList.insertAdjacentHTML("afterbegin", newDiv)
        return;

      }
      const newDiv = `<li class="name-and-avatar">
                                    <div class="avatar"></div>
                                    <span class="name-text">${user.name}</span>
                                </li>`
      nameList.children[0].insertAdjacentHTML("afterend", newDiv)
    }


    if(chat) {
        if(chat.name === userName.textContent) {

          const newMessage = `
                  <div class="message-container message-container-you ">
                    <div class="name-and-text">
                      <div class="name-and-data name-and-data-red"> You, ${new Date().toLocaleString()}</div>
                      <span class="message-text">${chat.message}</span>
                    </div>
                  </div>
    `
          chatMessages.insertAdjacentHTML('afterbegin', newMessage)
          return;
        }
      const newMessage = `
                    <div class="message-container">
                      <div class="name-and-text">
                        <div class="name-and-data"> ${chat.name}, ${new Date().toLocaleString()}</div>
                        <span class="message-text">${chat.message}</span>
                      </div>
                    </div>
      `
      chatMessages.insertAdjacentHTML('afterbegin', newMessage)

    }

    if(dbUsers) {

      nameList.innerHTML = '';

      console.log(dbUsers)

      dbUsers.reverse().forEach(item => {
                if(item.name === userName.textContent) {

                  const newDiv = `<li class="name-and-avatar">
                                    <div class="avatar"></div>
                                    <span class="name-text name-text-red">You</span>
                                </li>`
                  nameList.insertAdjacentHTML("afterbegin", newDiv)
                  return;
                }
                const newDiv = `<li class="name-and-avatar">
                                    <div class="avatar"></div>
                                    <span class="name-text">${item.name}</span>
                                </li>`
                nameList.insertAdjacentHTML("beforeend", newDiv)
              })

      return;
    }

    if(dbChat) {

      dbChat.forEach(message => {
        if(message.name === userName.textContent) {
          const newMessage = `
                    <div class="message-container message-container-you ">
                      <div class="name-and-text">
                        <div class="name-and-data name-and-data-red"> You, ${message.time}</div>
                        <span class="message-text">${message.message}</span>
                      </div>
                    </div>
      `
          chatMessages.insertAdjacentHTML('beforeend', newMessage)
          return;
        }

        const newMessage = `
                    <div class="message-container">
                      <div class="name-and-text">
                        <div class="name-and-data"> ${message.name}, ${message.time}</div>
                        <span class="message-text">${message.message}</span>
                      </div>
                    </div>
      `
        chatMessages.insertAdjacentHTML('beforeend', newMessage)
      });

      return;
    }

    if(busy) {
      alert(busy)
    }

    console.log('ws message')
  }

  wsClose(){

    console.log('ws close')
  }

  wsError() {

    console.log('ws error')
  }
}

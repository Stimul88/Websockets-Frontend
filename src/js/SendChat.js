const ws = new WebSocket(`ws://localhost:8080/ws`);


export default class SendChat {
  constructor() {
    this.container = document.querySelector('.container');
  }

  init () {
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

    ws.send(obj);

    text.value = '';
  }

  wsMessage (e) {
    const container = document.querySelector('.container');
    const chatMessages = container.querySelector('.chat-messages')
    const userName = container.querySelector('.user-name')

    const data = JSON.parse(e.data);

    console.log(data)

    const { chat: messages } = data;

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

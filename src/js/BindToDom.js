export default class BindToDom{
  constructor(parentEl) {
    this.parentEl = parentEl;
  }

  static get markup () {
    return `
          <form class="form-name " name="form">
            <div class="form-container">
              <label for="name-input" class="name-label">Выберите псевдоним</label>
              <input  class="name-input" id="name-input" name="name-input"  minlength="4" maxlength="30" size="10"/>
            </div>
            <div class="btn">
              <button class="continue" >Продолжить</button>
            </div>
           </form>
           <div class="container-chat hidden">
           <div class="user-name hidden"></div>
            <div class="name-container">
             <ol class="name-list">
              </ol>
            </div>
            <form class="chat-window">
              <div class="chat-area">
                <div class="chat-messages">
                </div>
             </div>
              <div class="user-input">
                <input type="text" id="message-input" class="text" placeholder="Type your message here...">
              </div>
              </form>
            </div>
        `;
  }

  bindToDOM() {
    this.parentEl.innerHTML = BindToDom.markup
  }
}


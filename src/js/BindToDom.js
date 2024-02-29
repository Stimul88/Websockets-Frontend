export default class BindToDom{
  constructor(parentEl) {
    this.parentEl = parentEl;
  }

  static get markup () {
    return `
          <form class="form-name" name="form">
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
<!--                <li class="name-and-avatar">-->
<!--                          <div class="avatar"></div>-->
<!--                          <span class="name-text">Женя</span>-->
<!--                      </li>-->
              </ol>
            </div>
            <form class="chat-window">
              <div class="chat-area">
                <div class="chat-messages">
<!--                  <div class="message-container">-->
<!--                    <div class="name-and-text">-->
<!--                      <div class="name-and-data name-and-text-red">You, data</div>-->
<!--                      <span class="message-text">Text</span>-->
<!--                    </div>-->
<!--                  </div>-->
                </div>
             </div>
              <div class="user-input">
                <input type="text" id="message-input" class="text" placeholder="Type your message here...">
              </div>
              </form>
            </div>
        `;
  }

  static get submitSelector() {
    return '.submit';
  }

  static get inputSelector() {
    return '.form-control';
  }
  //
  static get selector() {
    return '.innogrn-form-widget';
  }

  bindToDOM() {
    this.parentEl.innerHTML = BindToDom.markup
    // this.element = this.parentEl.querySelector(BindToDom.selector);
    // this.submit = this.element.querySelector(BindToDom.submitSelector);
  }
}


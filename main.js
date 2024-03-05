/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/js/BindToDom.js":
/*!*****************************!*\
  !*** ./src/js/BindToDom.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ BindToDom; }
/* harmony export */ });
class BindToDom{
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



/***/ }),

/***/ "./src/js/Websocket.js":
/*!*****************************!*\
  !*** ./src/js/Websocket.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Websocket; }
/* harmony export */ });
// const ws = new WebSocket(`ws://localhost:7070/ws`);
const ws = new WebSocket(`wss://websockets-backend.onrender.com/ws`);


class Websocket {
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


/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BindToDom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BindToDom */ "./src/js/BindToDom.js");
/* harmony import */ var _Websocket__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Websocket */ "./src/js/Websocket.js");



const websocket = new _Websocket__WEBPACK_IMPORTED_MODULE_1__["default"]()

const container = document.querySelector('.container');
const form = new _BindToDom__WEBPACK_IMPORTED_MODULE_0__["default"](container);



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



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/style.css */ "./src/css/style.css");
/* harmony import */ var _js_app_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/app.js */ "./src/js/app.js");



console.log("it's alive")
}();
/******/ })()
;
//# sourceMappingURL=main.js.map
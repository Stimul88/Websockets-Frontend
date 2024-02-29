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

/***/ "./src/js/SendChat.js":
/*!****************************!*\
  !*** ./src/js/SendChat.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ SendChat; }
/* harmony export */ });
// const ws = new WebSocket(`ws://localhost:8080/ws`);
const ws = new WebSocket(`ws://websockets-backend.onrender.com/ws`);


class SendChat {
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


/***/ }),

/***/ "./src/js/UserApi.js":
/*!***************************!*\
  !*** ./src/js/UserApi.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ UserApi; }
/* harmony export */ });
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ "./src/js/app.js");



class UserApi {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async get (name) {
    const containerChat = document.querySelector('.container-chat');
    const formName = document.querySelector('.form-name');
    const nameList = containerChat.querySelector('.name-list');

    const request = await fetch(_app__WEBPACK_IMPORTED_MODULE_0__.URL);
    const result = await request;
    const text = JSON.parse(await result.text());

    const userName =  Array.from(text).find(nameInArray => nameInArray.name === name)

    if(!userName) {
      await this.add({name: name})
      containerChat.classList.remove('hidden')
      formName.classList.add('hidden')
      const request = await fetch(_app__WEBPACK_IMPORTED_MODULE_0__.URL);
      const result = await request;
      const text = JSON.parse(await result.text());
      text.reverse().forEach(item => {
        if(item.name === name) {
          const newDiv = `<li class="name-and-avatar">
                            <div class="avatar"></div>
                            <span class="name-text name-text-red">${item.name}</span>
                        </li>`
          nameList.insertAdjacentHTML("beforeend", newDiv)
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

    alert('Никнейм занят! Необходимо выбрать другой!')
  }


  async add (user) {
    const query = '/users';

    const requests = await fetch(this.apiUrl + query, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(user),
    });

    const result = await requests;

    if (!result.ok) {
      console.error('Ошибка')

      return;
    }

    const json = await result.json();

    const status = json.status;

    console.log(status);
  }

  async delete () {
    window.addEventListener("beforeunload", async (e) => {
      const query = '/?user=' + this.nikName.name;

      const requests = await fetch(this.apiUrl + query, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const result = await requests;

      if (!result.ok) {
        console.error('Ошибка')

        return;
      }

      const json = await result.json();

      const status = json.status;

      console.log(status);

    })
  }
}








/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   URL: function() { return /* binding */ URL; }
/* harmony export */ });
/* harmony import */ var _BindToDom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BindToDom */ "./src/js/BindToDom.js");
/* harmony import */ var _UserApi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserApi */ "./src/js/UserApi.js");
/* harmony import */ var _SendChat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SendChat */ "./src/js/SendChat.js");




const sendChat = new _SendChat__WEBPACK_IMPORTED_MODULE_2__["default"]()

const container = document.querySelector('.container');
const form = new _BindToDom__WEBPACK_IMPORTED_MODULE_0__["default"](container);
// export const URL = 'http://localhost:8080'
const URL = 'https://websockets-backend.onrender.com'


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

window.api = new _UserApi__WEBPACK_IMPORTED_MODULE_1__["default"](URL);
const urlConfig = window.api;



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
import {URL} from "./app";


export default class UserApi {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async get (name) {
    const containerChat = document.querySelector('.container-chat');
    const formName = document.querySelector('.form-name');
    const nameList = containerChat.querySelector('.name-list');

    const request = await fetch(URL);
    const result = await request;
    const text = JSON.parse(await result.text());

    const userName =  Array.from(text).find(nameInArray => nameInArray.name === name)

    if(!userName) {
      await this.add({name: name})
      containerChat.classList.remove('hidden')
      formName.classList.add('hidden')
      const request = await fetch(URL);
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







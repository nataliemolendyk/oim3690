import { items } from './data.js';

const app = document.getElementById('app');

if (app) {
    const heading = document.createElement('h1');
    heading.textContent = 'Pasta List';

    const list = document.createElement('ul');

    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
    });

    app.appendChild(heading);
    app.appendChild(list);
} else {
    console.log(items);
}
import { applyCommon } from './common.js';
import { createFormEntity } from '../helpers/form-helpers.js';

async function createHandler() {
    await applyCommon.call(this);
    await this.partial('./templates/article/create.hbs');

    const apiKey = 'https://skelet-softuni.firebaseio.com/Articles.json';


    let formRef = document.querySelector('#create-article');
    formRef.addEventListener('submit', async e => {
        e.preventDefault();
        let form = createFormEntity(formRef, ['title', 'category', 'content']);
        let formValue = form.getValue();
        let customApiKey = apiKey;

        let availableCategories = ['Javascript', 'C#', 'Java', 'Python'];

        if (formValue.title && formValue.category && formValue.content) {

            if (!availableCategories.includes(formValue.category)) {
                console.error('Available categories: Javascript, C#, Java, Python');
            } else {
                await fetch(customApiKey, {
                    method: 'POST',
                    body: JSON.stringify({
                        title: formValue.title,
                        category: formValue.category,
                        content: formValue.content,
                        creator: sessionStorage.getItem('email')
                    })
                })
                this.redirect('#/home');
            }
        } else { console.error('Please fill out all data fields') };

    });
}

async function detailsHandler() {
    await applyCommon.call(this);
    let apiKey = `https://skelet-softuni.firebaseio.com/Articles/${sessionStorage.getItem('currentArticle')}.json`;

    await fetch(apiKey).then(x => x.json())
        .then(data => {
            if (data.creator == sessionStorage.getItem('email')) {
                this.op = true;
            }

            for (let key in data) {
                this[key] = data[key];
            }
        })

    await this.partial('./templates/article/details.hbs');
}

async function editHandler() {
    await applyCommon.call(this);
    await this.partial('./templates/article/edit.hbs');

    const apiKey = 'https://skelet-softuni.firebaseio.com/Articles.json';


    let formRef = document.querySelector('#edit-article');
    formRef.addEventListener('submit', async e => {
        e.preventDefault();
        let form = createFormEntity(formRef, ['title', 'content', 'category']);
        let formValue = form.getValue();
        let customApiKey = apiKey.replace('Articles', `Articles/${sessionStorage.getItem('currentArticle')}`);

        const object = {};

        if (formValue.title) object.title = formValue.title;
        if (formValue.content) object.content = formValue.content;
        if (formValue.category) object.category = formValue.category;

        if (Object.keys(object).length > 0) {
            await fetch(customApiKey, { method: 'PATCH', body: JSON.stringify(object) });
            this.redirect('#/details');
        }else{
            console.error('Please fill out at least one data field');
        }
    });
}

async function deleteHandler() {
    let apiKey = `https://skelet-softuni.firebaseio.com/Articles/${sessionStorage.getItem('currentArticle')}.json`;
    await fetch(apiKey, { method: 'DELETE' });
    this.redirect('#/home');
}

export {
    createHandler,
    detailsHandler,
    editHandler,
    deleteHandler
}
import { applyCommon } from './common.js';

async function homeViewHandler() {
    await applyCommon.call(this);

    let apiKey = 'https://skelet-softuni.firebaseio.com/Articles.json';
    await fetch(apiKey).then(x => x.json())
        .then(data => {
            if (!data) {
                this.partial('./templates/home/home.hbs');
                return;
            }
            let list = Object.entries(data);


            let javascript = [];
            let java = [];
            let cs = [];
            let python = [];

            for (let item of list) {
                let subj = item[1].category;
                let object = {
                    id: item[0],
                    category: item[1].category,
                    creator: item[1].creator,
                    title: item[1].title,
                    content: item[1].content
                }

                if (subj == 'Javascript') javascript.push(object);
                else if (subj == 'Java') java.push(object);
                else if (subj == 'Python') python.push(object);
                else cs.push(object);
            }

            this.javascript = javascript.sort((a, b) => b.title.localeCompare(a.title));
            this.java = java.sort((a, b) => b.title.localeCompare(a.title));
            this.cs = cs.sort((a, b) => b.title.localeCompare(a.title));
            this.python = python.sort((a, b) => b.title.localeCompare(a.title));
        });
    await this.partial('./templates/home/home.hbs');

    let btns = Array.from(document.getElementsByClassName('btn details-btn')).forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.setItem('currentArticle', btn.parentNode.id);
            this.redirect('#/details');
        })
    })
}



export {
    homeViewHandler,
}

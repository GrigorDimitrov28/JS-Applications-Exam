import {
    homeViewHandler,
    registerViewHandler,
    createHandler,
    logoutHandler,
    detailsHandler,
    deleteHandler,
    loginViewHandler,
    editHandler
} from './handlers/index.js';

const app = Sammy('#main', function () {

    this.use('Handlebars', 'hbs');

    this.get('#/', homeViewHandler);
    this.get('#/home', homeViewHandler);
    this.get('#/register', registerViewHandler);
    this.get('#/login', loginViewHandler);
    this.get('#/create', createHandler);
    this.get('#/logout', logoutHandler);
    this.get('#/details', detailsHandler);
    this.get('#/delete', deleteHandler);
    this.get('#/edit', editHandler);
    this.post('#/register', () => false);
    this.post('#/create', () => false);
    this.post('#/login', () => false);
    this.post('#/edit', () => false);
});

app.run('#/home');

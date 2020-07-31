import { applyCommon } from './common.js';
import { createFormEntity } from '../helpers/form-helpers.js';

async function loginViewHandler() {
    await applyCommon.call(this);
    await this.partial('./templates/login/login.hbs');

    let formRef = document.querySelector('#login-form');
    formRef.addEventListener('submit', async e => {
        e.preventDefault();

        let form = createFormEntity(formRef, ['email', 'password']);
        let formValue = form.getValue();

        const loggedInUser = await firebase.auth().signInWithEmailAndPassword(formValue.email, formValue.password);
        const userToken = await firebase.auth().currentUser.getIdToken();
        sessionStorage.setItem('email', loggedInUser.user.email);
        sessionStorage.setItem('userId', firebase.auth().currentUser.uid);

        sessionStorage.setItem('token', userToken);
        this.redirect([`#/home`]);
    });
}

async function registerViewHandler() {
    await applyCommon.call(this);
    await this.partial('./templates/register/register.hbs');

    let formRef = document.querySelector('#register-form');
    formRef.addEventListener('submit', async (e) => {
        e.preventDefault();
        let form = createFormEntity(formRef, ['email', 'password', 'rep-pass']);
        let formValue = form.getValue();

        if (formValue.password !== formValue['rep-pass']) {
            throw new Error('Password and repeat password must match');
        }

        const newUser = await firebase.auth().createUserWithEmailAndPassword(formValue.email, formValue.password);

        let userToken = await firebase.auth().currentUser.getIdToken();
        sessionStorage.setItem('email', newUser.user.email);
        sessionStorage.setItem('userId', firebase.auth().currentUser.uid);

        sessionStorage.setItem('token', userToken);
        this.redirect(['#/home']);
    });
}

function logoutHandler() {
    sessionStorage.clear();
    firebase.auth().signOut();
    this.redirect(['#/home']);
}


export {
    loginViewHandler,
    registerViewHandler,
    logoutHandler,
}
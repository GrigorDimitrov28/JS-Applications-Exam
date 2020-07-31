export async function applyCommon() {
    this.username = sessionStorage.getItem('username');
    this.loggedIn = !!sessionStorage.getItem('token');

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    };
}
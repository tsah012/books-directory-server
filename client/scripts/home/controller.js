class Controller {
    constructor(){
        this.model = new Model();
        this.view = new View();
        this.baseUrl = window.location.origin;
    }

    async logout() {
        let url = this.baseUrl + '/logout';
        try {
            let res = await this.model.logout();
            window.location.href = this.baseUrl + '/login';
        }
        catch (error) {
            this.view.setErrorMessage(error.message);
            console.log('error occurred during logout. error:\n' + error);
        }
    }

    loadData(){
        this.view.refresh();
    }
}

const ctrl = new Controller();

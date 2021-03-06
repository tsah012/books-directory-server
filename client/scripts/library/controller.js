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
            console.log('error occurred during logout. error:\n' + error);
        }
    }

    async loadData(){
        try {
            const lib = await this.model.getLibrary();
            this.view.refresh(lib);
        } catch (error) {
            this.view.setErrorMessage(error.message)
        }
    }

    async save(){
        const user = JSON.parse(localStorage['user']);
        const books = [];
        document.querySelectorAll('[borrow]').forEach((book)=>{
            books.push(book.id);
        });

        user.books.forEach((book)=>{
            books.push(book._id)
        });

        try {
            const res = await this.model.updateBooks(books);
            if (res.status){
                user.books = res.data;
                localStorage['user'] = JSON.stringify(user);
            }else{
                this.view.setErrorMessage(res.message);
            }
        } catch (error) {
            this.view.setErrorMessage(error.message);
        }

        window.location.href = this.baseUrl;
    }
}

const ctrl = new Controller();

class Model {
    constructor() {
        this.baseUrl = window.location.origin;
    }

    async logout() {
        let url = this.baseUrl + '/logout';
        try {
            let res = await fetch(url, { method: 'DELETE' });
            let resData = await res.json();
            return resData;
        }
        catch (error) {
            throw error;
        }
    }

    async getLibrary() {
        let url = this.baseUrl + '/api/library'
        try {
            let res = await fetch(url);
            let resData = await res.json();
            return resData;
        }
        catch (error) {
            throw error;
        }
    }
}
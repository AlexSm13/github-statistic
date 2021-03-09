export default class Api {

    baseUrl: string;

    constructor() {
        this.baseUrl = 'https://api.github.com/';
    }

    getUserInfo(login: string) {
        return fetch(this.baseUrl + `users/${login}`)
            .then(res => res.json())
            .then(
                (result) => {
                    return result || {};
                },
                (error) => {
                    console.log(error)
                }
            )
    }
}

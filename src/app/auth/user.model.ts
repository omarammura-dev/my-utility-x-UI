export class User {
    constructor(
        public ID:string,
        public Username:string,
        public Email:string,
        private _token:string,
        private _tokenExpiration:Date
    ){}


    get token(){
        if (!this._tokenExpiration || new Date() > this._tokenExpiration) {
            return null
        }
        return this._token
    }
}
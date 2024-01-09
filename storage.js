class Storage{

    static getSearchedUsersFromStorage(){
        //Tüm kullanicilari al

        let users;
        if(localStorage.getItem("searched") === null){
            users = [];
        }
        else{
            users = JSON.parse(localStorage.getItem("searched"));
        }

        return users;
    }

    static addSearchedUserToStorage(username){
        //Kullanici ekle

        let users = this.getSearchedUsersFromStorage

        //username var mı yok mu sorgulama
        if(users.indexOf(username) === -1){ //username arrayde yok demektir
            users.push(username);
        }
        localStorage.setItem("searched",JSON.stringify(users));
    }
    
    static clearAllSearchedUsersFromStrorage(){
        //Tum kullanicilari silme
        localStorage.removeItem("searched");
    }
}
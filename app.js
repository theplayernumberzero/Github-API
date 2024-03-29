//Elementleri seçme

const githubForm = document.getElementById("github-form");
const inputName = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");

const github = new Github();
const ui = new UI();

eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);   //Son aramaları sayfa yenilendikçe storage dan alıp arayüze yazacağız

}

function getData(e){
    let username = inputName.value.trim();

    if(username ===""){
        alert("Lütfen bir kullanici adi giriniz.")
    }
    else{
        github.getGithubData(username)
        .then(response => {
            if(response.user.message === "Not Found"){
                //Hata mesaji
                ui.showError("Kullanici bulunamadi");
            }
            else{
                ui.addSearchedUserToUI(username);
                Storage.addSearchedUserToStorage(username);

                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
            }
        })
        .catch(err => ui.showError(err));
    }

    ui.clearInput();    //Input temizleme
    e.preventDefault(); //sayfa yenilenmesini engellemek için
}

function clearAllSearched(){
    //Tüm arananları temizle
    if(confirm("Emin misiniz ?")){
        //Silme işlemi
        Storage.clearAllSearchedUsersFromStrorage();    //Storagedan temizleme
        ui.clearAllSearchedFomUI();
    }
}

function getAllSearched(){
    //Arananları storagedan al ve UI a ekle
    let users = Storage.getSearchedUsersFromStorage();

    let result = "";
    users.forEach(user => {
        result += `<li class="list-group-item">${user}</li>`
    })
    lastUsers.innerHTML = result;
}

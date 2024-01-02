class Github{

    constructor(){
        this.url = "https://api.github.com/users/";
    }

    async getGithubData(username){
        const responseUser = await fetch(this.url + username);  //Get request
        const responseRepo = await fetch(this.url + username + "/repos");

        const userData = await responseUser.json();
        const repoData = await responseRepo.json();

        return {
            user:userData,
            repo:repoData
        };
    }
}
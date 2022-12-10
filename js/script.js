const divInputContainer = document.querySelector('.form-input-container')
const titleForm = document.querySelector('#title-form');
const userInput = document.querySelector("#user-input");
const searchBtn = document.querySelector("#search");
const imgElement = document.querySelector("#img-profile");
const profileName = document.querySelector("#profile-name");
const profileLogin = document.querySelector("#profile-login");
const profileBio = document.querySelector("#profile-bio");
const decriptionProfile = document.querySelector("#description-profile");
const respositories = document.querySelector("#respositories");
const followers = document.querySelector("#followers");
const following = document.querySelector("#following");
const errorMessageContainer = document.querySelector("#error-message");
const previous = document.querySelector('#previous');
const containerProject = document.querySelector('.container-project');

const loader = document.querySelector("#loader");
//funtions

const getApiGitHubData = (userName) =>{
  
  fetch(`https://api.github.com/users/${userName}`)
  .then( async res => {
    if(res.status === 404){
      showErrorMessage();
      return;
    }
    let data = await res.json();
    toggleLoader();
    profileName.innerText = data.name;
    profileLogin.innerText = data.login;
    profileBio.innerText = data.bio;
    imgElement.setAttribute(
      "src",
      `${data.avatar_url}`
    );
    respositories.innerText = data.public_repos;
    followers.innerText = data.followers;
    following.innerText = data.following;

    decriptionProfile.classList.remove("hide");
        
  }).catch(e => console.log(e))
  toggleLoader();
}


const getApiGithubResp = (userName) =>{
  
  fetch(`https://api.github.com/users/${userName}/repos`)
  .then( async res => {
        if(!res.ok){
          throw new Error(res.status)
        }
        let data = await res.json();
        data.map(item => {
            let divProjects = document.createElement('div');
            divProjects.classList.add('projects')
            divProjects.innerHTML = `
                  <h4 class="title">${item.name}</h4>
                  <span class="data-create">Data Criação:
                      ${Intl.DateTimeFormat('pt-BR').format(new Date(item.created_at))}
                      </span>
                  <a href="${item.html_url}" target="_blank">${item.html_url}</a>
                  <span class="language"><span class="circle"></span>${item.language}</span> 
            `
            containerProject.appendChild(divProjects);
      })
  }).catch(e => console.log(e))

}
// errors
const showErrorMessage = () => {
  toggleLoader();
  errorMessageContainer.classList.remove("hide");
  decriptionProfile.classList.add("hide");
  
};
// loader
const toggleLoader = () => {
  loader.classList.toggle("hide");
};
// events
searchBtn.addEventListener("click", async () => {
  
  const userName = userInput.value;
  
  getApiGitHubData(userName);  
});

respositories.addEventListener("click", () => {
 
  const userName = userInput.value;
   
  getApiGithubResp(userName);
  
  decriptionProfile.classList.add("hide");
  containerProject.classList.remove('hide');
  divInputContainer.classList.add('hide');
  titleForm.innerText = 'Repositórios';

});

previous.addEventListener("click", ()=>{

  decriptionProfile.classList.remove("hide");
  containerProject.classList.add('hide');
  divInputContainer.classList.remove('hide')
  titleForm.innerText = 'Github Profile';

});

userInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    const userInput = e.target.value;
    getApiGitHubData(userInput);
  }
  if (e.code === "Enter") {
    const userInput = e.target.value;
    if(userInput == ''){
      errorMessageContainer.innerText = 'Campo de busca vazio!'
      errorMessageContainer.style.color = '#f02a2a'
    }
  }
});

userInput.addEventListener("keyup", ()=>{
  
  errorMessageContainer.classList.add("hide");

})
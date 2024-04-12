document.addEventListener('DOMContentLoaded', function() {
    const url = 'https://api.github.com/users/';

    const form = document.getElementById('github-form');
    const searchInp = document.getElementById('search');
    const searchBtn = document.getElementById("search-btn");
    const container = document.getElementById('github-container');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        searchUser();
    });

    function searchUser() {
        const userName = searchInp.value;
        console.log(userName);
        if(userName === ''){
            alert('Please enter a username');
            return;
        }
        fetch(url+userName)
        .then(res => {
            if(!res.ok){
                throw new Error('User not found');
            }
            return res.json();
        })
        .then(data => {
            displayUser(data);
        })
        .catch(error => {
            container.innerHTML = `<p>${error.message}</p>`
        });
    }
    
    function displayUser(user) {
        const userData = `
        <div>
          <img src="${user.avatar_url}" alt="User Avatar">
          <h2>${user.login}</h2>
          <p>${user.bio}</p>
          <a href="${user.html_url}" target="_blank">View Profile</a>
        </div>
      `;
      container.innerHTML = userData;
    }
})

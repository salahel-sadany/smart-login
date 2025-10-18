var logoutButton = document.querySelector('.btn-logout');
var username = document.getElementById('username');

if (localStorage.getItem('username')) {
  var userName = localStorage.getItem('username');
  username.textContent = 'Welcome ' + userName;
}

logoutButton.addEventListener('click', function () {
  localStorage.removeItem('username');
  location.replace('/');
});

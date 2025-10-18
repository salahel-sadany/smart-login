var signinEmail = document.getElementById('signinEmail');
var signinPassword = document.getElementById('signinPassword');
var signinButton = document.querySelector('.btn-signin');
var incorrect = document.getElementById('incorrect');

var signupName = document.getElementById('signupName');
var signupEmail = document.getElementById('signupEmail');
var signupPassword = document.getElementById('signupPassword');
var signupButton = document.querySelector('.btn-signup');
var exist = document.getElementById('exist');

var users = getUsers();

signupButton?.addEventListener('click', signUp);
signinButton?.addEventListener('click', login);

function signUp(event) {
  event.preventDefault();
  exist.innerHTML = '';
  var span = document.createElement('span');

  var user = {
    name: signupName.value,
    email: signupEmail.value,
    password: signupPassword.value,
  };

  if (isEmpty(user)) {
    span.classList.add('text-danger');
    span.textContent = 'All inputs is required';
    exist.appendChild(span);

    return;
  }

  if (!isValidEmail(user.email)) {
    span.classList.add('text-danger');
    span.textContent = 'enter a valid email address';
    exist.appendChild(span);

    return;
  }

  if (isExist(user)) {
    span.classList.add('text-danger');
    span.textContent = 'email already exists';
    exist.appendChild(span);

    return;
  }

  users.push(user);
  saveUsers();

  span.classList.add('text-success');
  span.textContent = 'success';
  exist.appendChild(span);

  location.replace('index.html');
}

function login(event) {
  event.preventDefault();
  incorrect.innerHTML = '';
  var span = document.createElement('span');

  var user = {
    email: signinEmail.value,
    password: signinPassword.value,
  };

  var currentUser = users.find(
    (userData) =>
      userData.email === user.email && userData.password === user.password
  );

  if (isEmpty(user)) {
    span.classList.add('text-danger');
    span.textContent = 'All inputs is required';
    incorrect.appendChild(span);

    return;
  }

  if (!isExist(user) || !currentUser) {
    span.classList.add('text-danger');
    span.textContent = 'incorrect email or password';
    incorrect.appendChild(span);

    return;
  }

  localStorage.setItem('username', currentUser.name);
  location.href = 'home.html';
}

function isEmpty(user) {
  return (
    user.name?.trim() === '' || user.email.trim() === '' || user.password === ''
  );
}

function isExist(user) {
  return users.some((userData) => userData.email === user.email);
}

function isValidEmail(email) {
  var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

function saveUsers() {
  var usersJson = JSON.stringify(users);
  localStorage.setItem('users', usersJson);
}

function getUsers() {
  if (localStorage.getItem('users')) {
    return JSON.parse(localStorage.getItem('users'));
  } else return [];
}

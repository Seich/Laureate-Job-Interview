var email = lambda('email');
var username = lambda('name');
var surname = lambda('surname');
var password = lambda('password');
var password2 = lambda('password2');
var phone = lambda('phone');
var submitButton = lambda('submit');

submitButton.click(formSubmit);

function formSubmit(e) {
    beta.addClassIfEmpty(username, 'error');
	beta.addClassIfEmpty(surname, 'error');
	beta.addClassIfEmpty(phone, 'error');
    e.preventDefault();
}
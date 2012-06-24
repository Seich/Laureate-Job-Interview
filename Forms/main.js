// Form Errors
var errors;

var email = lambda('email');
var username = lambda('name');
var surname = lambda('surname');
var password = lambda('password');
var password2 = lambda('password2');
var phone = lambda('phone');
var submitButton = lambda('submit');

submitButton.click(formSubmit);

function formSubmit(e) {
    errors = [];

    if (beta.addClassIfNotValid('email', email, 'error')) {
        errors.push('The entered email is not valid.');
    }
    
    if (beta.addClassIfEmpty(username, 'error')) {
        errors.push('Please enter a name.');
    }
    
	if (beta.addClassIfEmpty(surname, 'error')) {
    	errors.push('Please enter a last name.');
	}
	
	if (beta.addClassIfNotEqual(password, password2, 'error')) {
    	errors.push('The passwords do not match.');
	}
	
	if (beta.addClassIfEmpty(password, 'error')) {
    	errors.push('Please enter a Password.');
	}
	
	if (beta.addClassIfEmpty(password2, 'error')) {
    	errors.push('Please confirm your password.');
	}
	
	if (beta.addClassIfEmpty(phone, 'error')) {
    	errors.push('Please enter a phone number');
	}
	
    e.preventDefault();
}
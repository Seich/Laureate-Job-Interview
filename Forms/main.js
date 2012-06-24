// Form Errors
var errors;
var fields;

var email = document.getElementById('email');
var username = document.getElementById('name');
var surname = document.getElementById('surname');
var password = document.getElementById('password');
var password2 = document.getElementById('password2');
var phone = document.getElementById('phone');
var submitButton = document.getElementById('submit');

function addClass(elem, className) {
    elem.className += ' ' + className;
    elem.className = lambda.trim(elem.className);
}

function removeClass(elem, className) {
    var regex = new RegExp('(\\s|^)' + className + '(\\s|$)');
    elem.className = elem.className.replace(regex, ' ');
    elem.className = lambda.trim(elem.className);
}

function hasClass(elem, className) {
    return elem.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)')) != null;
}

if (document.addEventListener) {
    submitButton.addEventListener('click', formSubmit, false);
} else {
    submitButton.attachEvent('onclick', formSubmit, false);
}

function formSubmit(e) {
    errors = [];
    
    // Validate Email.
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(email.value)) {
        if (!hasClass(email.parentNode, 'error'))
            addClass(email.parentNode, 'error');
    } else {
        if (hasClass(email.parentNode, 'error'))
            removeClass(email.parentNode, 'error');
    }
    
    // Validate empty fields
    fields = [username, surname, phone];
    for (i = 0; i < 3; i++) {
        if (!fields[i].value) {
            if (!hasClass(fields[i].parentNode, 'error'))
                addClass(fields[i].parentNode, 'error');
        } else {
            if (hasClass(fields[i].parentNode, 'error'))
                removeClass(fields[i].parentNode, 'error');
        }
    }
    
    e.preventDefault();
}
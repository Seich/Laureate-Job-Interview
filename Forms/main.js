var email = document.getElementById('email');
var username = document.getElementById('name');
var surname = document.getElementById('surname');
var password = document.getElementById('password');
var password2 = document.getElementById('password2');
var phone = document.getElementById('phone');
var submitButton = document.getElementById('submit');

function addClass(elem, className) {
    elem.className += ' ' + className;
    elem.className = trim(elem.className);
}

function removeClass(elem, className) {
    var regex = new RegExp('(\\s|^)' + className + '(\\s|$)');
    elem.className = elem.className.replace(regex, ' ');
    elem.className = trim(elem.className);
}

function hasClass(elem, className) {
    return elem.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)')) != null;
}

function trim(str) {
    var	str = str.replace(/^\s\s*/, ''),
        ws = /\s/,
    	i = str.length;
    while (ws.test(str.charAt(--i)));
    return str.slice(0, i + 1);
}

if (document.addEventListener) {
    submitButton.addEventListener('click', formSubmit, false);
} else {
    submitButton.attachEvent('onclick', formSubmit, false);
}

function formSubmit(e) {

    // Validate Email.
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(email.value)) {
        if (!hasClass(email.parentNode, 'error')) {
            addClass(email.parentNode, 'error');
            if (email.parentNode.childElementCount == 1) {
                var p = document.createElement('p');
                p.innerHTML = "El correo electronico ingresado no es valido.";
                email.parentNode.appendChild(p);
            }
        }
    } else {
        if (hasClass(email.parentNode, 'error')) {
            removeClass(email.parentNode, 'error');
            if (email.parentNode.childElementCount == 2) {
                email.parentNode.removeChild(email.parentNode.children[1])
            }
        }
    }
    
    // Validate empty fields
    var fields = [username, surname, phone];
    for (i = 0; i < 3; i++) {
        if (!fields[i].value) {
            if (!hasClass(fields[i].parentNode, 'error')) {
                addClass(fields[i].parentNode, 'error');
                if (fields[i].parentNode.childElementCount == 1) {
                    var p = document.createElement('p');
                    p.innerHTML = "Este campo no puede estar en blanco.";
                    fields[i].parentNode.appendChild(p);
                }
            }
        } else {
            if (hasClass(fields[i].parentNode, 'error')) {
                removeClass(fields[i].parentNode, 'error');
                if (fields[i].parentNode.childElementCount == 2) {
                    fields[i].parentNode.removeChild(fields[i].parentNode.children[1])
                }
            }
        }
    }
    
    
    
    e.preventDefault();
}
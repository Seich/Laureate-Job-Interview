/*
 *   __  ____        ______  ____  
 *  |  \/  \ \      / /  _ \/ ___| 
 *  | |\/| |\ \ /\ / /| |_) \___ \ 
 *  | |  | | \ V  V / |  __/ ___) |
 *  |_|  |_|  \_/\_/  |_|   |____/ 
 *  Martian Wabbit Productions (c) All Rights Reserved 2012.
 *
 */

(function(){
    var email = document.getElementById('email');
    var username = document.getElementById('name');
    var surname = document.getElementById('surname');
    var password = document.getElementById('password');
    var password2 = document.getElementById('password2');
    var phone = document.getElementById('phone');
    var submitButton = document.getElementById('submit');
    
    function addClass(elem, className) {
        if (!hasClass(elem, className)) {
            elem.className += ' ' + className;
            elem.className = trim(elem.className);   
        }
    }
    
    function removeClass(elem, className) {
        if (hasClass(elem, className)) {
            var regex = new RegExp('(\\s|^)' + className + '(\\s|$)');
            elem.className = elem.className.replace(regex, ' ');
            elem.className = trim(elem.className);
        }
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
    
    function addMessage(elem, msg) {
        if (elem.parentNode.childElementCount == 1) {
            var p = document.createElement('p');
            p.innerHTML = msg;
            elem.parentNode.appendChild(p);
        }
    }
    
    function removeMessage(elem) {
        if (elem.parentNode.childElementCount == 2) {
            elem.parentNode.removeChild(elem.parentNode.children[1])
        }
    }
    
    if (document.addEventListener) {
        submitButton.addEventListener('click', formSubmit, false);
    } else {
        submitButton.attachEvent('onclick', formSubmit, false);
    }
    
    function formSubmit(e) {
        e.preventDefault();
        
        // Validate Email.
        var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regex.test(email.value)) {
            addClass(email.parentNode, 'error');
            addMessage(email, 'El correo electronico ingresado no es valido.');
        } else {
            removeClass(email.parentNode, 'error');
            removeMessage(email);
        }
        
        // Validate empty fields
        var fields = [username, surname, phone, password, password2];
        for (i = 0; i < 5; i++) {
            if (!fields[i].value) {
                addClass(fields[i].parentNode, 'error');
                addMessage(fields[i], 'Este campo no puede estar en blanco');
            } else {
                removeClass(fields[i].parentNode, 'error');
                removeMessage(fields[i]);
            }
        }
        
        if (!password.value) return;
        
        // Validate password fields
        if (password.value != password2.value) {
            addClass(password.parentNode, 'error');
            addMessage(password, 'Las contraseñas no concuerdan.');
            addClass(password2.parentNode, 'error');
            addMessage(password2, 'Las contraseñas no concuerdan.');
        } else {
            removeClass(password, 'error');
            removeMessage(password);
            removeClass(password2, 'error');        
            removeMessage(password2);
        }
        
        if (document.getElementsByClassName('error').length == 0) {
            alert("Se ha registrado exitosamente.");
        }    
    }
})();
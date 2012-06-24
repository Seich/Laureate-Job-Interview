function element(id) {
    return {
        elem: document.getElementById(id),
        value: function(v) {
            if (v == null) {
                return this.elem.value;
            } else {
                this.elem.value = v;
            }
        },
        click: function(f) {
            if (document.addEventListener) {
                this.elem.addEventListener('click', f, false);
            } else {
                this.elem.attachEvent('onclick', f, false);
            }
        }
    }
}

var email = new element('email');
var name = new element('name');
var surname = new element('surname');
var password = new element('password');
var password2 = new element('password2');
var phone = new element('phone');
var submitButton = new element('submit');

submitButton.click(formSubmit);

function formSubmit(e) {
    e.preventDefault();
    console.log(e)
}
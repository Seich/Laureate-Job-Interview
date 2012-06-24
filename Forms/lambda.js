// Constructor
var lambda = function(id) {
    if (this instanceof lambda) {
        this.elem = document.getElementById(id);    
    } else {
        return new lambda(id);
    }
    
 }

// Instance Methods
lambda.prototype = {
    value: function(val) {
        if (val == null) {
            return this.elem.value;
        } else {
            this.elem.value = val;
        }
    },
    click: function(callback) {
        if (document.addEventListener) {
            this.elem.addEventListener('click', callback, false);
        } else {
            this.elem.attachEvent('onclick', callback, false);
        }
    },
    addClass: function(className) {
        if (!this.hasClass(className)) {
            this.elem.className += ' ' + className;
            this.elem.className = lambda.trim(this.elem.className);
        }
        return this;
    },
    removeClass: function(className) {
        if (this.hasClass(className)) {
            var regex = new RegExp('(\\s|^)' + className + '(\\s|$)');
            this.elem.className = this.elem.className.replace(regex, ' ');
            this.elem.className = lambda.trim(this.elem.className);
        }
        return this;
    },
    hasClass: function(className) {
        return this.elem.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)')) != null;
    }
}

// Static methods.
lambda.trim = function (str) {
    var	str = str.replace(/^\s\s*/, ''),
        ws = /\s/,
    	i = str.length;
    while (ws.test(str.charAt(--i)));
        return str.slice(0, i + 1);
}
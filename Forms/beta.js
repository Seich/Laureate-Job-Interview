var beta = {
    addClassIfEmpty: function(elem, className) {
        if (!elem.value()) {
    		elem.addClass(className);
    		return true;
    	} else {
        	elem.removeClass(className);
        	return false;
    	}
    },
    addClassIfNotValid: function(type, elem, className) {
        if (type == 'email') {
            // Check if the email matches the given pattern.
            var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!regex.test(elem.value())) {                
                elem.addClass(className);
                return true;
            } else {
                elem.removeClass(className);
                return false;
            }
        }
    },
    addClassIfNotEqual: function(elem, elem2, className) {
        if (elem.value() != elem2.value()) {
            elem.addClass(className);
            elem2.addClass(className);
            return true;
        } else {
            elem.removeClass(className);
            elem2.removeClass(className);
            return false;
        }
    }
};
var beta = {};

beta.addClassIfEmpty = function(elem, className) {
    if (!elem.value()) {
		elem.addClass(className);
	} else {
    	elem.removeClass(className);
	}
}

beta.addClassIfNotValid = function(type, elem, className) {
    if (type == 'email') {
        var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!regex.test(elem.value())) {
                elem.addClass(className);
            } else {
                elem.removeClass(className);
            }
    }
}
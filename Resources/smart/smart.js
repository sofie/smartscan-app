var Smart = {
	datetime: {},
    ui: {},
    navGroup: undefined
};

(function() {
	Smart.extend = function(obj) {
	    var args = Array.prototype.slice.call(arguments, 1);
	    for (var i = 0; i < args.length; i++) {
	    	var source = args[i];
	      	for (var prop in source) {
	        	if (source[prop] !== void 0) obj[prop] = source[prop];
	      	}
	    }
	    return obj;
	};
	
	Smart.cleanSpecialChars = function(str) {
  		if (str == null) {
    		return '';
  		}
  		if (typeof str === 'string') {
    		return  str
      			.replace(/&quot;/g,'"')
      			.replace(/\&amp\;/g,"&")
      			.replace(/&lt;/g,"<")
      			.replace(/&gt;/g,">")
      			.replace(/&#039;/g, "'");
  		}
  		return '';
	};
	
})();
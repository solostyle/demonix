document.title = 'Prototype for integrating demographics';

this.Demonix = this.Demonix || function () {
	// private vars

	// private functions
	
	// public object

	return {};
}();


// Useful Utilities
//
// Array Remove - By John Resig (MIT Licensed)
Array.remove = function(array, from, to) {
  var rest = array.slice((to || from) + 1 || array.length);
  array.length = from < 0 ? array.length + from : from;
  return array.push.apply(array, rest);
};


// Call stuff here to start things
//this.Demonix.something();


// because I'm lazy
jQuery('a').attr('href', '#');
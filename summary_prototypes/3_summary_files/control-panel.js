jQuery('body')
.append('<div id="controlpanel"></div>')
.find('#controlpanel')
.append('<h1>Summary Appearance</h1>')
.append('<ul></ul>')
.find('ul')
.append('<li><input type="checkbox" id="cpTwoLine" checked="checked"><label for="cpTwoLine">Two Lines</label></li>')
.append('<li><input type="checkbox" id="cpLong"><label for="cpLong">Long Search</label></li>');
/*.append('<li><input type="checkbox" id="chkbx" checked="checked"><label for="chkbx">Checkbox</label></li>')
.append('<li><input type="checkbox" id="wideMenu" checked="checked"><label for="wideMenu">Wide menu</label></li>')
.end()
.append('<h1>Filters Behavior</h1>')
.append('<ul></ul>')
.find('ul:last-child')
.append('<li><input type="checkbox" id="shuffleBhvr"><label for="shuffleBhvr">Shuffle</label></li>')
.end()
.append('<ul id="shuffleMenu"></ul>')
.find('ul:last-child')
.append('<li><input type="radio" name="shuffleType" checked="checked" id="hiding"><label for="hiding">By hiding</label></li>')
.append('<li><input type="radio" name="shuffleType" id="disabling"><label for="disabling">By disabling</label></li>')
.append('<li><input type="checkbox" id="keepHeaders"><label for="keepHeaders">Keep headers</label></li>');
*/

jQuery('#cpTwoLine').bind('click', function() {
	if (jQuery(this).filter(':checked').length) {
		$('<br>').insertAfter('#headerJobTitle');
	} else {
		$('#headerJobTitle').next().remove('br');
	}
});

jQuery('#cpLong').bind('click', function() {
	if (jQuery(this).filter(':checked').length) {
		$('#headerJobTitle').html('"Web Developer" or "Java Developer" or "Software Engineer" or "Computer Systems Analyst" or "C++ Developer" or "Programmer"');
	} else {
		$('#headerJobTitle').html('"Web Developer"');
	}
});
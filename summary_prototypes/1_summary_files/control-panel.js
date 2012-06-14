jQuery('body')
.append('<div id="controlpanel"></div>')
.find('#controlpanel')
.append('<h1>Summary Toolbar Header</h1>')
.append('<ul></ul>')
.find('ul')
.append('<li><input type="checkbox" id="cpTwoLine"><label for="cpTwoLine">Two Lines</label></li>')
.append('<li><input type="checkbox" id="cpLong"><label for="cpLong">Long Search</label></li>')
.append('<li><input type="checkbox" id="cpSwap"><label for="cpSwap">Swap Text</label></li>');
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
		if (jQuery('#cpSwap').filter(':checked').length) {
		} else {
			$('#toolbar').css('height','46px');
			$('#toolbar>div').css('height','46px');
			$('#compLinkHeader,#exportHeader,#helpHeader').css('padding','14px 10px');
			$('#compLinkHeader').css('padding','14px 10px 14px 20px');
			$('#compLinkHeader').css('background-position','3px 13px');
			$('#toolbarHeaderOuter').css('padding-top','5px');
			$('#toolbar').find('h1').css('font-size','14px');
			$('#toolbar').find('.headerJobTitle').css('font-size','16px');
		}
		$('<br>').insertAfter('.headerJobTitle');
	} else {
		$('#toolbar,#toolbar>div,#compLinkHeader,#exportHeader,#helpHeader,#compLinkHeader,#toolbarHeaderOuter,#headerJobTitle,#toolbar h1').removeAttr('style');
		$('.headerJobTitle').next().remove('br');
	}
});

jQuery('#cpLong').bind('click', function() {
	if (jQuery(this).filter(':checked').length) {
		$('#toolbar').find('.headerJobTitle').html('"Web Developer" or "Java Developer" or "Software Engineer" or "Computer Systems Analyst" or "C++ Developer" or "Programmer"');
		jQuery('#toolbarHeaderOuter').width('525px');
	} else {
		$('#toolbar').find('.headerJobTitle').html('"Web Developer"');
	}
});

jQuery('#cpSwap').bind('click', function() {
	if (jQuery(this).filter(':checked').length) {
		Prototypes.saveHeader(jQuery('#toolbar').find('h1').html());
		jQuery('#toolbar').find('h1').html('Overview').css({'font-size':'16px','color':'white'});
		jQuery('#searchTerms').html(Prototypes.retrieveHeader()).show();
	} else {
		jQuery('#toolbar').find('h1').html(Prototypes.retrieveHeader());
		jQuery('#searchTerms').hide();
	}
});
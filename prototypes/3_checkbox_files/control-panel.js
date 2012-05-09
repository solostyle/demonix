jQuery('body')
.append('<div id="controlpanel" style="position:fixed;top:0;right:0;background-color:rgba(250,250,250,.5)"></div>')
.find('#controlpanel')
.append('<p><input type="checkbox" id="numOnRight"><label for="numOnRight">Numbers on right</label></p>');

jQuery('#numOnRight').click( function() {
	if (jQuery('#numOnRight').attr('checked') == 'checked') {
		jQuery('.facetCountSupplyWrapper').each(function() {
			jQuery(this).insertAfter(jQuery(this).next('.filterCheckboxWrapper'));
		});
	} else {
		jQuery('.facetCountSupplyWrapper').each(function() {
			jQuery(this).insertBefore(jQuery(this).prev('.filterCheckboxWrapper'));
		});
	}
});
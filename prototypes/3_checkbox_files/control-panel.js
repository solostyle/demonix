jQuery('body')
.append('<div id="controlpanel" style="position:fixed;top:0;right:0;background-color:rgba(250,250,250,.5)"></div>')
.find('#controlpanel')
.append('<p><input type="checkbox" id="numOnRight"><label for="numOnRight">Numbers on right</label></p>');

jQuery('#numOnRight').click( function() {
	if (jQuery('#numOnRight').attr('checked') == 'checked') {
		jQuery('.facetCountSupplyWrapper').each(function() {
			jQuery(this).insertAfter(jQuery(this).next('.filterCheckboxWrapper'));
			if (jQuery(this).next('.facetCountDemandWrapper').length > 0) {
				jQuery(this).find('span').html(jQuery(this).find('span').html().split(')')[0]);
				jQuery(this).next('.facetCountDemandWrapper').find('span').html(jQuery(this).next('.facetCountDemandWrapper').find('span').html().split('(')[1]);
			}
		});
	} else {
		jQuery('.facetCountSupplyWrapper').each(function() {
			jQuery(this).insertBefore(jQuery(this).prev('.filterCheckboxWrapper'));
			if (jQuery(this).next().next('.facetCountDemandWrapper').length > 0) {
				jQuery(this).find('span').html( jQuery(this).find('span').html() + ')' );
				jQuery(this).next().next('.facetCountDemandWrapper').find('span').html( '(' + jQuery(this).next().next('.facetCountDemandWrapper').find('span').html() );
			}
		});
	}
});
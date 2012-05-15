jQuery('body')
.append('<div id="controlpanel" style="position:fixed;top:0;right:0;background-color:rgba(250,250,250,.5)"></div>')
.find('#controlpanel')
.append('<ul style="padding:0;list-style:none"></ul>')
.find('ul')
.append('<li><input type="checkbox" id="numOnRight"><label for="numOnRight">Numbers on right</label></li>')
.append('<li><input type="checkbox" id="noParens"><label for="noParens">No parentheses</label></li>');

jQuery('#numOnRight').click( function moveNumbersToRight() {
	if (jQuery('#numOnRight').attr('checked') == 'checked') {
		jQuery('.facetCountSupplyWrapper').each(function() {
			jQuery(this).insertAfter(jQuery(this).next('.filterCheckboxWrapper'));
			if (jQuery(this).next('.facetCountDemandWrapper').length > 0) {
				jQuery(this).find('span').html(jQuery(this).find('span').html().split(')')[0]);
				jQuery(this).next('.facetCountDemandWrapper').find('span').html(jQuery(this).next('.facetCountDemandWrapper').find('span').html().split('(')[1]);
			}
		});
	} else {
		if (jQuery('#noParens').attr('checked') == 'checked') {
			jQuery('.facetCountSupplyWrapper').each(function() {
				jQuery(this).insertBefore(jQuery(this).prev('.filterCheckboxWrapper'));
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
	}
});

jQuery('#noParens').click( function removeParens() {
	if (jQuery('#noParens').attr('checked') == 'checked') {
		jQuery('.facetCountSupply, .facetCountDemand').each(function() {
			jQuery(this).html( jQuery(this).html().replace(/[\(\)]/g, "") );
			//jQuery(this).html( jQuery(this).html().replace(")", "", "g") );
		});
	} else {
		if (jQuery('#numOnRight').attr('checked') == 'checked') {
			// only put the beginning parens back. if there is no sibling after, put both parens back
			jQuery('.facetCountSupplyWrapper').each(function() {
				jQuery(this).find('span').html( jQuery(this).find('span').html().replace(/^([0-9,]+)/g, '($1') );
				if (jQuery(this).next().length == 0) {
					jQuery(this).find('span').html( jQuery(this).find('span').html().replace(/([0-9,]+)$/g, '$1)') );
				}
			});
			// only put the ending parens back. if there is no Supply sibling before, put both parens back
			jQuery('.facetCountDemandWrapper').each(function() {
				jQuery(this).find('span').html( jQuery(this).find('span').html().replace(/([0-9,]+)$/g, '$1)') );
				if (jQuery(this).prev('.facetCountSupplyWrapper').length == 0) {
					jQuery(this).find('span').html( jQuery(this).find('span').html().replace(/^([0-9,]+)/g, '($1') );
				}
			});
		} else {
		// put all the parens back
			jQuery('.facetCountSupplyWrapper, .facetCountDemandWrapper').each(function() {
				jQuery(this).find('span').html( jQuery(this).find('span').html().replace(/^([0-9,]+)$/g, '($1)') );
			});
		}
	}
});

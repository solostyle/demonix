jQuery('body')
.append('<div id="controlpanel" style="position:fixed;top:0;right:0;background-color:rgba(250,250,250,.7);border-radius:7px;font:normal normal 12px/16px arial,sans-serif"></div>')
.find('#controlpanel')
.append('<ul style="padding:0;margin:5px;list-style:none"></ul>')
.find('ul')
.append('<li><input type="checkbox" id="numOnRight" checked="checked"><label for="numOnRight">Numbers on right</label></li>')
.append('<li><input type="checkbox" id="noParens" checked="checked"><label for="noParens">No parentheses</label></li>')
.append('<li><input type="checkbox" id="chkbx" checked="checked"><label for="chkbx">Checkbox</label></li>');


jQuery('#numOnRight').click( function moveNumbersToRight() {
	if (jQuery(this).filter(':checked').length) {
		jQuery('.facetCountSupplyWrapper').each(function() {
			jQuery(this).insertAfter(jQuery(this).next('.filterCheckboxWrapper'));
			if (jQuery(this).next('.facetCountDemandWrapper').length > 0) {
				jQuery(this).find('span').html(jQuery(this).find('span').html().split(')')[0]);
				jQuery(this).next('.facetCountDemandWrapper').find('span').html(jQuery(this).next('.facetCountDemandWrapper').find('span').html().split('(')[1]);
			}
		});
	} else {
		if (jQuery('#noParens').filter(':checked').length) {
			jQuery('.facetCountSupplyWrapper').each(function() {
				jQuery(this).insertBefore(jQuery(this).prev('.filterCheckboxWrapper'));
			});
		} else {
			jQuery('.facetCountSupplyWrapper').each(function() {
				jQuery(this).insertBefore(jQuery(this).prev('.filterCheckboxWrapper'));
				if (jQuery(this).next().next('.facetCountDemandWrapper').length > 0) {
					jQuery(this).find('span').html( jQuery(this).find('span').html().replace(/([0-9,]+)$/g, '$1)') );
					jQuery(this).next().next('.facetCountDemandWrapper').find('span').html( jQuery(this).next().next('.facetCountDemandWrapper').find('span').html().replace(/^([0-9,]+)/g, '($1') );
				}
			});
		}
	}
});

jQuery('#noParens').click( function removeParens() {
	if (jQuery(this).filter(':checked').length) {
		jQuery('.facetCountSupply, .facetCountDemand').each(function() {
			jQuery(this).html( jQuery(this).html().replace(/[\(\)]/g, "") );
			//jQuery(this).html( jQuery(this).html().replace(")", "", "g") );
		});
	} else {
		if (jQuery('#numOnRight').filter(':checked').length) {
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

jQuery('#chkbx').click( function addCheckbox() {
	if (jQuery(this).filter(':checked').length) {
		// Re-align the facet number titles to the right
		jQuery('.facetNumberTitle .facetCountSupplyWrapper').css('margin-left','14px');
		// Widen the left pane
		jQuery('.facet-ui').width( jQuery('.facet-ui').width() + 14 );
		
		// Add the checkbox
		jQuery('#facetsSupply .facets>li>div:last-child ul, #facetsBoth .facets>li>div:last-child ul, #facetsDemand .facets>li>div:last-child ul').each(function insert() {
			var facet = jQuery(this).parent().attr('id'),
			section = jQuery(this).parents().eq(4).attr('id').split('facets')[1];
	
			jQuery(this)
			.children()
			.each(function () {
				jQuery(this).prepend('<div class="facetCheckbox"><input id="chkbx_'+facet+'_'+jQuery(this).find('.filterCheckboxWrapper').html().replace(/\s/g,"").replace(/(<b>)/g,"").replace(/(<\/b>)/g,"")+'_'+section+'" type="checkbox" /></div>');
			});
		});
	
		// Check the selected checkbox
		jQuery('#AllFilters li.selected').find(':checkbox').attr('checked', 'checked');
		
	} else {
		// remove checkboxes
		jQuery('#AllFilters .facetCheckbox').remove();
		// Re-align the facet number titles to the left
		jQuery('.facetNumberTitle .facetCountSupplyWrapper').css('margin-left','0');
		// Make the width of the left pane narrower
		jQuery('.facet-ui').width( jQuery('.facet-ui').width() - 14 );
	}
});

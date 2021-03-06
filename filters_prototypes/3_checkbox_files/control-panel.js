jQuery('body')
.append('<div id="controlpanel"></div>')
.find('#controlpanel')
.append('<h1>Filters Appearance</h1>')
.append('<ul></ul>')
.find('ul')
.append('<li><input type="checkbox" id="noNum"><label for="noNum">No numbers</label></li>')
.append('<li><input type="checkbox" id="numOnRight" checked="checked"><label for="numOnRight">Numbers on right</label></li>')
.append('<li><input type="checkbox" id="noParens" checked="checked"><label for="noParens">No parentheses</label></li>')
.append('<li><input type="checkbox" id="chkbx" checked="checked"><label for="chkbx">Checkbox</label></li>')
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


jQuery('#noNum').click( function removeNumbers() {
	if (jQuery(this).filter(':checked').length) {
		jQuery('.facetCountSupplyWrapper, .facetCountDemandWrapper').hide();
		// change the width
		Prototypes.changeFilterLabelWidth();
	} else {
		jQuery('.facetCountSupplyWrapper, .facetCountDemandWrapper').show();
		// change the width
		Prototypes.changeFilterLabelWidth();
	}
});

jQuery('#numOnRight').click( function moveNumbersToRight() {
	if (jQuery(this).filter(':checked').length) {
		jQuery('.facetCountSupplyWrapper').each(function() {
			jQuery(this).insertAfter(jQuery(this).next('.filterCheckboxWrapper'));
			if (jQuery(this).next('.facetCountDemandWrapper').length > 0) {
				jQuery(this).find('span').html(jQuery(this).find('span').html().replace(')',''));
				jQuery(this).next('.facetCountDemandWrapper').find('span').html(jQuery(this).next('.facetCountDemandWrapper').find('span').html().replace('(',''));
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
					jQuery(this).find('span').html( jQuery(this).find('span').html().replace(/([0-9,]+)/g, '$1)') );
					jQuery(this).next().next('.facetCountDemandWrapper').find('span').html( jQuery(this).next().next('.facetCountDemandWrapper').find('span').html().replace(/([0-9,]+)/g, '($1') );
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
				jQuery(this).find('span').html( jQuery(this).find('span').html().replace(/([0-9,]+)/g, '($1') );
				if (jQuery(this).next().length == 0) {
					jQuery(this).find('span').html( jQuery(this).find('span').html().replace(/([0-9,]+)/g, '$1)') );
				}
			});
			// only put the ending parens back. if there is no Supply sibling before, put both parens back
			jQuery('.facetCountDemandWrapper').each(function() {
				jQuery(this).find('span').html( jQuery(this).find('span').html().replace(/([0-9,]+)/g, '$1)') );
				if (jQuery(this).prev('.facetCountSupplyWrapper').length == 0) {
					jQuery(this).find('span').html( jQuery(this).find('span').html().replace(/([0-9,]+)/g, '($1') );
				}
			});
		} else {
		// put all the parens back
			jQuery('.facetCountSupplyWrapper, .facetCountDemandWrapper').each(function() {
				jQuery(this).find('span').html( jQuery(this).find('span').html().replace(/([0-9,]+)/g, '($1)') );
			});
		}
	}
});

jQuery('#chkbx').click( function addCheckbox() {
	if (jQuery(this).filter(':checked').length) {
		// Re-align the facet number titles to the right
		jQuery('.facetNumberTitle .facetCountSupplyWrapper, #facetsDemand .facetNumberTitle .facetCountDemandWrapper').css('margin-left','14px');
		
		// adjust the widths
		Prototypes.changeFilterLabelWidth();		
		
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
		
		// Re-align the facet number titles to the left (inefficient)
		jQuery('.facetNumberTitle .facetCountSupplyWrapper, #facetsDemand .facetNumberTitle .facetCountDemandWrapper').css('margin-left','0');
		
		// adjust the widths
		Prototypes.changeFilterLabelWidth();
	}
});

jQuery('#wideMenu').click( function widenMenu() {
	// adjust the width of the page
	Prototypes.changePageWidth();
	
	// adjust the width of the checkboxwrapper guy, the filter label
	Prototypes.changeFilterLabelWidth();
});

jQuery('#shuffleBhvr').click( function shuffle(event, force) {
	if (jQuery(this).filter(':checked').length || force) {
		// show the shuffle menu
		jQuery('#shuffleMenu').show();
			
		// change appearance of the filters
		Prototypes.shuffleWhenShuffleOptionSelected();
		// open supply and demand filters only when switching options, not when switching tabs
		jQuery('#facetsDemand, #facetsSupply').show();
		
		// bind click events for tabs
		Prototypes.bindTabClickForShuffle();
		
		// show or hide the keep headers option
		Prototypes.showOrHideKeepHeadersOption();
		// show or hide the headers based on this option
		Prototypes.showOrHideHeaders();
		
		// decide whether to bind or unbind autocollapse events
		Prototypes.unbindHeaderClickAutocollapse();
		if (jQuery('#shuffleBhvr').filter(':checked').length
			&& jQuery('#disabling').filter(':checked').length
			&& jQuery('#keepHeaders').filter(':checked').length
			&& !jQuery('#keepHeaders').filter(':disabled').length) {
		} else Prototypes.bindHeaderClickAutocollapse();
		
	} else {
		// undo all the above
		// hide the shuffle menu
		jQuery('#shuffleMenu').hide();
		
		// change appearance of filters
		Prototypes.unshuffleWhenShuffleOptionSelected();
		
		// unbind click events for tabs, both hiding and disabling
		Prototypes.unbindTabClickForShuffle();
		
		// decide whether to bind or unbind autocollapse events
		Prototypes.unbindHeaderClickAutocollapse();
		if (jQuery('#shuffleBhvr').filter(':checked').length
			&& jQuery('#disabling').filter(':checked').length
			&& jQuery('#keepHeaders').filter(':checked').length
			&& !jQuery('#keepHeaders').filter(':disabled').length) {
		} else Prototypes.bindHeaderClickAutocollapse();
	}
});

jQuery('#disabling, #hiding').click( function shuffleBy() {
	// unbind click events for tabs, both hiding and disabling
	Prototypes.unbindTabClickForShuffle();
	
	// bind the pertaining events only
	Prototypes.bindTabClickForShuffle();
	
	// change appearance of the filters now
	Prototypes.unshuffleWhenShuffleOptionSelected();
	Prototypes.shuffleWhenShuffleOptionSelected();
	// open supply and demand filters only when switching options, not when switching tabs
	jQuery('#facetsDemand, #facetsSupply').show();

	// show or hide the keep headers option
	Prototypes.showOrHideKeepHeadersOption();
	// show or hide the headers based on this option
	Prototypes.showOrHideHeaders();

	// decide whether to bind or unbind autocollapse events
	Prototypes.unbindHeaderClickAutocollapse();
	if (jQuery('#shuffleBhvr').filter(':checked').length
		&& jQuery('#disabling').filter(':checked').length
		&& jQuery('#keepHeaders').filter(':checked').length
		&& !jQuery('#keepHeaders').filter(':disabled').length) {
	} else Prototypes.bindHeaderClickAutocollapse();
});

jQuery('#keepHeaders').click( function keepHeaders() {
	Prototypes.showOrHideHeaders();
	
	// decide whether to bind or unbind autocollapse events
	Prototypes.unbindHeaderClickAutocollapse();
	if (jQuery('#shuffleBhvr').filter(':checked').length
		&& jQuery('#disabling').filter(':checked').length
		&& jQuery('#keepHeaders').filter(':checked').length
		&& !jQuery('#keepHeaders').filter(':disabled').length) {
	} else Prototypes.bindHeaderClickAutocollapse();
});


// Do these things by default
// Check the Shuffle box, run the code to shuffle
jQuery('#shuffleBhvr').trigger('click', [true]);
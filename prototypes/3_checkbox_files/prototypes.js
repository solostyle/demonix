this.Prototypes = this.Prototypes || function() {
	
	var shuffleDemand = function() {
		jQuery('#facetsSupplyHeader, #facetsDemandHeader, #facetsSupply').hide();
		jQuery('#facetsBoth').css({'border-bottom':'0','border-radius':'0','display':'block','padding-bottom':'0'});
		jQuery('#facetsDemand').show();
	},
	shuffleSupply = function() {
		jQuery('#facetsSupplyHeader, #facetsDemandHeader, #facetsDemand').hide();
		jQuery('#facetsBoth').css({'border-bottom':'0','border-radius':'0','display':'block','padding-bottom':'0'});
		jQuery('#facetsSupply').show();
	},
	shuffleBoth = function() {
		jQuery('#facetsSupplyHeader, #facetsSupply, #facetsDemandHeader, #facetsDemand').hide();
	},
	/* Update the Summary Box numbers based on the selected filters.
	 * This code runs whenever a filter is applied or unapplied.
	 * Called from checkbox.js
	 */
	updateSummary = function() {
		// gather all the selected filters
		var slctd = jQuery('#AllFilters').find('li.selected'),supplySum=0, demandSum=0;
		// add up the supply and demand counts

		if (jQuery(slctd).length) {
			jQuery(slctd).find('.facetCountSupply').each(function() {
				supplySum += parseInt(jQuery(this).html().replace(/\D/g,''));
			});
			jQuery(slctd).find('.facetCountDemand').each(function() {
				demandSum += parseInt(jQuery(this).html().replace(/\D/g,''));
			});
		} else {
			// nothing is selected. auto select "all"
			// jQuery('#AllFilters').find('.facets').find('ul').find('li:first-child').each(function() {
				// jQuery(this).addClass('selected');
			// });
		}
		
		// replace the summary counts
		jQuery('#lblActiveSupply').html( addCommas(supplySum.toString()) );
		jQuery('#lblJobCount').html( addCommas(demandSum.toString()) );
		// if something is zero, make sure this is zero
		if (!supplySum) {
			jQuery('#lblActiveLaborPressure').html('0');
		} else {
			jQuery('#lblActiveLaborPressure').html( (supplySum/demandSum).toFixed(2) );
		}
	},
	changeWidth = function() {
		if (jQuery('#noNum').filter(':checked').length
			&& jQuery('#chkbx').filter(':checked').length
			&& !jQuery('#wideMenu').filter(':checked').length) {
			jQuery('.filterCheckboxWrapper').css('width','163px'); //non wide menu, checkbox, no numbers
		}
		if (jQuery('#noNum').filter(':checked').length
			&& jQuery('#chkbx').filter(':checked').length
			&& jQuery('#wideMenu').filter(':checked').length) {
			jQuery('.filterCheckboxWrapper').css('width','213px'); //wide menu, checkbox, no numbers
		}
		if (jQuery('#noNum').filter(':checked').length
			&& !jQuery('#chkbx').filter(':checked').length
			&& !jQuery('#wideMenu').filter(':checked').length) {
			jQuery('.filterCheckboxWrapper').css('width','177px'); //non wide menu, no checkbox, no numbers
		}
		if (jQuery('#noNum').filter(':checked').length
			&& !jQuery('#chkbx').filter(':checked').length
			&& jQuery('#wideMenu').filter(':checked').length) {
			jQuery('.filterCheckboxWrapper').css('width','227px'); //wide menu, no checkbox, no numbers
		}
		if (!jQuery('#noNum').filter(':checked').length
			&& jQuery('#chkbx').filter(':checked').length
			&& !jQuery('#wideMenu').filter(':checked').length) {
			jQuery('.filterCheckboxWrapper').width( '73px' );
			jQuery('#facetsSupply .filterCheckboxWrapper, #facetsDemand .filterCheckboxWrapper').width( '117px' ); //non wide menu, checkbox, numbers
		}
		if (!jQuery('#noNum').filter(':checked').length
			&& jQuery('#chkbx').filter(':checked').length
			&& jQuery('#wideMenu').filter(':checked').length) {
			jQuery('.filterCheckboxWrapper').width( '113px' );
			jQuery('#facetsSupply .filterCheckboxWrapper, #facetsDemand .filterCheckboxWrapper').width( '160px' ); //wide menu, checkbox, numbers
		}
		if (!jQuery('#noNum').filter(':checked').length
			&& !jQuery('#chkbx').filter(':checked').length
			&& !jQuery('#wideMenu').filter(':checked').length) {
			jQuery('.filterCheckboxWrapper').width( '87px' );
			jQuery('#facetsSupply .filterCheckboxWrapper, #facetsDemand .filterCheckboxWrapper').width( '131px' ); //non wide menu, no checkbox, numbers
		}
		if (!jQuery('#noNum').filter(':checked').length
			&& !jQuery('#chkbx').filter(':checked').length
			&& jQuery('#wideMenu').filter(':checked').length) {
			jQuery('.filterCheckboxWrapper').width( '127px' );
			jQuery('#facetsSupply .filterCheckboxWrapper, #facetsDemand .filterCheckboxWrapper').width( '174px' ); //wide menu, no checkbox, numbers
		}
	};
	
	var addCommas = function (nStr) {
		nStr += '';
		var x = nStr.split('.'),
			x1 = x[0],
			x2 = x.length > 1 ? '.' + x[1] : '',
			rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	};
	
	return {
		updateSummary: updateSummary,
		shuffleDemand: shuffleDemand,
		shuffleSupply: shuffleSupply,
		shuffleBoth: shuffleBoth,
		changeWidth: changeWidth
	};

}();
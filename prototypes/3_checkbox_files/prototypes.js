this.Prototypes = this.Prototypes || function() {
	
	/*********************************************************
	/*              Private functions
	/********************************************************/
	var shuffleDemandByHiding = function() {
		jQuery('#facetsSupplyHeader, #facetsDemandHeader, #facetsSupply').hide();
		jQuery('#facetsBoth').css({'border-bottom':'0','border-radius':'0','display':'block','padding-bottom':'0'});
		jQuery('#facetsDemand').show();
	},
	shuffleSupplyByHiding = function() {
		jQuery('#facetsSupplyHeader, #facetsDemandHeader, #facetsDemand').hide();
		jQuery('#facetsBoth').css({'border-bottom':'0','border-radius':'0','display':'block','padding-bottom':'0'});
		jQuery('#facetsSupply').show();
	},
	shuffleBothByHiding = function() {
		jQuery('#facetsSupplyHeader, #facetsSupply, #facetsDemandHeader, #facetsDemand').hide();
	},
	shuffleDemandByDisabling = function() {
		jQuery('#facetsSupplyHeader, #facetsDemandHeader').hide();
		jQuery('#facetsSupply').show().find('.facets').each( function() {
			jQuery(this).find('li').css('color','#ccc');
			jQuery(this).find('.headerText').css('color','#ccc');
		});
		jQuery('#facetsBoth, #facetsSupply').css({'border-bottom':'0','border-radius':'0','display':'block','padding-bottom':'0'});
		jQuery('#facetsDemand').show().find('.facets').each( function() {
			jQuery(this).find('li').removeAttr('style');
			jQuery(this).find('.headerText').removeAttr('style');
		});
	},
	shuffleSupplyByDisabling = function() {
		jQuery('#facetsSupplyHeader, #facetsDemandHeader').hide();
		jQuery('#facetsDemand').show().find('.facets').each( function() {
			jQuery(this).find('li').css('color','#ccc');
			jQuery(this).find('.headerText').css('color','#ccc');
		});
		jQuery('#facetsBoth, #facetsSupply').css({'border-bottom':'0','border-radius':'0','display':'block','padding-bottom':'0'});
		jQuery('#facetsSupply').show().find('.facets').each( function() {
			jQuery(this).find('li').removeAttr('style');
			jQuery(this).find('.headerText').removeAttr('style');
		});
	},
	shuffleBothByDisabling = function() {
		jQuery('#facetsSupplyHeader, #facetsDemandHeader').hide();
		jQuery('#facetsSupply, #facetsDemand').find('.facets').each( function() {
			jQuery(this).find('li').css('color','#ccc');
			jQuery(this).find('.headerText').css('color','#ccc');
		});
		jQuery('#facetsBoth, #facetsSupply').css({'border-bottom':'0','border-radius':'0','display':'block','padding-bottom':'0'});
		jQuery('#facetsSupply, #facetsDemand').show();
	};
	
	/*********************************************************
	/*              Public functions
	/********************************************************/
	var bindTabClickForShuffle = function() {
		if (jQuery('#hiding').filter(':checked').length) {
			jQuery('#SupplyView').bind('click', shuffleSupplyByHiding);
			jQuery('#DemandView').bind('click', shuffleDemandByHiding);
			jQuery('#LaborPressureView').bind('click', shuffleBothByHiding);
		}
		else {
			jQuery('#SupplyView').bind('click', shuffleSupplyByDisabling);
			jQuery('#DemandView').bind('click', shuffleDemandByDisabling);
			jQuery('#LaborPressureView').bind('click', shuffleBothByDisabling);
		}
	},
	unbindTabClickForShuffle = function() {
		jQuery('#SupplyView').unbind('click', shuffleSupplyByHiding);
		jQuery('#DemandView').unbind('click', shuffleDemandByHiding);
		jQuery('#LaborPressureView').unbind('click', shuffleBothByHiding);
		jQuery('#SupplyView').unbind('click', shuffleSupplyByDisabling);
		jQuery('#DemandView').unbind('click', shuffleDemandByDisabling);
		jQuery('#LaborPressureView').unbind('click', shuffleBothByDisabling);
	},
	shuffleWhenShuffleOptionSelected = function() {
		// rename the both header
		jQuery('#facetsBothHeader').html( 'Refine Your Search<'+jQuery('#facetsBothHeader').html().split(/<(.+)/)[1] );
		// shuffle based on what tab is selected
		if (jQuery('#SupplyView.selected').length) {
			if (jQuery('#hiding').filter(':checked').length) shuffleSupplyByHiding();
			else shuffleSupplyByDisabling();
			
		} else if (jQuery('#DemandView.selected').length) {
			if (jQuery('#hiding').filter(':checked').length) shuffleDemandByHiding();
			else shuffleDemandByDisabling();
			
		} else {
			if (jQuery('#hiding').filter(':checked').length) shuffleBothByHiding();
			else shuffleBothByDisabling();
		}	
	},
	unshuffleWhenShuffleOptionSelected = function() {
		// rename the both header
		jQuery('#facetsBothHeader').html( 'Supply &amp; Demand Filters<'+jQuery('#facetsBothHeader').html().split(/<(.+)/)[1] );
		// show the other headers
		jQuery('#facetsSupplyHeader, #facetsDemandHeader').show();
		// show filters for "both", hide other filters
		jQuery('#facetsSupply, #facetsDemand').hide();
		jQuery('#facetsBoth').show().removeAttr('style');
		// remove the disabled look, enable
		jQuery('#facetsDemand, #facetsSupply, #facetsBoth').find('.facets').each( function() {
			jQuery(this).find('li').removeAttr('style');
			jQuery(this).find('.headerText').removeAttr('style');
		});
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
	
	/*********************************************************
	/*              Utilities (private)
	/********************************************************/
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
		bindTabClickForShuffle: bindTabClickForShuffle,
		unbindTabClickForShuffle: unbindTabClickForShuffle,
		shuffleWhenShuffleOptionSelected: shuffleWhenShuffleOptionSelected,
		unshuffleWhenShuffleOptionSelected: unshuffleWhenShuffleOptionSelected,
		changeWidth: changeWidth
	};

}();
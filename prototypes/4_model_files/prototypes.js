this.Prototypes = this.Prototypes || function() {
	
	/*********************************************************
	/*              Private functions
	/********************************************************/
	var shuffleDemandByDisabling = function() {
		// checks if the show headers option is selected
		showOrHideHeaders();
		jQuery('#facetsSupply').find('.facets').each( function() {
			jQuery(this).find('li').css('color','#ccc');
			jQuery(this).find('.headerText').css('color','#ccc');
		});
		jQuery('#facetsBoth, #facetsSupply').css({'border-bottom':'0','border-radius':'0','padding-bottom':'0'});
		jQuery('#facetsDemand').find('.facets').each( function() {
			jQuery(this).find('li').removeAttr('style');
			jQuery(this).find('.headerText').removeAttr('style');
		});
	},
	shuffleSupplyByDisabling = function() {
		// checks if the show headers option is selected
		showOrHideHeaders();
		jQuery('#facetsDemand').find('.facets').each( function() {
			jQuery(this).find('li').css('color','#ccc');
			jQuery(this).find('.headerText').css('color','#ccc');
		});
		jQuery('#facetsBoth, #facetsSupply').css({'border-bottom':'0','border-radius':'0','padding-bottom':'0'});
		jQuery('#facetsSupply').find('.facets').each( function() {
			jQuery(this).find('li').removeAttr('style');
			jQuery(this).find('.headerText').removeAttr('style');
		});
	},
	shuffleBothByDisabling = function() {
		// checks if the show headers option is selected
		showOrHideHeaders();
		jQuery('#facetsSupply, #facetsDemand').find('.facets').each( function() {
			jQuery(this).find('li').removeAttr('style'); // used to be css('color','#ccc');
			jQuery(this).find('.headerText').removeAttr('style'); // used to be css('color','#ccc');
		});
		jQuery('#facetsBoth, #facetsSupply').css({'border-bottom':'0','border-radius':'0','padding-bottom':'0'});
		//jQuery('#facetsSupply, #facetsDemand').show();
	},
	collapseDemand = function() {
		jQuery('#facetsDemandHeader').next().slideToggle('slow', function() {
			// Animation complete
		});
		jQuery('#facetsDemandHeader span').toggle();
	},
	collapseSupply = function() {
		jQuery('#facetsSupplyHeader').next().slideToggle('slow', function() {
			// Animation complete
		});
		jQuery('#facetsSupplyHeader span').toggle();
	},
	collapseBoth = function() {
		jQuery('#facetsBothHeader').next().slideToggle('slow', function() {
			// Animation complete
		});
		jQuery('#facetsBothHeader span').toggle();
	};
	
	/*********************************************************
	/*              Public functions
	/********************************************************/
	var bindTabClickByDisabling = function() {
		jQuery('#SupplyView').bind('click', shuffleSupplyByDisabling);
		jQuery('#DemandView').bind('click', shuffleDemandByDisabling);
		jQuery('#LaborPressureView').bind('click', shuffleBothByDisabling);
	},
	bindHeaderClickCollapse = function() {
		jQuery('#facetsBothHeader').bind('click', collapseBoth);
		jQuery('#facetsSupplyHeader').bind('click', collapseSupply);
		jQuery('#facetsDemandHeader').bind('click', collapseDemand);
	},
	showHeaders = function() {
		jQuery('#facetsSupplyHeader, #facetsDemandHeader').show();
		// rename the both header
		jQuery('#facetsBothHeader').html( 'Supply &amp; Demand Filters<'+jQuery('#facetsBothHeader').html().split(/<(.+)/)[1] );
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
		bindHeaderClickCollapse: bindHeaderClickCollapse,
		bindHeaderClickAutocollapse: bindHeaderClickAutocollapse,
		unbindHeaderClickAutocollapse: unbindHeaderClickAutocollapse,
		shuffleWhenShuffleOptionSelected: shuffleWhenShuffleOptionSelected,
		unshuffleWhenShuffleOptionSelected: unshuffleWhenShuffleOptionSelected,
		showOrHideHeaders: showOrHideHeaders,
		showOrHideKeepHeadersOption: showOrHideKeepHeadersOption,
		changeFilterLabelWidth: changeFilterLabelWidth,
		changePageWidth: changePageWidth
	};

}();
// Toggle events on click
jQuery('#facetsBothHeader').click(function() {
	jQuery(this).next().slideToggle('slow', function() {
		// Animation complete
	});
	jQuery('#facetsSupply,#facetsDemand').toggle(false);
});

jQuery('#facetsSupplyHeader').click(function() {
	jQuery(this).next().slideToggle('slow', function() {
		// Animation complete
	});
	jQuery('#facetsBoth,#facetsDemand').toggle(false);
});
jQuery('#facetsDemandHeader').click(function() {
	jQuery(this).next().slideToggle('slow', function() {
		// Animation complete
	});
	jQuery('#facetsBoth,#facetsSupply').toggle(false);
});

// Close to begin with
jQuery('#facetsSupply,#facetsDemand,#newReport').toggle(false);

// Mouseover events
jQuery('#facetsBothHeader,#facetsSupplyHeader,#facetsDemandHeader,#newReportHeader').mouseover(function() {
	//if(console.log) {console.log(this);}
	jQuery(this).css('background',"url('ReportSummary_files/bg_jpTopNav-button.png') no-repeat scroll -2px -34px transparent");
	if (jQuery(this).next().css('display')=="none") {
		jQuery(this).append('<span style="float:right">+</span>');
	} else {
		jQuery(this).append('<span style="float:right;margin-top:-7px">_</span>');
	}
});
jQuery('#facetsBothHeader,#facetsSupplyHeader,#facetsDemandHeader,#newReportHeader').mouseout(function() {
	//if(console.log) {console.log(this);}
	jQuery(this).css('background','');
	jQuery(this).find('span').remove();
});
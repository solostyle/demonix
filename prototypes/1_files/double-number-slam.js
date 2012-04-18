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

jQuery(".facets li li").click(function() {
	jQuery(this).toggleClass("selected");
	jQuery("#searched-for").removeClass("inactive");
	
	var slctdWords = jQuery(this).find(".filterCheckboxWrapper").html();
	var searchFor = "<li><span>"+slctdWords+"</span></li>";
	var found = '';
	
	jQuery("#searched-for .searched-for-content ul li").each(function(i, el) {
		if (jQuery(el).html()=="<span>"+slctdWords+"</span>") {
			found = jQuery(el);
		}
	});
	
	if (found) {
		// if element exists, remove it
		found.remove();
		if (jQuery("#searched-for .searched-for-content ul").html()=="") {
			jQuery("#searched-for").addClass("inactive");
		}
	} else {
		jQuery("#searched-for .searched-for-content ul").append(searchFor);
	}
});

// Close to begin with
jQuery('#facetsSupply,#facetsDemand').toggle(false);

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
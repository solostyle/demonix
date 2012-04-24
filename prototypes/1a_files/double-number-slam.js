// Toggle events on click
jQuery('#facetsBothHeader').click(function() {
	jQuery(this).next().slideToggle('slow', function() {
		// Animation complete
	});
	jQuery('#facetsBothHeader span').toggle();
	jQuery('#facetsSupply,#facetsDemand').toggle(false);
});

jQuery('#facetsSupplyHeader').click(function() {
	jQuery(this).next().slideToggle('slow', function() {
		// Animation complete
	});
	jQuery('#facetsSupplyHeader span').toggle();
	jQuery('#facetsBoth,#facetsDemand').toggle(false);
});
jQuery('#facetsDemandHeader').click(function() {
	jQuery(this).next().slideToggle('slow', function() {
		// Animation complete
	});
	jQuery('#facetsDemandHeader span').toggle();
	jQuery('#facetsBoth,#facetsSupply').toggle(false);
});
jQuery('#newReportHeader').click(function() {
    jQuery(this).next().slideToggle("slow");
	jQuery('#newReportHeader span').toggle();
});

// what happens when a filter in the main section is clicked
jQuery(".facets li li").click(function toggleFilters() {
	
	// toggle selected class
	jQuery(this).toggleClass("selected");
	
	// change what shows in applied filters
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
		// if applied filters empty, hide it
		if (jQuery("#searched-for .searched-for-content ul").html()=="") {
			jQuery("#searched-for").addClass("inactive");
		} else {
			jQuery("#searched-for").removeClass("inactive");
		}
	} else {
		jQuery("#searched-for .searched-for-content ul").append(searchFor);
		jQuery("#searched-for").removeClass("inactive");
	}
});

// what happens when applied filter is clicked
jQuery(".searched-for-content").click( function toggleFilters(e) {
	
	//var slctdFilters = jQuery(this).find('li');
	var slctdWords = jQuery(e.target).find('span').length>0? jQuery(e.target).find('span').html() : jQuery(e.target).html();
	
	// deselect the selected filter in main filters list
	jQuery("#AllFilters div.content:not[:hidden] li li.selected div.filterCheckboxWrapper").each(function(i, el) {
		if (jQuery(el).html()==slctdWords) {
			jQuery(el).parent().removeClass("selected");
		}
	});
	
	// remove the li from the applied filters
	if (jQuery(e.target).find('span').length>0) {
		jQuery(e.target).remove();
	} else {
		jQuery(e.target).parent().remove();
	}
	
	// show or hide the applied filters
	if (jQuery("#searched-for .searched-for-content ul").html()=="") {
		jQuery("#searched-for").addClass("inactive");
	} else {
		jQuery("#searched-for").removeClass("inactive");
	}
});

// Close to begin with
jQuery('#facetsSupply,#facetsDemand').toggle(false);
jQuery('#facetsSupplyHeader .expandedInd,#facetsDemandHeader .expandedInd').toggle(false);
// Open to begin with
jQuery('#facetsBothHeader .collapsedInd,#newReportHeader .collapsedInd').toggle(false);

// Mouseover events
jQuery('#facetsBothHeader,#facetsSupplyHeader,#facetsDemandHeader,#newReportHeader').mouseover(function() {
	//if(console.log) {console.log(this);}
	jQuery(this).css('background',"url('ReportSummary_files/bg_jpTopNav-button.png') no-repeat scroll -2px -34px transparent");
	// if (jQuery(this).next().css('display')=="none") {
		// jQuery(this).append('<span style="float:right">+</span>');
	// } else {
		// jQuery(this).append('<span style="float:right;margin-top:-7px">_</span>');
	// }
});
jQuery('#facetsBothHeader,#facetsSupplyHeader,#facetsDemandHeader,#newReportHeader').mouseout(function() {
	//if(console.log) {console.log(this);}
	jQuery(this).css('background','');
	// jQuery(this).find('span').remove();
});

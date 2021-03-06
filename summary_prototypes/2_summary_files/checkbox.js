jQuery('#newReportHeader').click(function() {
    jQuery(this).next().slideToggle("slow");
	jQuery('#newReportHeader span').toggle();
});

// what happens when a filter in the main section is clicked
jQuery(".facets li li").click(function toggleFilters() {
	
	// toggle selected class
	jQuery(this).toggleClass("selected");
	if (jQuery(this).hasClass("selected")) {
		jQuery(this).find(':checkbox').attr('checked','checked');
	} else {
		jQuery(this).find(':checkbox').removeAttr('checked');
	}
	
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
	
	//update summary counts
	Prototypes.updateSummary();
});

// what happens when applied filter is clicked
jQuery(".searched-for-content").click( function toggleFilters(e) {
	
	//var slctdFilters = jQuery(this).find('li');
	var slctdWords = jQuery(e.target).find('span').length>0? jQuery(e.target).find('span').html() : jQuery(e.target).html();
	
	// deselect the selected filter in main filters list
	jQuery("#AllFilters div.content:not[:hidden] li li.selected div.filterCheckboxWrapper").each(function(i, el) {
		if (jQuery(el).html()==slctdWords) {
			jQuery(el).parent().removeClass("selected");
			jQuery(this).parent().find(':checkbox').removeAttr('checked');
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
	
	//update summary counts
	Prototypes.updateSummary();
});

/*************************
/*    Events on load     *
**************************/
Prototypes.bindHeaderClickCollapse();
jQuery('#facetsDemand, #facetsSupply').show();
Prototypes.bindTabClickByDisabling();
Prototypes.showHeaders();
jQuery('#facetsSupplyHeader .expandedInd,#facetsDemandHeader .expandedInd,#facetsBothHeader .expandedInd,#newReportHeader .expandedInd').show();
jQuery('#facetsSupplyHeader .collapsedInd,#facetsDemandHeader .collapsedInd,#facetsBothHeader .collapsedInd,#newReportHeader .collapsedInd').hide();

// Position things perfectly for No Hiring Indicator + No Custom Supply

// Vertically center text in the summary
var computedHeight = Math.max(jQuery('#summarySupply').height(), jQuery('#summaryDemand').height(), 105);
jQuery('.displayTable').height(computedHeight);
// Adjust the position of #summarytotalright
var leftoverMargin = jQuery('#summaryActiveLeft').height();
jQuery('#summaryTotalRight').height(jQuery('#summaryActiveLeft').height());
/*
jQuery('#summaryTotalRight').children().each(function() {
	leftoverMargin -= jQuery(this).outerHeight();
});
*/
//jQuery('#summaryActiveLP').css('margin-bottom',leftoverMargin);
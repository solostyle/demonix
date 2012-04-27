jQuery(".toggle").remove();
/* Show and Hide Facets */
switch (jQuery('#SDTabs UL LI.selected').attr('id')) {
	case "DemandView":
		jQuery(".facetSupply").hide();
		jQuery(".facetBoth").hide();
		jQuery(".facetDemand").show();
		break;
	case "SupplyView":
		jQuery(".facetDemand").hide();
		jQuery(".facetBoth").hide();
		jQuery(".facetSupply").show();
		break;
	default:
		jQuery(".facetDemand, .facetSupply").hide();
		jQuery(".facetBoth").show();
}

/* Toolbar Actions */
jQuery("#toolbar .content").hide();
jQuery('#toolbar .header').click(function () {
	jQuery(this).next().slideToggle("slow", function() {
		if (jQuery(this).css("display")=="none") {
			jQuery(this).prev().css({"background":"","color":""});
		} else {
			jQuery(this).prev().css({"background":"#fff","color":"#333"});
		}
	});
});

/* Facet Arrangement */
jQuery("#facets>li:not(:hidden)").each(function(index) {
	if ((index+1)%3==0) jQuery(this).css("margin-right","0");
	if (index%3==0) jQuery(this).css("clear","left");
});
jQuery("#facets").hide();

/* Facet Header Actions */
jQuery("#refineSearchHeader").click(function() {
	jQuery("#facets").slideToggle("slow", function() {
		// Toggle the applied filters
		if (jQuery(this).css("display")=="block") {
			jQuery("#clearAll, #searched-for-content").slideUp("slow");
		} else {
			jQuery("#clearAll, #searched-for-content").slideDown("slow");
		}
		// Toggle the positioning of #searched-for .content
		jQuery(this).parent().parent().toggleClass('expanded');
	});
});

/* What happens when a filter in the main section is clicked */
jQuery("#facets li li").click(function toggleFilters() {

	/* change the applied filters */
	var slctdWords = jQuery(this).find("label").html();
	var searchFor = "<li><span>"+slctdWords+"</span></li>";
	var found = '';

	/* find the currently selected one in applied filters */
	jQuery("#searched-for-content ul li").each(function(i, el) {
		if (jQuery(el).html()=="<span>"+slctdWords+"</span>") {
			found = jQuery(el);
		}
	});

	/* if it's there, remove it. if not, add it */
	if (found) {
		// if element exists, remove it
		found.remove();
		// if applied filters empty, hide it
		if (jQuery("#searched-for-content ul").html()=="") {
			jQuery("#searched-for-content, #clearAll").hide();
		} else {
			jQuery("#searched-for-content, #clearAll").show();
		}
	} else {
		jQuery("#searched-for-content ul").append(searchFor);
		jQuery("#searched-for-content, #clearAll").show();
	}
});

/* What happens when applied filter is clicked */
jQuery("#searched-for-content").click( function toggleFilters(e) {
	
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
	if (jQuery("#searched-for-content ul").html()=="") {
		jQuery("#searched-for").addClass("inactive");
	} else {
		jQuery("#searched-for").removeClass("inactive");
	}
});
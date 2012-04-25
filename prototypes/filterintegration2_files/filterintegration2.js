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
		if (jQuery("#facets").css("display")=="block") {
			jQuery("#clearAll, #searched-for-content").slideUp("slow");
		} else {
			jQuery("#clearAll, #searched-for-content").slideDown("slow");
		}
	});
});
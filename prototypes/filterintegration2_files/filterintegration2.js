jQuery(".toggle").remove();

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

//jQuery(".facets>li:nth-child(3n+1)").css("clear","left");
jQuery("#newReportHeader").next().hide();

jQuery("#facets>li:not(:hidden)").each(function(index) {
	if ((index+1)%3==0) jQuery(this).css("margin-right","0");
	if (index%3==0) jQuery(this).css("clear","left");
});
jQuery("#refineSearchHeader").click(function() {
	jQuery("#facets").slideToggle("slow");
});
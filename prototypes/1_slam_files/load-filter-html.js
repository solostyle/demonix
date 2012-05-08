	var supplyText = {}, demandText = {};

	// Store all the labels in each facet, in the total object "supplyText"
	jQuery('#facetsSupply .facets>li[class!="ignore"]').each(function capture() {
		var facetTitle = jQuery(this).children().filter(':last').attr('id');
		supplyText[facetTitle] = [];
		jQuery('#'+facetTitle).find('label').each(function() {
			supplyText[facetTitle][supplyText[facetTitle].length] = jQuery(this).html();
		});
	});

	// Remove all the uls
	jQuery('#facetsSupply .facets>li[class!="ignore"] div:last-child ul').remove();
	
	// Populate the uls
	jQuery('#facetsSupply .facets>li[class!="ignore"]>div:last-child').each(function populate() {
		jQuery(this).append("<ul></ul>");
		var currentFacet = supplyText[jQuery(this).attr('id')]
		for (var i=0;i<currentFacet.length;i++) {
			var facetCount = currentFacet[i].split("(")[1];
			if (!facetCount) facetCount = "("+Math.floor(Math.random()*100000)+")";
			else facetCount = "("+facetCount;
			var facetName = currentFacet[i].split("(")[0];
			jQuery(this).find('ul')
				.append('<li></li>')
				.find('li:last')
				.append('<div class="facetCountSupplyWrapper"><span class="facetCountSupply">'+facetCount+'</span></div>')
				.append('<div class="filterCheckboxWrapper">'+facetName+'</div>');
		}
	});
						// <li>
							// <div class="facetCountSupplyWrapper"><span class="facetCountSupply">(311,830)</span></div>
							// <div class="filterCheckboxWrapper">All Occupations</div>
							// <div class="facetCountDemandWrapper"><span class="facetCountDemand">(979,386)</span></div>
						// </li>
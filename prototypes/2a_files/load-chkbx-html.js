	var facetsObject = {
		facetsBoth: {
			id:'#facetsBoth',
			text:{}
		}, 
		facetsSupply: {
			id:'#facetsSupply',
			text:[]
		}, 
		facetsDemand: {
			id:'#facetsDemand',
			text:{}
		}
	};
	
	jQuery('#facetsSupply .facets>li>div:last-child ul, #facetsBoth .facets>li>div:last-child ul, #facetsDemand .facets>li>div:last-child ul').each(function insert() {
		var facet = jQuery(this).parent().attr('id'),
		section = jQuery(this).parent().parent().parent().parent().parent().attr('id').split('facets')[1];
		
		jQuery(this)
		.children()
		.each(function () {
			jQuery(this).prepend('<div class="facetCheckbox"><input id="chkbx'+'_'+facet+'_'+jQuery(this).find('.filterCheckboxWrapper').html().replace(/\s/g,"")+'_'+section+'" type="checkbox" /></div>');
		});
	});

						// <li>
							// <div class="facetCountSupplyWrapper"><span class="facetCountSupply">(311,830)</span></div>
							// <div class="filterCheckboxWrapper">All Occupations</div>
							// <div class="facetCountDemandWrapper"><span class="facetCountDemand">(979,386)</span></div>
						// </li>
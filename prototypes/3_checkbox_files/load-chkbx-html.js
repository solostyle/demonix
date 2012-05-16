jQuery('#facetsSupply .facets>li>div:last-child ul, #facetsBoth .facets>li>div:last-child ul, #facetsDemand .facets>li>div:last-child ul').each(function insert() {
	var facet = jQuery(this).parent().attr('id'),
	section = jQuery(this).parents().eq(4).attr('id').split('facets')[1];
	
	jQuery(this)
	.children()
	.each(function () {
		jQuery(this).prepend('<div class="facetCheckbox"><input id="chkbx_'+facet+'_'+jQuery(this).find('.filterCheckboxWrapper').html().replace(/\s/g,"")+'_'+section+'" type="checkbox" /></div>');
	});
});
	
// Check the selected checkbox
jQuery('#AllFilters li.selected').find(':checkbox').attr('checked', 'checked');
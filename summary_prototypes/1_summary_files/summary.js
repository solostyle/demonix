this.SummaryManager = function () {

    var load = function () {

        changeHeights();
        positionRYGGauge();
        hideEMSI();
		toolbarManager();
        totalSupplyRollup();

    };

    /* If there's a hiring index, change the parent (#summaryRight) to have relative position. this places the gauge in the right place
    This is not default setting because when there's no hiring index, the total supply is on the right.
    The total supply rollup doesn't work if #summaryRight's position is relative.
    */
    var positionRYGGauge = function () {
        if (jQuery('#RYGGauge').length) {
            jQuery('#summaryRight').css('position', 'relative');
            jQuery('#summaryRight').css('min-height', '170px');
            jQuery('#summaryContent').css('overflow', 'hidden');
        }
    };

    var changeHeights = function () {
        /* Change the height of things in the summary box */
        var computedHeight;

        if (jQuery('#RYGGauge').length) {

            // with hiring indicator
            computedHeight = Math.max(jQuery('#summarySupply').height(), jQuery('#summaryDemand').height(), 85);
            jQuery('.displayTable').height(computedHeight);

            // Adjust the position of #summarytotalright
            jQuery('#summaryRight').height(jQuery('#summaryLeft').height());
            jQuery('#RYGGauge').height(jQuery('#summaryRight').height());
            jQuery('#summaryTotalSupply .label').css('line-height', jQuery('#summaryTotalSupply .count').height() + 'px');

        } else {
            // without hiring indicator
            computedHeight = Math.max(jQuery('#summarySupply').height(), jQuery('#summaryDemand').height(), 105);
            jQuery('.displayTable').height(computedHeight - 25);

            // Adjust the position of #summarytotalright
            jQuery('#summaryRight').height(computedHeight);
            /*var leftoverMargin = computedHeight;
            jQuery('#summaryRight').children().each(function () {
            leftoverMargin -= jQuery(this).outerHeight();
            });

            jQuery('#summaryActiveLP').css('margin-bottom', leftoverMargin);*/
        }
    };

    /* Hide EMSI from the summary if no ONETs are selected */
    var hideEMSI = function () {
        if ($('#onetcode').find('li').find('input:checked').length == 1 &&
            $('#onetcode').find('li').find('input:checked').next().html() == "<b>All Occupations</b>") {
            $('#summaryTotalSupply-right, #summaryTotalSupply-left').hide();
        }
    };

    /* Toolbar Manager manages the toolbar dropdown actions */
    var toolbarManager = function () {

        var timeout    = 500;
		var closetimer = 0;
		var ddmenuitem = 0;

		function jsddm_open() {
			jsddm_canceltimer();
			jsddm_close();
			ddmenuitem = $(this).find('ol').css('display', 'block');
		}

		function jsddm_close() {
			if(ddmenuitem) {
				ddmenuitem.css('display', 'none');
			}
		}

		function jsddm_timer() {
			closetimer = window.setTimeout(jsddm_close, timeout);
		}

		function jsddm_canceltimer() {
			if(closetimer) {
				window.clearTimeout(closetimer);
				closetimer = null;
			}
		}

		$('#toolbar > li.tool').bind('mouseover', jsddm_open);
		$('#toolbar > li.tool').bind('mouseout',  jsddm_timer);
		document.onclick = jsddm_close;
	};
	
	var totalSupplyRollup = function() {

        jQuery('#summaryTotalSupply-left .count, #summaryTotalSupply-left .label, #summaryTotalSupply-right .count, #summaryTotalSupply-right .label')
        .mouseenter(function () {
            jQuery(this).parent().next().show();
        });

        jQuery('#summaryTotalSupply-left .count, #summaryTotalSupply-left .label, #summaryTotalSupply-right .count, #summaryTotalSupply-right .label')
        .mouseleave(function () {
            jQuery(this).parent().next().hide();
        });

    };

    return { Load: load,
        HideEMSI: hideEMSI
    };

} ();
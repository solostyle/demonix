ReportGenerator = function () {
    var _generateReportUrl;
    var _reportViewUrl;
    var _reportDID;
    var _searchType;
    var _checkNum = 0;

    function reset(msg) {
        _checkNum = 0;
        _reportDID = '';
        showError(msg);
    }

    function statusCheckSuccess(outcome) {
        if (outcome.reportResult === 'Completed') {
            if (_reportViewUrl.indexOf('?') > -1) {
                window.location = _reportViewUrl + '&did=' + _reportDID + "&st=" + _searchType;
            } else {
                window.location = _reportViewUrl + '?did=' + _reportDID + "&st=" + _searchType;
            }
           
        } else if (outcome.reportResult === 'Error') {
            reset('An error occurred while generating this report.  Please try again.');
        } else if (outcome.reportResult === "ScarceData") {
            if ($.trim($("input.location").val()) == "") {
                reset("Not enough data matched your search to generate a report. Please try again with a more specific keyword, location or bigger timeframe.");
            } else {
                $("#natSearch a").html('National Search for <strong>\'' + $("input.keyword").val() + '\'</strong>');
                reset($("#natSearch").html());
            }
        } else {
            reset('An error occurred while generating this report.  Please try again.');
        }
    }

    function generateReportSuccess(outcome) {
        if (outcome.reportStatus === 'Success') {
            _reportDID = outcome.reportSummaryDID;
            _searchType = outcome.searchType;
            statusCheckSuccess(outcome);
        } else {
            reset(outcome.errorMessage);
        }
    }

    return {
        onDocumentReady: function () {
            _generateReportUrl = ScriptVariables.Get("GenerateReportUrl");
            _reportViewUrl = ScriptVariables.Get("ReportViewUrl");
            $(".titled_tips").cluetip({ splitTitle: '|', cluezIndex: '999999', dropShadow: true, arrows: true, cluetipClass: 'cbTitledTip', width: 450 });
        },
        generateReport: function (keyword, ocp, loc, tf) {
            $.ajax({
                type: "POST",
                url: _generateReportUrl,
                data: { q: keyword, o: ocp, l: loc, t: tf },
                success: function (response) {
                    var results = eval('(' + response + ')');
                    generateReportSuccess(results);

                },
                error: function () {
                    reset('An error occurred while generating this report.  Please try again.');
                }
            });
        }
    }
} ();

CompensationReportGenerator = function () {
    var _generateReportUrl;
    var _reportViewUrl;
    var _reportDID;
    var _checkNum = 0;
    var filterData;

    _generateReportUrl = ScriptVariables.Get("GenerateCompensationReportUrl");
    _reportViewUrl = ScriptVariables.Get("ReportCompensationViewUrl");

    function reset(msg) {
        _checkNum = 0;
        _reportDID = '';
        showError(msg);
    }

    function statusCheckSuccess(outcome) {
        if (outcome.reportResult === 'Completed') {
            if (filterData) {
                window.name = ModulesManager.Filters.toString();
            }
            if (_reportViewUrl.indexOf('?') > -1) {
                window.location = _reportViewUrl + '&did=' + _reportDID;
            } else {
                window.location = _reportViewUrl + '?did=' + _reportDID;
            }
        } else if (outcome.reportResult === 'Error') {
            reset('An error occurred while generating this report.  Please try again.');
        } else if (outcome.reportResult === "ScarceData") {
            reset("Not enough data matched your search to generate a report. Please try again with a more specific keyword.");
        } else {
            reset('An error occurred while generating this report.  Please try again.');
        }
    }

    function generateReportSuccess(outcome) {
        if (outcome.reportStatus === 'Success') {
            _reportDID = outcome.reportSummaryDID;
            statusCheckSuccess(outcome);
        } else {
            reset(outcome.errorMessage);
        }
    }

    return {
        generateReport: function (keyword, loc, tf, salaryMin, salaryMax, top, bottom) {
            var ajax = $.ajax({
                type: "POST",
                timeout: 60000,
                url: _generateReportUrl,
                data: { q: keyword,
                    l: loc,
                    t: tf,
                    min: salaryMin,
                    max: salaryMax,
                    top: top,
                    bottom: bottom
                },
                success: function (response) {
                    var results = eval('(' + response + ')');
                    generateReportSuccess(results);
                },
                error: function (err) {
                    reset('An error occurred while generating this report.  Please try again.');
                }
            });
        },

        setFilterData: function (value) {
            filterData = value;
        },

        getFilterData: function () {
            return filterData;
        }
    }
} ();

$('a#lnkCareerBuilderCompV2').live('click', function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    var jobTitle = $('span#jobTitle').html();
    var timeFrame = "24";
    if (jobTitle == null)
        jobTitle = "";

    $("div#ajaxMsg").html('Generating Report...');
    $("#retrievingData").dialog('open');
    CompensationReportGenerator.setFilterData (true);
    CompensationReportGenerator.generateReport(jobTitle, "", timeFrame, "", "", "", "");
});

formSubmitter = function () {
    var errorMsg = '';
    var errorList = '';
    var isAdmin = window.location.querystring["admin"];
    function validateSearch(isSupplyDemandReport) {
        if (isSupplyDemandReport) {
            errorMsg = 'At least one of the following fields is required:';
            if ($.trim($("input.keyword").val()) == "" && $.trim($("input.location").val()) == "" && isAdmin == null) {
                errorList = '<ul style="text-align:left;"><li>Keyword</li><li>Location</li></ul>';
                return false;
            }
            return true;
        }
        else {
            errorMsg = 'Keyword is required';
            if ($.trim($("input.keywordCompensation").val()) == "" && isAdmin == null) {
                return false;
            }
            return true;
        }
    }
    return {
        onDocumentReady: function () {
            $("input.keyword").focus();
            $("form input").keypress(function (evt) {
                if (((evt.which && evt.which == 13) || (evt.keyCode && evt.keyCode == 13)) && ($(this).attr("id").indexOf("facetSummary") == -1)) {
                    if (($(this).attr("id").indexOf("Compensation") == -1)) {
                        $('#btnSubmit').click();
                        return false;
                    } else {
                        $('#btnCompensationSubmit').click();
                        return false;
                    }
                } else {
                    return true;
                }
            });
            $('#btnSubmit, input.btnSubmit').click(function (event) {
                if (validateSearch(true)) {
                    event.stopPropagation();
                    event.preventDefault();
                    $("#retrievingData").dialog('open');
                    ReportGenerator.generateReport($.trim($("input.keyword").val()), $.trim($("input.occupation").val()), $.trim($("input.location").val()), $('select[id$="dropdownDateFilter"]').find("option:selected").val());
                } else {
                    showError(errorMsg + errorList);
                    return false;
                }
            });
            $('#btnCompensationSubmit, input.btnCompensationSubmit').click(function (event) {
                if (validateSearch(false)) {
                    event.stopPropagation();
                    event.preventDefault();
                    $("#retrievingData").dialog('open');
                    CompensationReportGenerator.setFilterData(false);
                    CompensationReportGenerator.generateReport($.trim($("input.keywordCompensation").val()), "", "24", "", "", "", "");
                } else {
                    showError(errorMsg);
                    return false;
                }
            });
            $('#errorDialog').dialog({
                open: function (event, ui) {
                    $(".NatSearch").click(function () {
                        if ($("#errorDialog").dialog('isOpen')) {
                            $("#errorDialog").dialog('close');
                        }
                        $("input.location").val('');
                        $("#retrievingData").dialog('open');
                        ReportGenerator.generateReport($.trim($("input.keyword").val()), $.trim($("input.occupation").val()), $.trim($("input.location").val()), $('select[id$="dropdownDateFilter"]').find("option:selected").val());
                    });
                    $(".ui-dialog-titlebar-close").show();
                }
            });
        }
    }
} ();

function showError(msg) {
    $("#retrievingData").dialog('close');
    $('#errorMsg').html(msg);
    $('#errorDialog').dialog('open');
    $("div#ajaxMsg").html('Updating Report Data...');
}

jQuery(document).ready(function () {
    $("a#betaCompensationDifferences").fancybox();
});




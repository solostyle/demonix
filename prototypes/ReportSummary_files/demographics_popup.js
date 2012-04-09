
var DemographicManager = function () {
    var demoGraphicWrapperID = "DemographicsfacetSummary";
    var oFilterManager = new ReportFilters(demoGraphicWrapperID);
    var demoGraphicWrapper = null;
    var ajaxDelayInterval = null, ajaxRequest = null;
    var loadedONETFilter = false;

    function initializeFancybox() {
        $("a.FancyBoxDemographics").fancybox({
            'transitionIn': 'elastic',
            'transitionOut': 'elastic',
            'speedIn': '500',
            'speedOut': '500',
            'type': 'inline',
            'autoScale': 'true',
            'scrolling': 'no',
            'centerOnScroll': 'true',
            'onStart': function () {
                var oCodesList = ScriptVariables.Get('ONetMatchCodeList');
                if (oCodesList != null && $.trim(oCodesList) != "") {
                    if (!loadedONETFilter) {
                        setDefaultFacetFilter();
                        loadedONETFilter = true;
                    } else {
                        requestDemographicData();
                    }
                } else {
                    requestDemographicData();
                }
            }
        });
    };
    function initializeFacetFilters() {
        demoGraphicWrapper.find(".filter-content input:checkbox").click(function () {
            if ($(this).val().indexOf(":") == -1) {
                $("#" + $(this).val() + " li input:checkbox").each(function () {
                    if ($(this).is(':checked') && $(this).val().indexOf(":") != -1) {
                        oFilterManager.removeFilter($(this).val());
                        $(this).attr('checked', false);
                        $(this).trigger("click");
                    }
                });
            } else {
                delayLiveAjaxSearch($(this));
            }
        });
        demoGraphicWrapper.find("#searched-for li").click(function () {
            var searchedFilter = demoGraphicWrapper.find("#filter-search #" + $(this).attr("id"));
            oFilterManager.removeFilter($(this).attr("id"));
            searchedFilter.attr('checked', false);
            searchedFilter.trigger("click");
        });
        demoGraphicWrapper.find('.filter-content .toggle').click(function () {
            $(this).find('img').toggle();
            $(this).next().toggle();
        });
    };
    function delayLiveAjaxSearch(obj) {
        if (ajaxDelayInterval != null) {
            clearTimeout(ajaxDelayInterval);
        }
        oFilterManager.addCheckBoxFilterHandler(obj);
        AjaxProgressBar.showFacetUpdate(obj.parent(), demoGraphicWrapperID);
        ajaxDelayInterval = setTimeout(function () {
            requestDemographicData();
        }, 800);
    };
    function requestDemographicData() {
        var Filters = oFilterManager.toString();
        var did = window.location.querystring["did"];

        if (ajaxRequest != null) {
            ajaxRequest.abort();
        }
        AjaxProgressBar.showDialog(false);
        var AjaxRequest = $.ajax({
            type: "POST",
            timeout: 60000,
            url: ScriptVariables.Get('getActiveSupplyDemographicsLink'),
            data: { did: did, filter: Filters, chart: "all", content: ContentType.ActiveSupplyDemographics() },
            success: function (response) {
                var results = eval('(' + response + ')');
                updateReportContent(results);
                AjaxProgressBar.closeDialog();
            },
            error: function (obj) {
                showError($("#filterErrorMsg").html());
            }
        });
    };
    function updateReportContent(results) {
        if (results != null) {
            demoGraphicWrapper.find(".filter-content .facets").html(results.DemographicsFacetSummaryHTML);
            demoGraphicWrapper.find(".searched-for-content").html(results.DemographicsFacetAppliedFilterHTML);
            demoGraphicWrapper.find("#searched-for .clearAll").attr("class", "clearAll");
            oFilterManager.persistSearchedFilters();

            initializeFacetFilters();
            if (results.RDBLinkGeneration != null) {
                $('a#lnkDemoGraphicsToCareerBuilderRDB').attr('href', results.RDBLinkGeneration);
            }
            else {
                $('a#lnkDemoGraphicsToCareerBuilderRDB').attr('href', '#');
            }
            if (results.barRDBEducationDataXML != null) {
                amChartsPlotter.drawAmBarChart(true, "EducationView", "barRDBEducationChart", results.barRDBEducationDataXML, results.barRDBEducationSettingXML);
                $('#EducationViewWrapper p.chartDisclaimerText').text('' + results.educationDisclaimerText + '');
            }
            if (results.barRDBYearsExpDataXML != null) {
                amChartsPlotter.drawAmBarChart(true, "YearsExpView", "barRDBYearsExpChart", results.barRDBYearsExpDataXML, results.barRDBYearsExpSettingXML);
                $('#YearsExpViewWrapper p.chartDisclaimerText').text('' + results.yearsExpDisclaimerText + '');
            }
            if (results.barRDBStateDataXML != null) {
                amChartsPlotter.drawAmBarChart(true, "StateView", "barRDBStateChart", results.barRDBStateDataXML, results.barRDBStateSettingXML);
                $('#StateViewWrapper p.chartDisclaimerText').text('' + results.barRDBStateDisclaimerText + '');
            }
            if (results.barRDBCityStateDataXML != null) {
                amChartsPlotter.drawAmBarChart(true, "CityStateView", "barRDBCityStateChart", results.barRDBCityStateDataXML, results.barRDBCityStateSettingXML);
                $('#CityStateViewWrapper p.chartDisclaimerText').text('' + results.barRDBCityStateDisclaimerText + '');
            }
            if (results.barRDBMSADataXML != null) {
                amChartsPlotter.drawAmBarChart(true, "MSAView", "barRDBMSAChart", results.barRDBMSADataXML, results.barRDBMSASettingXML);
                $('#MSAViewWrapper p.chartDisclaimerText').text('' + results.barRDBMSADisclaimerText + '');
            }
           
            if (results.barRDBOccupationDataXML != null) {
                amChartsPlotter.drawAmBarChart(true, "OccupationView", "barRDBOccupationChart", results.barRDBOccupationDataXML, results.barRDBOccupationSettingXML);
                $('#OccupationViewWrapper p.chartDisclaimerText').text('' + results.barRDBOccupationDisclaimerText + '');
            }
            if (results.barRDBGenderDataXML != null) {
                amChartsPlotter.drawAmBarChart(true, "GenderView", "barRDBGenderChart", results.barRDBGenderDataXML, results.barRDBGenderSettingXML);
                $('#GenderViewWrapper p.chartDisclaimerText').text('' + results.barRDBGenderDisclaimerText + '');
            }
            if (results.barRDBRaceDataXML != null) {
                amChartsPlotter.drawAmBarChart(true, "RaceView", "barRDBRaceChart", results.barRDBRaceDataXML, results.barRDBRaceSettingXML);
                $('#RaceViewWrapper p.chartDisclaimerText').text('' + results.barRDBRaceDisclaimerText + '');
            }
            if (results.barRDBLanguagesSpokenDataXML != null) {
                amChartsPlotter.drawAmBarChart(true, "LanguagesSpokenView", "barRDBLanguagesSpokenChart", results.barRDBLanguagesSpokenDataXML, results.barRDBLanguagesSpokenSettingXML);
                $('#LanguagesSpokenViewWrapper p.chartDisclaimerText').text('' + results.barRDBLanguagesSpokenDisclaimerText + '');
            }
            if (results.barRDBManagementExperienceDataXML != null) {
                amChartsPlotter.drawAmBarChart(true, "ManagementExperienceView", "barRDBManagementExperienceChart", results.barRDBManagementExperienceDataXML, results.barRDBManagementExperienceSettingXML);
                $('#ManagementExperienceViewWrapper p.chartDisclaimerText').text('' + results.barRDBManagementExperienceDisclaimerText + '');
            }
            if (results.barRDBMilitaryExperienceDataXML != null) {
                amChartsPlotter.drawAmBarChart(true, "MilitaryExperienceView", "barRDBMilitaryExperienceChart", results.barRDBMilitaryExperienceDataXML, results.barRDBMilitaryExperienceSettingXML);
                $('#MilitaryExperienceViewWrapper p.chartDisclaimerText').text('' + results.barRDBMilitaryExperienceDisclaimerText + '');
            }
            if (results.barRDBTopMajorsDataXML != null) {
                amChartsPlotter.drawAmBarChart(true, "TopMajorsView", "barRDBTopMajorsChart", results.barRDBTopMajorsDataXML, results.barRDBTopMajorsSettingXML);
                $('#TopMajorsViewWrapper p.chartDisclaimerText').text('' + results.barRDBTopMajorsDisclaimerText + '');
            }
            if (results.barRDBTopSchoolsDataXML != null) {
                amChartsPlotter.drawAmBarChart(true, "TopSchoolsView", "barRDBTopSchoolsChart", results.barRDBTopSchoolsDataXML, results.barRDBTopSchoolsSettingXML);
                $('#TopSchoolsViewWrapper p.chartDisclaimerText').text('' + results.barRDBTopSchoolsDisclaimerText + '');
            }
            if (results.barRDBUSSecurityClearanceDataXML != null) {
                amChartsPlotter.drawAmBarChart(true, "USSecurityClearanceView", "barRDBUSSecurityClearanceChart", results.barRDBUSSecurityClearanceDataXML, results.barRDBUSSecurityClearanceSettingXML);
                $('#USSecurityClearanceViewWrapper p.chartDisclaimerText').text('' + results.barRDBUSSecurityClearanceDisclaimerText + '');
            }
            if (results.barRDBWillingToRelocateDataXML != null) {
                amChartsPlotter.drawAmBarChart(true, "WillingToRelocateView", "barRDBWillingToRelocateChart", results.barRDBWillingToRelocateDataXML, results.barRDBWillingToRelocateSettingXML);
                $('#WillingToRelocateViewWrapper p.chartDisclaimerText').text('' + results.barRDBWillingToRelocateDisclaimerText + '');
            }
            if (results.barRDBIndustryDataXML != null) {
                amChartsPlotter.drawAmBarChart(true, "IndustryView", "barRDBIndustryChart", results.barRDBIndustryDataXML, results.barRDBIndustrySettingXML);
                $('#IndustryViewWrapper p.chartDisclaimerText').text('' + results.barRDBIndustryDisclaimerText + '');
            }
            if (results.barRDBEmployeeSizeDataXML != null) {
                amChartsPlotter.drawAmBarChart(true, "EmployeeSizeView", "barRDBEmployeeSizeChart", results.barRDBEmployeeSizeDataXML, results.barRDBEmployeeSizeSettingXML);
                $('#EmployeeSizeViewWrapper p.chartDisclaimerText').text('' + results.barRDBEmployeeSizeDisclaimerText + '');
            }
            if (results.barRDBEmployerDataXML != null) {
                amChartsPlotter.drawAmBarChart(true, "EmployerView", "barRDBEmployerChart", results.barRDBEmployerDataXML, results.barRDBEmployerSettingXML);
                $('#EmployerViewWrapper p.chartDisclaimerText').text('' + results.barRDBEmployerDisclaimerText + '');
            }
            if (results.barRDBJobTitleDataXML != null) {
                amChartsPlotter.drawAmBarChart(true, "JobTitleView", "barRDBJobTitleChart", results.barRDBJobTitleDataXML, results.barRDBJobTitleSettingXML);
                $('#JobTitleViewWrapper p.chartDisclaimerText').text('' + results.barRDBJobTitleDisclaimerText + '');
            }
        }
        $("div#DemographicsTabsContent div.AllDemographicsWrapper").css("display", "inline");
        $("div#DemographicsTabsContent div.AllDemographicsWrapper").css("float", "left");
    };
    function setDefaultFacetFilter() {
        var oCodesList = ScriptVariables.Get('ONetMatchCodeList');
        if (oCodesList != null && $.trim(oCodesList) != "") {
            var arMatches = oCodesList.split(',');
            var chkLastChkBox = null;
            if (arMatches.length >= 1) {
                $.each(arMatches, function (index, value) {
                    var id = "onetcode" + value.replace(/[^0-9]/g, '');
                    oFilterManager.addFilter(id, "onetcode:" + value, value)
                    var firstCategoryWrapper = demoGraphicWrapper.find("#filter-search ul li:first");
                    var matchChkBox = firstCategoryWrapper.find('input[value$="' + value + '"]')
                    if (matchChkBox.attr("id") != undefined) {
                        matchChkBox.attr('checked', true);
                        chkLastChkBox = matchChkBox;
                    }
                });
                if (chkLastChkBox != null) {
                    chkLastChkBox.trigger("click");
                } else {
                    if (oFilterManager.filtersCount() > 0) {
                        demoGraphicWrapper.find("#searched-for").attr("class", "facet-ui");
                    }
                    requestDemographicData();
                }
            }
        }
    };
    return {
        Initialization: function () {
            initializeFancybox();
            if (demoGraphicWrapper == null) {
                demoGraphicWrapper = $("#" + demoGraphicWrapperID);
            }
            demoGraphicWrapper.find("#searched-for .clearAll").click(function () {
                AjaxProgressBar.showFacetUpdate($(this).parent(), demoGraphicWrapperID);
                oFilterManager.clearFilters();
                requestDemographicData();
            });
        }
    };
} ();

$(document).ready(function () {
    DemographicManager.Initialization();

    // UI Redesign Feb 2012
    $("#other-bar").addClass("category-selected");
    $("#companies-content").slideToggle();

    $("#experience-bar").click(function () {
        $(".category-bar").removeClass("category-selected");
        $(".sub-bar").removeClass("sub-selected");
        $("#experience-bar").addClass("category-selected");
        $("#mini-yearsexp").addClass("sub-selected");
        $(".sub-content").hide();
        $(".sub-categories").hide();
        $("#experience-content").slideToggle();
    });

    $("#educaton-bar").click(function () {
        $(".category-bar").removeClass("category-selected");
        $(".sub-bar").removeClass("sub-selected");
        $("#educaton-bar").addClass("category-selected");
        $("#mini-level").addClass("sub-selected");
        $(".sub-content").hide();
        $(".sub-categories").hide();
        $("#education-content").slideToggle();
    });

    $("#location-bar").click(function () {
        $(".category-bar").removeClass("category-selected");
        $(".sub-bar").removeClass("sub-selected");
        $("#location-bar").addClass("category-selected");
        $(".sub-content").hide();
        $(".sub-categories").hide();
        $("#location-content").slideToggle();
    });

    $("#demographics-bar").click(function () {
        $(".category-bar").removeClass("category-selected");
        $(".sub-bar").removeClass("sub-selected");
        $("#demographics-bar").addClass("category-selected");
        $("#mini-ethnicity").addClass("sub-selected");
        $(".sub-content").hide();
        $(".sub-categories").hide();
        $("#demographics-content").slideToggle();
    });

    $("#other-bar").click(function () {
        $(".category-bar").removeClass("category-selected");
        $(".sub-bar").removeClass("sub-selected");
        $("#other-bar").addClass("category-selected");
        $("#mini-companies").addClass("sub-selected");
        $(".sub-content").hide();
        $(".sub-categories").hide();
        $("#companies-content").slideToggle();
    });
});

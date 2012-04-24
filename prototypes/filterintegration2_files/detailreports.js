var ContentType = function () {
    return {
        Demand: function () { return "Demand"; },
        TotalSupply: function () { return "TotalSupply"; },
        ActiveSupply: function () { return "ActiveSupply"; },
        CompV2: function () { return "CompV2"; },
        TotalLaborPressure: function () { return "TotalLaborPressure"; },
        ActiveSupplyDemographics: function() { return "ActiveSupplyDemographics"; },
        ActiveLaborPressure: function () { return "ActiveLaborPressure"; }
    }
} ();

var ChartType = function () {
    return {
        StateMap: function () { return "state"; },
        MSAMap: function () { return "msa"; },
        TopEmployer: function () { return "dtopemployers"; },
        TopIndustry: function () { return "dtopindustries"; },
        SOCChange: function () { return "socchange"; },
        YOY: function () { return "yoy"; }
    }
} ();
var AJAXRequest = function () {
    var _socName = null;
    return {
        SOC: function () { return _socName; },
        StateMapID: function (contentName) { return contentName + "StateMap"; },
        MSAMapID: function (contentName) { return contentName + "MSAMap"; },
        URL: function (contentName) {
            if (contentName == ContentType.Demand()) {
                return ScriptVariables.Get('getDemandDetailURL');
            } else if (contentName == ContentType.TotalSupply()) {
                _socName = $("#ucSupplyView_ddOccupation option:selected").text();
                return ScriptVariables.Get('getTotalSupplyDetailURL');
            } else if (contentName == ContentType.TotalLaborPressure()) {
                _socName = $("#ucLaborPressureView_ddOccupation option:selected").text();
                return ScriptVariables.Get('getTotalLaborPressureDetailLink');
            } else if (contentName == ContentType.ActiveSupply()) {
                return ScriptVariables.Get('getActiveSupplyDetailLink');
            } else if (contentName == ContentType.ActiveLaborPressure()) {
                return ScriptVariables.Get('getActiveLaborPressureDetailLink');
            } else {
                return ScriptVariables.Get('filterURL');
            }
        }
    }
} ();

var updateTrendTableView = function (contentType, tableViewObj, dataJSON) {
    if (dataJSON != null) {
        if (dataJSON.National != null) {
            var iCol = 1;
            $.each(dataJSON.National, function (year, yearValue) {
                $.each(yearValue, function (month, monthValue) {
                    var id = "nwc" + iCol + "_" + month;
                    var CellObj = tableViewObj.find('td[id$="' + id + '"]');
                    if (contentType != ContentType.ActiveLaborPressure() && contentType != ContentType.TotalLaborPressure()) {
                        CellObj.html(formatNumber(monthValue, 0));
                    } else {
                        CellObj.html(formatNumber(monthValue, 2));
                    }
                });
                iCol += 1;
            });
        }
        if (dataJSON.NarrowGeo != null) {
            var iCol = 1;
            $.each(dataJSON.NarrowGeo, function (year, yearValue) {
                $.each(yearValue, function (month, monthValue) {
                    var id = "ngc" + iCol + "_" + month;
                    var CellObj = tableViewObj.find('td[id$="' + id + '"]');
                    if (contentType != ContentType.ActiveLaborPressure() && contentType != ContentType.TotalLaborPressure()) {
                        CellObj.html(formatNumber(monthValue, 0));
                    } else {
                        CellObj.html(formatNumber(monthValue, 2));
                    }
                });
                iCol += 1;
            });
        }
    }
};

function amClickedOnBullet(chart_id, graph_index, value, series, url, description) {}
var amChartsPlotter = function () {
    var amLineChartPath = ScriptVariables.Get('amLineChartPath');
    var amBarChartPath = ScriptVariables.Get('amBarChartPath');
    var flashObj;
    return {
        drawAmLineChart: function (bIsMiniChart, controlID, chartID, dataXML, settingXML) {
            if (bIsMiniChart) {
                flashObj = new SWFObject(amLineChartPath + "amline.swf", chartID, "849", "120", "8", "#FFFFFF");
            } else {
                flashObj = new SWFObject(amLineChartPath + "amline.swf", chartID, "750", "300", "8", "#FFFFFF");
            }
            flashObj.addVariable("chart_id", chartID);
            flashObj.addVariable("path", amLineChartPath);
            flashObj.addVariable("settings_file", escape(amLineChartPath + "amline_settings.xml"));
            flashObj.addVariable("chart_data", encodeURIComponent(dataXML));
            flashObj.addVariable("chart_settings", encodeURIComponent(settingXML));
            flashObj.addVariable("loading_data", "Loading Data...");
            flashObj.addVariable("preloader_color", "#999999");
            flashObj.addParam("wmode", "transparent");
            flashObj.write(controlID);
        },
        drawAmBarChart: function (bIsMiniChart, controlID, chartID, dataXML, settingXML) {
            if (bIsMiniChart) {
                flashObj = new SWFObject(amBarChartPath + "amcolumn.swf", chartID, "360", "234", "8", "#FFFFFF");
            } else {
                flashObj = new SWFObject(amBarChartPath + "amcolumn.swf", chartID, "400", "260", "8", "#FFFFFF");
            }
            flashObj.addVariable("chart_id", chartID);
            flashObj.addVariable("path", amBarChartPath);
            flashObj.addVariable("settings_file", escape(amBarChartPath + "amcolumn_settings.xml"));
            flashObj.addVariable("chart_data", encodeURIComponent(dataXML));
            flashObj.addVariable("chart_settings", encodeURIComponent(settingXML));
            flashObj.addVariable("loading_data", "Loading Data...");
            flashObj.addVariable("preloader_color", "#999999");
            flashObj.addParam("wmode", "transparent");
            flashObj.write(controlID);
        }
    };
} ();

function amMapCompleted(map_id) {
    flashMovie = document.getElementById(map_id);
    amMapPlotter.InitializeMap(map_id);
}

function amRegisterClickAnywhere(map_id, object_id, title, value) {
   if (map_id.indexOf("DemandMSAMap") != -1) {
       var demandMap = ModulesManager.ModulesCollection.item("DemandStateMSAMap");
       demandMap.HeatMapLocator.Select("msa", object_id);
   } else if (map_id.indexOf("DemandStateMap") != -1) {
       var demandMap = ModulesManager.ModulesCollection.item("DemandStateMSAMap");
       demandMap.HeatMapLocator.Select("state", object_id);
   } else if (map_id.indexOf("TotalSupplyMSAMap") != -1) {
       var supplyMap = ModulesManager.ModulesCollection.item("TotalSupplyStateMSAMap");
       supplyMap.HeatMapLocator.Select("msa", object_id);
   } else if (map_id.indexOf("TotalSupplyStateMap") != -1) {
       var supplyMap = ModulesManager.ModulesCollection.item("TotalSupplyStateMSAMap");
       supplyMap.HeatMapLocator.Select("state", object_id);
   } else if (map_id.indexOf("ActiveSupplyMSAMap") != -1) {
       var RDBMSAMap = ModulesManager.ModulesCollection.item("ActiveSupplyStateMSAMap");
       RDBMSAMap.HeatMapLocator.Select("msa", object_id);
   } else if (map_id.indexOf("ActiveSupplyStateMap") != -1) {
       var RDBStateMap = ModulesManager.ModulesCollection.item("ActiveSupplyStateMSAMap");
       RDBStateMap.HeatMapLocator.Select("state", object_id);
   } else if (map_id.indexOf("ActiveLaborPressureMSAMap") != -1) {
       var activeLaborPressureMSAMap = ModulesManager.ModulesCollection.item("ActiveLaborPressureStateMSAMap");
       activeLaborPressureMSAMap.HeatMapLocator.Select("msa", object_id);
   } else if (map_id.indexOf("ActiveLaborPressureStateMap") != -1) {
       var activeLaborPressureStateMap = ModulesManager.ModulesCollection.item("ActiveLaborPressureStateMSAMap");
       activeLaborPressureStateMap.HeatMapLocator.Select("state", object_id);
   } else if (map_id.indexOf("TotalLaborPressureMSAMap") != -1) {
       var laborPressureMSAMap = ModulesManager.ModulesCollection.item("TotalLaborPressureStateMSAMap");
       laborPressureMSAMap.HeatMapLocator.Select("msa", object_id);
   } else if (map_id.indexOf("TotalLaborPressureStateMap") != -1) {
       var laborPressureStateMap = ModulesManager.ModulesCollection.item("TotalLaborPressureStateMSAMap");
       laborPressureStateMap.HeatMapLocator.Select("state", object_id);
   }
}

var amMapPlotter = function () {
    var amMapPath = ScriptVariables.Get('amMapPath');
    var amMapFilePath = ScriptVariables.Get('amMapFilePath');
    var did = window.location.querystring["did"];
    var flashObj;
    var demandMSAMapobj = null, rdbMSAMapobj = null, supplyMSAMapobj = null, activeLaborPressureMSAMapobj = null, laborPressureMSAMapobj = null;
    return {
        InitializeMap: function (id) {
            if (id.indexOf("DemandMSAMap") != -1) {
                demandMSAMapobj = id;
            } else if (id.indexOf("ActiveSupplyMSAMap") != -1) {
                rdbMSAMapobj = id;
            } else if (id.indexOf("TotalSupplyMSAMap") != -1) {
                supplyMSAMapobj = id;
            } else if (id.indexOf("ActiveLaborPressureMSAMap") != -1) {
                activeLaborPressureMSAMapobj = id;
            } else if (id.indexOf("TotalLaborPressureMSAMap") != -1) {
                laborPressureMSAMapobj = id;
            }
        },
        drawMSAMap: function (contentType, controlID, chartID, filterData, extraParam) {
            var URL = null;
            if (extraParam != null) {
                URL = amMapFilePath + '?did=' + did + '&chart=msa' + '&content=' + contentType + '&filter=' + filterData + extraParam;
            } else {
                URL = amMapFilePath + '?did=' + did + '&chart=msa' + '&content=' + contentType + '&filter=' + filterData;
            }
            flashObj = new SWFObject(amMapPath + "ammap.swf", chartID, "432px", "220px", "8", "#ffffff");
            flashObj.addVariable("map_id", chartID);
            flashObj.addVariable("path", amMapPath);
            flashObj.addVariable("data_file", escape(URL));
            flashObj.addVariable("settings_file", escape(amMapPath + "mercator_Settings.xml"));
            flashObj.addVariable("loading_data", "Loading Data...");
            flashObj.addVariable("preloader_color", "#999999");
            flashObj.addParam("wmode", "transparent");
            flashObj.write(controlID);
        },
        drawStateMap: function (bIsMiniMap, controlID, chartID, dataXML, settingXML) {
            if (bIsMiniMap) {
                flashObj = new SWFObject(amMapPath + "ammap.swf", chartID, "360", "250px", "8", "#ffffff");
            } else {
                flashObj = new SWFObject(amMapPath + "ammap.swf", chartID, "475px", "242px", "8", "#ffffff");
            }
            flashObj.addVariable("map_id", chartID);
            flashObj.addVariable("path", amMapPath);
            flashObj.addVariable("map_data", encodeURIComponent(dataXML));
            flashObj.addVariable("map_settings", encodeURIComponent(settingXML));
            flashObj.addVariable("loading_data", "Loading Data...");
            flashObj.addVariable("preloader_color", "#999999");
            flashObj.addParam("wmode", "transparent");
            flashObj.write(controlID);
        },
        clickMapObject: function (id) {
            if (demandMSAMapobj != null) {
                flashMovie.clickObject(id);
            }
            if (supplyMSAMapobj != null) {
                flashMovie.clickObject(id);
            }
            if (rdbMSAMapobj != null) {
                flashMovie.clickObject(id);
            }
            if (laborPressureMSAMapobj != null) {
                flashMovie.clickObject(id);
            }
            if (activeLaborPressureMSAMapobj != null) {
                flashMovie.clickObject(id);
            }
        }
    };
} ();

var HeatMapModelLocator = function (tabID) {
    var selectedRow = null;
    var detailViewID = $("#" + tabID + " .HeatMapsWrapper").parent().attr("id");
    var contentType = 'demand';
    return {
        onDocumentReady: function () {
            $("#" + detailViewID + " .msaDetailContent .detailView tr").click(function () {
                if (selectedRow != $(this).attr("id")) {
                    $("#" + selectedRow).removeClass("selected");
                    selectedRow = $(this).attr("id");
                }
                $(this).attr("class", "selected");
                var locatorID = $(this).attr("id").split("_");
                amMapPlotter.clickMapObject(locatorID[1]);
            });
        },
        Select: function (map, id) {
            var locatorID = $("#" + detailViewID + " #" + map + "_" + id).attr("id");
            if (selectedRow != $("#" + detailViewID + " #" + locatorID).attr("id")) {
                $("#" + detailViewID + " #" + selectedRow).removeClass("selected");
                selectedRow = $("#" + detailViewID + " #" + locatorID).attr("id");
            }
            $("#" + detailViewID + " ." + map + "DetailContent").scrollTop(0);
            var rowPos = $("#" + detailViewID + " #" + locatorID).position().top;
            $("#" + detailViewID + " #" + locatorID).attr("class", "selected");
            var middlePos = $("#" + detailViewID + " ." + map + "DetailContent").height() / 2;
            $("#" + detailViewID + " ." + map + "DetailContent").scrollTop(rowPos - middlePos);
        }
    }
};   //end HeatMapModelLocator object

var FilterItem = function (id, value, text) {
    var item_id = id;
    var item_value = value;
    var item_text = text;
    return {
        get_id: function () { return item_id; },
        get_value: function () { return item_value; },
        get_text: function () { return item_text; }
    };
};

var ReportFilters = function (wrapperID) {
    var cacheDictionary = new Dictionary();
    var isNumericDataType = true;
    var parentWrapper = null;
    var searchedFor = '';

    function checkedFacetsToString() {
        var checkedList = '';
        var checkedFacets = cacheDictionary.toString();
        for (var i = 0; i < checkedFacets.length; ++i) {
            if (typeof checkedFacets[i] == 'object') {
                checkedList += checkedFacets[i].get_value();
                if (i < checkedFacets.length - 1) {
                    checkedList += "|";
                }
            }
        }
        return checkedList;
    };
    function addCacheFilter(id, value, text) {
        if (!cacheDictionary.exists(id)) {
            cacheDictionary.add(id, new FilterItem(id, value, text));
        }
    };
    function removeCacheFilter(id) {
        if (cacheDictionary.exists(id)) {
            cacheDictionary.remove(id);
        }
    };
    function checkBoxFilterHandler(checkBox) {
        if (parentWrapper == null) {
            parentWrapper = $("#" + wrapperID);
        }
        if (checkBox.attr("id").indexOf("TopEmployer") != -1 || checkBox.attr("id").indexOf("TopIndustry") != -1) {
            if (checkBox.is(':checked')) {
                cacheDictionary.remove("isstaffing:false");
            } else {
                cacheDictionary.add("isstaffing:false", new FilterItem("isstaffing:false", "isstaffing:false", "Include Staffing"));
            }
        } else {
            if (checkBox.is(':checked')) {
                var checkboxLabel = $("#" + wrapperID + " label[for=" + checkBox.attr("id") + "]").text();
                addCacheFilter(checkBox.attr("id"), checkBox.val(), checkboxLabel);
                if (cacheDictionary.count() > 0) {
                    parentWrapper.find("#searched-for").attr("class", "facet-ui");
                }
            } else {
                removeCacheFilter(checkBox.attr("id"));
                if (parentWrapper.find("#searched-for").attr("class") == "facet-ui") {
                     //parentWrapper.find("#searched-for" + " #" + checkBox.attr("id")).remove();
                    if (cacheDictionary.count() == 0 || (cacheDictionary.count() == 1 && checkedFacetsToString().indexOf("mmYY") != -1)) { //ingore if there is a heat map filter
                        parentWrapper.find("#searched-for").attr("class", "facet-ui inactive");
                    }
                }
            }
        }
    };
    function createPersistedFilters(obj) {
        try {
            // create searched for filters
            var facetName = obj.get_value().split(":")[0];
            var li = document.createElement("li");
            var newSpan = document.createElement("span");
            li.id = obj.get_id();
            li.appendChild(newSpan);

            var label = obj.get_text();
            if (label.indexOf("(") != -1) {
                newSpan.innerHTML = label;
            }
            parentWrapper.find("#searched-for" + " ul:first").append(li);

            // create check box filters
            li = document.createElement("li");
            var chkBoxHTML = '<input id="' + obj.get_id() + '" type="checkbox" checked="checked" value="' + obj.get_value() + '">';
            var labelHtml = '<label for="' + obj.get_id() + '">' + label.replace(/\'/g, '\'') + '</label>';
            li.innerHTML = chkBoxHTML + labelHtml;
            parentWrapper.find(".filter-content #" + facetName + " ul:first").append(li);
        }
        catch (err) { }
    };
    function persistFilters() {
        parentWrapper = $("#" + wrapperID);
        var checkedFacets = cacheDictionary.toString();
        for (var i = 0; i < checkedFacets.length; ++i) {
            if (typeof checkedFacets[i] == 'object') {
                var id = checkedFacets[i].get_id();
                var li = parentWrapper.find("#searched-for #" + id);
                if (li.length == 0) {
                    if (checkedFacets[i].get_id().indexOf("onetcode") != -1 && checkedFacets[i].get_text().length == 10) {
                        // ignore ONET filter creation if it has no description.
                    } else {
                        createPersistedFilters(checkedFacets[i]);
                    }
                } else {
                    // refresh persisted filter data such as count
                    var chkBox = parentWrapper.find(".filter-content #" + id);
                    removeCacheFilter(id);
                    checkBoxFilterHandler(chkBox);
                }
            }
        }
    };
    function clearAllFilters() {
        parentWrapper = $("#" + wrapperID);
        cacheDictionary = new Dictionary();
        //parentWrapper.find("#searched-for").attr("class", "facet-ui inactive");
		parentWrapper.find("#searched-for .searched-for-content, #searched-for .clearAll").hide();
    };
    return {
        set_numericDataType: function (value) { isNumericDataType = value; },
        get_numericDataType: function () { return isNumericDataType; },
        addFilter: function (id, value, text) {
            addCacheFilter(id, value, text);
        },
        removeFilter: function (value) {
            removeCacheFilter(value);
        },
        clearFilters: function () {
            clearAllFilters();
        },
        addNoStaffingFilter: function () {
            addCacheFilter("isstaffing:false", new FilterItem("isstaffing:false", "Include Staffing", ""));
        },
        removeNoStaffingFilter: function () {
            removeCacheFilter("isstaffing:false");
        },
        hasYesStaffingFilter: function () {
            return this.exists("isstaffing:true");
        },
        addCheckBoxFilterHandler: function (checkBox) {
            checkBoxFilterHandler(checkBox);
        },
        exists: function (value) {
            if (cacheDictionary.exists(value)) {
                return true;
            } else {
                return false;
            }
        },
        persistSearchedFilters: function () {
            persistFilters();
        },
        toString: function () {
            return checkedFacetsToString();
        },
        filtersCount: function () {
            return cacheDictionary.count();
        }
    }
}           // end filter object

var G_FANCYBOX_MODULE_PARENT_ID = null;
var DashboardModule = function (tabID, moduleID, fancyBoxParentID, contentName) {
    this.did = window.location.querystring["did"];
    this.filterList = ModulesManager.Filters.toString();
    this.contentName = contentName;
    this.chartName = null;
    this.tabID = tabID;
    this.moduleID = moduleID;
    this.parentID = fancyBoxParentID;
    this.fancyBox = $($("#" + fancyBoxParentID + " .viewReport").attr("href"));
    this.initialization = function () {
        $("#" + fancyBoxParentID + " .viewReport").fancybox({
            'overlayShow': false,
            'transitionIn': 'elastic',
            'transitionOut': 'elastic',
            'speedIn': '500',
            'speedOut': '500',
            'type': 'inline',
            'autoScale': 'true',
            'scrolling': 'no',
            'centerOnScroll': 'true',
            'onStart': function () {
                onStartEventHandler(fancyBoxParentID);
            },
            'onComplete': function () {
                onCompleteEventHandler(fancyBoxParentID);
            },
            'onClosed': function () {
                onClosedEventHandler(fancyBoxParentID);
            }
        });
    };
    this.requestData = function (chart) { };
    this.updateContent = function (results, contentName) {
        if (results.ErrorMessage != null) {
            showError(results.ErrorMessage);
        }
    };
    var onStartEventHandler = function (fancyBoxParentID) {
        $("#search-body").css("display", "none");
        $("#exportLink").css("display", "none");
    };
    var onCompleteEventHandler = function (fancyBoxParentID) {
        this.G_FANCYBOX_MODULE_PARENT_ID = fancyBoxParentID;
        ModulesManager.RefreshDetailHeatMapByMapID(fancyBoxParentID);
    };
    var onClosedEventHandler = function (fancyBoxParentID) {
        $("#search-body").css("display", "");
        $("#exportLink").css("display", "");
        ModulesManager.ResetHeatMapFilters();
        if (!ModulesManager.IsDemandStaffingFilterOn() && fancyBoxParentID.indexOf("employer-module") != -1) {
            ModulesManager.RemoveStaffingData();
        }
        this.G_FANCYBOX_MODULE_PARENT_ID = null;
    };
};            // end DashboardModule base object

var MiniLineChartModule = function (tabID, moduleID, fancyBoxParentID, contentName) {
    var self = this;
    this.prototype = new DashboardModule(tabID, moduleID, fancyBoxParentID, contentName);
    DashboardModule.call(this, tabID, moduleID, fancyBoxParentID, contentName);
    this.initialization = function () {
        self.initializeDropDownList();
        this.prototype.initialization();
    };
    this.initializeDropDownList = function () {
        if (contentName == ContentType.TotalSupply() || contentName == ContentType.TotalLaborPressure()) {
            $("#" + tabID + " .Occupation").change(function () {
                self.prototype.contentName = contentName;
                self.prototype.chartName = ChartType.SOCChange();
                self.requestData($(this).val());
            });
        }
    },
    this.requestData = function (socValue) {
        this.prototype.filterList = ModulesManager.Filters.toString();
        //AjaxProgressBar.showModalDialog();
        // var ajaxCall = $.ajax({
            // type: "POST",
            // url: ScriptVariables.Get('filterURL'),
            // data: { did: self.prototype.did,
                // filter: this.prototype.filterList,
                // soc: socValue,
                // chart: this.prototype.chartName,
                // content: this.prototype.contentName
            // },
            // success: function (response) {
                // var results = eval('(' + response + ')');
                // self.prototype.updateContent(results, contentName);
                // self.updateContent(results, self.prototype.contentName, ChartType.SOCChange());
                // AjaxProgressBar.closeDialog();
            // },
            // error: function (obj) {
                // showError($("#filterErrorMsg").html());
            // }
        // });
    };
    this.updateContent = function (results, contentName, chartName) {
        // update all mini trend charts
        if (contentName == ContentType.Demand() && results.miniDemandTrendLineDataXML != null) {
            amChartsPlotter.drawAmLineChart(true, "demandMiniTrendWrapper", "amMiniDemandLineChart", results.miniDemandTrendLineDataXML, results.miniDemandTrendLineSettingXML);
        }
        if (contentName == ContentType.TotalSupply() && results.miniSupplyLineTrendDataXML != null) {
            amChartsPlotter.drawAmLineChart(true, "supplyMiniTrendWrapper", "amMiniSupplyLineChart", results.miniSupplyLineTrendDataXML, results.miniSupplyLineTrendSettingXML);
        }
        if (contentName == ContentType.TotalLaborPressure() && results.miniLaborLineTrendDataXML != null) {
            amChartsPlotter.drawAmLineChart(true, "laborPressureMiniTrendWrapper", "amMiniLaborLineChart", results.miniLaborLineTrendDataXML, results.miniLaborLineTrendSettingXML);
        }
        if (contentName == ContentType.ActiveSupply() && results.miniActiveSupplyLineTrendDataXML != null) {
            amChartsPlotter.drawAmLineChart(true, "activeSupplyMiniTrendWrapper", "amMiniActiveSupplyLineChart", results.miniActiveSupplyLineTrendDataXML, results.miniActiveSupplyLineTrendSettingXML);
        }
        if (contentName == ContentType.ActiveLaborPressure() && results.miniActiveLaborLineTrendDataXML != null) {
            amChartsPlotter.drawAmLineChart(true, "activeLaborPressureMiniTrendWrapper", "amMiniActiveLaborLineChart", results.miniActiveLaborLineTrendDataXML, results.miniActiveLaborLineTrendSettingXML);
        }
        if (chartName != null) {
            // update soc changes modules
            if (contentName == ContentType.TotalSupply() && results.miniSupplyStateMapDataXML != null) {
                amMapPlotter.drawStateMap(true, "miniSupplyMapWrapper", "amSupplyMiniStateHeatMap", results.miniSupplyStateMapDataXML, results.miniSupplyStateMapSettingXML);
            }
            if (contentName == ContentType.TotalSupply() && results.supplyTrendLineDataXML != null) {
                amChartsPlotter.drawAmLineChart(false, "flashcontent_ucSupplyView_ucChart_amTrendLineChart", "amSupplyTrendLineChart", results.supplyTrendLineDataXML, results.supplyTrendLineSettingXML);
            }
            if (contentName == ContentType.TotalSupply() && results.supplyYOYLineDataXML != null) {
                amChartsPlotter.drawAmLineChart(false, "flashcontent_ucSupplyView_ucChart_amYOYLineChart", "amSupplyYOYLineChart", results.supplyYOYLineDataXML, results.supplyYOYLineSettingXML);
            }
            if (contentName == ContentType.TotalSupply() && results.supplyNumericTrendData != null) {
                var numtableViewObj = $("#ucSupplyView_ucChart_pnlTableView .litNumericTableView");
                updateTrendTableView(ContentType.TotalSupply(), numtableViewObj, results.supplyNumericTrendData);
            }
            if (contentName == ContentType.TotalLaborPressure() && results.miniLaborStateMapDataXML != null) {
                amMapPlotter.drawStateMap(true, "miniLaborMapWrapper", "amLaborMiniStateHeatMap", results.miniLaborStateMapDataXML, results.miniLaborStateMapSettingXML);
            }
            if (contentName == ContentType.TotalLaborPressure() && results.laborTrendLineDataXML != null) {
                amChartsPlotter.drawAmLineChart(false, "flashcontent_ucLaborPressureView_ucChart_amTrendLineChart", "amLaborTrendLineChart", results.laborTrendLineDataXML, results.laborTrendLineSettingXML);
            }
            if (contentName == ContentType.TotalLaborPressure() && results.laborYOYLineDataXML != null) {
                amChartsPlotter.drawAmLineChart(false, "flashcontent_ucLaborPressureView_ucChart_amYOYLineChart", "amLaborYOYLineChart", results.laborYOYLineDataXML, results.laborYOYLineSettingXML);
            }
            if (contentName == ContentType.TotalLaborPressure() && results.laborNumericTrendData != null) {
                var numtableViewObj = $("#ucLaborPressureView_ucChart_pnlTableView .litNumericTableView");
                updateTrendTableView(ContentType.TotalLaborPressure(), numtableViewObj, results.laborNumericTrendData);
            }
            if (results.ChosenSOC != null) {
                $('.Occupation option[value="' + results.ChosenSOC + '"]').attr("selected", "selected");
            }
        }
    }
};

var MiniTopCategoryModule = function (tabID, moduleID, fancyBoxParentID, contentName) {
    this.prototype = new DashboardModule(tabID, moduleID, fancyBoxParentID, contentName);
    DashboardModule.call(this, tabID, moduleID, fancyBoxParentID, contentName);
    this.updateContent = function (results, contentName) {
        if (contentName == ContentType.Demand() && results.barTopEmployerDataXML != null) {
            amChartsPlotter.drawAmBarChart(false, "flashcontent_ucDemandView_barMiniEmployerChart_barMiniCategory", "ucDemandView_barMiniEmployerChart_barMiniCategory", results.barTopEmployerDataXML, results.barTopEmployerSettingXML);
        }
        if (contentName == ContentType.Demand() && results.barJobTitleDataXML != null) {
            amChartsPlotter.drawAmBarChart(false, "flashcontent_ucDemandView_barMiniJobTitleChart_barMiniCategory", "ucDemandView_barMiniJobTitleChart_barMiniCategory", results.barJobTitleDataXML, results.barJobTitleSettingXML);
        }
        if (contentName == ContentType.Demand() && results.barDemandCityStateDataXML != null) {
            amChartsPlotter.drawAmBarChart(false, "flashcontent_ucDemandView_barMiniCityStateChart_barMiniCategory", "ucDemandView_barMiniCityStateChart_barMiniCategory", results.barDemandCityStateDataXML, results.barDemandCityStateSettingXML);
        }
        if (contentName == ContentType.ActiveLaborPressure() && results.miniActiveLaborCityStateBarDataXML != null) {
            amChartsPlotter.drawAmBarChart(false, "flashcontent_ucLaborPressureView_barMiniCityStateChart_barMiniCategory", "ucLaborPressureView_barMiniCityStateChart_barMiniCategory", results.miniActiveLaborCityStateBarDataXML, results.miniActiveLaborCityStateBarSettingXML);
        }
    }
};

var MiniMapModule = function (tabID, moduleID, fancyBoxParentID, contentName) {
    this.prototype = new DashboardModule(tabID, moduleID, fancyBoxParentID, contentName);
    DashboardModule.call(this, tabID, moduleID, fancyBoxParentID, contentName);
    this.updateContent = function (results, contentName) {
        if (contentName == ContentType.Demand() && results.miniDemandStateMapDataXML != null) {
            amMapPlotter.drawStateMap(true, "miniDemandMapWrapper", "amMiniDemandStateHeatMap", results.miniDemandStateMapDataXML, results.miniDemandStateMapSettingXML);
        }
        if (contentName == ContentType.TotalSupply() && results.miniSupplyStateMapDataXML != null) {
            amMapPlotter.drawStateMap(true, "miniSupplyMapWrapper", "amSupplyMiniStateHeatMap", results.miniSupplyStateMapDataXML, results.miniSupplyStateMapSettingXML);
        }
        if (contentName == ContentType.ActiveSupply() && results.miniActiveSupplyStateMapDataXML != null) {
            amMapPlotter.drawStateMap(true, "miniRDBMapWrapper", "amRDBMiniStateHeatMap", results.miniActiveSupplyStateMapDataXML, results.miniActiveSupplyStateMapSettingXML);
        }
        if (contentName == ContentType.TotalLaborPressure() && results.miniLaborStateMapDataXML != null) {
            amMapPlotter.drawStateMap(true, "miniLaborMapWrapper", "amLaborMiniStateHeatMap", results.miniLaborStateMapDataXML, results.miniLaborStateMapSettingXML);
        }
        if (contentName == ContentType.ActiveLaborPressure() && results.miniActiveLaborStateMapDataXML != null) {
            amMapPlotter.drawStateMap(true, "miniActiveLaborMapWrapper", "amActiveLaborMiniStateHeatMap", results.miniActiveLaborStateMapDataXML, results.miniActiveLaborStateMapSettingXML);
        }
    }
};

var DetailTrendYOYModule = function (tabID, moduleID, fancyBoxParentID, contentName) {
    this.prototype = new DashboardModule(tabID, moduleID, fancyBoxParentID, contentName);
    DashboardModule.call(this, tabID, moduleID, fancyBoxParentID, contentName);
    var ajaxCall, self = this;
    var _lineChartWrapper = null;
    var searchType = window.location.querystring["st"];
    this.initialization = function () {
        if (this.prototype.contentName == ContentType.ActiveSupply()) {
            _lineChartWrapper = $("#" + tabID + " #rdb-detail-view .LineChartsWrapper");
        } else if (this.prototype.contentName == ContentType.TotalSupply()) {
            _lineChartWrapper = $("#" + tabID + " #supply-detail-view .LineChartsWrapper");
        } else if (this.prototype.contentName == ContentType.TotalLaborPressure()) {
            _lineChartWrapper = $("#" + tabID + " #labor-detail-view .LineChartsWrapper");
        } else if (this.prototype.contentName == ContentType.ActiveLaborPressure()) {
            _lineChartWrapper = $("#" + tabID + " #activeLP-detail-view .LineChartsWrapper");
        } else {
            _lineChartWrapper = $("#" + tabID + " .LineChartsWrapper");
        }
        $("#" + tabID + " .TrendYOYtabs").tabs({
            select: function (event, ui) {
                if (ui.index == 1) {
                    var bIsNumeric = !(_lineChartWrapper.find(".LineYOYRawData input:checkbox").is(':checked'));
                    ModulesManager.Filters.set_numericDataType(bIsNumeric);
                }
            }
        });
        _lineChartWrapper.find(".LineYOYRawData input:checkbox").click(function (evt) {
            _lineChartWrapper.find(".YOYfilterNote").toggle();
            var bIsNumeric = !(_lineChartWrapper.find(".LineYOYRawData input:checkbox").is(':checked'));
            ModulesManager.Filters.set_numericDataType(bIsNumeric);
            self.requestData(ChartType.YOY());
        });
    };
    this.requestData = function (chartName) {
        this.prototype.filterList = ModulesManager.Filters.toString();
        var dataType = ModulesManager.Filters.get_numericDataType();
        var ajaxURL = AJAXRequest.URL(this.prototype.contentName);
        //AjaxProgressBar.showModalDialog();
        // var ajaxCall = $.ajax({
            // type: "POST",
            // url: ajaxURL,
            // data: { did: this.prototype.did,
                // filter: this.prototype.filterList,
                // data: dataType, chart: chartName,
                // content: this.prototype.contentName,
                // soc: AJAXRequest.SOC()
            // },
            // success: function (response) {
                // var results = eval('(' + response + ')');
                // self.prototype.updateContent(results, contentName);
                // self.updateContent(results, self.prototype.contentName);
                // AjaxProgressBar.closeDialog();
            // },
            // error: function (obj) {
                // showError($("#filterErrorMsg").html());
            // }
        // });
    };
    this.updateContent = function (results, contentName) {
        if (contentName == ContentType.Demand() && results.demandTrendLineDataXML != null) {
            amChartsPlotter.drawAmLineChart(false, "flashcontent_ucDemandView_ucChart_amTrendLineChart", "amDemandTrendLineChart", results.demandTrendLineDataXML, results.demandTrendLineSettingXML);
        }
        if (contentName == ContentType.Demand() && results.demandYOYLineDataXML != null) {
            amChartsPlotter.drawAmLineChart(false, "flashcontent_ucDemandView_ucChart_amYOYLineChart", "amDemandYOYLineChart", results.demandYOYLineDataXML, results.demandYOYLineSettingXML);
        }
        if (contentName == ContentType.ActiveSupply() && results.activeSupplyTrendLineDataXML != null) {
            amChartsPlotter.drawAmLineChart(false, "flashcontent_ucSupplyView_ucActiveChart_amTrendLineChart", "amActiveSupplyTrendLineChart", results.activeSupplyTrendLineDataXML, results.activeSupplyTrendLineSettingXML);
        }
        if (contentName == ContentType.ActiveSupply() && results.activeSupplyYOYLineDataXML != null) {
            amChartsPlotter.drawAmLineChart(false, "flashcontent_ucSupplyView_ucActiveChart_amYOYLineChart", "amActiveSupplyYOYLineChart", results.activeSupplyYOYLineDataXML, results.activeSupplyYOYLineSettingXML);
        }
        if (contentName == ContentType.TotalSupply() && results.supplyTrendLineDataXML != null) {
            amChartsPlotter.drawAmLineChart(false, "flashcontent_ucSupplyView_ucChart_amTrendLineChart", "amSupplyTrendLineChart", results.supplyTrendLineDataXML, results.supplyTrendLineSettingXML);
        }
        if (contentName == ContentType.TotalSupply() && results.supplyYOYLineDataXML != null) {
            amChartsPlotter.drawAmLineChart(false, "flashcontent_ucSupplyView_ucChart_amYOYLineChart", "amSupplyYOYLineChart", results.supplyYOYLineDataXML, results.supplyYOYLineSettingXML);
        }
        if (contentName == ContentType.TotalLaborPressure() && results.laborTrendLineDataXML != null) {
            amChartsPlotter.drawAmLineChart(false, "flashcontent_ucLaborPressureView_ucChart_amTrendLineChart", "amLaborTrendLineChart", results.laborTrendLineDataXML, results.laborTrendLineSettingXML);
        }
        if (contentName == ContentType.TotalLaborPressure() && results.laborYOYLineDataXML != null) {
            amChartsPlotter.drawAmLineChart(false, "flashcontent_ucLaborPressureView_ucChart_amYOYLineChart", "amLaborYOYLineChart", results.laborYOYLineDataXML, results.laborYOYLineSettingXML);
        }
        if (contentName == ContentType.ActiveLaborPressure() && results.activeLaborTrendLineDataXML != null) {
            amChartsPlotter.drawAmLineChart(false, "flashcontent_ucLaborPressureView_ucActiveLPChart_amTrendLineChart", "amActiveYOYLineChart", results.activeLaborTrendLineDataXML, results.activeLaborTrendLineSettingXML);
        }
        if (contentName == ContentType.ActiveLaborPressure() && results.activeLaborYOYLineDataXML != null) {
            amChartsPlotter.drawAmLineChart(false, "flashcontent_ucLaborPressureView_ucActiveLPChart_amYOYLineChart", "amActiveLaborYOYLineChart", results.activeLaborYOYLineDataXML, results.activeLaborYOYLineSettingXML);
        }
        var numtableViewObj = _lineChartWrapper.find(".litNumericTableView");
        if (contentName == ContentType.Demand() && results.demandNumericTrendData != null) {
            updateTrendTableView(this.prototype.contentName, numtableViewObj, results.demandNumericTrendData);
        }
        if (contentName == ContentType.TotalSupply() && results.supplyNumericTrendData != null) {
            updateTrendTableView(this.prototype.contentName, numtableViewObj, results.supplyNumericTrendData);
        }
        if (contentName == ContentType.ActiveSupply() && results.activeSupplyNumericTrendData != null) {
            updateTrendTableView(this.prototype.contentName, numtableViewObj, results.activeSupplyNumericTrendData);
        }
        if (contentName == ContentType.TotalLaborPressure() && results.laborNumericTrendData != null) {
            updateTrendTableView(this.prototype.contentName, numtableViewObj, results.laborNumericTrendData);
        }
        if (contentName == ContentType.ActiveLaborPressure() && results.activeLaborNumericTrendData != null) {
            updateTrendTableView(this.prototype.contentName, numtableViewObj, results.activeLaborNumericTrendData);
        }
    }
};

var DetailTopCategoryModule = function (tabID, moduleID, fancyBoxParentID, contentName) {
    this.prototype = new DashboardModule(tabID, moduleID, fancyBoxParentID, contentName);
    var ajaxCall, self = this, bIncludeStaffing = false;
    DashboardModule.call(this, tabID, moduleID, fancyBoxParentID, contentName);
    this.initialization = function () {
        if (this.prototype.contentName == ContentType.Demand()) {
            $("#demand-employer-detail-view .filters input:checkbox").click(function (evt) {
                bIncludeStaffing = $(this).is(":checked");
                ModulesManager.Filters.addCheckBoxFilterHandler($(this));
                if ($(this).attr("id").indexOf("TopEmployer") != -1) {
                    self.requestData(ChartType.TopEmployer(), ContentType.Demand());
                } else if ($(this).attr("id").indexOf("TopIndustry") != -1) {
                    self.requestData(ChartType.TopIndustry(), ContentType.Demand());
                }
            });
        }
    };
    this.requestData = function (chartName, contentName) {
        this.prototype.filterList = ModulesManager.Filters.toString();
        var ajaxURL = AJAXRequest.URL(contentName);
        //AjaxProgressBar.showModalDialog();
        // var ajaxCall = $.ajax({
            // type: "POST",
            // url: ajaxURL,
            // data: { did: this.prototype.did,
                // filter: this.prototype.filterList,
                // chart: chartName,
                // content: contentName
            // },
            // success: function (response) {
                // var results = eval('(' + response + ')');
                // self.prototype.updateContent(results, contentName);
                // self.updateContent(results, self.prototype.contentName);
                // AjaxProgressBar.closeDialog();
            // },
            // error: function (obj) {
                // showError($("#filterErrorMsg").html());
            // }
        // });
    };
    this.updateContent = function (results, contentName) {
        if (contentName == ContentType.Demand() && results.barTopEmployerDataXML != null) {
            amChartsPlotter.drawAmBarChart(false, "flashcontent_ucDemandView_ucTopEmployer_amTopCategory", "ucDemandView_ucTopEmployer_amTopCategory", results.barTopEmployerDataXML, results.barTopEmployerSettingXML);
            amChartsPlotter.drawAmBarChart(false, "flashcontent_ucDemandView_barMiniEmployerChart_barMiniCategory", "ucDemandView_barMiniEmployerChart_barMiniCategory", results.barTopEmployerDataXML, results.barTopEmployerSettingXML);
        }
        if (contentName == ContentType.Demand() && results.barJobTitleDataXML != null) {
            amChartsPlotter.drawAmBarChart(false, "flashcontent_ucDemandView_ucTopJobTitle_amTopCategory", "ucDemandView_ucTopJobTitle_amTopCategory", results.barJobTitleDataXML, results.barJobTitleSettingXML);
        }
        if (contentName == ContentType.Demand() && results.barIndustryDataXML != null) {
            amChartsPlotter.drawAmBarChart(false, "flashcontent_ucDemandView_ucTopIndustry_amTopCategory", "ucDemandView_ucTopIndustry_amTopCategory", results.barIndustryDataXML, results.barIndustrySettingXML);
        }
        if (contentName == ContentType.Demand() && results.barDemandCityStateDataXML != null) {
            amChartsPlotter.drawAmBarChart(false, "flashcontent_ucDemandView_ucTopCityState_amTopCategory", "ucDemandView_ucTopCityState_amTopCategory", results.barDemandCityStateDataXML, results.barDemandCityStateSettingXML);
        }
        if (contentName == ContentType.ActiveLaborPressure() && results.barActiveLaborCityStateDataXML != null) {
            amChartsPlotter.drawAmBarChart(false, "flashcontent_ucLaborPressureView_ucTopCityState_amTopCategory", "ucLaborPressureView_ucTopCityState_amTopCategory", results.barActiveLaborCityStateDataXML, results.barActiveLaborCityStateSettingXML);
        }
        if (contentName == ContentType.Demand() && results.barTopEmployerDetailHTML != null) {
            $("#ucDemandView_ucTopEmployer_pnlDetailWrapper").html(results.barTopEmployerDetailHTML);
        }
        if (contentName == ContentType.Demand() && results.barIndustryDetailHTML != null) {
            $("#ucDemandView_ucTopIndustry_pnlDetailWrapper").html(results.barIndustryDetailHTML);
        }
        if (contentName == ContentType.Demand() && results.barJobTitleDetailHTML != null) {
            $("#ucDemandView_ucTopJobTitle_pnlDetailWrapper").html(results.barJobTitleDetailHTML);
        }
        if (contentName == ContentType.Demand() && results.barDemandCityStateDetailHTML != null) {
            $("#ucDemandView_ucTopCityState_pnlDetailWrapper").html(results.barDemandCityStateDetailHTML);
        }
        if (contentName == ContentType.ActiveLaborPressure() && results.barActiveLaborCityStateDetailHTML != null) {
            $("#ucLaborPressureView_ucTopCityState_pnlDetailWrapper").html(results.barActiveLaborCityStateDetailHTML);
        }
    };
    this.resetStaffingCheckboxes = function () {
        $("#demand-employer-detail-view .filters input:checkbox").each(function () {
            this.checked = false;
        });
    }
    this.IsIncludeStaffing = function () {
        return bIncludeStaffing;
    }
};

var DetailHeatMapModule = function (tabID, moduleID, fancyBoxParentID, contentName) {
    this.prototype = new DashboardModule(tabID, moduleID, fancyBoxParentID, contentName);
    DashboardModule.call(this, tabID, moduleID, fancyBoxParentID, contentName);

    var ajaxCall, self = this, isMSAMapInitial = false, isStateMapInitial = true;
    var mapLocator = new HeatMapModelLocator(tabID);
    var heatMapWrapper = $("#" + tabID + " .HeatMapsWrapper");
    var iReportDateMonthDiff = ScriptVariables.Get('ReportDateMonthDiff');
    var currentSelectedFilter = 'mmYY:-' + iReportDateMonthDiff;
    this.initialization = function () {
        mapLocator.onDocumentReady();
        var detailViewID = heatMapWrapper.parent().attr("id");

        $("#" + tabID + " select[id$='ddlXOverY" + ChartType.StateMap() + "']").change(function () {
            var method = $(this).attr("id");
            var task = $(this).find("option:selected").text();
            
            CB.Tally('SupplyDemand', method, task);
            self.refreshHeatMaps(detailViewID, 0);
        });
        $("#" + tabID + " select[id$='ddlXOverY" + ChartType.MSAMap() + "']").change(function () {
            var method = $(this).attr("id");
            var task = $(this).find("option:selected").text();
            CB.Tally('SupplyDemand', method, task);
            self.refreshHeatMaps(detailViewID, 1);
        });
        $("#" + tabID + " .MapsTabs").tabs({
            select: function (event, ui) {
                if (ui.index == 1) {
                    if (!isMSAMapInitial) {
                        self.refreshHeatMaps(detailViewID, ui.index);
                        isMSAMapInitial = true;
                    } else { // Map Shrink in IE so we have to redraw
                        if ($.browser.msie) {
                            self.refreshHeatMaps(detailViewID, ui.index);
                        }
                    }
                } else if (ui.index == 0) {

                }
            }
        });


    };
    this.HeatMapLocator = mapLocator,
    this.resetMapFilters = function () {
        ModulesManager.Filters.removeFilter(currentSelectedFilter);
    };
    this.refreshHeatMaps = function (detailViewID, tabSelectedIndex) {
        if (tabSelectedIndex != null) {
            if (tabSelectedIndex == 0) {
                ModulesManager.Filters.addFilter(currentSelectedFilter, currentSelectedFilter, "");
                this.requestData(ChartType.StateMap(), self.prototype.contentName);

            } else if (tabSelectedIndex == 1) {
                ModulesManager.Filters.addFilter(currentSelectedFilter, currentSelectedFilter, "");
                this.requestData(ChartType.MSAMap(), self.prototype.contentName);
            }
        } else {
            var selected = $("#" + detailViewID + " .MapsTabs").tabs().tabs('option', 'selected');
            if (selected == 0) {
                ModulesManager.Filters.addFilter(currentSelectedFilter, currentSelectedFilter, "");
                this.requestData(ChartType.StateMap(), self.prototype.contentName);
                if (isStateMapInitial) {
                    isStateMapInitial = false;
                }



            } else if (selected == 1) {
                ModulesManager.Filters.addFilter(currentSelectedFilter, currentSelectedFilter, "");
                this.requestData(ChartType.MSAMap(), self.prototype.contentName);

            }
        }

    };
    this.updateDetailHeader = function (dropDownvalue, mapTypeID) {
        var selectedMonthYearText
        var selectedLeftBoundMonth = moment().subtract('months', ScriptVariables.Get('ReportDateMonthDiff')).subtract('months', Math.abs(dropDownvalue));
        var selectedMostRecentMonth = moment().subtract('months', ScriptVariables.Get('ReportDateMonthDiff'))
        if (dropDownvalue == -1) {
            selectedMonthYearText = selectedMostRecentMonth.format("MMM, YYYY");
        } else {
            selectedLeftBoundMonth.add('months', 1);
            selectedMonthYearText = selectedLeftBoundMonth.format("MMM, YYYY") + " -<br /> " + selectedMostRecentMonth.format("MMM, YYYY");
        }

        var previousMonthYearText
        var previousRightBoundMonth = selectedLeftBoundMonth.subtract('months', 1);
        var previousLeftBoundMonth = moment(new Date(previousRightBoundMonth.format("YYYY/MM/DD"))).subtract('months', Math.abs(dropDownvalue));
        if (dropDownvalue == -1) {
            selectedLeftBoundMonth.add('months', 1);
            previousMonthYearText = selectedLeftBoundMonth.format("MMM, YYYY");
        } else {
            previousLeftBoundMonth.add('months', 1);
            previousMonthYearText = previousLeftBoundMonth.format("MMM, YYYY") + " -<br /> " + previousRightBoundMonth.format("MMM, YYYY");
        }

        heatMapWrapper.find("." + mapTypeID + "SelectedMonthHeader").html(selectedMonthYearText);
        heatMapWrapper.find("." + mapTypeID + "LastMonthHeader").html(previousMonthYearText);
    },
    this.requestData = function (chartName, contentName) {
        this.prototype.filterList = ModulesManager.Filters.toString();
        var ajaxURL = AJAXRequest.URL(contentName);
        var DropDownVal = -1;
        DropDownVal = $("#" + tabID + " select[id$='ddlXOverY" + chartName + "']").val();
        if (DropDownVal == '') {
            DropDownVal = -1;
        }
        //AjaxProgressBar.showModalDialog();
        // var ajaxCall = $.ajax({
            // type: "POST",
            // url: ajaxURL,
            // data: { did: this.prototype.did,
                // filter: this.prototype.filterList,
                // chart: chartName,
                // content: this.prototype.contentName,
                // soc: AJAXRequest.SOC(),
                // xxYY: DropDownVal
            // },
            // success: function (response) {
                // var results = eval('(' + response + ')');
                // self.prototype.updateContent(results, contentName);
                // self.updateContent(results, contentName, chartName, AJAXRequest.SOC());
                // self.updateDetailHeader(DropDownVal, chartName);
                // AjaxProgressBar.closeDialog();
            // },
            // error: function (obj) {
                // showError($("#filterErrorMsg").html());
            // }
        // });
    };
    this.updateContent = function (results, contentName, chartName, socName) {
        if (G_FANCYBOX_MODULE_PARENT_ID != null) { // renders on demand
            if (chartName == ChartType.StateMap()) {
                var stateMapWrapperID = $("#" + self.prototype.tabID + " .state-heatmap").attr("id");
                var stateMapID = AJAXRequest.StateMapID(contentName);
                if (results.StateMapDataXML != null && results.StateMapDetailHTML != null) {
                    amMapPlotter.drawStateMap(false, stateMapWrapperID, stateMapID, results.StateMapDataXML, results.StateMapSettingXML);
                    $("#" + self.prototype.tabID + " .stateDetailContent").html(results.StateMapDetailHTML);
                    ModulesManager.Filters.removeFilter(currentSelectedFilter);
                }
            } else if (chartName == ChartType.MSAMap()) {
                var msaMapWrapperID = $("#" + self.prototype.tabID + " .msa-heatmap").attr("id");
                var msaMapID = AJAXRequest.MSAMapID(contentName);
                var extraPara = "&soc=" + socName;
                if (results.MSAMapDetailHTML != null) {
                    $("#" + self.prototype.tabID + " .msaDetailContent").html(results.MSAMapDetailHTML);
                    self.HeatMapLocator.onDocumentReady();
                }
                var DropDownVal = $("#" + tabID + " select[id$='ddlXOverY" + chartName + "']").val();

                if (DropDownVal == '')
                    DropDownVal = -1;
                extraPara += "&xxYY=" + DropDownVal;
                extraPara += "&mmYY=" + currentSelectedFilter;
                amMapPlotter.drawMSAMap(this.prototype.contentName, msaMapWrapperID, msaMapID, ModulesManager.Filters.toString(), extraPara);
                ModulesManager.Filters.removeFilter(currentSelectedFilter);
            }
        }
    }
};               // end DetailHeatMapModule object

var AjaxProgressBar = function () {
    return {
        showFacetUpdate: function (obj, parentID) {
            var parentWrapper = $("#" + parentID);
            var selectedFacetToggle = obj.parent().parent().prev(".toggle");
            var selectedToggleHTML = selectedFacetToggle.html();
            parentWrapper.find("#searched-for .clearAll").attr("class", "clearAll inactive");
            parentWrapper.find(".searched-for-content").html($("#searchedForLoading").html());
            parentWrapper.find(".toggle").html($("#nonFilteredLoading").html());
            parentWrapper.find("#feature-tips").attr("class", "facet-ui");
            selectedFacetToggle.html(selectedToggleHTML);
        },
        showModalDialog: function () {
            $("#retrievingData").dialog({ modal: true, resizable: false, autoOpen: false, draggable: false, open: function (event, ui) { $(".ui-dialog-titlebar-close").hide(); } });
            $("#retrievingData").dialog('open');
        },
        showDialog: function (bShowOverlay) {
            if (bShowOverlay != null && bShowOverlay == true) {
                var overlayLeft = $("#TabsContent").position().left + 15;
                var overlayTop = $("#TabsContent").position().top;
                var overlayWidth = $("#TabsContent").width() + 10;
                var overlayHeight = $("#TabsContent").height() + 10;
                $("#overlayupdate").css("display", "block")
                $("#overlayupdate").css("left", overlayLeft);
                $("#overlayupdate").css("top", overlayTop);
                $("#overlayupdate").css("width", overlayWidth);
                $("#overlayupdate").css("height", overlayHeight);
            }
            $("#retrievingData").dialog({ modal: false, resizable: false, autoOpen: false, draggable: false, open: function (event, ui) { $(".ui-dialog-titlebar-close").hide(); } });
            $("#retrievingData").dialog('open');
        },
        closeDialog: function () {
            $("#retrievingData").dialog('close');
            $("#overlayupdate").css("display", "none")
            $("#feature-tips").attr("class", "facet-ui inactive");
        }
    }
} ();

var ModulesManager = function () {
    var facetSummaryWrapperID = "facetSummary";
    var facetsummaryWrapper = null;
    var oModulesCollection = new Dictionary();
    var ajaxDelayInterval = null, ajaxRequest = null;
    var ofilterManager = new ReportFilters(facetSummaryWrapperID);

    function init() {
        //adding demand modules
        var oMiniDemandMiniTrend = new MiniLineChartModule("DemandViewContent", "demandMiniTrendChart", "job-volume-module", ContentType.Demand());
        oModulesCollection.add(oMiniDemandMiniTrend.prototype.moduleID, oMiniDemandMiniTrend);

        var oMiniDemandTopEmployer = new MiniTopCategoryModule("DemandViewContent", "flashcontent_ucDemandView_barMiniEmployerChart_barMiniCategory", "demand-employer-module", ContentType.Demand());
        oModulesCollection.add(oMiniDemandTopEmployer.prototype.moduleID, oMiniDemandTopEmployer);

        var oMiniDemandTopJobTitle = new MiniTopCategoryModule("DemandViewContent", "flashcontent_ucDemandView_barMiniJobTitleChart_barMiniCategory", "demand-jobtitle-module", ContentType.Demand());
        oModulesCollection.add(oMiniDemandTopJobTitle.prototype.moduleID, oMiniDemandTopJobTitle);

        var oMiniDemandTopCityState = new MiniTopCategoryModule("DemandViewContent", "flashcontent_ucDemandView_barMiniCityStateChart_barMiniCategory", "demand-citystate-module", ContentType.Demand());
        oModulesCollection.add(oMiniDemandTopCityState.prototype.moduleID, oMiniDemandTopCityState);

        var oMiniDemandMap = new MiniMapModule("DemandViewContent", "miniDemandMapWrapper", "demand-map-module", ContentType.Demand());
        oModulesCollection.add(oMiniDemandMap.prototype.moduleID, oMiniDemandMap);

        var oDetailJobVolume = new DetailTrendYOYModule("DemandViewContent", "flashcontent_ucDemandView_ucChart_amTrendLineChart", "job-volume-module", ContentType.Demand());
        oModulesCollection.add(oDetailJobVolume.prototype.moduleID, oDetailJobVolume);

        var oDetailDemandTopCategories = new DetailTopCategoryModule("DemandViewContent", "demandTopCategories", null, ContentType.Demand()); // this represent all top demand categories
        oModulesCollection.add(oDetailDemandTopCategories.prototype.moduleID, oDetailDemandTopCategories);

        var oDetailDemandHeatMap = new DetailHeatMapModule("demand-map-detail-view", "DemandStateMSAMap", "demand-map-module", ContentType.Demand());
        oModulesCollection.add(oDetailDemandHeatMap.prototype.moduleID, oDetailDemandHeatMap);

        //adding supply modules
        var oMiniSupplyChart = new MiniLineChartModule("SupplyViewContent", "supplyMiniTrendChart", "supply-volume-module", ContentType.TotalSupply());
        oModulesCollection.add(oMiniSupplyChart.prototype.moduleID, oMiniSupplyChart);

        var oMiniSupplyMap = new MiniMapModule("SupplyViewContent", "miniSupplyMapWrapper", "supply-map-module", ContentType.TotalSupply());
        oModulesCollection.add(oMiniSupplyMap.prototype.moduleID, oMiniSupplyMap);

        var oDetailSupplyVolume = new DetailTrendYOYModule("SupplyViewContent", "ucSupplyView_ucChart_amTrendLineChart", "supply-volume-module", ContentType.TotalSupply());
        oModulesCollection.add(oDetailSupplyVolume.prototype.moduleID, oDetailSupplyVolume);

        var oDetailSupplyMap = new DetailHeatMapModule("supply-map-detail-view", "TotalSupplyStateMSAMap", "supply-map-module", ContentType.TotalSupply());
        oModulesCollection.add(oDetailSupplyMap.prototype.moduleID, oDetailSupplyMap);

        // adding rdb modules
        var oMiniRDBTrendChart = new MiniLineChartModule("SupplyViewContent", "rdbMiniTrendChart", "rdb-volume-module", ContentType.ActiveSupply());
        oModulesCollection.add(oMiniRDBTrendChart.prototype.moduleID, oMiniRDBTrendChart);

        var oMiniRDBMap = new MiniMapModule("SupplyViewContent", "miniRDBMapWrapper", "rdb-map-module", ContentType.ActiveSupply());
        oModulesCollection.add(oMiniRDBMap.prototype.moduleID, oMiniRDBMap);

        var oDetailRDBTrendVolume = new DetailTrendYOYModule("SupplyViewContent", "ucSupplyView_ucActiveChart_amTrendLineChart", "rdb-volume-module", ContentType.ActiveSupply());
        oModulesCollection.add(oDetailRDBTrendVolume.prototype.moduleID, oDetailRDBTrendVolume);

        var oDetailRDBTopCategories = new DetailTopCategoryModule("SupplyViewContent", "rdbTopCategories", null, ContentType.ActiveSupply()); // this represent all top active supply categories
        oModulesCollection.add(oDetailRDBTopCategories.prototype.moduleID, oDetailRDBTopCategories);

        var oDetailRDBMap = new DetailHeatMapModule("rdb-map-detail-view", "ActiveSupplyStateMSAMap", "rdb-map-module", ContentType.ActiveSupply());
        oModulesCollection.add(oDetailRDBMap.prototype.moduleID, oDetailRDBMap);

        //adding labor pressure modules
        var oMiniLaborPressureChart = new MiniLineChartModule("LaborPressureViewContent", "laborPressureMiniTrendChart", "labor-volume-module", ContentType.TotalLaborPressure());
        oModulesCollection.add(oMiniLaborPressureChart.prototype.moduleID, oMiniLaborPressureChart);

        var oDetailLaborPressureVolume = new DetailTrendYOYModule("LaborPressureViewContent", "ucLaborPressureView_ucChart_amTrendLineChart", "labor-volume-module", ContentType.TotalLaborPressure());
        oModulesCollection.add(oDetailLaborPressureVolume.prototype.moduleID, oDetailLaborPressureVolume);

        var oMiniLaborPressureMap = new MiniMapModule("LaborPressureViewContent", "miniLaborMapWrapper", "labor-map-module", ContentType.TotalLaborPressure());
        oModulesCollection.add(oMiniLaborPressureMap.prototype.moduleID, oMiniLaborPressureMap);

        var oDetailLaborPressureMap = new DetailHeatMapModule("labor-map-detail-view", "TotalLaborPressureStateMSAMap", "labor-map-module", ContentType.TotalLaborPressure());
        oModulesCollection.add(oDetailLaborPressureMap.prototype.moduleID, oDetailLaborPressureMap);

        //adding active labor pressure modules
        var oMiniActiveLaborPressureChart = new MiniLineChartModule("LaborPressureViewContent", "activeLPMiniTrendChart", "activeLP-volume-module", ContentType.ActiveLaborPressure());
        oModulesCollection.add(oMiniActiveLaborPressureChart.prototype.moduleID, oMiniActiveLaborPressureChart);

        var oDetailActiveLaborPressureVolume = new DetailTrendYOYModule("LaborPressureViewContent", "ucLaborPressureView_ucActiveLPChart_amTrendLineChart", "activeLP-volume-module", ContentType.ActiveLaborPressure());
        oModulesCollection.add(oDetailActiveLaborPressureVolume.prototype.moduleID, oDetailActiveLaborPressureVolume);

        var oMiniActiveLaborPressureMap = new MiniMapModule("LaborPressureViewContent", "miniActiveLaborMapWrapper", "activeLP-map-module", ContentType.ActiveLaborPressure());
        oModulesCollection.add(oMiniActiveLaborPressureMap.prototype.moduleID, oMiniActiveLaborPressureMap);

        var oDetailActiveLaborPressureMap = new DetailHeatMapModule("activeLP-map-detail-view", "ActiveLaborPressureStateMSAMap", "activeLP-map-module", ContentType.ActiveLaborPressure());
        oModulesCollection.add(oDetailActiveLaborPressureMap.prototype.moduleID, oDetailActiveLaborPressureMap);

        var oMiniActiveLaborPressureTopCityState = new MiniTopCategoryModule("LaborPressureViewContent", "flashcontent_ucLaborPressureView_barMiniCityStateChart_barMiniCategory", "activeLP-citystate-module", ContentType.ActiveLaborPressure());
        oModulesCollection.add(oMiniActiveLaborPressureTopCityState.prototype.moduleID, oMiniActiveLaborPressureTopCityState);

        var oDetailActiveLaborPressureTopCategories = new DetailTopCategoryModule("LaborPressureViewContent", "activeLaborPressureTopCategories", null, ContentType.ActiveLaborPressure());
        oModulesCollection.add(oDetailActiveLaborPressureTopCategories.prototype.moduleID, oDetailActiveLaborPressureTopCategories);

        var oModules = oModulesCollection.toString();
        for (var i = 0; i < oModules.length; ++i) {
            if (oModules[i].prototype instanceof DashboardModule) {
                oModules[i].initialization();
            }
        }
    };
    function initializeModuleHandlers() {
        if (facetsummaryWrapper == null) {
            facetsummaryWrapper = $("#" + facetSummaryWrapperID);
        }
        if (oModulesCollection.count() == 0) {
            init();
        }
        facetsummaryWrapper.find(".filter-content input:checkbox").click(function () {
            if ($(this).val().indexOf(":") == -1) {
                $("#" + $(this).val() + " li input:checkbox").each(function () {
                    if ($(this).is(':checked') && $(this).val().indexOf(":") != -1) {
                        ofilterManager.removeFilter($(this).attr("id"));
                        $(this).attr('checked', false);
                        $(this).trigger("click");
                    }
                });
            } else {
                delayLiveAjaxSearch($(this));
            }
        })
        facetsummaryWrapper.find("#searched-for li").click(function () {
            var searchedFilter = facetsummaryWrapper.find(".filter-content #" + $(this).attr("id"));
            ofilterManager.removeFilter($(this).attr("id"));
            searchedFilter.attr('checked', false);
            searchedFilter.trigger("click");
        });
        facetsummaryWrapper.find('#facets>li>.headerText').click(function () {
            $(this).next().toggle();
        });
    };
    function setReportFilters(obj) {
        var oModules = oModulesCollection.toString();
        for (var i = 0; i < oModules.length; ++i) {
            if (oModules[i] instanceof DetailHeatMapModule) {
                oModules[i].resetMapFilters();
            }
        }
        ofilterManager.addCheckBoxFilterHandler(obj);
    };
    function delayLiveAjaxSearch(obj) {
        if (ajaxDelayInterval != null) {
            clearTimeout(ajaxDelayInterval);
        }
        setReportFilters(obj);
        //AjaxProgressBar.showFacetUpdate(obj.parent(), facetSummaryWrapperID);
        ajaxDelayInterval = setTimeout(function () {
            requestData();
        }, 800);
    };
    function requestData() {
        var did = window.location.querystring["did"];
        var dataType = ofilterManager.get_numericDataType();

        if (ajaxRequest != null) {
            ajaxRequest.abort();
        }
        //AjaxProgressBar.showDialog(true);
        // ajaxRequest = $.ajax({
            // type: "POST",
            // timeout: 60000,
            // url: ScriptVariables.Get('filterURL'),
            // data: { did: did, filter: ofilterManager.toString(), data: dataType, chart: "all", content: "all" },
            // success: function (response) {
                // updateWithSuccessAjaxCallback(response);
            // },
            // error: function (obj) {
                // if (ajaxRequest.statusText != 'abort') {
                    // showError($("#filterErrorMsg").html());
                // }
            // }
        // });
    };
    function updateWithSuccessAjaxCallback(response) {
        var results = eval('(' + response + ')');
        updateAllModulesContent(results);
        updateFacetAndOtherSummary(results);
        AjaxProgressBar.closeDialog();

        updateFancyBoxHeatMaps(results);
    };
    function updateAllModulesContent(results) {
        if (results.ErrorMessage != null) {
            showError(results.ErrorMessage);
        } else {
            var oModules = oModulesCollection.toString();
            for (var i = 0; i < oModules.length; ++i) {
                if (oModules[i].prototype instanceof DashboardModule) {
                    oModules[i].updateContent(results, oModules[i].prototype.contentName);
                }
                if (oModules[i] instanceof DetailTopCategoryModule) {
                    oModules[i].resetStaffingCheckboxes();
                }
            }
        }
    };
    function updateFancyBoxHeatMaps(results) {
        //make another ajax call to refresh map with selected month year and remove staffing data
        if (G_FANCYBOX_MODULE_PARENT_ID != null) {
            if (G_FANCYBOX_MODULE_PARENT_ID.indexOf("map") != -1) {
                updateDetailHeatMapByMapID(G_FANCYBOX_MODULE_PARENT_ID);
            }
        }
    };
    function updateFacetAndOtherSummary(results) {
        facetsummaryWrapper.find("#facets").html(results.FacetSummaryHTML);
        facetsummaryWrapper.find(".searched-for-content").html(results.FacetAppliedFilterHTML);
        facetsummaryWrapper.find("#searched-for .clearAll").attr("class", "clearAll");
        ofilterManager.persistSearchedFilters();
        initializeModuleHandlers();

        $("#lblJobCount").html(results.TotalJobs);
        $("#lblActiveSupply").html(results.TotalActiveSupply);
        $("#lblActiveLaborPressure").html(results.TotalActiveLaborPressure);
        $('.Occupation option[value="' + results.ChosenSOC + '"]').attr("selected", "selected");
        if (results.TopEMSIData != null) {
            $(".summaryItems li").remove();
            $.each(results.TopEMSIData, function (name, value) {
                var span = "<li><span class='count'>" + formatNumber(value, 0) + "</span><span class='label'>" + name + "</span></li>";
                $(span).appendTo(".summaryItems");
            });
        }   
        if (results.RDBLinkHTML != null) {
            $("#lnkCareerBuilderRDB").attr("href", results.RDBLinkHTML);
        }
    };
    function updateDetailHeatMapByMapID(parentID) {
        var oModules = oModulesCollection.toString();
        for (var i = 0; i < oModules.length; ++i) {
            if (oModules[i] instanceof DetailHeatMapModule) {
                if (oModules[i].prototype.parentID == parentID) {
                    oModules[i].refreshHeatMaps(oModules[i].prototype.tabID);
                }
            }
        }
    };
    function setDefaultFacetFilter() {
        var oCodesList = ScriptVariables.Get('ONetMatchCodeList');
        if (oCodesList != null && $.trim(oCodesList) != "") {
            var arMatches = oCodesList.split(',');
            if (arMatches.length >= 1) {
                $.each(arMatches, function (index, value) {
                    var id = "onetcode" + value.replace(/[^0-9]/g, '');
                    var firstCategoryWrapper = facetsummaryWrapper.find(".filter-content ul li:first");
                    var matchChkBox = firstCategoryWrapper.find('input[value$="' + value + '"]')
                    if (matchChkBox.attr("id") != undefined) {
                        ofilterManager.addFilter(id, "onetcode:" + value, value)
                        matchChkBox.attr('checked', true);
                        var label = facetsummaryWrapper.find("label[for=" + id + "]").text();
						//only create the default if one does not exist
						if (!$('#'+id)) {
							createDefaultONETFilters(facetsummaryWrapper, id, label);
						}
                    }
                });
                if (ofilterManager.filtersCount() > 0) {
                    facetsummaryWrapper.find("#searched-for").attr("class", "facet-ui");
                }
            }
        }
    };
    function createDefaultONETFilters(facetWrapper, id, label) {
        var li = document.createElement("li");
        var newSpan = document.createElement("span");
        li.id = id;
        facetWrapper.find("#searched-for ul:first").append(li);
        li.appendChild(newSpan);
        newSpan.innerHTML = label;

        facetWrapper.find("#searched-for li:last").click(function () {
            $(this).remove();
            var searchedFilter = facetWrapper.find(".filter-content #" + $(this).attr("id"));
            ofilterManager.removeFilter(searchedFilter.val());
            searchedFilter.attr('checked', false);
            searchedFilter.trigger("click");
        });
    };
    return {
        Initialization: function (results) {
            initializeModuleHandlers();
            facetsummaryWrapper.find("#searched-for .clearAll").click(function () {
                //AjaxProgressBar.showFacetUpdate($(this).parent(), facetSummaryWrapperID);
                ofilterManager.clearFilters();
                requestData();
            });
        },
        Filters: ofilterManager,
        ModulesCollection: oModulesCollection,
        RefreshDetailHeatMapByMapID: function (parentID) {
            updateDetailHeatMapByMapID(parentID);
        },
        ResetHeatMapFilters: function () {
            var oModules = oModulesCollection.toString();
            for (var i = 0; i < oModules.length; ++i) {
                if (oModules[i] instanceof DetailHeatMapModule) {
                    oModules[i].resetMapFilters();
                }
            }
        },
        RemoveStaffingData: function () {
            ofilterManager.removeNoStaffingFilter();
        },
        IsDemandStaffingFilterOn: function () {
            var oTopDemandEmployer = oModulesCollection.item("demandTopCategories");
            return oTopDemandEmployer.IsIncludeStaffing();
        },
        LoadDefaultFacetFilter: function () {
            setDefaultFacetFilter();
        }
    };
} ();

var toggleTabs = function (tab) {
    $.each($('#SDTabs li'), function (i, val) {
        if ($(this).hasClass("selected gradientTabActive") && (tab.attr('id') != $(this).attr('id'))) {
            $(this).removeClass("selected gradientTabActive");
			$(this).addClass("gradientTab");
            $(('#' + $(this).attr('id') + 'Content')).removeClass("selected");
        }
    });
    if (!tab.hasClass("selected gradientTabActive")) {
        tab.addClass("selected gradientTabActive");
		tab.removeClass("gradientTab");
        $(('#' + tab.attr('id') + 'Content')).addClass("selected");
    }
	// added by archana
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
	jQuery("#facets>li:not(:hidden)").css({"clear":"none","margin-right":"2%"});
	jQuery("#facets>li:not(:hidden)").each(function(index) {
		if ((index+1)%3==0) {
			jQuery(this).css("margin-right","0");
		}
		if (index%3==0) jQuery(this).css("clear","left");
	});
	// end added by archana
};

var activeLaborPressure = { mapID: null, data: null };
//activeLaborPressure.mapID = null;
//activeLaborPressure.data = null;
var flashInstalled = null;

var downloadManager = function () {
    var currentSelectedTabID;
    var tryingToExport = false;
    function toggleProgressMessage(bIsDownload) {
        if (bIsDownload) {
            $("#ajaxMsg").html("Sending Request...");
        } else
        {
            $("#ajaxMsg").html("Updating Report Data...");
        }
    };
    function AJAXRequest(contentName)
    {
        var answer = confirm("Do you want to download these data points in CSV format?");
        if (answer)
        {
            toggleProgressMessage(true);
            //AjaxProgressBar.showModalDialog();
            // var ajaxCall = $.ajax({
                // type: "POST",
                // url: ScriptVariables.Get('CSVExportLink'),
                // data: { did: window.location.querystring["did"],
                    // filter: ModulesManager.Filters.toString(),
                    // chart: "csv",
                    // content: contentName
                // },
                // success: function (response)
                // {
                    // AjaxProgressBar.closeDialog();
                    // toggleProgressMessage(false);
                // },
                // error: function (obj)
                // {
                    // showError($("#filterErrorMsg").html());
                    // toggleProgressMessage(false);
                // }
            // });
        }
    };
    return {
        onDocumentReady: function ()
        {
            $("#imgWantedCSV").click(function (evt)
            {
                AJAXRequest(ContentType.Demand());
                $(this).css("display", "none");
            });
            $("#imgRDBCSV").click(function (evt)
            {
                AJAXRequest(ContentType.ActiveSupply());
                $(this).css("display", "none");
            });
            $("#imgRDBCSVCompV2").click(function (evt)
            {
                AJAXRequest(ContentType.CompV2());
                $(this).css("display", "none");
            });
        },
        onAfterExport: function (mapID, data) {
            //activeLaborPressure = {};
            activeLaborPressure.mapID = mapID;
            activeLaborPressure.data = data;
            //added this code for testing
            $('#imageExport').dialog('close');
            $('#lnkExportPDFSummary_ExportToPDFLink').trigger("click");
            toggleTabs($('li#' + currentSelectedTabID));
            downloadManager.setTryingToExportValue(false);

        },
        setCurrentSelectedTabID: function(selectedTabID)
        {
            currentSelectedTabID = selectedTabID;
        },
        exporting: function()
        {
            return tryingToExport;
        },
        setTryingToExportValue: function(bool)
        {
            tryingToExport = bool; 
        },
        getPDFParams: function () {
            var urlParam = '';
            urlParam += "&did=" + ScriptVariables.Get('reportDID') + "&filter=" + ModulesManager.Filters.toString() + "&staffing=" + ModulesManager.IsDemandStaffingFilterOn() +
            "&chartID1="  + activeLaborPressure.mapID + "&imageData1=" + encodeURIComponent(activeLaborPressure.data) + "&flashInstalled=" + flashInstalled;
            return urlParam;
        }
    };
} ();

function amReturnImageData(chartId, data){
    
    var inter_data = explode("&", data);
    for (var value in inter_data)
    {
        var arrTemp = explode("=", value);
        data[arrTemp[0]] = arrTemp[1];
    }
    downloadManager.onAfterExport('amActiveLaborMiniStateHeatMap', data);
    
}
function amMapCompleted(map_id)
{
    
    if(downloadManager.exporting() && map_id == "amActiveLaborMiniStateHeatMap")
    {
        var flashMovie = document.getElementById('amActiveLaborMiniStateHeatMap');
        var test = "Testing"
        if (flashMovie != null)
        {
            flashInstalled = true;
            setTimeout(function () { flashMovie.exportImage() }, 1500);

        }
    }
}
function explode(delimiter, string, limit)
{
    // Splits a string on string separator and return array of components.
    var emptyArray = { 0: '' };

    // third argument is not required
    if (arguments.length < 2 ||
                                        typeof arguments[0] == 'undefined' || typeof arguments[1] == 'undefined')
    {

        return null;
    }

    if (delimiter === '' || delimiter === false ||
                                        delimiter === null)
    {

        return false;
    }
    if (typeof delimiter == 'function' ||
                                        typeof delimiter == 'object' ||
                                        typeof string == 'function' ||
                                        typeof string == 'object')
    {

        return emptyArray;
    }

    if (delimiter === true)
    {
        delimiter = '1';
    }
    if (!limit)
    {
        return string.toString().split(delimiter.toString());
    } else
    {
        // support for limit argument        var splitted = string.toString().split(delimiter.toString());
        var partA = splitted.splice(0, limit - 1);
        var partB = splitted.join(delimiter.toString());
        partA.push(partB);
        return partA;
    }
}
$(document).ready(function () {
    $("#retrievingData").dialog({ modal: true, resizable: false, autoOpen: false, draggable: false, open: function (event, ui) { $(".ui-dialog-titlebar-close").hide(); } });
    $("#errorDialog").dialog({ width: 450, modal: true, resizable: false, autoOpen: false, draggable: false, open: function (event, ui) { $(".ui-dialog-titlebar-close").show(); } });
    //Added this code for testing
    $("#imageExport").dialog({
        modal: true,
        resizable: false,
        autoOpen: false,
        draggable: false,
        open: function (event, ui) {
            $(".ui-dialog-titlebar-close").hide();
        }
    });

    ModulesManager.Initialization();
    ModulesManager.LoadDefaultFacetFilter();
    LocationAutoComplete.AjaxRequest("input.location", "mix");
    ReportGenerator.onDocumentReady();
    formSubmitter.onDocumentReady();
    downloadManager.onDocumentReady();


    $('.search-content .show-more').click(function (event) {
        $('.search-content .show-more').toggle();
        $('.search-content .more-filters').toggle();
        event.preventDefault();
    });


    $('a#ExportExcelLink').click(function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        $("#ajaxMsg").html("Generating Report...");
        AjaxProgressBar.showModalDialog();
        setTimeout(function () {
            AjaxProgressBar.closeDialog();
            $("#ajaxMsg").html("Updating Report Data...");
            }, 4000);
        document.location.href = "ReportSummaryExcel.aspx?did=" + window.location.querystring["did"] + "&filter=" + ModulesManager.Filters.toString() + activeLaborPressure + "&IsInternalUser=" + ScriptVariables.Get('IsInternalUser');
         });

    //Added this code for testing
    $('#myExportLink').click(function (evt) {
        //evt.preventDefault();
        //        evt.stopPropagation();
        //alert(ModulesManager.Filters.toString());

        //document.location.href = "SupplyDemandPDF.aspx?did=" + window.location.querystring["did"] + "&filter=" + ModulesManager.Filters.toString();
        downloadManager.setTryingToExportValue(true);
        var currentSelectedTabID = $('#SDTabs UL LI.selected').attr('id');
        downloadManager.setCurrentSelectedTabID(currentSelectedTabID);
        $('#imageExport').parent().css({ position: "fixed" }).end().dialog('open');

        if (currentSelectedTabID != 'LaborPressureView') {
            toggleTabs($('li#LaborPressureView'));
            flashMovie = document.getElementById('amActiveLaborMiniStateHeatMap');
            if (flashMovie.id == "amActiveLaborMiniStateHeatMap") {
                setTimeout(function () { flashMovie.rebuild() }, 1500);

            }
        } else {
            amMapCompleted("amActiveLaborMiniStateHeatMap");
        }

    });

    $('#SDTabs li').click(function (evt) {
        toggleTabs($(this));
        CB.Tally('SupplyDemand', 'TabClick', $(this).attr('id'));
    });
    var cScreen = '' + screen.width + 'x' + screen.height + '';
    var cViewPort = '' + window.innerWidth + 'x' + window.innerHeight + '';
    if (window.innerWidth >= 1280 && window.innerHeight >= 1024) {
        CB.Tally('SupplyDemand', 'ViewPort', "Jumbo");
        CB.Tally('SupplyDemand', 'Screen', cScreen);
    } else {
        CB.Tally('SupplyDemand', 'ViewPort', cViewPort);
        CB.Tally('SupplyDemand', 'Screen', cScreen);
    }

    //makes the create new report tab expandable
    $('#newReportHeader').click(function () {
        $(this).next().slideToggle("slow");
    });

});                 //end $(document).ready

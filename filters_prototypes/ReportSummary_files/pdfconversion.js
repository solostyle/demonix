var SVs = ScriptVariables;

$(document).ready(function() {
    if (SVs.Contains('ExportPDFObjects')) {
        var pdfExportObjects = SVs.Get('ExportPDFObjects');
        $.each(pdfExportObjects, function(i, pdfObj) {
            new PDFConverter(eval("(" + pdfObj + ")"));
        });
    }
});

var PDFConverter = function (pdfObject) {
    //options required: id, url, filename, convertMessageId, downloadMessageId
    //options optional: method, getParamsMethod, getParamsMethodParam, getImageDataMethod

    var _exportLink = jQuery('#' + pdfObject.linkClientId);
    var _url = pdfObject.urlToGetHTML;
    var _filename = pdfObject.filename;
    var _pdfContent = pdfObject.pdfContent;
    var _convertMessageWrapper = jQuery('#' + pdfObject.convertMessageId);
    var _downloadMessageWrapper = jQuery('#' + pdfObject.downloadMessageId);
    var _downloadLink = _downloadMessageWrapper.find('a.pdfDownloadLink');
    var _method = "POST";
    var _getParams = function () { return ''; };
    var _paramArgs = null;
    var _getImageData = function () { return ''; };

    // we possibly have some options
    if (pdfObject.getParamsMethod !== null && pdfObject.getParamsMethod !== undefined) {
        _getParams = pdfObject.getParamsMethod;
    }
    if (pdfObject.getParamsMethodParam !== null && pdfObject.getParamsMethodParam !== undefined) {
        _paramArgs = pdfObject.getParamsMethodParam;
    }
    if (pdfObject.method !== null && pdfObject.method !== undefined) {
        if (pdfObject.method.toLowerCase() === "get") {
            _method = "GET";
        }
    }
    if (pdfObject.getImageDataMethod !== null && pdfObject.getImageDataMethod !== undefined) {
        _getImageData = pdfObject.getImageDataMethod;
    }

    // initialize the converting message modal box
    _convertMessageWrapper.dialog({
        modal: true,
        resizable: false,
        autoOpen: false,
        draggable: false,
        open: function (event, ui) {
            $(".ui-dialog-titlebar-close").hide();
        }
    });

    // initialize the download prompt message box
    _downloadMessageWrapper.dialog({
        modal: true,
        resizable: false,
        autoOpen: false,
        draggable: false,
        width: 340,
        open: function (event, ui) {
            $(".ui-dialog-titlebar-close").hide();
        }
    });

    _downloadLink.click(function (evt) {
        _downloadMessageWrapper.dialog('close');
    });

    //when the user clicks on the Export given item (Export PDF Link)
    _exportLink.click(createPDF);

    function createPDF(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        _convertMessageWrapper.dialog('open');  //open the Dialog box informing the user to wait for PDF Conversion Completion

        $.ajax({
            type: 'POST',
            url: ScriptVariables.Get('pdfConverterUrl'),
            data: '&urlToGetHtml=' + _url + "&filename=" + _filename + "&pdf=" + _pdfContent + "&data=" + encodeURIComponent(_getParams(_paramArgs)) + "&method=" + _method + '&' + _getImageData(),
            error: errorCreatingPDF,
            success: downloadPDF,
            timeout: 120000
        });
    }

    function errorCreatingPDF(XMLHttpRequest) {
        //make sure the "error" didn't occur because the user navigated away or excaped
        if (!userAborted(XMLHttpRequest))
            alert('There was an error while creating your PDF.');

        closeLoadScreen();
    }


    //     Returns true if the user hit Esc or navigated away from the  
    //     current page before an AJAX call was done. (The response  
    //     headers will be null or empty, depending on the browser.)  
    //      
    //     NOTE: this function is only meaningful when called from  
    //     inside an AJAX "error" callback!  
    //      
    //     The 'xhr' param is an XMLHttpRequest instance.  

    function userAborted(xhr) {
        return !xhr.getAllResponseHeaders();
    }


    function downloadPDF(pdfDid) {
        if (navigator.userAgent.indexOf("MSIE") > -1) {
            _convertMessageWrapper.dialog('close');

            var href = _downloadLink.attr('href');

            //if there are leftover parameters get rid of them
            if (href.indexOf('?') > -1)
                href = href.substring(0, href.indexOf('?'));

            _downloadLink.attr('href', href += "?pdfDid=" + pdfDid + "&filename=" + _filename);
            _downloadMessageWrapper.dialog('open');
        } else {
            $('<form method="post" onload="alert(window);" id="frmPdfCreator" action="' + ScriptVariables.Get('pdfDownloadfromBytesURL') + '" target="pdfPost"></form>').appendTo('body');
            $('<input type="hidden" id="pdfDid" name="pdfDid" />').appendTo('#frmPdfCreator');
            $('#pdfDid').val(pdfDid);
            $('<input type="hidden" id="filename" name="filename" value="' + _filename + '" />').appendTo("#frmPdfCreator");
            $('#frmPdfCreator').submit().remove();

            closeLoadScreen();
        }
    }

    function closeLoadScreen() {
        var id = _convertMessageWrapper.attr("id");
        setTimeout("$('div#" + id + "').dialog('close')", 500);
    }
};
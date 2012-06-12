LocationAutoComplete = function () {
    var ajaxCall = null;
    var sMode = null;
    function makeAjaxCall(request, response) {
        if (ajaxCall != null) {
            ajaxCall.abort();
        }
        ajaxCall = $.ajax({
            url: ScriptVariables.Get('sURLPrefix') + "personified/compensation/ajax/locations.aspx",
            data: {
                limit: 10,
                q: request.term,
                mode: sMode
            },
            success: function (data) {
                var arResults = data.split('\n');
                response($.map(arResults, function (item) {
                    if ($.trim(item).charCodeAt(0) > 0) {
                        var formattedItem = "";
                        item = $.trim(item);
                        if (item.search(/\d{5}$/) != -1) {
                            //contains numbers - this is a zip code lookup. lets change the format.
                            var zipcode = item.substr(item.length - 5, 5);
                            var citystate = item.substring(0, item.lastIndexOf(','));
                            formattedItem = zipcode + " - " + citystate;
                        }
                        else {
                            //does not contain numbers, this is a city-state lookup
                            formattedItem = "<div class='suggestitem'>" + item + "</div>";
                        }
                        return {
                            label: formattedItem.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + request.term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>"),
                            value: item
                        }
                    }
                })) //end success

            }

        })
    }
    return {
        AjaxRequest: function (id, mode) {
            var bLocationFocus = true;
            sMode = mode;
            $(id).autocomplete({
                source: makeAjaxCall,
                minLength: 1,
                delay: 100,
                select: function (event, ui) {
                    $(id).val(this.value);
                },
                open: function () {
                    $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
                },
                close: function () {
                    $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
                }
            });
            $(id).blur(function () {
                bLocationFocus = false;
                $(id).removeClass('ui-autocomplete-loading');
                if (ajaxCall != null) {
                    ajaxCall.abort();
                }
            });
            $(id).focus(function () {
                bLocationFocus = true;
            });
        }
    }
} ();


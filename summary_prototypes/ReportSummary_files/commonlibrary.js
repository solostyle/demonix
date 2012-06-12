var formatNumber = function (value, precision) {
    var regExp = /(\d+)(\d{3})/;
    var data = value.toFixed(precision).split('.');
    var iBigInt = data[0];
    var idecimals = data.length > 1 ? '.' + data[1] : '';
    while (regExp.test(iBigInt)) {
        iBigInt = iBigInt.replace(regExp, '$1' + ',' + '$2');
    }
    return iBigInt + idecimals;
};

window.location.querystring = (function () {
    var collection = {};
    var querystring = window.location.search;
    if (!querystring) {
        return { toString: function () { return ""; } };
    }
    querystring = decodeURI(querystring.substring(1));
    var pairs = querystring.split("&");
    for (var i = 0; i < pairs.length; i++) {
        if (!pairs[i]) {
            continue;
        }
        var seperatorPosition = pairs[i].indexOf("=");
        if (seperatorPosition == -1) {
            collection[pairs[i]] = "";
        }
        else {
            collection[pairs[i].substring(0, seperatorPosition)]
                = pairs[i].substr(seperatorPosition + 1);
        }
    }
    collection.toString = function () {
        return "?" + querystring;
    };
    return collection;
})();

function Dictionary() {
    var collection = {};
    var order = [];
    this.add = function(property, value) {
        if (!this.exists(property)) {
            collection[property] = value;
            order.push(property);
        }
    }
    this.remove = function(property) {
        collection[property] = null;
        var i = order.length;
        while (i-- > 0) {
            if (order[i] == property) {
                order[i] = null;
                break;
            }
        }
    }
    this.item = function(property) {
        if (this.exists) {
            return collection[property];
        } else {
            return null;
        }
    }
    this.toString = function() {
        var output = [];
        for (var i = 0; i < order.length; ++i) {
            if (order[i] != null) {
                output.push(collection[order[i]]);
            }
        }
        return output;
    }
    this.getKeys = function() {
        var keys = [];
        for (var i = 0; i < order.length; ++i) {
            if (order[i] != null) {
                keys.push(order[i]);
            }
        }
        return keys;
    }
    this.update = function(property, value) {
        if (value != null) {
            collection[property] = value;
        }
        var i = order.length;
        while (i-- > 0) {
            if (order[i] == property) {
                order[i] = null;
                order.push(property);
                break;
            }
        }
    }
    this.exists = function(property) {
        return collection[property] != null;
    }
    this.count = function () {
        return this.toString().length;
    }
    this.clear = function () {
        collection = {};
        order = [];
    }
}
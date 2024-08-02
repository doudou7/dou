function e(e) {
    return function(e, t) {
        e = e.split("."), t = t.split(".");
        for (var n = Math.max(e.length, t.length); e.length < n; ) e.push("0");
        for (;t.length < n; ) t.push("0");
        for (var r = 0; r < n; r++) {
            var s = parseInt(e[r], 10), u = parseInt(t[r], 10);
            if (s > u) return 1;
            if (s < u) return -1;
        }
        return 0;
    }((0, t.getSystemInfoSync)().SDKVersion, e) >= 0;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.canIUseModel = function() {
    return e("2.9.3");
}, exports.canIUseFormFieldButton = function() {
    return e("2.10.3");
}, exports.canIUseAnimate = function() {
    return e("2.9.0");
}, exports.canIUseGroupSetData = function() {
    return e("2.4.0");
}, exports.canIUseNextTick = function() {
    return wx.canIUse("nextTick");
}, exports.canIUseCanvas2d = function() {
    return e("2.9.0");
};

var t = require("./utils");
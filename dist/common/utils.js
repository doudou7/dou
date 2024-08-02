function e() {
    return null == r && (r = wx.getSystemInfoSync()), r;
}

require("../../@babel/runtime/helpers/Arrayincludes"), Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.range = function(e, t, n) {
    return Math.min(Math.max(e, t), n);
}, exports.nextTick = function(e) {
    (0, n.canIUseNextTick)() ? wx.nextTick(e) : setTimeout(function() {
        e();
    }, 1e3 / 30);
}, exports.getSystemInfoSync = e, exports.addUnit = function(e) {
    if ((0, t.isDef)(e)) return e = String(e), (0, t.isNumber)(e) ? e + "px" : e;
}, exports.requestAnimationFrame = function(t) {
    return "devtools" === e().platform ? setTimeout(function() {
        t();
    }, 1e3 / 30) : wx.createSelectorQuery().selectViewport().boundingClientRect().exec(function() {
        t();
    });
}, exports.pickExclude = function(e, n) {
    return (0, t.isPlainObject)(e) ? Object.keys(e).reduce(function(t, r) {
        return n.includes(r) || (t[r] = e[r]), t;
    }, {}) : {};
}, exports.getRect = function(e, t) {
    return new Promise(function(n) {
        wx.createSelectorQuery().in(e).select(t).boundingClientRect().exec(function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
            return n(e[0]);
        });
    });
}, exports.getAllRect = function(e, t) {
    return new Promise(function(n) {
        wx.createSelectorQuery().in(e).selectAll(t).boundingClientRect().exec(function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
            return n(e[0]);
        });
    });
}, exports.groupSetData = function(e, t) {
    (0, n.canIUseGroupSetData)() ? e.groupSetData(t) : t();
}, exports.toPromise = function(e) {
    return (0, t.isPromise)(e) ? e : Promise.resolve(e);
}, exports.getCurrentPage = function() {
    var e = getCurrentPages();
    return e[e.length - 1];
};

var t = require("./validator"), n = require("./version"), r = void 0;
function e(e) {
    var n = (0, r.getCurrentPage)().vanPageScroller;
    (void 0 === n ? [] : n).forEach(function(r) {
        "function" == typeof r && r(e);
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.pageScrollMixin = void 0;

var r = require("../common/utils");

exports.pageScrollMixin = function(n) {
    return Behavior({
        attached: function() {
            var o = (0, r.getCurrentPage)();
            Array.isArray(o.vanPageScroller) ? o.vanPageScroller.push(n.bind(this)) : o.vanPageScroller = "function" == typeof o.onPageScroll ? [ o.onPageScroll.bind(o), n.bind(this) ] : [ n.bind(this) ], 
            o.onPageScroll = e;
        },
        detached: function() {
            var e, o = (0, r.getCurrentPage)();
            o.vanPageScroller = (null === (e = o.vanPageScroller) || void 0 === e ? void 0 : e.filter(function(e) {
                return e !== n;
            })) || [];
        }
    });
};
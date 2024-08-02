var t = function(t, e) {
    if (Array.isArray(t)) return t;
    if (Symbol.iterator in Object(t)) return function(t, e) {
        var r = [], o = !0, n = !1, i = void 0;
        try {
            for (var a, s = t[Symbol.iterator](); !(o = (a = s.next()).done) && (r.push(a.value), 
            !e || r.length !== e); o = !0) ;
        } catch (t) {
            n = !0, i = t;
        } finally {
            try {
                !o && s.return && s.return();
            } finally {
                if (n) throw i;
            }
        }
        return r;
    }(t, e);
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}, e = require("../common/utils"), r = require("../common/component"), o = require("../mixins/page-scroll");

(0, r.VantComponent)({
    props: {
        zIndex: {
            type: Number,
            value: 99
        },
        offsetTop: {
            type: Number,
            value: 0,
            observer: "onScroll"
        },
        disabled: {
            type: Boolean,
            observer: "onScroll"
        },
        container: {
            type: null,
            observer: "onScroll"
        },
        scrollTop: {
            type: null,
            observer: function(t) {
                this.onScroll({
                    scrollTop: t
                });
            }
        }
    },
    mixins: [ (0, o.pageScrollMixin)(function(t) {
        null == this.data.scrollTop && this.onScroll(t);
    }) ],
    data: {
        height: 0,
        fixed: !1,
        transform: 0
    },
    mounted: function() {
        this.onScroll();
    },
    methods: {
        onScroll: function() {
            var r = this, o = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).scrollTop, n = this.data, i = n.container, a = n.offsetTop;
            n.disabled ? this.setDataAfterDiff({
                fixed: !1,
                transform: 0
            }) : (this.scrollTop = o || this.scrollTop, "function" != typeof i ? (0, e.getRect)(this, ".van-sticky").then(function(t) {
                a >= t.top ? (r.setDataAfterDiff({
                    fixed: !0,
                    height: t.height
                }), r.transform = 0) : r.setDataAfterDiff({
                    fixed: !1
                });
            }) : Promise.all([ (0, e.getRect)(this, ".van-sticky"), this.getContainerRect() ]).then(function(e) {
                var o = t(e, 2), n = o[0], i = o[1];
                a + n.height > i.height + i.top ? r.setDataAfterDiff({
                    fixed: !1,
                    transform: i.height - n.height
                }) : a >= n.top ? r.setDataAfterDiff({
                    fixed: !0,
                    height: n.height,
                    transform: 0
                }) : r.setDataAfterDiff({
                    fixed: !1,
                    transform: 0
                });
            }));
        },
        setDataAfterDiff: function(t) {
            var e = this;
            wx.nextTick(function() {
                var r = Object.keys(t).reduce(function(r, o) {
                    return t[o] !== e.data[o] && (r[o] = t[o]), r;
                }, {});
                Object.keys(r).length > 0 && e.setData(r), e.$emit("scroll", {
                    scrollTop: e.scrollTop,
                    isFixed: t.fixed || e.data.fixed
                });
            });
        },
        getContainerRect: function() {
            var t = this.data.container();
            return new Promise(function(e) {
                return t.boundingClientRect(e).exec();
            });
        }
    }
});
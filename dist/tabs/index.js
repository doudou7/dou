var t = function(t, e) {
    if (Array.isArray(t)) return t;
    if (Symbol.iterator in Object(t)) return function(t, e) {
        var n = [], i = !0, r = !1, a = void 0;
        try {
            for (var s, o = t[Symbol.iterator](); !(i = (s = o.next()).done) && (n.push(s.value), 
            !e || n.length !== e); i = !0) ;
        } catch (t) {
            r = !0, a = t;
        } finally {
            try {
                !i && o.return && o.return();
            } finally {
                if (r) throw a;
            }
        }
        return n;
    }(t, e);
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}, e = require("../common/component"), n = require("../mixins/touch"), i = require("../common/utils"), r = require("../common/validator"), a = require("../common/relation");

(0, e.VantComponent)({
    mixins: [ n.touch ],
    classes: [ "nav-class", "tab-class", "tab-active-class", "line-class" ],
    relation: (0, a.useChildren)("tab", function() {
        this.updateTabs();
    }),
    props: {
        sticky: Boolean,
        border: Boolean,
        swipeable: Boolean,
        titleActiveColor: String,
        titleInactiveColor: String,
        color: String,
        animated: {
            type: Boolean,
            observer: function() {
                var t = this;
                this.children.forEach(function(e, n) {
                    return e.updateRender(n === t.data.currentIndex, t);
                });
            }
        },
        lineWidth: {
            type: null,
            value: 40,
            observer: "resize"
        },
        lineHeight: {
            type: null,
            value: -1
        },
        active: {
            type: null,
            value: 0,
            observer: function(t) {
                t !== this.getCurrentName() && this.setCurrentIndexByName(t);
            }
        },
        type: {
            type: String,
            value: "line"
        },
        ellipsis: {
            type: Boolean,
            value: !0
        },
        duration: {
            type: Number,
            value: .3
        },
        zIndex: {
            type: Number,
            value: 1
        },
        swipeThreshold: {
            type: Number,
            value: 5,
            observer: function(t) {
                this.setData({
                    scrollable: this.children.length > t || !this.data.ellipsis
                });
            }
        },
        offsetTop: {
            type: Number,
            value: 0
        },
        lazyRender: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        tabs: [],
        scrollLeft: 0,
        scrollable: !1,
        currentIndex: 0,
        container: null,
        skipTransition: !0,
        lineOffsetLeft: 0
    },
    mounted: function() {
        var t = this;
        (0, i.requestAnimationFrame)(function() {
            t.setData({
                container: function() {
                    return t.createSelectorQuery().select(".van-tabs");
                }
            }), t.resize(!0), t.scrollIntoView();
        });
    },
    methods: {
        updateTabs: function() {
            var t = this.children, e = void 0 === t ? [] : t, n = this.data;
            this.setData({
                tabs: e.map(function(t) {
                    return t.data;
                }),
                scrollable: this.children.length > n.swipeThreshold || !n.ellipsis
            }), this.setCurrentIndexByName(n.active || this.getCurrentName());
        },
        trigger: function(t, e) {
            var n = this.data.currentIndex, i = e || this.children[n];
            (0, r.isDef)(i) && this.$emit(t, {
                index: i.index,
                name: i.getComputedName(),
                title: i.data.title
            });
        },
        onTap: function(t) {
            var e = this, n = t.currentTarget.dataset.index, r = this.children[n];
            r.data.disabled ? this.trigger("disabled", r) : (this.setCurrentIndex(n), (0, i.nextTick)(function() {
                e.trigger("click");
            }));
        },
        setCurrentIndexByName: function(t) {
            var e = this.children, n = (void 0 === e ? [] : e).filter(function(e) {
                return e.getComputedName() === t;
            });
            n.length && this.setCurrentIndex(n[0].index);
        },
        setCurrentIndex: function(t) {
            var e = this, n = this.data, a = this.children, s = void 0 === a ? [] : a;
            if (!(!(0, r.isDef)(t) || t >= s.length || t < 0) && ((0, i.groupSetData)(this, function() {
                s.forEach(function(n, i) {
                    var r = i === t;
                    r === n.data.active && n.inited || n.updateRender(r, e);
                });
            }), t !== n.currentIndex)) {
                var o = null !== n.currentIndex;
                this.setData({
                    currentIndex: t
                }), (0, i.nextTick)(function() {
                    e.resize(), e.scrollIntoView(), e.trigger("input"), o && e.trigger("change");
                });
            }
        },
        getCurrentName: function() {
            var t = this.children[this.data.currentIndex];
            if (t) return t.getComputedName();
        },
        resize: function() {
            var e = this, n = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            if ("line" === this.data.type) {
                var r = this.data, a = r.currentIndex, s = r.ellipsis;
                Promise.all([ (0, i.getAllRect)(this, ".van-tab"), (0, i.getRect)(this, ".van-tabs__line") ]).then(function(i) {
                    var r = t(i, 2), o = r[0], l = void 0 === o ? [] : o, u = r[1], c = l[a];
                    if (null != c) {
                        var h = l.slice(0, a).reduce(function(t, e) {
                            return t + e.width;
                        }, 0);
                        h += (c.width - u.width) / 2 + (s ? 0 : 8), e.setData({
                            lineOffsetLeft: h,
                            skipTransition: n
                        });
                    }
                });
            }
        },
        scrollIntoView: function() {
            var e = this, n = this.data, r = n.currentIndex;
            n.scrollable && Promise.all([ (0, i.getAllRect)(this, ".van-tab"), (0, i.getRect)(this, ".van-tabs__nav") ]).then(function(n) {
                var i = t(n, 2), a = i[0], s = i[1], o = a[r], l = a.slice(0, r).reduce(function(t, e) {
                    return t + e.width;
                }, 0);
                e.setData({
                    scrollLeft: l - (s.width - o.width) / 2
                });
            });
        },
        onTouchScroll: function(t) {
            this.$emit("scroll", t.detail);
        },
        onTouchStart: function(t) {
            this.data.swipeable && this.touchStart(t);
        },
        onTouchMove: function(t) {
            this.data.swipeable && this.touchMove(t);
        },
        onTouchEnd: function() {
            if (this.data.swipeable) {
                var t = this.direction, e = this.deltaX, n = this.offsetX;
                if ("horizontal" === t && n >= 50) {
                    var i = this.getAvaiableTab(e);
                    -1 !== i && this.setCurrentIndex(i);
                }
            }
        },
        getAvaiableTab: function(t) {
            for (var e = this.data, n = e.tabs, i = e.currentIndex, r = t > 0 ? -1 : 1, a = r; i + a < n.length && i + a >= 0; a += r) {
                var s = i + a;
                if (s >= 0 && s < n.length && n[s] && !n[s].disabled) return s;
            }
            return -1;
        }
    }
});
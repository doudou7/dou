var t, a = require("../../utils/api"), e = 0, n = getApp(), o = null;

Page({
    data: {
        tabs: [ "", "", "", "", "", "", "" ],
        cids: [],
        avatars: [],
        HeadAD: "",
        hideTab: !1,
        scrollH: "94%",
        scrollTop: 0
    },
    onLoad: function(i) {
        var s = this;
        a.getConfig(function() {
            s.setData({
                HeadAD: n.globalData.HeadAD
            }), e = 0, n.globalData.isShenHe ? (s.setData({
                scrollH: "100%",
                hideTab: !0
            }), t = 9, s.getShenheHead()) : s.getHeadCategory();
        }), wx.createInterstitialAd && ((o = wx.createInterstitialAd({
            adUnitId: n.globalData.AD_CHAPING_HOME
        })).onLoad(function() {}), o.onError(function(t) {}), o.onClose(function() {}));
    },
    getHeadCategory: function() {
        var e = this, n = [], o = [];
        a.getHeadCategory(function(a) {
            console.log(a);
            for (var i = 0; i < a.length; i++) "情头" == a[i].title ? (n.unshift(a[i].title), 
            o.unshift(a[i].cid)) : (n.push(a[i].title), o.push(a[i].cid));
            e.setData({
                tabs: n,
                cids: o
            }), t = o[0], e.getHead();
        }, function(t) {});
    },
    getHead: function() {
        var n = this, o = this.data.avatars, i = e + 19;
        a.getHead(t, e, i, function(t) {
            console.log(t), 0 == e && (o = [], n.setData({
                scrollTop: 0
            }));
            for (var a = 0; a < t.length; a++) o.push(t[a].pic);
            n.setData({
                avatars: o
            }), e = i + 1;
        }, function(t) {});
    },
    getShenheHead: function() {
        var n = this, o = this.data.avatars, i = e + 19;
        a.getHead(t, e, i, function(t) {
            0 == e && (o = []);
            for (var a = 0; a < t.length; a++) o.push(t[a].pic);
            n.setData({
                avatars: o
            }), e = i + 1;
        }, function(t) {});
    },
    preview: function(t) {
        wx.navigateTo({
            url: "../../pages/headdetail/headdetail?url=" + encodeURIComponent(t.currentTarget.dataset.url)
        });
    },
    onChange: function(a) {
        t = this.data.cids[a.detail.index], console.log("cid=" + t), e = 0, this.getHead();
    },
    onScrollToLower: function(t) {
        this.getHead(), 20 == e && o && o.show().catch(function(t) {
            console.error(t);
        });
    },
    onShareAppMessage: function() {
        return {
            title: "8K高清手机壁纸，动态壁纸",
            path: "pages/dynamic/dynamic"
        };
    }
});
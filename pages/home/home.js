var t, e = require("../../utils/api"), a = getApp(), n = null, i = "";

Page({
    data: {
        imgs: [],
        tabHidden: !0,
        refreshStatus: !1,
        scrollTop: 0
    },
    onLoad: function(o) {
        var s = this;
        wx.showLoading({
            title: "加载中..."
        }), e.getConfig(function() {
            s.setData({
                tabHidden: a.globalData.isShenHe
            }), i = a.globalData.isShenHe ? "动物" : "高清", t = 1, s.getSearchImg();
        }), wx.createInterstitialAd && ((n = wx.createInterstitialAd({
            adUnitId: a.globalData.AD_CHAPING_HOME
        })).onLoad(function() {}), n.onError(function(t) {}), n.onClose(function() {}));
    },
    getSearchImg: function() {
        var a = this, n = this.data.imgs;
        e.getSearchImg(i, t, function(e) {
            console.log(e), 1 == t && (n = [], a.setData({
                scrollTop: 0
            }));
            for (var i = 0; i < e.length; i++) "1" != e[i].is_ads && n.push(e[i]);
            a.setData({
                imgs: n,
                refreshStatus: !1
            }), wx.stopPullDownRefresh(), wx.hideLoading();
        }, function(t) {
            wx.stopPullDownRefresh(), wx.hideLoading();
        });
    },
    searchTap: function(t) {
        wx.navigateTo({
            url: "../../pages/searchimg/searchimg"
        });
    },
    dayTap: function(e) {
        wx.showLoading({
            title: "加载中..."
        }), i = "高清壁纸", t = 1, this.getSearchImg();
    },
    kTap: function(e) {
        wx.showLoading({
            title: "加载中..."
        }), i = "2K", t = 1, this.getSearchImg();
    },
    headTap: function(t) {
        wx.switchTab({
            url: "../../pages/head/head"
        });
    },
    preview: function(t) {
        var e = this.data.imgs[t.currentTarget.dataset.index].image_group[0].img_url;
        console.log(e), wx.navigateTo({
            url: "../../pages/paperdetail/paperdetail?url=" + encodeURIComponent(e)
        });
    },
    refresh: function(e) {
        t = 1, this.getSearchImg(), this.setData({
            refreshStatus: !0
        });
    },
    onScrollToLower: function(e) {
        t += 1, this.getSearchImg(), 3 == t && n && n.show().catch(function(t) {
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
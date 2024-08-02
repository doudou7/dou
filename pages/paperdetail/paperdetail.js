function t(t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = n, t;
}

var e, n = getApp(), o = require("../../utils/api"), a = null, i = null;

Page((t(e = {
    data: {
        imgSrc: "",
        date: "",
        time: "",
        isShare: !1
    },
    onLoad: function(t) {
        wx.showLoading({
            title: "壁纸加载中..."
        });
        var e = decodeURIComponent(t.url);
        console.log(e), this.setData({
            imgSrc: e,
            isShare: t.isShare
        }), this.getDate(), this.data.isShare || wx.createInterstitialAd && ((a = wx.createInterstitialAd({
            adUnitId: n.globalData.AD_CHAPING
        })).onLoad(function() {}), a.onError(function(t) {}), a.onClose(function() {})), 
        wx.createRewardedVideoAd && ((i = wx.createRewardedVideoAd({
            adUnitId: n.globalData.AD_REWARD
        })).onLoad(function() {}), i.onError(function(t) {}), i.onClose(function(t) {
            t && t.isEnded && (o.setVIP(!0), wx.showModal({
                content: "宝，已解锁下载！",
                confirmText: "知道了",
                showCancel: !1
            }));
        }));
    },
    onUnload: function() {
        wx.hideLoading();
    },
    backTap: function(t) {
        this.data.isShare ? wx.reLaunch({
            url: "../../pages/dynamic/dynamic"
        }) : wx.navigateBack({
            delta: 1
        });
    },
    downloadTap: function(t) {
        if (this.canUseOcr()) {
            var e = this;
            wx.getSetting({
                success: function(t) {
                    t.authSetting["scope.writePhotosAlbum"] ? e.save() : wx.authorize({
                        scope: "scope.writePhotosAlbum",
                        success: function() {
                            e.save();
                        },
                        fail: function() {
                            wx.showModal({
                                title: "温馨提示",
                                content: "您未授予我们使用相册的权限，无法保存，请前往允许使用相册",
                                confirmText: "去允许",
                                confirmColor: "red",
                                success: function(t) {
                                    t.confirm && wx.openSetting({});
                                }
                            });
                        }
                    });
                }
            });
        }
    },
    save: function() {
        wx.showLoading({
            title: "下载中"
        });
        wx.downloadFile({
            url: this.data.imgSrc.replace("http", "https").replace("_home-image-1080", ""),
            success: function(t) {
                200 === t.statusCode && wx.saveImageToPhotosAlbum({
                    filePath: t.tempFilePath,
                    success: function(t) {
                        wx.hideLoading(), wx.showModal({
                            content: "已保存到相册中，点左上角看更多壁纸",
                            confirmText: "知道了",
                            showCancel: !1
                        }), o.addUsedTime();
                    },
                    fail: function(t) {
                        wx.hideLoading();
                    }
                });
            }
        });
    }
}, "onUnload", function(t) {
    wx.hideLoading();
}), t(e, "bindload", function(t) {
    wx.hideLoading(), a && a.show().catch(function(t) {
        console.error(t);
    });
}), t(e, "getDate", function() {
    var t = new Date(), e = (t.getFullYear(), t.getMonth() + 1), n = t.getDate(), o = t.getHours(), a = t.getMinutes(), i = (t.getSeconds(), 
    e + "月" + n + "日"), c = [ o, a ].map(this.formatNumber).join(":");
    console.log(i), console.log(c), this.setData({
        date: i,
        time: c
    });
}), t(e, "formatNumber", function(t) {
    return (t = t.toString())[1] ? t : "0" + t;
}), t(e, "canUseOcr", function() {
    return o.canUse(function() {
        i && i.show().catch(function() {
            i.load().then(function() {
                return i.show();
            }).catch(function(t) {
                console.log("激励视频 广告显示失败");
            });
        });
    });
}), t(e, "onShareAppMessage", function() {
    return n.globalData.isShenHe ? {
        title: "二次元8K高清手机动态壁纸",
        path: "pages/dynamic/dynamic",
        imageUrl: this.data.imgSrc
    } : {
        title: "送你一张好看的手机壁纸",
        path: "pages/paperdetail/paperdetail?url=" + encodeURIComponent(this.data.imgSrc) + "&isShare=true",
        imageUrl: this.data.imgSrc
    };
}), e));
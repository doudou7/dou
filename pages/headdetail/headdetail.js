var t = getApp(), n = require("../../utils/api"), e = null, a = null;

Page({
    data: {
        imgSrc: "",
        isShare: !1
    },
    onLoad: function(o) {
        wx.showLoading({
            title: "头像加载中..."
        });
        var i = decodeURIComponent(o.url);
        this.setData({
            isShare: o.isShare
        }), console.log(i), this.setData({
            imgSrc: i
        }), this.data.isShare || wx.createInterstitialAd && ((e = wx.createInterstitialAd({
            adUnitId: t.globalData.AD_CHAPING
        })).onLoad(function() {}), e.onError(function(t) {}), e.onClose(function() {})), 
        wx.createRewardedVideoAd && ((a = wx.createRewardedVideoAd({
            adUnitId: t.globalData.AD_REWARD
        })).onLoad(function() {}), a.onError(function(t) {}), a.onClose(function(t) {
            t && t.isEnded && (n.setVIP(!0), wx.showModal({
                content: "宝，已解锁下载！",
                confirmText: "知道了",
                showCancel: !1
            }));
        }));
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
            var n = this;
            wx.getSetting({
                success: function(t) {
                    t.authSetting["scope.writePhotosAlbum"] ? n.save() : wx.authorize({
                        scope: "scope.writePhotosAlbum",
                        success: function() {
                            n.save();
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
            url: this.data.imgSrc.replace("http", "https"),
            success: function(t) {
                200 === t.statusCode && wx.saveImageToPhotosAlbum({
                    filePath: t.tempFilePath,
                    success: function(t) {
                        wx.hideLoading(), wx.showModal({
                            content: "已保存到相册中，点左上角看更多壁纸",
                            confirmText: "知道了",
                            showCancel: !1
                        }), n.addUsedTime();
                    },
                    fail: function(t) {
                        wx.hideLoading();
                    }
                });
            }
        });
    },
    onUnload: function(t) {
        wx.hideLoading();
    },
    bindload: function(t) {
        wx.hideLoading(), e && e.show().catch(function(t) {
            console.error(t);
        });
    },
    canUseOcr: function() {
        return n.canUse(function() {
            a && a.show().catch(function() {
                a.load().then(function() {
                    return a.show();
                }).catch(function(t) {
                    console.log("激励视频 广告显示失败");
                });
            });
        });
    },
    onShareAppMessage: function() {
        return t.globalData.isShenHe ? {
            title: "二次元8K高清手机动态壁纸",
            path: "pages/dynamic/dynamic",
            imageUrl: this.data.imgSrc
        } : {
            title: "送你一张好看的微信头像",
            path: "pages/headdetail/headdetail?url=" + encodeURIComponent(this.data.imgSrc) + "&isShare=true",
            imageUrl: this.data.imgSrc
        };
    }
});
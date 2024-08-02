var t = require("../../utils/api"), e = getApp(), o = null, n = null;

Page({
    data: {
        videoSrc: "",
        imgSrc: "",
        hideBtn: !1,
        isShare: !1
    },
    onLoad: function(a) {
        wx.showLoading({
            title: "壁纸加载中..."
        });
        var i = decodeURIComponent(a.url), c = decodeURIComponent(a.imgSrc);
        console.log(i), this.setData({
            videoSrc: i,
            imgSrc: c,
            isShare: a.isShare
        }), this.getDate(), this.data.isShare || wx.createInterstitialAd && ((o = wx.createInterstitialAd({
            adUnitId: e.globalData.AD_CHAPING
        })).onLoad(function() {}), o.onError(function(t) {}), o.onClose(function() {})), 
        wx.createRewardedVideoAd && ((n = wx.createRewardedVideoAd({
            adUnitId: e.globalData.AD_REWARD
        })).onLoad(function() {}), n.onError(function(t) {}), n.onClose(function(e) {
            wx.createVideoContext("myVideo").play(), e && e.isEnded && (t.setVIP(!0), wx.showModal({
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
    videoTap: function(t) {
        this.setData({
            hideBtn: !this.data.hideBtn
        });
    },
    downloadTap: function(t) {
      console.log(4444444444444444444444444444)
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
            url: this.data.videoSrc.replace("http", "https"),
            success: function(e) {
                200 === e.statusCode && wx.saveVideoToPhotosAlbum({
                    filePath: e.tempFilePath,
                    success: function(e) {
                        wx.hideLoading(), wx.showModal({
                            content: "已保存到相册中，点左上角看更多壁纸",
                            confirmText: "知道了",
                            showCancel: !1
                        }), t.addUsedTime();
                    }
                });
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    onUnload: function(t) {
        wx.hideLoading();
    },
    bindloadedmetadata: function(t) {
        wx.hideLoading(), o && o.show().catch(function(t) {
            console.error(t);
        });
    },
    getDate: function() {
        var t = new Date(), e = (t.getFullYear(), t.getMonth() + 1), o = t.getDate(), n = t.getHours(), a = t.getMinutes(), i = (t.getSeconds(), 
        e + "月" + o + "日"), c = [ n, a ].map(this.formatNumber).join(":");
        console.log(i), console.log(c), this.setData({
            date: i,
            time: c
        });
    },
    formatNumber: function(t) {
        return (t = t.toString())[1] ? t : "0" + t;
    },
    canUseOcr: function() {
        return t.canUse(function() {
            n && (wx.createVideoContext("myVideo").pause(), n.show().catch(function() {
                n.load().then(function() {
                    n.show(), wx.createVideoContext("myVideo").pause();
                }).catch(function(t) {
                  console.log(t);
                    console.log("激励视频 广告显示失败");
                });
            }));
        });
    },
    onShareAppMessage: function(t) {
        return e.globalData.isShenHe ? {
            title: "二次元8K高清手机动态壁纸",
            path: "pages/dynamic/dynamic",
            imageUrl: this.data.imgSrc
        } : {
            title: "送你一张好看的手机动态壁纸",
            path: "pages/dynamicdetail/dynamicdetail?url=" + encodeURIComponent(this.data.videoSrc) + "&imgSrc=" + encodeURIComponent(this.data.imgSrc) + "&isShare=true",
            imageUrl: this.data.imgSrc
        };
    }
});
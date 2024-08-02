App({
    onLaunch: function() {
        var n = wx.getStorageSync("logs") || [];
        n.unshift(Date.now()), wx.setStorageSync("logs", n), wx.login({
            success: function(n) {}
        });
    },
    globalData: {
        userInfo: null,
        objectId: "",
        isShenHe: !1,
        COUNT: 1e4,
        AD_REWARD: "adunit-3902ad7146e034c1",
        AD_CHAPING: "adunit-5728063c0713966d",
        AD_CHAPING_HOME: "adunit-5728063c0713966d",
        URL:"www.wxshares.com",
        NAME:"极客分享测试"
    }
});
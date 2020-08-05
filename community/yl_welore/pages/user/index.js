var app = getApp(), http = require("../../util/http.js"), _require = require("../../dist/base/index"), $Toast = _require.$Toast;

Page({
    data: {
        check:false,
        tabbar:app.globalData.tabbar,
        user_current: "user",
        user_info: {},
        nvabarData: {
            showCapsule: 0,
            title: "会员中心",
            height: 2 * app.globalData.height + 20
        },
        animationData: null,
        animationDataD: null,
        flag: !1,
        diy: {},
        isPopping: !1,
        animPlus: {},
        animCollect1: {},
        animCollect: {},
        animTranspond: {},
        animInput: {},
        animBack: {},
        version: 1,
        admin: 0
    },
    get_diy: function() {
        var t = app.api_root + "User/get_diy", a = this, n = app.getCache("userinfo"), i = new Object();
        i.token = n.token, i.openid = n.openid, i.uid = n.uid, i.much_id = app.siteInfo.uniacid, 
        i.version = app.version, http.POST(t, {
            params: i,
            success: function(t) {
                console.log(t), a.setData({
                    version: t.data.version,
                    diy: t.data,
                    admin: t.data.admin
                });
            },
            fail: function() {
                wx.showModal({
                    title: "提示",
                    content: "网络繁忙，请稍候重试！",
                    showCancel: !1,
                    success: function(t) {}
                });
            }
        });
    },
    show_qian: function() {
        console.log("animate");
        var t = wx.createAnimation({
            duration: 750,
            timingFunction: "ease"
        });
        (this.animation = t).opacity(1).step(), this.setData({
            animationData: t.export()
        });
    },
    bid_qiandao: function() {
        wx.vibrateShort();
        var t = this;
        console.log("animate");
        var a = wx.createAnimation({
            duration: 750,
            timingFunction: "ease"
        });
        (this.animation = a).opacity(0).step(), t.setData({
            animationData: a.export()
        }), setTimeout(function() {
            t.user_punch();
        }, 400);
    },
    bid_qiandao_d: function() {
        var t = this, a = t.data.user_info;
        a.is_sign = 1, t.setData({
            user_info: a
        });
        var n = wx.createAnimation({
            duration: 200,
            timingFunction: "linear"
        });
        (this.animation = n).opacity(1).step(), t.setData({
            animationDataD: n.export()
        }), setTimeout(function() {
            n.opacity(1).scale(.4).step(), t.setData({
                animationDataD: n.export()
            });
        }, 200);
    },
    user_punch: function() {
        var t = app.api_root + "User/add_user_punch", a = this, n = app.getCache("userinfo"), i = new Object();
        i.token = n.token, i.openid = n.openid, i.much_id = app.siteInfo.uniacid, i.uid = n.uid, 
        http.POST(t, {
            params: i,
            success: function(t) {
                console.log(t), "success" == t.data.status ? ($Toast({
                    content: t.data.msg
                }), a.bid_qiandao_d()) : (a.show_qian(), $Toast({
                    content: t.data.msg
                }));
            },
            fail: function() {
                wx.showModal({
                    title: "提示",
                    content: "网络繁忙，请稍候重试！",
                    showCancel: !1,
                    success: function(t) {}
                });
            }
        });
    },
    onLoad: function(t) {
        app.authority(), this.setData({
            height: app.globalData.height,
            copyright: app.globalData.copyright,
            design: app.globalData.design
        });
    },
    onShow: function() {
        //审核判断
        app.checkEvent().then(res=>{
            let {check,is}=res;
            this.setData({check});
            if(is===2) return  wx.reLaunch({
                url: '/yl_welore/pages/author/index?type=0',
            });
        });
        wx.hideTabBar(), app.editTabbar(), app.check_user_status(), this.get_user_info(), 
        this.get_diy(), this.authority();
    },
    authority: function() {
        var t = app.api_root + "User/get_authority", a = this, n = app.getCache("userinfo"), i = new Object();
        i.token = n.token, i.openid = n.openid, i.much_id = app.siteInfo.uniacid, http.POST(t, {
            params: i,
            success: function(t) {
                a.setData({
                    copyright: t.data
                });
            },
            fail: function() {
                wx.showModal({
                    title: "提示",
                    content: "网络繁忙，请稍候重试！",
                    showCancel: !1,
                    success: function(t) {}
                });
            }
        });
    },
    get_user_info: function() {
        var t = app.api_root + "User/get_user_info", a = this, n = app.getCache("userinfo"), i = new Object();
        i.token = n.token, i.openid = n.openid, http.POST(t, {
            params: i,
            success: function(t) {
                console.log(t), "success" == t.data.status ? a.setData({
                    user_info: t.data.info,
                    flag: 1 == t.data.info.is_sign
                }) : $Toast({
                    content: t.data.msg
                });
            },
            fail: function() {
                wx.showModal({
                    title: "提示",
                    content: "网络繁忙，请稍候重试！",
                    showCancel: !1,
                    success: function(t) {}
                });
            }
        });
    },
    onShareAppMessage: function() {
        var t = app.globalData.forward;
        return console.log(t), t ? {
            title: t.title,
            path: "/yl_welore/pages/index/index",
            imageUrl: t.reis_img,
            success: function(t) {
                $Toast({
                    content: "转发成功"
                });
            },
            fail: function(t) {
                $Toast({
                    content: "转发失败"
                });
            }
        } : {
            title: "您的好友给您发了一条信息",
            path: "/yl_welore/pages/index/index",
            success: function(t) {
                $Toast({
                    content: "转发成功"
                });
            },
            fail: function(t) {
                $Toast({
                    content: "转发失败"
                });
            }
        };
    },
    onShareTimeline: function() {
        var t = app.globalData.forward;
        return console.log(t), t ? {
            title: t.title,
            query: "/yl_welore/pages/index/index",
            imageUrl: t.reis_img,
            success: function(t) {
                $Toast({
                    content: "转发成功"
                });
            },
            fail: function(t) {
                $Toast({
                    content: "转发失败"
                });
            }
        } : {
            title: "您的好友给您发了一条信息",
            query: "/yl_welore/pages/index/index",
            success: function(t) {
                $Toast({
                    content: "转发成功"
                });
            },
            fail: function(t) {
                $Toast({
                    content: "转发失败"
                });
            }
        };
    }
});
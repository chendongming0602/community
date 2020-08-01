var app = getApp(), _require = require("../../dist/base/index"), $Toast = _require.$Toast, http = require("../../util/http.js");

Component({
    properties: {
        tabbar: {
            type: Object,
            value: {}
        }
    },
    lifetimes: {
        attached: function() {
            this.get_user_info(), this.get_diy(), this.check_login();
            //审核判断
            app.checkEvent().then(res=>{
                let {check,is}=res;
                this.setData({check});
            }); 
        wx.getSystemInfo({//自定义导航
            success: e => {
              -1 < e.model.indexOf("iPhone X") && this.setData({
                isIphoneX:!0
              });
              // console.log(this.nav)
            }
          })   
        }
    },
    pageLifetimes: {
        show: function() {
            this.setData({
                isPopping: !1
            }), this.takeback();
        }
    },
    data: {
        check:false,
        isIphoneX: false,
        isPopping: !1,
        animPlus: {},
        animCollect1: {},
        animCollect: {},
        animTranspond: {},
        animInput: {},
        animBack: {},
        diy: {},
        user_info: {}
    },
    methods: {
        onTapChild: function(t) {
            this.triggerEvent("parentEvent", {
                id: 999
            }, {});
        },
        get_aa_dd: function(t) {
            var e = app.getCache("userinfo"), a = new Object();
            a.token = e.token, a.openid = e.openid, a.uid = e.uid, a.much_id = app.siteInfo.uniacid, 
            a.form_id = t.detail.formId;
            var i = app.api_root + "User/add_form_id";
            http.POST(i, {
                params: a,
                success: function(t) {
                    console.log(t);
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
        hideModal: function() {
            this.setData({
                check_phone: !1
            });
        },
        check_login: function() {
            var i = "";
            wx.checkSession({
                success: function() {
                    console.log(1);
                },
                fail: function() {
                    console.log(2), wx.login({
                        success: function(t) {
                            if (t.code) {
                                var e = app.api_root + "Login/index", a = new Object();
                                a.code = t.code, a.much_id = app.siteInfo.uniacid, http.POST(e, {
                                    params: a,
                                    success: function(t) {
                                        if (console.log(t), 0 == t.data.code) {
                                            if (t.data.info.errcode) return $Toast({
                                                content: "获取用户信息失败"
                                            }), !1;
                                            t.data.info.openid, i = t.data.info.session_key;
                                            var e = app.getCache("userinfo");
                                            e.sessionKey = i, app.setCache("userinfo", e);
                                        }
                                    }
                                });
                            } else $Toast({
                                content: "获取用户信息失败"
                            });
                        }
                    });
                }
            });
        },
        get_diy: function() {
            //会员判断数据
            app.setCache("is_diy", "");
            var t = app.api_root + "User/get_diy", e = this, a = app.getCache("userinfo"), i = new Object();
            i.uid = a.uid, i.token = a.token, i.openid = a.openid, i.much_id = app.siteInfo.uniacid, 
            i.version = app.version, http.POST(t, {
                params: i,
                success: function(t) {
                    //t.data.version  判断是否在审核，1在审核
                    e.setData({
                        version: t.data.version,
                        diy: t.data,
                        add: t.data.pattern_data.release.list
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
        getPhoneNumber: function(t) {
            if ("getPhoneNumber:ok" == t.detail.errMsg) {
                var e = app.api_root + "User/get_user_phone", a = this, i = app.getCache("userinfo"), n = new Object();
                n.token = i.token, n.openid = i.openid, n.uid = i.uid, n.much_id = app.siteInfo.uniacid, 
                n.encryptedData = t.detail.encryptedData, n.iv = t.detail.iv, n.sessionKey = i.sessionKey, 
                console.log(n), http.POST(e, {
                    params: n,
                    success: function(t) {
                        $Toast({
                            content: t.data.msg
                        }), a.setData({
                            check_phone: !1
                        }), a.get_user_info();
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
            }
        },
        get_user_info: function() {
            var t = app.api_root + "User/get_user_info", e = this, a = app.getCache("userinfo"), i = new Object();
            i.token = a.token, i.openid = a.openid, http.POST(t, {
                params: i,
                success: function(t) {
                    console.log(t), "success" == t.data.status ? e.setData({
                        user_info: t.data.info
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
        preventTouchMove: function() {},
        plus: function() {
            this.get_diy();
            var t = this;
            console.log(t.data.isPopping), 0 == t.data.isPopping ? (t.popp(), t.setData({
                isPopping: !0,
                home_current: "add"
            })) : 1 == t.data.isPopping && (t.takeback(), t.setData({
                isPopping: !1,
                home_current: "home"
            }));
        },
        popp: function() {
            var t = wx.createAnimation({
                duration: 500,
                timingFunction: "ease-out"
            }), e = wx.createAnimation({
                duration: 500,
                timingFunction: "ease-out"
            }), a = wx.createAnimation({
                duration: 500,
                timingFunction: "ease-out"
            }), i = wx.createAnimation({
                duration: 500,
                timingFunction: "ease-out"
            }), n = wx.createAnimation({
                duration: 500,
                timingFunction: "ease-out"
            }), o = wx.createAnimation({
                duration: 500,
                timingFunction: "ease-out"
            }), s = wx.createAnimation({
                duration: 500,
                timingFunction: "ease-out"
            });
            let items=this.data.isIphoneX?-125:-108;
            let hieghts=this.data.isIphoneX?200:190;
            console.log(items,hieghts)
            t.rotateZ(225).step(), e.translate(90, items).rotateZ(360).opacity(1).height("60px").width("60px").step(), 
            a.translate(90, items).rotateZ(360).opacity(1).width("60px").step(), i.translate(-10, items).rotateZ(360).opacity(1).height("60px").width("60px").step(), 
            n.translate(-110, items).rotateZ(360).opacity(1).height("60px").width("60px").step(), 
            s.translate(180, items).rotateZ(360).opacity(1).height("60px").width("60px").step(), 
            o.backgroundColor("#F7F9FA").height(hieghts).step(), this.setData({
                animPlus: t.export(),
                animCollect1: a.export(),
                animCollect: e.export(),
                animTranspond: i.export(),
                animInput: n.export(),
                animationM: s.export(),
                animBack: o.export(),
                version: 0
            });
        },
        takeback: function() {
            var t = wx.createAnimation({
                duration: 500,
                timingFunction: "ease-out"
            }), e = wx.createAnimation({
                duration: 500,
                timingFunction: "ease-out"
            }), a = wx.createAnimation({
                duration: 500,
                timingFunction: "ease-out"
            }), i = wx.createAnimation({
                duration: 500,
                timingFunction: "ease-out"
            }), n = wx.createAnimation({
                duration: 500,
                timingFunction: "ease-out"
            }), o = wx.createAnimation({
                duration: 500,
                timingFunction: "ease-out"
            });
            t.rotateZ(0).step(), e.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), 
            a.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), i.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), 
            o.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), n.backgroundColor("transparent").height(45).step(), 
            this.setData({
                animPlus: t.export(),
                animCollect: e.export(),
                animTranspond: a.export(),
                animInput: i.export(),
                animationM: o.export(),
                animBack: n.export()
            });
        },
        nav_add: function(t) {
            this.setData({
                copyright: app.globalData.copyright
            });
            var e = t.currentTarget.dataset.k, a = this.data.diy;
            if (1 != this.data.copyright.force_phone_arbor || this.data.user_info.user_phone || 0 != this.data.version) {
                if ("tuwen" == e && wx.navigateTo({
                    url: "/yl_welore/pages/packageA/add/index?type=0&fa_class=0&name="
                }), "tuya" == e) if (1 == a.user_vip.graffiti_member) {
                    if (1 != a.vip) return void $Toast({
                        content: "此功能仅限VIP用户使用"
                    });
                    wx.navigateTo({
                        url: "/yl_welore/pages/packageA/canvas/index?type=0&fa_class=0&name="
                    });
                } else wx.navigateTo({
                    url: "/yl_welore/pages/packageA/canvas/index?type=0&fa_class=0&name="
                });
                if ("yuyin" == e) if (1 == a.user_vip.voice_member) {
                    if (1 != a.vip) return void $Toast({
                        content: "此功能仅限VIP用户使用"
                    });
                    wx.navigateTo({
                        url: "/yl_welore/pages/packageA/add/index?type=1&fa_class=0&name="
                    });
                } else wx.navigateTo({
                    url: "/yl_welore/pages/packageA/add/index?type=1&fa_class=0&name="
                });
                if ("shipin" == e) if (1 == a.user_vip.video_member) {
                    if (1 != a.vip) return void $Toast({
                        content: "此功能仅限VIP用户使用"
                    });
                    wx.navigateTo({
                        url: "/yl_welore/pages/packageA/add/index?type=2&fa_class=0&name="
                    });
                } else wx.navigateTo({
                    url: "/yl_welore/pages/packageA/add/index?type=2&fa_class=0&name="
                });
            } else this.setData({
                check_phone: !0
            });
        }
    }
});
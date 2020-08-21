// yl_welore/pages/ranking/ranking.js
var app = getApp(), http = require("../../util/http.js");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        user:{
            user_head_sculpture:"https://lovers-1300783623.cos.ap-shanghai.myqcloud.com/index/lovers-022746657035097861.jpg",
            user_nick_name:"大家覅"
        },
        list:{
            banner:"",
            lists:[]
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.listEvent();
    },
    goDetail(e){
        let {id,type}=e.currentTarget.dataset;
        wx.navigateTo({
          url: `/yl_welore/pages/packageA/article/index?id=${id}&type=${type}`,
        });
    },
    listEvent(){
        var t = app.api_root + "user/get_lists_qixi", n = this, e = app.getCache("userinfo"), a = new Object();
        a.token = e.token, a.openid = e.openid;
        http.POST(t,{
            params: a,
            success(res){
                if(res.data.msg=="账户未授权!"){
                   wx.showToast({
                     title: '请先授权！',
                     icon:"none"
                   })
                    setTimeout(()=>{wx.navigateBack()},1000);
                    return;
                }
                res.statusCode==200&&(
                    n.setData({
                        list:res.data
                    })
                )
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})


Page({
  data:{
    url:""
  },
  onLoad(e){
    let {canvas}=e;
    this.setData({
      url:"https://sl.tpapi.cn/canvas/pages/school.html?list="+canvas
    });
    //https://sl.tpapi.cn/canvas/pages/school.html?list=
    //http://127.0.0.1:5501/pages/school.html?list=
  }
});
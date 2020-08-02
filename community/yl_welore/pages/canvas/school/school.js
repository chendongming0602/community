

Page({
  data:{
    url:""
  },
  onLoad(){
    let list={
      name:"成熟的",
      avatar:"https://web-1300783623.cos.ap-shanghai.myqcloud.com/canvas/canvas.png"
    };
    list=JSON.stringify(list)
    this.setData({
      url:"http://127.0.0.1:5500/pages/school.html?list="+list
    });
  }
});
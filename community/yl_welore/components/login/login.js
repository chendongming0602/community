// yl_welore/components/login/login.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    show:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showEvent(){
      this.setData({
        show:true
      });
    },
    closeEvent(){
      this.setData({
        show:false
      });
    }
  }
})

// yl_welore/components/avatar/avatar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //用户信息
    item:{
      type:Object,
      value:{}
    },
    is:{
      type:Number,
      value:0
    },
    //发帖和回帖的切换
    actions_name:String,
    //判断审核
    check:{
      type:Boolean,
      value:false
    },
    //圈主名字？
    name:String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

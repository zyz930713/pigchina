

import http from "../../http/http.js"



Page({

  /**
   * 页面的初始数据
   */
  data: {
    configInfo: {}, //配置信息 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getConfig();
  },

  //获取配置信息
  getConfig() {
    let that = this;
    let configInfo = this.data.configInfo;
    let opt = {
      url: "Index/getConfig",
      success: function (res) {
        configInfo = res.data.data;
        console.log(res)
        that.setData({
          configInfo
        })
      }
    };
    http.wxRequest(opt)
  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  },
})








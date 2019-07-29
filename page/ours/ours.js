

import http from "../../http/http.js";
import chinese from "../../utils/chinese.js";
import english from "../../utils/english.js";

let app = getApp();



Page({

  /**
   * 页面的初始数据
   */
  data: {
    language: "",
    content: "", //自定义字段
    configInfo: {}, //配置信息 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getConfig();
    this.setData({
      language: app.lang
    })
    let lastLang = this.data.language;
    this.getContent(lastLang);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      console.log(this.getTabBar())
      this.getTabBar().setData({
        selected: 2,
        language: app.lang
      })
    };
    this.setData({
      language: app.lang
    })
    let lastLang = this.data.language;
    this.getContent(lastLang);
  },

  //获取选择语言的字段
  getContent(lastLang) {
    let t = this
    if (lastLang == "zh") {
      
      t.setData({
        content: chinese.content
      })
    }
    else if (lastLang == "en") {
      t.setData({
        content: english.content
      })
    }
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

  //点击跳转到联系我们
  toContactUs(){
    wx.navigateTo({
      url: './contact_us',
    })
  },

  goBack() {
    console.log("back")
    let url = '/page/new_home/new_home'
    wx.switchTab({ url })
    this.getTabBar().setData({
      selected: 1,
    })
  }



  
})










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
    markers: [{
      id: 0,
      iconPath: "../../images/icon_cur_position.png",
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }]
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
      this.getTabBar().setData({
        selected: 0,
        language: app.lang
      })
    }
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
          configInfo: configInfo,
          markers: [{
            latitude: configInfo.latitude,
            longitude: configInfo.longitude
          }]
        })
      }
    };
    http.wxRequest(opt)
  },

  //获取地图
  toMap: function () {
    let configInfo = this.data.configInfo;
    let latitude = parseFloat(configInfo.latitude);
    let longitude = parseFloat(configInfo.longitude);
    console.log(latitude)
    wx.getLocation({//获取当前经纬度
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度，官方提示bug: iOS 6.3.30 type 参数不生效，只会返回 wgs84        类型的坐标信息  
      success: function (res) {
        wx.openLocation({//​使用微信内置地图查看位置。
          latitude: latitude,//要去的纬度-地址
          longitude: longitude,//要去的经度-地址
          name: configInfo.name,
          address: configInfo.address,
        })
      }
    })
    // wx.navigateTo({
    //   url: '../map/map',
    // })
  },

  //点击拨打电话
  makeCall() {
    let mobile = this.data.configInfo.tel;
    wx.makePhoneCall({
      phoneNumber: mobile
    })
  },

  //长按复制
  copy(e) {
    console.log(e)
  },

  goBack() {
    this.getTabBar().setData({
      selected: 1,
    })
  }


})








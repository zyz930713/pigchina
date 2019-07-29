// page/director_detail/director_detail.js

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

    swiperCurrent: 0,
    detailInfo: {}, //导演详情
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    textHidden: true, //控制文本显示隐藏
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.id);
    this.getDirectorLists(options.id);
    this.setData({
      language: app.lang
    })
  },

  onShow() {
    this.setData({
      language: app.lang
    })
    let lastLang = this.data.language;
    this.getContent(lastLang);
    // this.getDirectorLists();

  },

  //获取导演详情
  getDirectorLists(id) {
    let that = this;
    let detailInfo = this.data.detailInfo;
    let opt = {
      data: {
        director_id: id
      },
      url: "Director/detail",
      success: function (res) {
        detailInfo = res.data.data;
        detailInfo.list.forEach( ele => {
          ele['imgUrl'] = ele.film_url + '?vframe/jpg/offset/2'
        } )
        that.setData({
          detailInfo,
          language: app.lang
        });
       
      }
    };
    http.wxRequest(opt)
    let lastLang = this.data.language;
    this.getContent(lastLang);
  },

  //获取选择语言的字段
  getContent(lastLang) {
    let t = this
    if (lastLang == "zh") {
      console.log("zh")
      t.setData({
        content: chinese.content
      })
    }
    else if(lastLang == "en") {
      console.log("en")
      t.setData({
        content: english.content
      })
    }
  },


  //轮播图的切换事件 
  swiperChange: function(e) {
    console.log(e.detail.current);
    this.setData({
      swiperCurrent: e.detail.current //获取当前轮播图片的下标
    })
  },

  //滑动图片切换 
  chuangEvent: function(e) {
    this.setData({
      swiperCurrent: e.currentTarget.id
    })
  },

  //点击选中图片跳转详情
  checkTab(e) {
    let checkIndex = e.currentTarget.dataset.index;
    let goods_id = e.currentTarget.dataset.id;
    let swiperCurrent = this.data.swiperCurrent;
    if (swiperCurrent == checkIndex) {
      wx.navigateTo({
        url: '../detail/detail?goods_id=' + goods_id,
      })
    }
    else return;
  },

  //切换文本显示隐藏
  textToggle: function() {　　　　
    let that = this;　　　　
    that.setData({　　　　　　
      textHidden: !that.data.textHidden
    })　　
  }


})
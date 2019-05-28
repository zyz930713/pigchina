// page/home/home.js

import http from "../../http/http.js"
import chinese from "../../utils/chinese.js";
import english from "../../utils/english.js";

let app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    language: "",
    swiperCurrent: 1,
    imgUrls: [],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    //影视分类
    currentTab: 0,
    category_id: 1, //当前选中的分类ID
    classify: [],
    goodsList: [], //电影列表
    pagenum: 1, //页数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      language: app.lang
    })
    let lastLang = this.data.language;
    this.getContent(lastLang)
  },

  onShow: function(){
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      // console.log(this)
      this.getTabBar().setData({
        selected: 1
      })
    };
    this.setData({
      classify: [],
      goodsList: [],
    })
    this.getCategoryList();
    this.getGoodsLists();
  },

  //获取分类列表
  getCategoryList(){
    let that = this;
    let classify = this.data.classify;
    let opt = {
      url: "Category/lists",
      success: function(res){
        classify = res.data.data;
        console.log(res)
        that.setData({
          classify
        })
      }
    };
    http.wxRequest(opt)
  },

  //选择语言类型
  changeLang() {
    let version = this.data.language;
    if (version == "zh") {
      app.lang = "en"
    }
    else {
      app.lang = "zh"
    }
    this.onLoad()
  },

  //获取选择语言的字段
  getContent(lang) {
    if (lang == "zh") {
      this.setData({
        content: chinese.content
      })
    }
    else {
      this.setData({
        content: english.content
      })
    }
  },

  //获取电影列表
  getGoodsLists() {
    let that = this;
    let goodsList = this.data.goodsList;
    let category_id = this.data.category_id;
    let opt = {
      data: {
        pageSize: 10,
        category_id
      },
      url: "Goods/lists",
      success: function (res) {
        goodsList = res.data.data.data;
        goodsList.forEach( ele => {
          ele['img_url'] = ele.film_url + '?vframe/jpg/offset/2';
        } )
        // console.log(res)
        that.setData({
          goodsList
        })
      }
    };
    http.wxRequest(opt)
  },

  //点击播放事件
  startPlay(e){
    let id = e.currentTarget.dataset.id;
    this.videoContext = wx.createVideoContext('id')
    this.videoContext.pause()
  },



  //轮播图的切换事件 
  swiperChange: function (e) {
    console.log(e.detail.current);
    this.setData({
      swiperCurrent: e.detail.current  //获取当前轮播图片的下标
    })
  },

  //滑动图片切换 
  chuangEvent: function (e) {
    this.setData({
      swiperCurrent: e.currentTarget.id,
    })
  },

  //点击选中图片跳转详情
  checkTab(e){
    let checkIndex = e.currentTarget.dataset.index;
    let goods_id = e.currentTarget.dataset.id;
    let swiperCurrent = this.data.swiperCurrent;
    if (swiperCurrent == checkIndex ){
      wx.navigateTo({
        url: '../detail/detail?goods_id=' + goods_id,
      })
    }
    else return;
  },


  //点击切换，滑块index赋值
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
      category_id: e.currentTarget.dataset.id,
      goodsList: []
    })
    this.getGoodsLists();
  },
})


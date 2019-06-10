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
    order: [],
    startY: 0,
    endY: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      language: app.lang
    })
    let lastLang = this.data.language;
    this.getContent(lastLang);
    this.getGoodsLists();
    this.__set__();
    this.move();
  },

  onShow: function(){
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      console.log(this.getTabBar())
      this.getTabBar().setData({
        selected: 1,
        language: app.lang
      })
    };
    this.setData({
      classify: [],
      goodsList: [],
    })
    this.getCategoryList();
    this.getGoodsLists();
  },

  // init: function () {
  //   let list = this.data.goodsList;
  //   let middle = Math.ceil(list.length / 2);
  //   console.log(middle);
  //   list.forEach((v, i) => {
  //     if (i == middle) {
  //       v['zIndex'] = 10;
  //       v['opacity'] = 1;
  //       v['scale'] = 1.8;
  //       v['top'] = (i + 1) * 50;
  //       v['animation'] = null;
  //     }
  //     else if (i == (middle - 1) || i == (middle + 1)) {
  //       v['zIndex'] = 8;
  //       v['opacity'] = 0.8;
  //       v['scale'] = 1.4;
  //       v['top'] = (i + 1) * 50;
  //       v['animation'] = null;
  //     }
  //     else {
  //       v['zIndex'] = 6;
  //       v['opacity'] = 0.4;
  //       v['scale'] = 1;
  //       v['top'] = (i + 1) * 50;
  //       v['animation'] = null;
  //     }
  //   })
  //   this.setData({
  //     goodsList: list
  //   })
  // },

  move: function () {
    var datas = this.data.goodsList;
    /*图片分布*/
    for (var i = 0; i < datas.length; i++) {
      var data = datas[i];
      var animation = wx.createAnimation({
        duration: 200
      });
      // animation.translateX(data.left).step();
      animation.translateY(data.top).step();
      this.setData({
        ["goodsList[" + i + "].animation"]: animation.export(),
        ["goodsList[" + i + "].zIndex"]: data.zIndex,
        ["goodsList[" + i + "].opacity"]: data.opacity,
        ["goodsList[" + i + "].scale"]: data.scale,
      })
    }
  },

  /**新的排列复制到新的数组中 */
  __set__: function () {
    var that = this;
    var order = that.data.order;
    var datas = that.data.goodsList;
    for (var i = 0; i < datas.length; i++) {
      that.setData({
        // ["order[" + i + "]"]: datas[i].id
        ["order[" + i + "]"]: datas[i].goods_id
      })
    }
  },
  //手指触发开始移动
  moveStart: function (e) {
    console.log(e);
    // var startX = e.changedTouches[0].pageX;
    var startY = e.changedTouches[0].pageY;
    this.setData({
      startY: startY
    });
  },
  //手指触摸后移动完成触发事件
  moveItem: function (e) {
    console.log(e);
    var that = this;
    // var endX = e.changedTouches[0].pageX;
    var endY = e.changedTouches[0].pageY;
    this.setData({
      endY: endY
    });
    //计算手指触摸偏移剧距离
    // var moveY = this.data.startY - this.data.endY;
    var moveY = this.data.endY - this.data.startY;
    console.log(moveY)
    //向左移动
    if (moveY > 20) {
      this.down();
    }
    if (moveY < -20) {
      this.up();
    }
  },

  /**上移 */
  up: function () {
    //
    var last = this.data.goodsList.pop(); //获取数组的最后一个
    this.data.goodsList.unshift(last);//放到数组的第一个
    var orderFirst = this.data.order.shift();
    this.data.order.push(orderFirst);
    this.move();
  },
  /**下移 */
  down: function () {
    var first = this.data.goodsList.shift(); //获取数组的第一个
    this.data.goodsList.push(first);//放到数组的最后一个位置
    var orderLast = this.data.order.pop();
    this.data.order.unshift(orderLast);
    this.move();
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
      app.lang = "en";
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          language: "en",
        })
      };
    }
    else {
      app.lang = "zh";
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          language: "zh"
        })
      };
    }
    this.onLoad();
    
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
        let middle = Math.ceil(goodsList.length / 2);
        console.log(middle)
        goodsList.forEach( (v,i) => {
          v['img_url'] = v.film_url + '?vframe/jpg/offset/2';
          if (i == middle) {
            v['zIndex'] = 10;
            v['opacity'] = 1;
            v['scale'] = 1.8;
            v['top'] = (i + 1) * 80;
            v['animation'] = null;
          }
          else if (i == (middle - 1) || i == (middle + 1)) {
            v['zIndex'] = 8;
            v['opacity'] = 0.8;
            v['scale'] = 1.4;
            v['top'] = (i + 1) * 80;
            v['animation'] = null;
          }
          else {
            v['zIndex'] = 6;
            v['opacity'] = 0.4;
            v['scale'] = 1;
            v['top'] = (i + 1) * 80;
            v['animation'] = null;
          }
        } )
        // console.log(res)
        that.setData({
          goodsList
        })
        that.__set__();
        that.move();
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
    console.log(e.detail.source);
    if (e.detail.source == "touch"){
      this.setData({
        swiperCurrent: e.detail.current  //获取当前轮播图片的下标
      })
    }
    else {
      return false;
    }
  },

  //滑动图片切换 
  chuangEvent: function (e) {
    this.setData({
      swiperCurrent: e.currentTarget.id,
    })
  },

  //点击选中图片跳转详情
  checkTab(e){
    // let checkIndex = e.currentTarget.dataset.index;
    // console.log(checkIndex)
   
    // let swiperCurrent = this.data.swiperCurrent;
    // if (swiperCurrent == checkIndex ){
      
    // }
    // else return;
    let goods_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?goods_id=' + goods_id,
    })
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


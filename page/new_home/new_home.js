// page/home/new_home.js

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
  
    //影视分类
    currentTab: 0,
    category_id: 1, //当前选中的分类ID
    classify: [
      {
        id: 0,
        name: "最新",
        en_name: "NEW"
      },
      {
        id: 1,
        name: "作品",
        en_name: "WORKS"
      },
      {
        id: 2,
        name: "导演",
        en_name: "DIRECTOR"
      },
      {
        id: 3,
        name: "服务",
        en_name: "SERVICE"
      }
      
    ],
    goodsList: [], //最新数据列表
    worksList: [], //作品数据列表
    directorList: [], //导演数据列表
    serviceList: [], //服务数据列表
    height: 0,
    scrollHeight: 0,
    currentIndex: 0,
    directorIndex: 0,
    workTab: 0, //切换为作品类目
    category_name: "", //当前选中的分类名称
    category_work_id: 1,
    serviceInfo: [] 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let height = this.data.height
    // let scrollHeight = height - 150
    
    // wx.getSystemInfo({
    //   success(res) {
    //     // console.log(res.windowWidth)
    //     // console.log(res.windowHeight)
        
    //   }
    // })
    that.setData({
      language: app.lang,
    })
    let lastLang = this.data.language;
    this.getContent(lastLang);
    this.__set__();
    this.move();
    this.getHeight();
  },

  onShow: function () {
    let that = this
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      // console.log(this.getTabBar())
      this.getTabBar().setData({
        selected: 1,
        language: app.lang
      })
    };
    let currentTab = this.data.currentTab;
    this.setData({
      workTab:0,
      goodsList: [],
      currentTab,
      serviceInfo: []
      // category_id: 1
    })
    if (currentTab == 0){
      this.getNewList();
    } else if (currentTab == 2){
      let index = that.data.currentIndex;
      this.getDirectorLists(index);
    } else if (currentTab == 1) {
      // this.getWorkList();
      this.getGoodsLists(); 
    } else if (currentTab == 3) {

    }
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

  //获取列表
  getNewList() {
    let that = this;
    let goodsList = this.data.goodsList;
    let opt = {
      url: "index/page",
      success: function (res) {
        goodsList = res.data.data.list;
        // console.log(goodsList)
        let middle = Math.ceil(goodsList.length / 2) - 1;
        let viewHeight = that.data.height;
        // console.log(middle)
        goodsList.forEach((v, i) => {
          v['img_url'] = v.film_url + '?vframe/jpg/offset/2';
          if (i == middle) {
            v['zIndex'] = 10;
            v['opacity'] = 1;
            v['scale'] = 1.8;
            // v['top'] = (i + 1) * 80;
            v['top'] = 200;
            v['animation'] = null;
          }
          else if (i == (middle - 1)) {
            v['zIndex'] = 8;
            v['opacity'] = 0.8;
            v['scale'] = 1.4;
            // v['top'] = (i + 1) * 80;
            v['top'] = 120;
            v['animation'] = null;
          }
          else if (i == (middle + 1)) {
            v['zIndex'] = 8;
            v['opacity'] = 0.8;
            v['scale'] = 1.4;
            // v['top'] = (i + 1) * 80;
            v['top'] = 280;
            v['animation'] = null;
          }
          else if (i == (middle - 2)) {
            v['zIndex'] = 6;
            v['opacity'] = 0.4;
            v['scale'] = 1;
            // v['top'] = (i + 1) * 80;
            v['top'] = 40;
            v['animation'] = null;
          }
          else if (i == (middle + 2)) {
            v['zIndex'] = 6;
            v['opacity'] = 0.4;
            v['scale'] = 1;
            // v['top'] = (i + 1) * 80;
            v['top'] = 360;
            v['animation'] = null;
          }
          else {
            v['zIndex'] = 6;
            v['opacity'] = 0;
            v['scale'] = 1;
            v['top'] = (i + 1) * 80;
            v['animation'] = null;
          }
        })
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



  //获取分类列表
  getCategoryList(type) {
    let that = this;
    let worksList = this.data.worksList;
    let serviceList = this.data.serviceList;
    let opt = {
      data: {
        type: type
      },
      url: "Category/lists",
      success: function (res) {
        if (type == 0) {
          worksList = res.data.data;
          that.setData({
            worksList
          })
        }
        else if (type == 1) {
          serviceList = res.data.data;
          that.setData({
            serviceList
          })
        }
        
      }
    };
    http.wxRequest(opt)
  },

  //获取电影列表
  getGoodsLists(category_id) {
    let that = this;
    let goodsList = this.data.goodsList;
    // let category_id = category_id;
    // let pageNum = this.data.pagenum;
    let opt = {
      data: {
        pageSize: 10,
        category_id,
        // page: pageNum,
      },
      url: "Goods/lists",
      success: function (res) {
        goodsList = res.data.data.data;
        let middle = Math.ceil(goodsList.length / 2) - 1;
        let viewHeight = that.data.height;
        // console.log(middle)
        goodsList.forEach((v, i) => {
          v['img_url'] = v.film_url + '?vframe/jpg/offset/2';
          if (i == middle) {
            v['zIndex'] = 10;
            v['opacity'] = 1;
            v['scale'] = 1.8;
            // v['top'] = (i + 1) * 80;
            v['top'] = 200;
            v['animation'] = null;
          }
          else if (i == (middle - 1)) {
            v['zIndex'] = 8;
            v['opacity'] = 0.8;
            v['scale'] = 1.4;
            // v['top'] = (i + 1) * 80;
            v['top'] = 120;
            v['animation'] = null;
          }
          else if (i == (middle + 1)) {
            v['zIndex'] = 8;
            v['opacity'] = 0.8;
            v['scale'] = 1.4;
            // v['top'] = (i + 1) * 80;
            v['top'] = 280;
            v['animation'] = null;
          }
          else if (i == (middle - 2)) {
            v['zIndex'] = 6;
            v['opacity'] = 0.4;
            v['scale'] = 1;
            // v['top'] = (i + 1) * 80;
            v['top'] = 40;
            v['animation'] = null;
          }
          else if (i == (middle + 2)) {
            v['zIndex'] = 6;
            v['opacity'] = 0.4;
            v['scale'] = 1;
            // v['top'] = (i + 1) * 80;
            v['top'] = 360;
            v['animation'] = null;
          }
          else {
            v['zIndex'] = 6;
            v['opacity'] = 0;
            v['scale'] = 1;
            v['top'] = (i + 1) * 80;
            v['animation'] = null;
          }
        })
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

  //获取导演列表
  // getDirectorLists() {
  //   let that = this;
  //   let directorList = this.data.directorList;
  //   let opt = {
  //     data: {
  //       // pageSize: 10,
  //     },
  //     url: "Director/lists",
  //     success: function (res) {
  //       // console.log(res.data.data.data)
  //       directorList = res.data.data.data;
  //       that.setData({
  //         directorList
  //       })
  //     }
  //   };
  //   http.wxRequest(opt)
  // },

  //获取导演列表
  getDirectorLists(index) {
    console.log(index)
    let that = this;
    let goodsList = this.data.goodsList;
    let opt = {
      data: {
        // page: pagenum,
        // pageSize: 10,
        // keywords
      },
      url: "Director/lists",
      success: function (res) {
        goodsList = res.data.data.data;
        let middle;
        if (index){
          middle = index
        } else {
          middle = Math.ceil(goodsList.length / 2) - 1;
        }
        let viewHeight = that.data.height;
        console.log(middle)
        goodsList.forEach((v, i) => {
          v['img_url'] = v.image.file_path;
          if (i == middle) {
            v['zIndex'] = 10;
            v['opacity'] = 1;
            v['scale'] = 1.8;
            // v['top'] = (i + 1) * 80;
            v['top'] = 200;
            v['animation'] = null;
          }
          else if (i == (middle - 1)) {
            v['zIndex'] = 8;
            v['opacity'] = 0.8;
            v['scale'] = 1.4;
            // v['top'] = (i + 1) * 80;
            v['top'] = 120;
            v['animation'] = null;
          }
          else if (i == (middle + 1)) {
            v['zIndex'] = 8;
            v['opacity'] = 0.8;
            v['scale'] = 1.4;
            // v['top'] = (i + 1) * 80;
            v['top'] = 280;
            v['animation'] = null;
          }
          else if (i == (middle - 2)) {
            v['zIndex'] = 6;
            v['opacity'] = 0.4;
            v['scale'] = 1;
            // v['top'] = (i + 1) * 80;
            v['top'] = 40;
            v['animation'] = null;
          }
          else if (i == (middle + 2)) {
            v['zIndex'] = 6;
            v['opacity'] = 0.4;
            v['scale'] = 1;
            // v['top'] = (i + 1) * 80;
            v['top'] = 360;
            v['animation'] = null;
          }
          else {
            v['zIndex'] = 6;
            v['opacity'] = 0;
            v['scale'] = 1;
            v['top'] = (i + 1) * 80;
            v['animation'] = null;
          }
        })
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

  //点击选中图片跳转到最新作品详情
  checkTab(e) {
    let goods_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?goods_id=' + goods_id,
    })
  },

  //跳转到作品详情列表
  toWorkDetail(e) {
    // console.log(e)
    let category_id = e.currentTarget.dataset.id
    let name = e.currentTarget.dataset.name
    this.setData({
      workTab: 1,
      category_name: name,
      // category_work_id: id
    })
    this.getGoodsLists(category_id)
    // wx.navigateTo({
    //   url: '../works_list/works_list?id=' + id + '&name=' + name,
    // })
  },

  //跳转到导演详情
  toDetail(e) {
    let id = e.currentTarget.dataset.id
    this.setData({
      directorIndex: id
    })
    wx.navigateTo({
      url: '../director_detail/director_detail?id=' + id,
    })
  },

  //跳转到服务详情
  toserviceDetail(e) {
    let id = e.currentTarget.dataset.id
    this.setData({
      workTab: 2,
    })
    this.getServiceLists(id)
    // wx.navigateTo({
    //   url: '../service_detail/service_detail?id=' + id,
    // })
  },

  getServiceLists(id) {
    let that = this;
    let serviceInfo = this.data.serviceInfo;
    // let category_id = this.data.category_id;
    // let pageNum = this.data.pagenum;
    let opt = {
      data: {
        category_id: id
      },
      url: "Goods/lists",
      success: function (res) {
        // console.log(res)
        serviceInfo = res.data.data.data[0]
        that.setData({
          serviceInfo
        })
      }
    };
    http.wxRequest(opt)
  },

  //点击切换，滑块index赋值
  navbarTap: function (e) {
    // console.log(e);
    let _this = this;
    // let currentTab = this.data.currentTab;
    // let sign = e.currentTarget.dataset.sign;
   
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
    })
    let currentTab = this.data.currentTab;
    if ( currentTab == 1 ) {
      _this.getCategoryList(0)
      // _this.setData({
      //   currentTab: e.currentTarget.dataset.idx,
      // })
    } else if (currentTab == 2 ) {
      _this.getDirectorLists()
    } else if (currentTab == 3) {
      _this.getCategoryList(1)
    } else if (currentTab == 0) {
      _this.getNewList()
    }
  },

  getHeight() {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        let clientHeight = res.windowHeight;
        if ( clientHeight < 720 ){
          that.setData({
            height: clientHeight + 50,
            scrollHeight: 450
          })
        } else {
          that.setData({
            height: clientHeight,
            scrollHeight: 610
          })
        }
        
      },
    })
  },

  move: function () {
    let that = this;
    // let pagenum = this.data.pagenum + 1;
    let datas = this.data.goodsList;
    /*图片分布*/
    for (let i = 0; i < datas.length; i++) {
      console.log("move")
      var data = datas[i];
      if(data['opacity'] == 1) {
        that.setData({
          currentIndex: i
        })
      }
      // console.log(data)
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
        ["order[" + i + "]"]: datas[i].goods_id
      })
    }
  },
  //手指触发开始移动
  moveStart: function (e) {
    // console.log(e);
    // var startX = e.changedTouches[0].pageX;
    var startY = e.changedTouches[0].pageY;
    this.setData({
      startY: startY
    });
  },
  //手指触摸后移动完成触发事件
  moveItem: function (e) {
    // console.log(e);
    var that = this;
    // var endX = e.changedTouches[0].pageX;
    var endY = e.changedTouches[0].pageY;
    this.setData({
      endY: endY
    });
    //计算手指触摸偏移剧距离
    // var moveY = this.data.startY - this.data.endY;
    var moveY = this.data.endY - this.data.startY;
    // console.log(moveY)
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

  goBack() {
    console.log(11)
    this.setData({
      workTab: 0
    })
  }
})


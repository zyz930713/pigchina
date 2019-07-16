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
    newList: [], //最新数据列表
    worksList: [], //作品数据列表
    directorList: [], //导演数据列表
    serviceList: [], //服务数据列表
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
    this.getNewList()
  },

  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      console.log(this.getTabBar())
      this.getTabBar().setData({
        selected: 1,
        language: app.lang
      })
    };
    let currentTab = this.data.currentTab;
    this.setData({
      // classify: [],
      goodsList: [],
      currentTab
      // category_id: 1
    })
    
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
    let newList = this.data.newList;
    let opt = {
      url: "index/page",
      success: function (res) {
        newList = res.data.data.list.data;
        newList.forEach((v) => {
          v['img_url'] = v.film_url + '?vframe/jpg/offset/2';
        })
        that.setData({
          newList                 
        })
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

  //获取导演列表
  getDirectorLists() {
    let that = this;
    let directorList = this.data.directorList;
    let opt = {
      data: {
        // pageSize: 10,
      },
      url: "Director/lists",
      success: function (res) {
        console.log(res.data.data.data)
        directorList = res.data.data.data;
        that.setData({
          directorList
        })
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
    console.log(e)
    let id = e.currentTarget.dataset.id
    let name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: '../works_list/works_list?id=' + id + '&name=' + name,
    })
  },

  //跳转到导演详情
  toDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../director_detail/director_detail?id=' + id,
    })
  },

  //跳转到服务详情
  toserviceDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../service_detail/service_detail?id=' + id,
    })
  },

  //点击切换，滑块index赋值
  navbarTap: function (e) {
    console.log(e);
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
    } 
  },
})


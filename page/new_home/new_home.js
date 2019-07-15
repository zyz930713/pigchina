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
        name: "最新",
        en_name: "NEW"
      },
      {
        name: "作品",
        en_name: "WORKS"
      },
      {
        name: "导演",
        en_name: "DIRECTOR"
      },
      {
        name: "服务",
        en_name: "SERVICE"
      }
      
    ],
    newList: [1,1,1,1], //最新数据列表
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
    this.setData({
      // classify: [],
      goodsList: [],
      currentTab: 0,
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

  //获取分类列表
  getCategoryList() {
    let that = this;
    let worksList = this.data.worksList;
    let opt = {
      url: "Category/lists",
      success: function (res) {
        worksList = res.data.data;
        console.log(res)
        that.setData({
          worksList
        })
      }
    };
    http.wxRequest(opt)
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

  

  //点击切换，滑块index赋值
  navbarTap: function (e) {
    console.log(e);
    let _this = this;
    let currentTab = this.data.currentTab;
    // let sign = e.currentTarget.dataset.sign;
   
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
    })
    if (currentTab == 0 ) {
      _this.getCategoryList()
      // _this.setData({
      //   currentTab: e.currentTarget.dataset.idx,
      // })
    }  
  },
})


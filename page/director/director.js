
import http from "../../http/http.js";
import chinese from "../../utils/chinese.js";
import english from "../../utils/english.js";

let app = getApp();

Page({
  data:{
    language: "",
    content: "", //自定义字段
    directorList: [], //导演列表
    pagenum: 1, //页数
    isHideLoadMore: false, //是否加载更多
    keywords: "", //搜索关键字
    inputValue: "" //iput输入值
  },

  onLoad(){
    this.setData({
      language: app.lang
    })
    // let lastLang = this.data.language;
    // this.getContent(lastLang)
  },

  onShow(){
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
    this.setData({
      directorList: [],
      pagenum: 1,
      language: app.lang
    })
    let lastLang = this.data.language;
    this.getContent(lastLang);
    this.getDirectorLists();
    
  },


  //获取选择语言的字段
  getContent(lastLang){
    let t = this
    if (lastLang == "zh") {
      console.log("zh")
      t.setData({
        content: chinese.content
      })
    }
    else if(lastLang == "en"){
      console.log("en")
      t.setData({
        content: english.content
      })
    }
  },



  //获取导演列表
  getDirectorLists(){
    let that = this;
    let pagenum = this.data.pagenum;
    let keywords = this.data.keywords;
    let opt = {
      data: {
        page: pagenum,
        pageSize: 10,
        keywords
      },
      url: "Director/lists",
      success: function (res) {
        let arr1 = that.data.directorList;
        let arr2 = res.data.data.data;
        arr1 = arr1.concat(arr2)
        console.log(arr1)
        that.setData({
          directorList: arr1,
          isHideLoadMore: false
        })
      }
    };
    http.wxRequest(opt)
  },

  //获取输入框的关键字
  bindinput(e) {
    let that = this;
    let inputValue = e.detail.value;
    that.setData({
      keywords: inputValue,
    })
  },

  //点击搜索
  toSearch(){
    this.setData({
      directorList: [],
      pagenum: 1
    })
    this.getDirectorLists();
  },

  //清空输入框
  resetSearch(){
    console.log(111)
    this.setData({
      keywords: "",
      directorList: [],
      pagenum: 1
    })
    this.getDirectorLists();
  },

  //上拉刷新加载
  onReachBottom() {
    let that = this;
    let pagenum = this.data.pagenum + 1;
    that.setData({
      pagenum,
      isHideLoadMore: true
    })
    that.getDirectorLists();
  },

  toDetail(e){
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../director_detail/director_detail?id=' + id,
    })
  }
})


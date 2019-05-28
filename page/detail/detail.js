// page/detail/detail.js

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
    // recommandList: [1,2,3,3]
    detailInfo: {}, //电影详情
    relatedList: [], //相关推荐
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsLists(options.goods_id)
  },

  onShow(){
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
      console.log("zh")
      t.setData({
        content: chinese.content
      })
    }
    else if (lastLang == "en") {
      console.log("en")
      t.setData({
        content: english.content
      })
    }
  },

  //获取电影详情
  getGoodsLists(id) {
    let that = this;
    let detailInfo = this.data.detailInfo;
    let relatedList = this.data.relatedList;
    let opt = {
      data: {
        goods_id: id
      },
      url: "Goods/detail",
      success: function (res) {
        detailInfo = res.data.data.detail;
        relatedList = res.data.data.list
        that.setData({
          detailInfo,
          relatedList
        })
      }
    };
    http.wxRequest(opt)
  },

  
})
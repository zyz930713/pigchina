// page/detail/detail.js

import http from "../../http/http.js"


Page({

  /**
   * 页面的初始数据
   */
  data: {
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
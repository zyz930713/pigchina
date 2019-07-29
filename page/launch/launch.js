// page/launch/launch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: [
      // '../../image/home/guide1.png',
      // '../../image/home/guide2.png',
      // '../../image/home/guide3.png'
      'http://cdn.zjwoo.com/start01.png',
      'http://cdn.zjwoo.com/start02.png',
      'http://cdn.zjwoo.com/start03.png'
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  start() {
    // console.log(1)
    // wx.setStorageSync('isFirst', 'no')
    wx.switchTab({
      url: '../new_home/new_home',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  
})
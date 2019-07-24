App({
  onLaunch: function() {
    var isFir = wx.getStorageSync('isFirst');
    if(isFir) {
      console.log(1)
      wx.switchTab({
        url: 'page/new_home/new_home',
      })
    } else {
      console.log(0)
      wx.navigateTo({
        url: 'page/launch/launch',
      })
    }
  },

  onShow: function (e) {
    var t = this;
    var isFir = wx.getStorageSync('isFirst');
    if (isFir) {
      console.log(1)
      wx.switchTab({
        url: 'page/new_home/new_home',
      })
    } else {
      console.log(0)
      wx.redirectTo({
        url: 'page/launch/launch',
      })
    }
    try {
      var n = wx.getUpdateManager();
      n.onCheckForUpdate(function (e) {
        console.log(e);
      }), n.onUpdateReady(function () {
        wx.showModal({
          title: "更新提示",
          content: "新版本已经准备好，重启应用？",
          showCancel: !1,
          success: function (e) {
            e.confirm && n.applyUpdate();
          }
        });
      });
    } catch (e) {
      console.log(e);
    }
  },
  lang: "zh",  //语言信息
})

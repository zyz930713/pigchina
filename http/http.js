const { $Toast } = require('../dist/base/index');



module.exports = {
  // URL: 'https://www.e234.top/api/',
  URL: 'https://film.zjwoo.com/api/',
  imgURL: 'https://www.e234.top/',

  /**
  * http://film.zjwoo.com
  * 封装wx.request请求
  * method： 请求方式
  * url: 请求地址
  * data： 要传递的参数
  * callback： 请求成功回调函数
  * errFun： 请求失败回调函数
  * header:  请求头
  **/
  wxRequest(opt, callback) {
    opt = opt || {};
    opt.url = this.URL + opt.url;
    opt.data = opt.data || {};
    opt.data.wxapp_id = 10001;
    opt.data.token = wx.getStorageSync('token');
    opt.method = opt.method || 'POST';
    opt.header = opt.header || {
      'content-type': opt.method == 'GET' ? 'application/json' : 'application/x-www-form-urlencoded',
      'token': wx.getStorageSync('token'),
      'Accept': 'application/json'
    }
    opt.errFun = opt.errFun || function () { };
    opt.success = opt.success || function () { };
    callback = callback || function () { };
    opt.fail = opt.fail || function () { };
    opt.loading = opt.loading || {
      title: '加载中',
      mask: true
    };
    wx.showLoading(opt.loading)
    wx.request({
      url: opt.url,
      method: opt.method,
      data: opt.data,
      header: opt.header,
      dataType: 'json',
      success: function (res) {
        wx.hideLoading();
        switch (res.data.code) {
          case 1:
            // $Toast({
            //   content: res.data.msg,
            //   type: 'success'
            // });
            callback(res);
            opt.success(res);
            break;
          case -1:
            wx.navigateTo({
              url: '../login/login',
            })
            break;
          case -2:
            wx.navigateTo({
              url: '../login/login',
            })
            break;
          default:
            $Toast({
              content: res.data.msg,
              type: 'error'
            });
            break;
        }
      },
      fail: function (err) {
        wx.hideLoading();
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          mask: true
        });
        opt.errFun(err);
      },
      complete: function (res) {
        wx.hideLoading();
        opt.fail(res)
      }
    })
  }





}
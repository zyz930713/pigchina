// import locales from './utils/locales.js';
// import T from './utils/i18n.js'

// T.registerLocale(locales);
// T.setLocaleByIndex(wx.getStorageSync('langIndex') || 0);
// wx.T = T;

App({
  onLaunch: function () {
    let value = wx.getStorageSync('lang');
    if(value == "") {
      let res = wx.getSystemInfoSync();
      this.lang = res.language;
      console.log(this.lang);
    }
  },

  lang: ""  //语言信息


})

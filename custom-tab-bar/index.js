
import chinese from "../utils/chinese.js";
import english from "../utils/english.js";

let app = getApp();


Component({
  data: {
    language: "",
    content: "", //自定义字段

    selected: 0,
    color: "#fff",
    selectedColor: "#fff",
    list: [{
      pagePath: "/page/director/director",
      iconPath: "/image/home/contact_icon.png",
      selectedIconPath: "/image/contact/contact_select.png",
      text: "" 
    },  
    {
      pagePath: "/page/home/home",
      iconPath: "/image/home/home_icon.png",
      selectedIconPath: "/image/home/home_icon.png"
    },
    {
      pagePath: "/page/ours/ours",
      iconPath: "/image/home/ours_icon.png",
      selectedIconPath: "/image/ours/ours_select.png",
      text: ""
    }]
  },
  attached() {
    this.setData({
      language: app.lang
    })
    let lastLang = this.data.language;
    // console.log(lastLang)
    this.getContent(lastLang);
  },
  pageLifetimes: {
    // show: function () {
    //   this.setData({
    //     language: app.lang
    //   });
    //   let lastLang = this.data.language;
    //   console.log(lastLang)
    //   this.getContent(lastLang);
    // }
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    },
    getContent(lastLang){
      // let lastLang = app.lang
      let t = this
      let text1 = this.data.list[0].text;
      let text2 = this.data.list[2].text;
      if (lastLang == "zh") {
        console.log("zh")
        text1 = chinese.content.tabarList[0];
        text2 = chinese.content.tabarList[1];
        console.log(text1, text2)
        t.setData({
          'list[0].text': text1,
          'list[2].text': text2,
        })
      }
      else if (lastLang == "en") {
        console.log("en")
        text1 = english.content.tabarList[0];
        text2 = english.content.tabarList[1];
        console.log(text1, text2)
        console.log(text1, text2)
        t.setData({
          'list[0].text': text1,
          'list[2].text': text2,
        })
      }
    }
  }
})
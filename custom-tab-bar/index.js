
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
      textZh: "导演" ,
      textEn: "CONTACT"
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
      textZh: "我们",
      textEn: "ABOUT"
    }]
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
  }
})
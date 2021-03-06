
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
      pagePath: "/page/ours/contact_us",
      iconPath: "/image/home/mobile_icon.png",
      selectedIconPath: "/image/home/contact_active.png",
      textZh: "联系" ,
      textEn: "CONTACT"
    },  
    {
      pagePath: "/page/new_home/new_home",
      iconPath: "/image/home/home_icon.png",
      selectedIconPath: "/image/home/home_icon.png"
    },
    {
      pagePath: "/page/ours/ours",
      iconPath: "/image/home/about_icon.png",
      selectedIconPath: "/image/home/ours_active.png",
      textZh: "我们",
      textEn: "ABOUT"
    }]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      console.log(url)
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    },
  }
})
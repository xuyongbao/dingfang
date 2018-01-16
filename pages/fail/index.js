// pages/login/login.js
Page({
  data: {
    h:0,
    w:0
  },
  onLoad: function (options) {
    let self = this;
    // 生命周期函数--监听页面加载
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        self.setData({
          h: res.windowHeight,
          w: res.windowWidth
        })
      }
    })
    
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成


  }, 
  onShow: function () {
    // 生命周期函数--监听页面显示
    
  },
  setSize:function(event){
    console.log(event.detail);
    
  }, 
  onShareAppMessage: function () {
    var that = this
    return {
      title: "妈宝，让订房更轻松",
      path: '/pages/loading/index',
      success: function (res) {
        wx.showShareMenu({
          shareTicket: '妈宝，让订房更轻松',
          withShareTicket: true
        })
      },
      fail: function (res) {
        console.log("转发失败")
      }
    }
  }
})

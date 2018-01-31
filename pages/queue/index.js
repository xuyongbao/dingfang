// pages/index/index.js
var app = getApp()  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    numList:[],
    timer:null,
    state:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.getNumList();

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
    let that = this;
    clearInterval(that.timer);
    that.timer = setTimeout(function(){
      that.getNumList();
    },5000)
  },

  getNumList: function () {
    let that = this;
    wx.request({
      url: 'https://mabao.jixuanjk.com/queue/get_all.php',
      data: {
        openid: getApp().globalData.openid,
        shop_id: getApp().globalData.shop_id
      },
      method: "POST",
      success: function (res) {
        console.log('排队领号', res.data);
        wx.hideLoading();
        if (res.data.status) {
          if(res.data.data.length >= 1){
            that.setData({
              numList: res.data.data,
              state:1
            }) 
          }else{
            that.setData({
              numList: res.data.data,
              state: 0
            }) 
          }
         
        } else {
          wx.showModal({
            title: '温馨提示',
            content: res.data.msg,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    let that = this;
    clearInterval(that.timer);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
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
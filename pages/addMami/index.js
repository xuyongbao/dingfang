// pages/index/index.js
var app = getApp()  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    houseNumber:0,
    nextDisabled:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
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
  houseNumberInput:function(event){
    let telephone = event.detail.value;
    this.setData({houseNumber:event.detail.value});

    var teleReg = /^((0\d{2,3})-)(\d{7,8})$/;
    var mobileReg = /^1[3456789]\d{9}$/;
    if (!teleReg.test(telephone) && !mobileReg.test(telephone)) {
      this.setData({
        "nextDisabled": true
      })
    } else {
      this.setData({
        "nextDisabled": false
      })
    }

  },
  back:function(){
    let that = this;
    // getApp().globalData.hN = that.data.houseNumber;
    wx.navigateBack({
      delta:1
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this
    return {
      title: "物业租售管家，让买房卖房更放心。",
      path: '/pages/index/index',
      success: function (res) {
        wx.showShareMenu({
          shareTicket: '物业租售管家，让买房卖房更放心。',
          withShareTicket: true
        })
      },
      fail: function (res) {
        console.log("转发失败")
      }
    }
  }
})
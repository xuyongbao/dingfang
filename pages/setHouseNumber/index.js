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
    this.setData({houseNumber:event.detail.value});
    if(event.detail.value >= 1){
      this.setData({
        nextDisabled:false
      })
    }else{
      this.setData({
        nextDisabled:true
      })
    }
  },
  toSethouseName:function(){
    let that = this;
    getApp().globalData.hN = that.data.houseNumber;
    wx.navigateTo({
      url: '../setHouseName/index',
    });
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
// pages/index/index.js
var app = getApp()  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mamiList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let arr = [];
    for (let i = 0; i < 60; i++) {
      arr.push({ id: "A" + i, name: '红姐' + i, tel:'133131322333' });
    }
    this.setData({
      mamiList: arr
    })
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
  deleteMami: function (event) {
    let id = event.currentTarget.dataset.id;
    let name = event.currentTarget.dataset.name;
    console.log(id);
    wx.showModal({
      title: '温馨提示',
      content: '是否确定删除'+name,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  toAddMami:function(){
    wx.navigateTo({
      url: '../addMami/index',
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
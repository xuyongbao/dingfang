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
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    

    wx.request({
      url: 'https://mabao.jixuanjk.com/shop.php', //仅为示例，并非真实的接口地址
      data: {
        openid: getApp().globalData.openid,
        op:1,
        room_number: that.data.houseNumber
      },
      method:"POST",
      success: function (res) {
        console.log(res.data);
        wx.hideLoading();
        if (res.data.status) {
          getApp().globalData.allRoomList = res.data.data.rooms;
          getApp().globalData.shop_id = res.data.data.shop_id;
          getApp().globalData.hN = that.data.houseNumber;
          wx.navigateTo({
            url: '../setHouseName/index',
          });
        }else{
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
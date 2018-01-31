// pages/index/index.js
var app = getApp()  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toView: 'A30',
    mamiNameList:[],
    status:-1,
    mamiId:0,
    roomId:0,
    checkedId:-1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;

    that.setData({
      mamiNameList: getApp().globalData.mami,
      status: getApp().globalData.roomStatus,
      mamiId: getApp().globalData.mamiId,
      roomId: getApp().globalData.roomId,
    });

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
    let viewId = that.data.mamiId;
    this.setData({
      toView: viewId
    })
  },
  choiseName:function(event){
    let id = event.currentTarget.id;
    let name = event.currentTarget.dataset.name;
    let index = event.currentTarget.dataset.index;
    let status = this.data.status;
    let roomId = this.data.roomId;
    let mamiId = this.data.mamiId;
    let that = this;

    that.setData({
      checkedId:index
    })
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    if(status == 0){
      that.aptRoom(roomId,id);
    }else{
      that.comeRoom(roomId,id);
    }
  },
  aptRoom: function (room_id, mami_id) {
    //预定房间
    let that = this;
    wx.request({
      url: 'https://mabao.jixuanjk.com/booking.php',
      data: {
        openid: getApp().globalData.openid,
        room_id: room_id,
        mami_id: mami_id
      },
      method: "POST",
      success: function (res) {
        console.log('预定', res.data);
        wx.hideLoading();
        if (res.data.status) {
          wx.navigateBack({

          })
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

  comeRoom: function (room_id, mami_id) {
    //进客
    let that = this;
    wx.request({
      url: 'https://mabao.jixuanjk.com/order.php',
      data: {
        openid: getApp().globalData.openid,
        room_id: room_id,
        mami_id: mami_id
      },
      method: "POST",
      success: function (res) {
        console.log('进客', res.data);
        wx.hideLoading();
        if (res.data.status) {
          
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
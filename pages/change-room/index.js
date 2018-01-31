// pages/index/index.js
var app = getApp()  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    houseArr:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
      
    
  },
  
  getRoomList:function(){
    let that = this;
    wx.request({
      url: 'https://mabao.jixuanjk.com/all_no_order_room.php',
      data: {
        openid: getApp().globalData.openid
      },
      method: "POST",
      success: function (res) {
        console.log('获取所有未进客房间', res.data);
        if (res.data.status) {
          that.setData({
            houseArr: res.data.data.rooms
          });
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    that.getRoomList();
   


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
  
  changeState:function(event){
    let id = event.currentTarget.dataset.id;
    let arr = [];
    let that = this;
      arr = ['进客'];

      wx.showActionSheet({
        itemList: arr,
        success: function (res) {
          console.log(res.tapIndex);
          that.comeRoom(id)
        },
        fail: function (res) {
          console.log(res.errMsg)
        }
      })
    
  },
  comeRoom:function(room_id){
    //预定房间
    let that = this;
    wx.request({
      url: 'https://mabao.jixuanjk.com/change_order.php',
      data: {
        openid: getApp().globalData.openid,
        from_room_id: getApp().globalData.fromRoomId,
        to_room_id: room_id
      },
      method: "POST",
      success: function (res) {
        console.log('转台', res.data);
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
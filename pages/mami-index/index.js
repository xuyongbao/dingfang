// pages/index/index.js
var app = getApp()  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    houseN:0,
    houseArr:[],
    showInput:false,
    houseId:-1,
    iptName:'',
    fastApt:false,
    mamiList:null,
    msg:'',
    lock:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRoomList();
    this.getMamiList();
    this.getMsg();
    this.searchRoomStatus();
    
  },
  toResetName: function () {
    wx.navigateTo({
      url: '../resetHouseName/index',
    })
  },
  toResetNumber: function () {
    wx.navigateTo({
      url: '../resetHouseNumber/index',
    })
  },
  toMami: function () {
    wx.navigateTo({
      url: '../mamiManage/index',
    })
  },
  toHistory: function () {
    wx.navigateTo({
      url: '../mami-history/index',
    })
  },
  searchRoomStatus: function () {
    let that = this;
    wx.request({
      url: 'https://mabao.jixuanjk.com/search_room_lock.php',
      data: {
        openid: getApp().globalData.openid
      },
      method: "POST",
      success: function (res) {
        console.log('先到先得', res.data);
        if (res.data.status) {
          that.setData({
            lock: res.data.data.room_lock_status
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  getRoomList: function () {
    let that = this;
    
    wx.request({
      url: 'https://mabao.jixuanjk.com/room_set.php',
      data: {
        openid: getApp().globalData.openid
      },
      method: "POST",
      success: function (res) {
        console.log('房间集合', res.data);
        if (res.data.status) {
          that.setData({
            houseArr: res.data.data
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
  getMamiList: function () {
    let that = this;
    wx.request({
      url: 'https://mabao.jixuanjk.com/mami_list.php',
      data: {
        openid: getApp().globalData.openid
      },
      method: "POST",
      success: function (res) {
        console.log('妈咪list', res.data);
        if (res.data.status) {
          that.setMamiData(res.data.data);
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
  setMamiData: function (data) {
    let that = this;
    getApp().globalData.mami = data;
    let mamiData = {};

    for (let i = 0; i < data.length; i++) {
      mamiData[data[i].mami_id] = { id: data[i].mami_id, name: data[i].nick_name, phone: data[i].mami_mobile }
    }
    getApp().globalData.mamiList = mamiData;
    that.setData({
      mamiList: mamiData
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    setInterval(function(){
      that.getMsg();
      that.getRoomList();
      that.searchRoomStatus();
    },15000)
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
  toQueue:function(){
    wx.navigateTo({
      url: '../queue/index',
    })
  },
  getQueueNumber:function(){
    let that = this;
    wx.showLoading({
      title: '领号中',
      mask:true
    })

    wx.request({
      url: 'https://mabao.jixuanjk.com//queue/get_number.php',
      data: {
        openid: getApp().globalData.openid
      },
      method: "POST",
      success: function (res) {
        console.log('排队领号', res.data);
        if (res.data.status) {
          wx.hideLoading();
          wx.showToast({
            title: res.data.data.number+'号',
            icon: 'success',
            mask:true,
            duration: 2000
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
  getMsg:function(){
    let that = this;
    wx.request({
      url: 'https://mabao.jixuanjk.com/room_stat.php',
      data: {
        openid: getApp().globalData.openid
      },
      method: "POST",
      success: function (res) {
        console.log('统计信息', res.data);
        if (res.data.status) {
          that.setData({
            msg:res.data.data
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  fastToFast:function(){
    let arr = this.data.houseArr;

    for(let i=0;i<arr.length;i++){
      if(arr[i].state != 3){
        arr[i].state = 4;
      }
    }
    this.setData({
      houseArr:arr,
      fastApt:true
    })
  },
  changeState:function(event){
    let state = event.currentTarget.dataset.state;
    let id = event.currentTarget.dataset.id;
    let mami = event.currentTarget.dataset.mami;
    let that = this;

    if(state == 0){
      wx.showActionSheet({
        itemList: ['预约'],
        success: function (res) {
          console.log(res.tapIndex);
          that.aptMine(id);
        },
        fail: function (res) {
          console.log(res.errMsg)
        }
      })
    }else if(state == 1 && mami == 1 ){
      wx.showActionSheet({
        itemList: ['取消预约'],
        success: function (res) {
          console.log(res.tapIndex);
          that.aptCancleMine(id);
        },
        fail: function (res) {
          console.log(res.errMsg)
        }
      })
    }
  },
  aptMine: function (id) {
    let that = this;
    wx.request({
      url: 'https://mabao.jixuanjk.com/booking.php',
      data: {
        openid: getApp().globalData.openid,
        room_id: id
      },
      method: "POST",
      success: function (res) {
        console.log('预约', res.data);
        if (res.data.status) {
          that.getRoomList();
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
  aptCancleMine: function (id) {
    let that = this;
    wx.request({
      url: 'https://mabao.jixuanjk.com/cancel_booking.php',
      data: {
        openid: getApp().globalData.openid,
        room_id: id
      },
      method: "POST",
      success: function (res) {
        console.log('取消预约', res.data);
        if (res.data.status) {
          that.getRoomList();
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
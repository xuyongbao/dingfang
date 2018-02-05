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
    mami:{},
    msg:'',
    lock:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.getMsg();
      
    
  },
  toQueue:function(){
    wx.navigateTo({
      url: '../queue/index',
    })
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
      url: '../history/index',
    })
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
            lock:res.data.data.room_lock_status
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
  getMamiList:function(){
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

  getMsg: function () {
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
            msg: res.data.data
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
    wx.request({
      url: 'https://mabao.jixuanjk.com/all_room.php',
      data: {
        openid: getApp().globalData.openid,
        shop_id: getApp().globalData.shop_id
      },
      method: "POST",
      success: function (res) {
        console.log('allRoom', res.data);
        if (res.data.status) {
          getApp().globalData.hN = res.data.data.rooms.length;
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    that.getRoomList();
    that.getMamiList();
    that.searchRoomStatus();

    getApp().globalData.roomId = 0;
    getApp().globalData.roomStatus = -1;
    getApp().globalData.mamiId = 0;


    setInterval(function(){
      that.renderFn();
      that.getMsg();
    },5000)


  },
  setMamiData:function(data){
    let that = this;
    getApp().globalData.mami = data;
    let mamiData = {};

    for(let i=0;i<data.length;i++){
      mamiData[data[i].mami_id] = { id: data[i].mami_id, name: data[i].nick_name, phone: data[i].mami_mobile}
    }
    getApp().globalData.mamiList = mamiData;
    that.setData({
      mami:mamiData
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
  fastToFast:function(){
    let that = this;
    let lock = that.data.lock;
    let op;
    if(lock == 1){
      op = 2;
    }else if(lock == 2){
      op = 1;
    }
    wx.request({
      url: 'https://mabao.jixuanjk.com/all_room_lock.php',
      data: {
        openid: getApp().globalData.openid,
        shop_id: getApp().globalData.shop_id,
        op:op
      },
      method: "POST",
      success: function (res) {
        console.log('先到先得', res.data);
        if (res.data.status) {
          that.setData({
            houseArr: res.data.data,
            fastApt: true,
            lock:op
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
  changeState:function(event){
    let state = event.currentTarget.dataset.state;
    let id = event.currentTarget.dataset.id;
    let mami = event.currentTarget.dataset.mami;
    let arr = [];
    let that = this;
    console.log('当前状态',state)
    if(state == 0){
      arr = ['预定', '进客'];

      wx.showActionSheet({
        itemList: arr,
        success: function (res) {
          console.log(res.tapIndex);
          let index = res.tapIndex;
          if (index == 0) {
            getApp().globalData.roomId = id;
            getApp().globalData.roomStatus = 0;

            wx.navigateTo({
              url: '../mamiList/index',
            })
          } else {
            getApp().globalData.roomId = id;
            getApp().globalData.roomStatus = 1;
            wx.navigateTo({
              url: '../mamiListCome/index',
            })
          }
        },
        fail: function (res) {
          console.log(res.errMsg)
        }
      })
    }else if(state == 1){
      arr = ['进客', '取消预定'];

      wx.showActionSheet({
        itemList: arr,
        success: function (res) {
          console.log(res.tapIndex)
          let index = res.tapIndex;
          if (index == 0) {
            getApp().globalData.roomId = id;
            getApp().globalData.roomStatus = 11;
            getApp().globalData.mamiId = mami;
            wx.navigateTo({
              url: '../mamiListCome/index',
            })
          } else {
            that.cancelAptRoom(id,mami);
          }
        },
        fail: function (res) {
          console.log(res.errMsg)
        }
      })
    } else if (state == 2) {
      arr = ['客离','转台'];

      wx.showActionSheet({
        itemList: arr,
        success: function (res) {
          console.log(res.tapIndex);
          if(res.tapIndex == 0){
            that.orderDoneRoom(id);
          }else{
            that.changeRoom(id);
          }
        },
        fail: function (res) {
          console.log(res.errMsg)
        }
      })
    } else if (state == 3) {
      arr = ['进客'];

      wx.showActionSheet({
        itemList: arr,
        success: function (res) {
          console.log(res.tapIndex)
          getApp().globalData.roomId = id;
          getApp().globalData.roomStatus = 111;
          getApp().globalData.mamiId = mami;
          wx.navigateTo({
            url: '../mamiListCome/index',
          })
        },
        fail: function (res) {
          console.log(res.errMsg)
        }
      })
    }
  },
  aptRoom:function(room_id,mami_id){
    //预定房间
    let that = this;
    wx.request({
      url: 'https://mabao.jixuanjk.com/booking.php',
      data: {
        openid: getApp().globalData.openid,
        room_id: room_id,
        mami_id:mami_id
      },
      method: "POST",
      success: function (res) {
        console.log('预定', res.data);
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

  cancelAptRoom: function (room_id, mami_id) {
    //取消预定
    let that = this;
    wx.request({
      url: 'https://mabao.jixuanjk.com/cancel_booking.php',
      data: {
        openid: getApp().globalData.openid,
        room_id: room_id,
        mami_id: mami_id
      },
      method: "POST",
      success: function (res) {
        console.log('取消预定', res.data);
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
  orderDoneRoom: function (room_id) {
    //客离
    let that = this;
    wx.request({
      url: 'https://mabao.jixuanjk.com/order_done.php',
      data: {
        openid: getApp().globalData.openid,
        room_id: room_id
      },
      method: "POST",
      success: function (res) {
        console.log('客离', res.data);
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
  //转台
  changeRoom:function(room_id) {
    //转台
    let that = this;
    getApp().globalData.fromRoomId = room_id;
    wx.navigateTo({
      url: '../change-room/index',
    })
  },
  renderFn:function(){
    let that = this;

    wx.request({
      url: 'https://mabao.jixuanjk.com/admin_room_refresh.php',
      data: {
        openid: getApp().globalData.openid
      },
      method: "POST",
      success: function (res) {
        console.log('刷新状态', res.data);
        if (res.data.status) {
          that.renderData(res.data.data);
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
  renderData:function(data){
    let that = this;

    let oldRoom = that.data.houseArr;
    
    for(let i=0;i<oldRoom.length;i++){
      for(let j=0;j<data.length;j++){
        if(oldRoom[i].room_id == data[j].room_id){
          oldRoom[i] = data[j];
          break;
        }
      }
    }
    that.setData({
      houseArr:oldRoom
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
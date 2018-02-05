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
    iptName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log('onLoad')
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
  changeName:function(event){
    console.log(event.currentTarget.dataset.id);
    let id = event.currentTarget.dataset.id;
    let name = event.currentTarget.dataset.name;
    let that = this;
    let arr = this.data.houseArr;
    if(name == ''){
      this.setData({
        houseId: id,
        showInput: true
      })
    }else{
      wx.showActionSheet({
        itemList: ['重新命名', '删除房间'],
        success: function (res) {
          console.log(res.tapIndex);
          if(res.tapIndex == 0){
            that.setData({
              houseId: id,
              showInput: true
            })
          }else if(res.tapIndex == 1){
            wx.request({
              url: 'https://mabao.jixuanjk.com/room.php',
              data: {
                openid: getApp().globalData.openid,
                shop_id: getApp().globalData.shop_id,
                op: 3,
                room_id: id
              },
              method: "POST",
              success: function (res) {
                console.log('删除房间',res.data);
                if (res.data.status) {
                  for (let i = 0; i < arr.length; i++) {
                    if (arr[i].room_id == id) {
                      arr[i].room_name = '';
                      break;
                    }
                  }
                  that.setData({
                    houseArr: arr
                  });
                  wx.showToast({
                    title: '删除成功',
                    icon: 'success',
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
          }
        },
        fail: function (res) {
          console.log(res.errMsg)
        }
      })
    }
  },
  inputName:function(event){
    this.setData({
      iptName:event.detail.value
    });
  },
  closeIpt:function(){
    this.setData({
      showInput:false,
      iptName:''
    })
  },
  sureName:function(){
    let that = this;
    let arr = this.data.houseArr;
    if (this.data.iptName != ''){
      
      wx.request({
        url: 'https://mabao.jixuanjk.com/room.php', 
        data: {
          openid: getApp().globalData.openid,
          shop_id: getApp().globalData.shop_id,
          op: 2, 
          room_id: that.data.houseId,
          room_name: that.data.iptName
        },
        method: "POST",
        success: function (res) {
          console.log(res.data);
          if (res.data.status) {
            for (let i = 0; i < arr.length; i++) {
              if (arr[i].room_id == that.data.houseId) {
                arr[i].room_name = that.data.iptName;
                break;
              }
            }
            that.setData({
              houseArr:arr,
              iptName: '',
              showInput: false
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
    }else{
      this.setData({
        showInput: false,
        iptName: ''
      })
    }
  },
  done:function(){
    wx.showToast({
      title: '创建成功',
      icon: 'success',
      duration: 2000,
      mask:true,
      complete:function(){
        wx.navigateBack({
          delta:100
        })
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
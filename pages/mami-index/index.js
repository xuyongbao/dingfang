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
    fastApt:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(getApp().globalData.hN);
    this.data.houseN = getApp().globalData.hN;
    let arr = [];
    for(let i=0;i<this.data.houseN;i++){
      if (i % 4 == 3) {
        arr.push({ id: i, name: 'B' + i, apt: '小红姐', come: '猫哥', state:3 });
      }else if(i%4 == 2){
        arr.push({ id: i, name: 'B' + i, apt: '小红', come: '', state:2 });
      } else {
        arr.push({ id: i, name: 'B' + i, apt: '', come: '', state:1 });
      }
      
    }
    this.setData({
      houseArr:arr
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
    let arr = [];

    if(state == 1){
      arr = ['预定', '进客'];

      wx.showActionSheet({
        itemList: arr,
        success: function (res) {
          console.log(res.tapIndex);
          let index = res.tapIndex;
          if(index == 0){
            wx.navigateTo({
              url: '../mamiList/index',
            })
          }else{
            wx.navigateTo({
              url: '../mamiListCome/index',
            })
          }
        },
        fail: function (res) {
          console.log(res.errMsg)
        }
      })
    }else if(state == 2){
      arr = ['进客', '取消预定'];

      wx.showActionSheet({
        itemList: arr,
        success: function (res) {
          console.log(res.tapIndex)
          let index = res.tapIndex;
          if (index == 0) {
            wx.navigateTo({
              url: '../mamiListCome/index',
            })
          } else {
            
          }
        },
        fail: function (res) {
          console.log(res.errMsg)
        }
      })
    } else if (state == 3) {
      arr = ['客离'];

      wx.showActionSheet({
        itemList: arr,
        success: function (res) {
          console.log(res.tapIndex)
        },
        fail: function (res) {
          console.log(res.errMsg)
        }
      })
    } else if (state == 4) {
      arr = ['进客'];

      wx.showActionSheet({
        itemList: arr,
        success: function (res) {
          console.log(res.tapIndex)
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
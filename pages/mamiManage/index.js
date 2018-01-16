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
    this.setData({
      mamiList:getApp().globalData.mami
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
    this.getMamiList();
    
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
          that.setData({
            mamiList: res.data.data
          })
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
  setMamiData:function (data) {
    let that = this;
    getApp().globalData.mami = data;
    let mamiData = {};

    for (let i = 0; i < data.length; i++) {
      mamiData[data[i].mami_id] = { id: data[i].mami_id, name: data[i].nick_name, phone: data[i].mami_mobile }
    }
    getApp().globalData.mamiList = mamiData;
    that.setData({
      mami: mamiData
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
  deleteMami: function (event) {
    let that = this;
    let id = event.currentTarget.dataset.id;
    let name = event.currentTarget.dataset.name;
    wx.showModal({
      title: '温馨提示',
      content: '是否确定删除'+name,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.deleteApi(id);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  deleteApi:function(id){
    let that = this;
    wx.request({
      url: 'https://mabao.jixuanjk.com/mami.php',
      data: {
        openid: getApp().globalData.openid,
        op:3,
        mami_id: id
      },
      method: "POST",
      success: function (res) {
        console.log('删除', res.data);
        if (res.data.status) {
          that.getMamiList();
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
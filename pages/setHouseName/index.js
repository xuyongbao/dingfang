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
    console.log(getApp().globalData.hN);
    this.data.houseN = getApp().globalData.hN;
    let arr = [];
    for(let i=0;i<this.data.houseN;i++){
      arr.push({id:i,name:''});
    }
    this.setData({
      houseArr:arr
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
    console.log(event.target.dataset.id);
    let id = event.target.dataset.id;
    this.setData({
      houseId:id,
      showInput:true
    })
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
    let arr = this.data.houseArr;
    if (this.data.iptName != ''){
      arr[this.data.houseId].name = this.data.iptName;
      this.setData({
        houseArr: arr,
        iptName:'',
        showInput:false
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
        wx.navigateTo({
          url: '../index/index',
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
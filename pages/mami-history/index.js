// pages/index/index.js
var app = getApp()  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array1: ['全部','已预定', '进客', '客离'],
    array2: ['红姐1', '红姐2', '红姐3', '红姐4'],
    index1: 0,
    index2: 0,
    nowDay:'2018.09.09',
    nowWeek:'今日',
    timeIndex:0,
    state:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let arr = [];
      for(let i=0; i<40; i++){
        arr.push({
          name:'长姐'+i,
          state:i%3,
          no:"A"+i,
          day:'2018.01.09',
          time:"10:09"
        })
      }

      let newT = new Date();
      let y = newT.getFullYear();
      let m = this.addZero(newT.getMonth() + 1);
      let d = this.addZero(newT.getDate());



      this.setData({
        list:arr,
        nowDay: y + '.' + m + '.' + d
      })

  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
  },
  bindPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },
  addZero:function(n){
    return n<10? '0'+n: ''+n;
  },
  cutDay:function(){
    let timeIndex = this.data.timeIndex - 1;
    console.log(timeIndex)
    let t = new Date().getTime();
    let arr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

    t = t + (24 * 60 * 60 * 1000) * timeIndex;
    
    let newT = new Date(t);
    let y = newT.getFullYear();
    let m = this.addZero(newT.getMonth() + 1);
    let d = this.addZero(newT.getDate());
    let w = arr[newT.getDay()];
    
    if (timeIndex == 0)
      w = '今日'
    this.setData({
      nowDay:y+'.'+m+'.'+d,
      nowTime:t,
      timeIndex:timeIndex,
      nowWeek:w
    })
  }, 
  addDay: function () {
    let timeIndex = this.data.timeIndex + 1;

    let t = new Date().getTime();
    let arr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

    t = t + (24 * 60 * 60 * 1000) * timeIndex;

    let newT = new Date(t);
    let y = newT.getFullYear();
    let m = this.addZero(newT.getMonth() + 1);
    let d = this.addZero(newT.getDate());
    let w = arr[newT.getDay()];
    if (timeIndex == 0)
      w = '今日'
    this.setData({
      nowDay: y + '.' + m + '.' + d,
      timeIndex: timeIndex,
      nowWeek: w
    });
    if(timeIndex >= 1){
      this.setData({
        state:0
      })
    }
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
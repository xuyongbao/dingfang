// pages/index/index.js
var app = getApp()  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array1: ['全部','已预定', '进客', '客离'],
    array2: [],
    index1: 0,
    index2: 0,
    nowDay:'2018-09-09',
    nowWeek:'今日',
    timeIndex:0,
    state:1,
    searchRoomName:'',
    mamiId:0,
    mamiJson:{},
    msg:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let arr = [];

      let newT = new Date();
      let y = newT.getFullYear();
      let m = this.addZero(newT.getMonth() + 1);
      let d = this.addZero(newT.getDate());

            
      let arr1 = getApp().globalData.mami;
      arr1.unshift({
        nick_name:'All',
        mami_id:0
      });
      this.setData({
        nowDay: y + '-' + m + '-' + d,
        array2:arr1,
        mamiJson:getApp().globalData.mamiList
      });
      
      this.getHistory();
      this.getMsg();
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
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })

    this.getHistory();
  },
  bindPickerChange2: function (e) {
    let id = this.data.array2[e.detail.value].mami_id;
    console.log('picker发送选择改变，携带值为', e.detail.value, '---', id)
    this.setData({
      index2: e.detail.value,
      mamiId:id
    });


    this.getHistory();
  },
  searchInput:function(event){
    console.log(event.detail.value);
    this.setData({
      searchRoomName:event.detail.value
    })


    this.getHistory();
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
      nowDay:y+'-'+m+'-'+d,
      nowTime:t,
      timeIndex:timeIndex,
      nowWeek:w
    })

    this.getHistory();
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
      nowDay: y + '-' + m + '-' + d,
      timeIndex: timeIndex,
      nowWeek: w
    });
    if(timeIndex >= 1){
      this.setData({
        state:0
      })
    }

    this.getHistory();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  getHistory: function () {
    let that = this;
    wx.request({
      url: 'https://mabao.jixuanjk.com/booking_order_list.php',
      data: { 
        openid: getApp().globalData.openid, 
        day:that.data.nowDay,
        mami_id:that.data.mamiId,
        room_name: that.data.searchRoomName,
        status:that.data.index1
      },
      method: "POST",
      success: function (res) {
        console.log('订单详情', res.data);
        if (res.data.status) {
          if(res.data.data.length == 0){
            that.setData({
              list: res.data.data,
              state:0
            })
          }else{
            that.setData({
              list: res.data.data,
              state:1
            })
          }
          
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
  downLoad:function(){
    let that = this;

    wx.showLoading({
      title: '加载中',
      mask: true
    });

    that.dFile();
  },
  dFile:function(){
    let that = this;
    console.log('https://mabao.jixuanjk.com/order_list_report.php?openid=' + getApp().globalData.openid + '&day=' + that.data.nowDay)
    wx.downloadFile({
      url: 'https://mabao.jixuanjk.com/order_list_report.php?openid='+getApp().globalData.openid+'&day='+that.data.nowDay,//'https://mabao.jixuanjk.com/report_image/1_20180123.png', 
      success: function (res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        console.log('下载',res)
        if (res.statusCode === 200) {
          that.sFile(res.tempFilePath);
        }
      }
    })
  },
  sFile: function (tempFilePaths){
    let that = this;

    wx.saveImageToPhotosAlbum({
      filePath:tempFilePaths,
      success(res) {
        wx.hideLoading();
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 2000
        })

        console.log('saveFile',res)
      },
      fail(res) {
        wx.hideLoading();
        wx.showModal({
          title: '温馨提示',
          content: res.errMsg,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
    // wx.saveFile({
    //   tempFilePath: tempFilePaths,
    //   success: function (res) {
    //     console.log('save',res)
    //     wx.hideLoading();
    //     var savedFilePath = res.savedFilePath;
    //   },
    //   fail:function(res){
    //     console.log('save_fail',res)
        // wx.showModal({
        //   title: '温馨提示',
        //   content: res.errMsg,
        //   success: function (res) {
        //     if (res.confirm) {
        //       console.log('用户点击确定')
        //     } else if (res.cancel) {
        //       console.log('用户点击取消')
        //     }
        //   }
        // })
    //   }
    // })
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
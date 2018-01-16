// pages/login/login.js
Page({
  data: {
    selected: true,
    selected1: false,
    "isSend": false,
    "isSend2": false,
    value1: "",
    value2: "",
    value3: "",
    value4: "",
    value5: "",
    value6: "",
    disabled1: true,
    disabled2: true,
    "kcPhone": false,
    "kcPhone2": false,
    "toastShow": false,
    "toastContent": "",
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    console.log("openid", getApp().globalData.openid);
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成


  }, 
  onShow: function () {
    // 生命周期函数--监听页面显示

  },
  selected: function (e) {
    this.setData({
      selected1: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true
    })
  },
  
  
  //用户输入信息列表
  checkout: function (event) {
    this.setData({
      [event.currentTarget.dataset.key]: event.detail.value
    })
    var bl = true;
    var dataSet = event.currentTarget.dataset;
    for (var i = 0; i < dataSet.len; i++) {
      if (dataSet.len == 4){
        var key = "value" + (i + 1);
      } else if (dataSet.len == 2){
        var key = "value" + (i + 5);
      }
      if (this.data[key] == "" || this.data[key].length <= 0) {
        bl = true;
        break;
      } else {
        bl = false
      }
    }
    if (dataSet.len == 4) {
      this.setData({
        disabled1: bl
      });
    } else if (dataSet.len == 2) {
      this.setData({
        disabled2: bl
      });
    }
    
    if (event.currentTarget.dataset.mark){
      var teleReg = /^((0\d{2,3})-)(\d{7,8})$/;
      var mobileReg = /^1[3456789]\d{9}$/;
      var telephone1 = this.data.value3;
      var telephone2 = this.data.value5;
      if (!teleReg.test(telephone1) && !mobileReg.test(telephone1)) {
        this.setData({
          "kcPhone": false
        })
      } else {
        this.setData({
          "kcPhone": true
        })
      }


      if (!teleReg.test(telephone2) && !mobileReg.test(telephone2)) {
        this.setData({
          "kcPhone2": false
        })
      } else {
        this.setData({
          "kcPhone2": true
        })
      }


    }
    
  
  },
  
  //获取验证码
  getSms: function () {
    console.log(this.data.kcPhone)
    if (this.data.kcPhone) {
      this.setData({
        "isSend": true
      });
      this.timeFly();
    } else {
      this.showToast("请输入正确的手机号码", 1.5);
    }

  },
  getSms2: function () {
    console.log(this.data.kcPhone2)
    if (this.data.kcPhone2) {
      this.setData({
        "isSend2": true
      });
      this.timeFly2();
    } else {
      this.showToast("请输入正确的手机号码", 1.5);
    }

  },
  //验证码倒计时
  timeFly: function () {
    var self = this;
    var num = 59;
    self.setData({
      "time": num
    })
    var timer = setInterval(function () {
      num = num - 1;
      if (num == 0) {
        clearInterval(timer);
        self.setData({
          "isSend": false
        });
      }
      self.setData({
        "time": num
      })
    }, 1000)
  },
  timeFly2: function () {
    var self = this;
    var num = 59;
    self.setData({
      "time2": num
    })
    var timer = setInterval(function () {
      num = num - 1;
      if (num == 0) {
        clearInterval(timer);
        self.setData({
          "isSend2": false
        });
      }
      self.setData({
        "time2": num
      })
    }, 1000)
  },
  showToast: function (content, duration) {
    content = content || this.data.toastContent;
    duration = duration || 3;
    this.setData({
      'toastContent': content,
      "toastShow": true
    });

    setTimeout(() => {
      this.setData({
        "toastShow": false
      })
    }, duration * 1000)

  },
  loginTab:function(){
    let self = this;

    wx.showLoading({
      title: '加载中',
      mask:true
    })

    if(this.data.selected){
      wx.request({
        url: 'https://mabao.jixuanjk.com/bind.php',
        data: {
          openid: getApp().globalData.openid,
          roleid:1,
          mobile: self.data.value3,
          shop_name: self.data.value1,
          shop_address: self.data.value2,
        },
        method: 'POST',
        success: function (res) {
          console.log('绑定用户', res.data);
          wx.hideLoading()
          if(res.data.status){
            wx.showModal({
              title: '温馨提示',
              content: '店铺正在审核，请耐心等待',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
            
          }else{
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
      wx.request({
        url: 'https://mabao.jixuanjk.com/bind.php',
        data: {
          openid: getApp().globalData.openid,
          roleid: 2,
          mobile: self.data.value5
        },
        method: 'POST',
        success: function (res) {
          console.log('绑定用户', res.data);
          wx.hideLoading()
          if (res.data.status) {
            let d = res.data.data;
            if (d.is_valid == 0){
              wx.showModal({
                title: '温馨提示',
                content: '请耐心等待控台为您添加权限',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            } else if (d.is_valid == 1 ){
              wx.navigateTo({
                url: '../mami-index/index',
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
    }
  },
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

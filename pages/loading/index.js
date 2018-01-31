// pages/login/login.js
Page({
  data: {
    h:0,
    w:0
  },
  onLoad: function (options) {
    let self = this;
    // 生命周期函数--监听页面加载
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        self.setData({
          h: res.windowHeight,
          w: res.windowWidth
        })
      }
    })
    console.log('openid', getApp().globalData.openid);
    wx.showToast({
      title: '版本'+getApp().globalData.appN,
      icon: 'success',
      duration: 2000
    })
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成


  }, 
  onShow: function () {
    // 生命周期函数--监听页面显示
    wx.login({
      success: function (res) {
        if (res.code) {
          let code = res.code;
          // 发起网络请求
          wx.request({
            url: 'https://mabao.jixuanjk.com/auth.php',
            data: {
              jscode: code
            },
            method: 'POST',
            success: function (res) {
              console.log('登录信息', res.data);
              if (res.data.status) {
                getApp().globalData.openid = res.data.data.openid;
                getApp().globalData.shop_id = res.data.data.shop_id;
                getApp().globalData.userData = res.data.data;
                
                let d = res.data.data;
                if(d.role_id == 0){
                  wx.navigateTo({
                    url: '../login/login',
                  })
                } else if (d.role_id == 1 && d.is_verify == 1) {
                  if (d.role_id == 1 && d.shop_init == 1) {
                    wx.navigateTo({
                      url: '../index/index',
                    })
                  }else{
                    wx.navigateTo({
                      url: '../setHouseNumber/index',
                    })
                  }

                  
                } else if (d.role_id == 1 && d.is_verify == 0) {
                  wx.showModal({
                    title: '温馨提示',
                    content: '店铺审核未通过，请耐心等待',
                    success: function (res) {
                      if (res.confirm) {
                        console.log('用户点击确定')
                      } else if (res.cancel) {
                        console.log('用户点击取消')
                      }
                    }
                  })
                } else if (d.role_id == 2 && d.is_valid == 1) {

                  wx.navigateTo({
                    url: '../mami-index/index',
                  })
                  
                } else if (d.role_id == 2 && d.is_valid == 0) {
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
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  setSize:function(event){
    console.log(event.detail);
    
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

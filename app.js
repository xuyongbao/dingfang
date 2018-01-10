App({
  onLaunch: function () {
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log(res.code);
          let code = res.code;
          // 发起网络请求
          wx.request({
            url: 'https://mabao.jixuanjk.com/auth_test.php',
            data: {
              jscode:code
            },
            method:'POST',
            success:function(res){
              console.log(res.data)
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  getUserInfo:function(cb){
    
  },
  globalData:{
    hN:98,
    url:'https://mabao.jixuanjk.com'
  }





})

// pages/login/login.js
Page({
  data: {
    selected: true,
    selected1: false,
    "isSend": false,
    value1: "",
    value2: "",
    value3: "",
    value4: "",
    value5: "",
    value6: "",
    disabled1: true,
    disabled2: true,
    "kcPhone": false,
    "toastShow": false,
    "toastContent": "",
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
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
      var telephone = event.detail.value;
      if (!teleReg.test(telephone) && !mobileReg.test(telephone)) {
        this.setData({
          "kcPhone": false
        })
      } else {
        this.setData({
          "kcPhone": true
        })
      }
    }
  },
  
  //获取验证码
  getSms: function () {
    console.log(this.data.kcPhone)
    if (this.data.kcPhone){
      this.setData({
        "isSend": true
      });
      this.timeFly();
    }else{
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

})

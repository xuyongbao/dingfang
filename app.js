//app.js
// var url_prefix = 'http://127.0.0.1:8022';
var url_prefix = 'https://shihuihouse.17shihui.com';

// var url_prefix = 'https://shihuireport.17shihui.com';
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    // userName:"angle",
    // userPhoneNum:"13319990000",
    uid: '',//用户id
    userName: '',//用户名称
    userPhoneNum: '',//用户手机号
    company: '',//用户所属物业公司
    cid: '',//城市id
    cname: '',//城市
    // quyu: '',//区域
    sex: '',//性别
    token: '',//
    vlist: []//小区集合(包含所属区域)
    // location:{
    //   cityName:"全部",
    //   village:'请选择',//选择的小区
    // }
  },
  urlData: {
    //客户列表查询方法
    curl: url_prefix + '/smallprogram/customerList',
    //房源列表查询方法
    furl: url_prefix + '/smallprogram/housingResourcesList',
    //发布租赁方法
    zurl: url_prefix + '/smallprogram/addLease',
    //发布卖房方法
    murl: url_prefix + '/smallprogram/addReal',
    //添加客户方法
    kurl: url_prefix + '/smallprogram/addCustomer',
    //登录方法
    lurl: url_prefix + '/smallprogram/login',
  }





})

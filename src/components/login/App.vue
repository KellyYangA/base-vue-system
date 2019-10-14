<template>
    <div class="main-container">
        <div class="card-container">
            <div class="top">
                <div class="header">
<!--                    <img src="../../assets/logo.png" alt="logo" class="logo">-->
                    <span class="title">xxx管理系统</span>
                </div>
                <div class="font-caption m-t-12 m-b-40">这是一段描述</div>
            </div>
            <div class="main">
                <div v-if="!isScan">
                    <a-tabs :activeKey="inputTabKey" @change="(key) => inputTabKey = key">
                        <a-tab-pane tab="账号密码登录" key="username">
                            <a-form class="form-container" :form="form" @submit="userLogin" @keyup.enter="userLogin">
                                <a-row>
                                    <a-form-item>
                                        <a-input placeholder="账户"
                                                 v-decorator="['userName',{ rules: [{ required: true, message: '请输入账户' }] }]"
                                                 size="large">
                                            <a-icon slot="prefix" type="user" class="font-disabled"/>
                                        </a-input>
                                    </a-form-item>
                                </a-row>
                                <a-row>
                                    <a-form-item>
                                        <a-input placeholder="登录密码"
                                                 v-decorator="['password',{ rules: [{ required: true, message: '请输入登录密码' }] }]"
                                                 type="password"
                                                 auto-complete="new-password"
                                                 size="large">
                                            <a-icon slot="prefix" type="lock" class="font-disabled"/>
                                        </a-input>
                                    </a-form-item>
                                </a-row>
                                <a-row>
                                    <a-form-item>
                                        <div class="login-assistance">
                                            <a-checkbox v-model="rememberMe">记住用户名</a-checkbox>
                                            <a class="c-blue">忘记密码</a>
                                        </div>
                                    </a-form-item>
                                </a-row>
                                <a-row>
                                    <a-form-item>
                                        <a-button type="primary" style="width: 100%" html-type="submit" :loading="userLoading" size="large">登录</a-button>
                                    </a-form-item>
                                </a-row>
                            </a-form>
                        </a-tab-pane>
                        <a-tab-pane tab="手机号登录" key="mobile">
                            <a-form class="form-container" :form="mobileForm" @submit="mobileLogin" @keyup.enter="mobileLogin">
                                <a-row>
                                    <a-form-item>
                                        <a-input placeholder="手机号"
                                                 v-decorator="['mobile',{ rules: [{ required: true, message: '请输入手机号'}, {message:'请输入正确的手机号', pattern: /^[0-9]+$/}] }]"
                                                 size="large">
                                            <a-icon slot="prefix" type="mobile" class="font-disabled"/>
                                        </a-input>
                                    </a-form-item>
                                </a-row>
                                <a-row>
                                    <a-form-item>
                                        <a-input-group compact>
                                            <a-input placeholder="验证码"
                                                     v-decorator="['code',{ rules: [{ required: true, message: '请输入验证码' }] }]"
                                                     size="large"
                                                     style="width: 70%">
                                                <a-icon slot="prefix" type="mail" class="font-disabled"/>
                                            </a-input>
                                            <a-button size="large" style="width: 30%;font-size: 14px;" @click="getCaptcha" :loading="captcha.loading">{{captcha.text}}</a-button>
                                        </a-input-group>
                                    </a-form-item>
                                </a-row>
                                <a-row>
                                    <a-form-item>
                                        <a-button type="primary" style="width: 100%" html-type="submit" :loading="mobileLoading" size="large">登录</a-button>
                                    </a-form-item>
                                </a-row>
                            </a-form>
                        </a-tab-pane>
                    </a-tabs>
                    <!--   其他登录方式      -->
                    <div class="other-login">
                        <span class="m-r-16">其他登录方式</span>
                        <a-icon type="wechat"  class="icon-round icon-round-wechat" @click="isScan = true; scanTabKey = 'wechat';"/> &nbsp;
                        <a-icon type="dingding" class="icon-round icon-round-dingding" @click="isScan = true; scanTabKey = 'dingtalk';"/>
                    </div>
                </div>
                <div v-else>
                </div>
            </div>
            <div class="footer">

            </div>
        </div>
    </div>
</template>

<script>
  const setCookie = (name, value, expdays) => {
        document.cookie = name + "=" + escape(value)
      },
      getCookie = (name) => {
        const cookie = document.cookie
        if (!cookie.includes(`${name}=`)) return ''
        return unescape(cookie.substring(cookie.indexOf('username=') + 9/*, cookie.indexOf(';')*/))
      },
      delCookie = (name) => {
        setCookie(name, '', -1)
      }

  export default {
    name: "index",
    data() {
      return {
        inputTabKey: 'username',    //  tab
        scanTabKey: 'dingtalk',
        rememberMe: true,      // 记住用户名
        captcha: {
          remaining: 60,
          text: '获取验证码',
          loading: false
        },
        userLoading: false,
        mobileLoading: false,
        isScan: false,   //  是否显示其他登录方式
      }
    },
    beforeCreate () {
      this.form = this.$form.createForm(this);
      this.mobileForm = this.$form.createForm(this);
    },
    mounted() {
      this.init()
    },
    methods: {
      init () {
        let self = this
        const username = getCookie('username')
        if (username) {
          self.username = username
          self.rememberMe = true
        } else {
          self.rememberMe = false
        }
      },
      userLogin(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            this.userLoading = true
            // TODO 异步
            console.log('Received values of form: ', values);
            location.href = 'index.html'
          }
        });
        let self = this
        if (self.rememberMe) {
          setCookie('username', self.username, 30)
        } else {
          delCookie('username')
        }
      },
      mobileLogin(e) {
        e.preventDefault();
        this.mobileForm.validateFields((err, values) => {
          if (!err) {
            this.mobileLoading = true
            // TODO 异步
            console.log('Received values of form: ', values);
          }
        });
      },
      getCaptcha() {}
    }
  }
</script>

<style lang="less">
    .main-container {
        height: 100%;
        .card-container {
            width: 100%;
            min-height: 100%;
            background: #F2F3F5;
            background-size: 100%;
            padding: 110px 0 144px;
            position: relative;
            .top {
                text-align: center;
                .header{
                    height: 44px;
                    line-height: 44px;
                    .logo{
                        margin-bottom: 10px;
                        vertical-align: middle;
                        margin-right: 16px;
                        border-style: none;
                    }
                    .title{
                        font-size: 33px;
                        color: rgba(0, 0, 0, 0.85);
                        font-family: Avenir, "Helvetica Neue", Arial, Helvetica, sans-serif;
                        /*font-weight: 600;*/
                        position: relative;
                        top: 2px;
                    }
                }
            }
            .main{
                min-width: 260px;
                width: 368px;
                margin: 0px auto;
                .login-assistance {
                    display: flex;
                    justify-content: space-between;
                    a:hover{
                        color: rgb(64, 169, 255);
                    }
                }
                .other-login{
                    text-align: left;
                    line-height: 22px;
                    .icon-round {
                        color: #FFFFFF;
                        border-radius: 10px;
                        border: 2px solid #9b9b9b;
                        background-color: #9b9b9b;
                        cursor: pointer;
                        font-size: 16px;
                    }
                    .icon-round.icon-round-wechat:hover {
                        background-color: #7ed321;
                        border-color: #7ed321;
                    }
                    .icon-round.icon-round-dingding:hover {
                        background-color: #4a90e2;
                        border-color: #4a90e2;
                    }
                }
            }
        }
    }
    .ant-tabs .ant-tabs-top-bar {
        text-align: center;
        border-bottom: unset;
    }
</style>

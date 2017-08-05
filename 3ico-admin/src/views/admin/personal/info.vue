<template>
  <div>
      <div class="item">
          <div class="hd">我的身份信息</div>
          <div class="bd">
              <ul v-if="user.auth">
                  <li><span class="bold">真实姓名：</span>{{user.fullname}}</li>
                  <li><span class="bold">身份证号码：</span>{{user.id_number}}</li>
              </ul>
              <el-form v-else ref="form" :model="auth.data" :rules="auth.rules" label-width="100px">
                    <el-form-item label="真实姓名" prop="fullname">
                        <el-input v-model="auth.data.fullname" style="width: 210px;"/>
                    </el-form-item>
                    <el-form-item label="身份证号码" prop="id_number">
                        <el-input v-model="auth.data.id_number" style="width: 210px;"/>
                    </el-form-item>
                    <el-form-item label="短信验证码" prop="pin_code">
                        <el-input v-model="auth.data.pin_code" style="width: 100px;"/>
                        <el-button @click="handleGetVcode">获取验证码</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="onAuth" type="primary">认证</el-button>
                    </el-form-item>
                </el-form>
          </div>
      </div>
      <div class="item">
          <div class="hd">资产</div>
          <div class="bd">
              <ul>
                  <li v-for="(item, key) in user.money">
                  <span class="bold">余额：</span><span class="highlight">{{item.balance}} {{currencies[key].text}}</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span class="bold">已投资：</span><span class="highlight">{{item.investment}} {{currencies[key].text}}</span>
                  </li>
              </ul>
          </div>
      </div>
      <div class="item">
          <div class="hd">联系方式</div>
          <div class="bd">
              <ul>
                  <li>
                  <span class="bold">手机：</span>
                  <span class="primary-color">{{user.mobile || '无'}}</span>
                  <!-- <a href="javascript:;">修改</a> -->
                  </li>
              </ul>
          </div>
      </div>
      <el-dialog
      title="图形验证码"
      :visible.sync="vcodeDialog.show"
      size="tiny">
          <div>
              <el-input v-model="vcodeDialog.value" style="width: 100px; vertical-align: top;"/>
              <img @click="refreshCaptcha"
                    title="点击刷新"
                    style="cursor: pointer;"
              :src="vcodeDialog.b64" height="36" />
          </div>
          <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="handleSendPinCode">发送短信验证码</el-button>
          </span>
      </el-dialog>
  </div>
</template>

<script type="text/babel">
import {
    mapState,
    mapActions,
} from 'vuex';

export default{
    title: '我的信息',
    computed: {
        ...mapState({
            user: state => state.user,
            currencies: 'currencies',
        }),
    },
    data() {
        return {
            captcha_id: '',
            vcodeDialog: {
                show: false,
                b64: '',
                value: '',
            },
            auth: {
                data: {
                    fullname: '',
                    id_number: '',
                    pin_code: '',
                },
                rules: {
                  fullname: [
                      { required: true, message: '请输入真实姓名', trigger: 'blur' },
                  ],
                  id_number: [
                      { required: true, message: '请输入身份证号', trigger: 'blur' },
                  ],
                  pin_code: [
                      { required: true, message: '请输入短信验证码', trigger: 'blur' },
                  ],
                }
            }
        }
    },
    methods: {
      ...mapActions({
        getCaptcha: 'getCaptcha',
        sendPinCode: 'sendPinCode',
        userCertificate: 'userCertificate',
      }),
      refreshCaptcha() {
          this.getCaptcha().then((res) => {
              this.vcodeDialog.b64 = 'data:image/png;base64,' + res.data.captcha;
              this.captcha_id = res.data.captcha_id;
          });
      },
      onAuth() {
        const data = this.auth.data;

          this.$refs.form.validate((valid) => {
              if (valid) {
                  this.userCertificate(data).then((res) => {
                      this.$message('认证成功');
                      setTimeout(() => {
                        location.reload();
                      }, 300);
                  });
              }
          });
      },
      handleGetVcode() {
          this.refreshCaptcha();
          this.vcodeDialog.show = true;
      },
      handleSendPinCode() {
        const captcha = this.vcodeDialog.value;
        if (!captcha) return;
        this.sendPinCode({
          captcha_id: this.captcha_id,
          captcha: captcha,
          type: 4,
        }).then((res) => {
          this.vcodeDialog.show = false;
        });
      },
    },
    created() {
        // console.log(this.user);
    },
};
</script>

<style lang="scss" scoped>
    .item{
        padding: 30px 0;
        border-bottom: 1px solid #d3d3d3;
        .hd{
            font-size: 16px;
            font-weight: bold;
            color: #333;
        }
        .bd{
            margin-top: 20px;
            font-size: 14px;
            color: #666;
            ul{
                margin: 0;
                padding: 0;
                list-style: none;
            }
            li+li{
                margin-top: 10px;
            }
            .bold{
                font-weight: bold;
                color: #333;
            }
            .highlight{
                color: #ff6600;
            }
        }
    }
</style>

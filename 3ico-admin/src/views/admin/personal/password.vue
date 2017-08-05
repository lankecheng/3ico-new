<template>
    <div>
        <h3>修改登录密码</h3>
        <el-form ref="pwd" :model="password" :rules="pwdRules" label-width="100px">
            <el-form-item label="原始密码" prop="old_pwd">
                <el-input v-model="password.old_pwd" type="password" style="width: 210px;"/>
            </el-form-item>
            <el-form-item label="新密码" prop="new_pwd">
                <el-input v-model="password.new_pwd" type="password" style="width: 210px;"/>
            </el-form-item>
            <el-form-item label="确认新密码" prop="check_new_pwd">
                <el-input v-model="password.check_new_pwd" type="password" style="width: 210px;"/>
            </el-form-item>
            <el-form-item label="短信验证码" prop="pin_code">
                <el-input v-model="password.pin_code" style="width: 100px;"/>
                <el-button @click="handleGetVcode(2)">获取图形验证码</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="onChangePwd" type="success">修改密码</el-button>
            </el-form-item>
        </el-form>
        <h3 class="hd">修改交易密码<span class="tip">初始交易密码 和 初始登录密码一致</span></h3>
        <el-form ref="tradePwd" :model="tradePassword" :rules="tradePwdRules" label-width="100px">
            <el-form-item label="原始密码" prop="old_trading_pwd">
                <el-input v-model="tradePassword.old_trading_pwd"
                type="password" style="width: 210px;"/>
            </el-form-item>
            <el-form-item label="新密码" prop="new_trading_pwd">
                <el-input v-model="tradePassword.new_trading_pwd" type="password" style="width: 210px;"/>
            </el-form-item>
            <el-form-item label="确认新密码" prop="check_new_trading_pwd">
                <el-input v-model="tradePassword.check_new_trading_pwd" type="password" style="width: 210px;"/>
            </el-form-item>
            <el-form-item label="短信验证码" prop="pin_code">
                <el-input v-model="tradePassword.pin_code" style="width: 100px;"/>
                <el-button @click="handleGetVcode(3)">获取图形验证码</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="onChangeTradePwd" type="success">修改密码</el-button>
            </el-form-item>
        </el-form>
        <el-dialog
          title="图形验证码"
          :visible.sync="vcodeDialog.show"
          size="tiny">
              <div>
                  <el-input v-model="vcodeDialog.value" style="width: 100px; vertical-align: top;"/>
                  <img
                   @click="refreshCaptcha"
                            title="点击刷新"
                            style="cursor: pointer"
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
    mapActions,
} from 'vuex';

const DEFAULT_PWD = {
    old_pwd: '',
    new_pwd: '',
    check_new_pwd: '',
    pin_code: '',
};
const DEFAULT_TRADE_PWD = {
    old_trading_pwd: '',
    new_trading_pwd: '',
    check_new_trading_pwd: '',
    pin_code: '',
};

export default{
    title: '修改密码',
    data () {
        const validPass = (rule, value, callback) => {
            console.log('test');
            if (!value.match(/^[A-Za-z0-9~!@#$%^&*_-]+$/)) {
                callback(new Error('密码由英文字母、数字、符号组成!'));
            } else if (this.password.check_new_pwd !== '') {
                this.$refs.pwd.validateField('check_new_pwd');
            }
            callback();
        };

        const validCheckPass = (rule, value, callback) => {
            if (value !== this.password.new_pwd) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        const validPass2 = (rule, value, callback) => {
            console.log('test');
            if (!value.match(/^[A-Za-z0-9~!@#$%^&*_-]+$/)) {
                callback(new Error('密码由英文字母、数字、符号组成!'));
            } else if (this.tradePassword.check_new_trading_pwd !== '') {
                this.$refs.tradePwd.validateField('check_new_trading_pwd');
            }
            callback();
        };

        const validCheckPass2 = (rule, value, callback) => {
            if (value !== this.tradePassword.new_trading_pwd) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };

        return {
            type: '',
            captcha_id: '',
            vcodeDialog: {
                show: false,
                b64: '',
                value: '',
            },
            password: Object.assign({}, DEFAULT_PWD),
            tradePassword: Object.assign({}, DEFAULT_TRADE_PWD),
            pwdRules: {
                old_pwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    {
                        validator: validPass,
                        trigger: 'blur'
                    },
                    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                ],
                new_pwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    {
                        validator: validPass,
                        trigger: 'blur'
                    },
                    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                ],
                check_new_pwd: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    {
                        validator: validCheckPass,
                        trigger: 'blur',
                    },
                    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                ],
                pin_code: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                ],
            },
            tradePwdRules: {
                old_trading_pwd: [],
                new_trading_pwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    {
                        validator: validPass2,
                        trigger: 'blur'
                    },
                    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                ],
                check_new_trading_pwd: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    {
                        validator: validCheckPass2,
                        trigger: 'blur',
                    },
                    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                ],
                pin_code: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                ],
            },
        };
    },
    methods: {
        ...mapActions({
            changeUserPwd: 'changeUserPwd',
            changeUserTradePwd: 'changeUserTradePwd',
            getCaptcha: 'getCaptcha',
            sendPinCode: 'sendPinCode',
        }),
        refreshCaptcha() {
          this.getCaptcha().then((res) => {
              this.vcodeDialog.b64 = 'data:image/png;base64,' + res.data.captcha;
                  this.captcha_id = res.data.captcha_id;
          });
      },
        onChangePwd() {
            const data = this.password;
            this.$refs.pwd.validate((valid) => {
                if (valid) {
                    this.changeUserPwd({
                        old_pwd: data.old_pwd,
                        new_pwd: data.new_pwd,
                        pin_code: data.pin_code,
                    }).then((res) => {
                        this.$message('修改成功');
                        this.password = Object.assign({}, DEFAULT_PWD);
                    });
                }
            });
        },
        onChangeTradePwd() {
            const data = this.tradePassword;
            this.$refs.tradePwd.validate((valid) => {
                if (valid) {
                    this.changeUserTradePwd({
                        old_trading_pwd: data.old_trading_pwd,
                        new_trading_pwd: data.new_trading_pwd,
                        pin_code: data.pin_code,
                    }).then((res) => {
                        this.$message('修改成功');
                        this.tradePassword = Object.assign({}, DEFAULT_TRADE_PWD);
                    });
                }
            });
        },
        handleGetVcode(type) {
            this.type = type;
            this.vcodeDialog.value = '';
              this.refreshCaptcha();
              this.vcodeDialog.show = true;
        },
        handleSendPinCode() {
            const captcha = this.vcodeDialog.value;
            if (!captcha) return;
            this.sendPinCode({
              captcha_id: this.captcha_id,
              captcha: captcha,
              type: this.type,
            }).then((res) => {
              this.vcodeDialog.show = false;
            });
        },
    }
};
</script>

<style lang="scss">
    .hd{
        .tip{
            margin-left: 10px;
            font-size: 12px;
            color: #bbb;
            font-weight: normal;
        }
    }
</style>

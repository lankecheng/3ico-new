<template>
    <div>

    <top/>
    <headerComp/>

    <div class="login-wrap">
        <div class="View container">
            <div class="login-box">
                <div class="hd">重置密码</div>
                <div class="bd">
                    <el-form ref="form" :model="form" :rules="rules" label-width="0">
                        <el-form-item prop="mobile">
                            <el-input v-model="form.mobile" placeholder="电话"/>
                        </el-form-item>
                        <el-form-item prop="pin_code">
                            <el-input v-model="form.pin_code" placeholder="手机验证码" style="width: 150px; vertical-align: top;"/>
                            <el-button @click="handleGetVcode">获取图形验证码</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button style="width: 100%; background-color: #005bac; border-color: #005bac;"
                            @click="onSubmit" type="primary">重置密码</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
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
            <el-button type="primary" @click="handleSendPinCode">确认发送短信验证码</el-button>
        </span>
    </el-dialog>

    <bottom/>
    </div>
</template>

<script type="text/babel">
import {
    mapState,
    mapActions,
} from 'vuex';

import top from './layout/top.vue';
import headerComp from './layout/header.vue';
import bottom from './layout/bottom.vue';

export default{
    // title: '注册',
    components: {
        top,
        headerComp,
        bottom,
    },
    data () {
        return {
            captcha_id: '',
            form: {
                mobile: '',
                pin_code: '',
            },
            rules: {
                mobile: [
                    { required: true, message: '请输入电话', trigger: 'blur' },
                ],
                pin_code: [
                    { required: true, message: '请输入手机校验码', trigger: 'blur' },
                ],
            },
            vcodeDialog: {
                show: false,
                b64: '',
                value: '',
            },
        };
    },
    computed: {
        ...mapState({
            user: state => state.user,
        }),
    },
    methods: {
        ...mapActions({
            getCaptcha: 'getCaptcha',
            resetPwd: 'resetPwd',
            sendPinCode: 'sendPinCode',
        }),
        handleGetVcode() {
            this.refreshCaptcha();
            this.vcodeDialog.show = true;
        },
        onSubmit() {
            const data = this.form;

            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.resetPwd(data).then((res) => {
                        this.$message('重置成功，请注意查收短信');
                    });
                }
            });
        },
        handleSendPinCode() {
            const captcha = this.vcodeDialog.value;
            if (!captcha) return;
            this.sendPinCode({
              captcha_id: this.captcha_id,
              captcha: captcha,
              mobile: this.form.mobile,
              type: 7,
            }).then((res) => {
              this.vcodeDialog.show = false;
            });
        },
        refreshCaptcha() {
            this.getCaptcha().then((res) => {
                this.vcodeDialog.b64 = 'data:image/png;base64,' + res.data.captcha;
                this.captcha_id = res.data.captcha_id;
            });
        },
    },
    created() {
        // this.refreshCaptcha();
    }
};
</script>

<style lang="scss" scoped>
    .login-wrap{
        position: relative;
        height: 564px;
        background: url(../assets/img/bg-login.jpg) top no-repeat;
    }
    .login-box{
        position: absolute;
        top: 100px;
        right: 0;
        width: 368px;
        // height: 390px;
        background-color: #fff;
        .hd{
            padding: 0 15px;
            height: 40px;
            font-size: 18px;
            line-height: 40px;
            color: #fff;
            background: url(../assets/img/bg-login-hd.jpg) no-repeat center;
        }
        .bd{
            padding: 15px;
        }
        .ft{
            padding: 15px;
            background-color: #4d4d4d;
            color: #fff;
        }
    }
</style>

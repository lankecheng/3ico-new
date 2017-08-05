<template>
    <div>

    <top/>
    <headerComp/>

    <div class="login-wrap">
        <div class="View container">
            <div class="login-box">
                <div class="hd">会员登录</div>
                <div class="bd">
                    <el-form ref="form" :model="form" :rules="rules" label-width="0">
                        <el-form-item prop="mobile">
                            <el-input v-model="form.mobile" placeholder="电话"/>
                        </el-form-item>
                        <el-form-item prop="pwd">
                            <el-input v-model="form.pwd" type="password" placeholder="密码"/>
                        </el-form-item>
                        <el-form-item prop="captcha">
                            <el-input v-model="form.captcha" placeholder="验证码" style="width: 150px; vertical-align: top;"/>
                            <img @click="refreshCaptcha"
                            title="点击刷新"
                            style="vertical-align: top; cursor: pointer;"
                            :src="captcha" height="36" />
                        </el-form-item>
                        <el-form-item style="margin-bottom: 0;">
                            <!-- <input type="checkbox" name=""/>记住我 -->
                            <a style="float: right" href="javascript:;"
                            @click="$router.push({
                                path: 'reset-pwd'
                            })">忘记密码</a>
                        </el-form-item>
                        <el-form-item>
                            <el-button style="width: 100%; background-color: #005bac; border-color: #005bac;"
                            @click="onSubmit" type="primary">登录</el-button>
                            <div style="margin-top: 20px;">
                                <el-button  style="width: 100%; background-color: #22a875; border-color: #22a875; color: #fff;"
                                @click="$router.push({
                                    path: 'register'
                                })">免费注册</el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="ft">
                    还没有登录账号？<br/>
                    马上注册关注本网站信息
                </div>
            </div>
        </div>
    </div>

    <bottom/>

    <!-- <el-card class="login-wrap">
        <div class="hd" slot="header">
            <img src="../assets/images/logo.png" height="53" width="155">
        </div>
        <div class="bd">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="用户名" prop="nick">
                    <el-input v-model="form.nick" style="width: 210px;"/>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input v-model="form.pwd" type="password" style="width: 210px;"/>
                </el-form-item>
                <el-form-item label="验证码" prop="captcha">
                    <el-input v-model="form.captcha" style="width: 100px; vertical-align: top;"/>
                    <img style="vertical-align: top;" :src="captcha" height="36" />
                </el-form-item>
                <el-form-item>
                    <el-button @click="onSubmit" type="primary">登录3ICO</el-button>
                    <el-button @click="$router.push({
                        path: 'register'
                    })">注册账号</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-card> -->
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
            captcha: '',
            form: {
                mobile: '',
                pwd: '',
                captcha: '',
                captcha_id: '',
            },
            rules: {
                mobile: [
                    { required: true, message: '请输入电话', trigger: 'blur' },
                ],
                pwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                captcha: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                ],
            }
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
            login: 'login',
        }),
        onSubmit() {
            const data = this.form;

            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.login(data).then((res) => {
                        const role = this.user.role;
                        if (role === 3) {
                            location.href = location.origin;
                        } else {
                            this.$message('登录成功');
                            this.$router.push({
                                path: '/admin'
                            });
                        }
                    }).catch(() => {
                        this.refreshCaptcha();
                    });
                }
            });
        },
        refreshCaptcha() {
            this.getCaptcha().then((res) => {
                this.captcha = 'data:image/png;base64,' + res.data.captcha;
                this.form.captcha_id = res.data.captcha_id;
            });
        }
    },
    created() {
        this.refreshCaptcha();
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
        top: 40px;
        right: 0;
        width: 368px;
        height: 390px;
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

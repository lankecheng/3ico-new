<template>
<div v-if="init">
    <top/>
    <headerComp/>
    <mTop :title="title"/>
    <div class="View container">
        <div class="main">
            <div v-if="user" class="sidebar">
                <div class="top">
                    <div class="info">
                        <div class="avatar">
                        <img src="../../assets/img/default-avatar.png"/>
                        </div>
                        <div class="content">
                            <div class="nick">{{user.mobile}}的账户</div>
                            <div class="tag">已登录您的账号</div>
                        </div>
                    </div>
                    <div class="control">
                        <span class="primary-color">会员类型：{{roles[user.role] && roles[user.role].text}}</span>
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        <a @click="handleLogout" href="javascript:;">退出</a>
                    </div>
                </div>
                <div class="menus">
                    <ul>
                        <li v-if="NODE_ENV === 'development' || user.role === 2">
                            <router-link to="/admin/projects/edit">项目录入</router-link>
                        </li>
                        <li v-if="NODE_ENV === 'development' || user.role === 2">
                            <router-link to="/admin/projects/status">项目状态变更</router-link>
                        </li>
                        <li v-if="NODE_ENV === 'development' || user.role === 2">
                            <router-link to="/admin/coin-list">代币发放</router-link>
                        </li>
                        <li v-if="NODE_ENV === 'development' || user.role === 1">
                            <router-link to="/admin/admin">项目管理员</router-link>
                        </li><!-- 
                        <li v-if="NODE_ENV === 'development' || user.role === 1">
                            <router-link to="/admin/banner">首页图片</router-link>
                        </li>
                        <li v-if="NODE_ENV === 'development' || user.role === 1">
                            <router-link to="/admin/annc">公告</router-link> -->
                        </li>
                        <li v-if="NODE_ENV === 'development' || user.role === 1">
                            <router-link to="/admin/admin-pay">万能充值</router-link>
                        </li>
                        <li v-if="NODE_ENV === 'development' || user.role === 1">
                            <router-link to="/admin/user">用户列表</router-link>
                        </li>
                        <li v-if="NODE_ENV === 'development' || user.role === 1">
                            <router-link to="/admin/asset">用户资产流水</router-link>
                        </li>
                        <li v-if="NODE_ENV === 'development' || user.role === 1">
                            <router-link to="/admin/user-account">用户钱包</router-link>
                        </li>
                        <li v-if="NODE_ENV === 'development' || user.role === 1">
                            <router-link to="/admin/withdraw-record">提现</router-link>
                        </li>
                        <li v-if="NODE_ENV === 'development' || user.role === 1">
                            <router-link to="/admin/coin-log">用户代币发放记录</router-link>
                        </li>
                        <li v-if="NODE_ENV === 'development' || user.role === 1">
                            <router-link to="/admin/login-record">登录日志</router-link>
                        </li>
                        <li v-if="NODE_ENV === 'development' || user.role === 3">
                            <router-link to="/admin/personal/info">我的信息</router-link>
                        </li>
                        <li v-if="NODE_ENV === 'development' || user.role === 3">
                            <router-link to="/admin/personal/asset">资产流水</router-link>
                        </li>
                        <li v-if="NODE_ENV === 'development' || user.role === 3">
                            <router-link to="/admin/pay">数字代币充值</router-link>
                        </li>
                        <li v-if="NODE_ENV === 'development' || user.role === 3">
                            <router-link to="/admin/user-coin-log">代币发放记录</router-link>
                        </li>
                        <li v-if="NODE_ENV === 'development' || user.role === 3">
                            <router-link to="/admin/invest">数字代币投资</router-link>
                        </li>
                        <li v-if="NODE_ENV === 'development' || user.role === 3">
                            <router-link to="/admin/withdraw">数字代币提现</router-link>
                        </li>
                        <li v-if="NODE_ENV === 'development' || user.role === 3">
                            <router-link to="/admin/withdraw/addr">提现地址管理</router-link>
                        </li>
                        <li v-if="NODE_ENV === 'development' || user.role === 3">
                            <router-link to="/admin/personal/password">修改密码</router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="content">
                <div class="title">{{title}}</div>
                <router-view/>
            </div>
        </div>
    </div>

    <bottom/>
    <!-- <div class="Frame menu">
        <div class="logo">
        <router-link to="/">
        <img src="../../assets/img/logo.png"/>
        <em>3ICO后台管理系统</em>
        </router-link>
        </div>
        <el-menu :default-active="activeIndex" class="bd" router>
            <el-submenu index="/admin/project">
                <template slot="title">项目管理</template>
                <el-menu-item index="/admin/project/list">项目列表</el-menu-item>
            </el-submenu>
            <el-submenu index="/personal">
                <template slot="title">个人中心</template>
                <el-menu-item index="/personal/info">我的信息</el-menu-item>
                <el-menu-item index="/personal/asset">资产流水</el-menu-item>
                <el-menu-item index="/personal/password">修改交易密码</el-menu-item>
            </el-submenu>
            <el-menu-item index="/admin/admin">项目管理员</el-menu-item>
            <el-menu-item index="/admin/user">用户列表</el-menu-item>
            <el-menu-item index="/admin/asset">资产流水</el-menu-item>
        </el-menu>
    </div>
    <div v-if="init" class="View main">
        <div class="View content">
            <router-view class="Frame content"/>
        </div>
        <div class="Frame top">
            <div class="Widget crumb">{{title}}</div>
            <div class="menus">
                <el-button @click="handleLogout" type="text">退出</el-button>
            </div>
        </div>
    </div> -->
</div>
</template>

<script type="text/babel">
import {
    mapState,
    mapActions,
} from 'vuex';

import {bus, tokenHandle} from '../../utils/';

import top from '../layout/top.vue';
import headerComp from '../layout/header.vue';
import bottom from '../layout/bottom.vue';
import mTop from '../module/top.vue';

export default {
    data() {
        return {
            activeIndex: '',
            init: false,
            'NODE_ENV': NODE_ENV,
        };
    },
    components: {
        top,
        headerComp,
        bottom,
        mTop,
    },
    computed: {
        ...mapState({
            user: state => state.user,
            title: state => state.title,
            roles: state => state.roles,
        }),
    },
    methods: {
        ...mapActions({
            getUserInfo: 'getUserInfo',
            logout: 'logout',
            postAssistVerify: 'postAssistVerify'
        }),
        handleLogout() {
            this.logout().then((res) => {
                tokenHandle.remove();
                location.href = location.origin;
                // this.$router.push({
                //     path: '/login'
                // });
            });
        }
    },
    created () {
        this.init = true;
        // this.postAssistVerify().catch(() => {
        //     tokenHandle.remove();
        // });
        this.getUserInfo().then((res) => {
            this.init = true;
        }).catch((res) => {
            this.$router.push({
                path: '/login'
            });
        });
        // 初次进入页面关联路由 meta.index 处理展开激活的菜单
        const activeIndex = this.$route.meta.index || '';
        this.activeIndex = activeIndex;

        bus.$on('handleMenuActiveChange', (activeIndex) => {
            this.activeIndex = activeIndex;
        });
    }
};
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/mixins.scss';
    .View.container {
        padding: 40px 0 60px;
        width: 1200px;
    }
    .main{
        @include clearfix;
        border-width: 5px 1px 1px 1px;
        border-style: solid;
        border-color: #22a875 #e6e6e6 #e6e6e6;
        .sidebar{
            float: left;
            width: 229px;
            height: 100%;
            border-right: 1px solid #e6e6e6;
            .top{
                position: relative;
                padding: 12px;
                border-bottom: 1px solid #e6e6e6;
                .info{
                    position: relative;
                    padding: 18px 0 22px 80px;
                    .avatar{
                        position: absolute;
                        top: 18px;
                        left: 0;
                        width: 60px;
                        height: 60px;
                        overflow: hidden;
                        border-radius: 50%;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .tag{
                        margin-top: 14px;
                        display: inline-block;
                        padding: 8px 12px;
                        border-radius: 3px;
                        font-size: 12px;
                        color: #fff;
                        background-color: #09aa83;
                    }
                }
                .control{
                    padding-top: 18px;
                    border-top: 1px dashed #d9d9d9;
                    text-align: center;
                    font-size: 12px;
                }
            }
            .menus{
                padding: 12px;
                ul{
                    margin: 0;
                    padding: 0;
                    list-style: none;
                    li{
                        +li{
                            border-top: 1px dashed #d9d9d9;
                        }
                        a{
                            display: block;
                            padding: 0 15px 0 30px;
                            height: 40px;
                            font-size: 14px;
                            color: #333;
                            line-height: 40px;
                            &:hover{
                                opacity: .9;
                            }
                        }
                    }
                }
            }
        }
        >.content{
            float: left;
            width: 900px;
            margin-left: -1px;
            padding: 20px 30px;
            border-left: 1px solid #e6e6e6;
            .title{
                position: relative;
                margin-bottom: 20px;
                padding: 0 0 16px 15px;
                font-size: 24px;
                line-height: 30px;
                color: #09aa83;
                border-bottom: 1px solid #d6d6d6;
                &:before{
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 4px;
                    height: 30px;
                    background-color: #33c524;
                }
            }
        }
    }
    // .Frame.menu {
    //     position: absolute;
    //     z-index: 1;
    //     left: 0;
    //     top: 0;
    //     overflow: hidden;
    //     width: 180px;
    //     height: 100%;
    //     background-color: #eef1f6;

    //     .logo {
    //         position: absolute;
    //         top: 0;
    //         left: 0;
    //         display: block;
    //         width: 100%;
    //         height: 54px;
    //         padding: 5px 0;
    //         text-align: center;
    //         background-color: #E5E9F2;
    //         a{
    //             display: block;
    //             text-decoration: none;
    //         }
    //         img {
    //             display: block;
    //             margin: 0 auto;
    //             height: 40px;
    //         }
    //         em {
    //             display: block;
    //             font-style: normal;
    //             font-size: 12px;
    //             color: #333;
    //         }
    //     }
    //     .bd {
    //         position: absolute;
    //         top: 64px;
    //         bottom: 0;
    //         left: 0;
    //         overflow-x: hidden;
    //         overflow-y: auto;
    //         width: 100%;
    //     }
    // }
    // .View.main {
    //     position: absolute;
    //     z-index: 2;
    //     left: 180px;
    //     right: 0;
    //     top: 0;
    //     height: 100%;
    //     background-color: #fff;
    //     overflow: auto;
    // }
    // .View.content {
    //     position: absolute;
    //     top: 64px;
    //     left: 0;
    //     right: 0;
    //     bottom: 0;
    //     // z-index: 8;
    //     overflow: auto;
    //     min-width: 1080px;
    // }
    // .Frame.content {
    //     padding: 40px;
    //     &.outer {
    //         height: 100%;
    //         padding: 0;
    //         iframe{
    //             display: block;
    //         }
    //     }
    // }
    // .Frame.top {
    //     position: absolute;
    //     top: 0;
    //     left: 0;
    //     right: 0;
    //     // z-index: 9;
    //     min-width: 1000px;
    //     height: 63px;
    //     padding: 0 40px;
    //     background-color: #fff;
    //     box-shadow: 0 1px 3px rgba(128, 142, 150, 0.2);
    //     .Widget.crumb {
    //         float: left;
    //         line-height: 63px;
    //         font-size: 16px;
    //         font-weight: bold;
    //         color: #666;
    //     }
    //     .menus{
    //         float: right;
    //         line-height: 63px;
    //     }
    // }
</style>

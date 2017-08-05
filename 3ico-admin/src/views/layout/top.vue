<template>
    <div class="Frame top">
        <div class="View container">
            <span>www.3ico.com</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <!-- <span>
                <i class="ico-phone"></i>
                +13615966354
            </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -->
            <span>
            官方QQ群：①661222492&nbsp;&nbsp;②661733862&nbsp;&nbsp;
            客服QQ：①489941545&nbsp;&nbsp;②1690176159
            <!-- ICO is Initial Crypto-Token Offering
            比特币：<span class="green">{{btc}}</span> BTC
            以太坊：<span class="green">{{eth}}</span> ETH -->
            </span>
            <ul class="menus">
                <li>
                    <router-link v-if="!user" class="login" to="/login">
                        <i class="ico-user"></i>
                        登录
                    </router-link>
                    <a v-else href="/manage/index.html#/admin">
                        <i class="ico-user"></i>
                        个人中心
                    </a>
                </li>
                <li>
                    <router-link v-if="!user" class="register" to="/register">
                        注册
                    </router-link>
                    <span @click="handleLogout" v-else class="register">
                        退出
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {
    mapState,
    mapActions,
} from 'vuex';
import axios from 'axios';
import {bus, tokenHandle} from '../../utils/';
    export default {
        data() {
            return {
                btc: 0,
                eth: 0,
            }
        },
        computed: {
            ...mapState({
                user: state => state.user,
            })
        },
        methods: {
            ...mapActions({
                logout: 'logout',
                postAssistVerify: 'postAssistVerify',
                getUserInfo: 'getUserInfo',
            }),
            handleLogout() {
                this.logout().then((res) => {
                    tokenHandle.remove();
                    location.href = location.origin;
                    // this.$router.push({
                    //     path: '/login'
                    // });
                });
            },
            getData() {
                axios
                .get('https://www.chbtc.com/getTradeData?symbol=btc')
                .then((res) => {
                    const data = res.data.datas;
                    this.btc = data[data.length - 1].CNY;
                }).catch((err) => {
                });
                axios
                .get('https://www.chbtc.com/getTradeData?symbol=eth')
                .then((res) => {
                    const data = res.data.datas;
                    this.eth = data[data.length - 1].CNY;
                }).catch((err) => {
                });
                setTimeout(() => {
                    this.getData();
                }, 1000 * 10);
            }
        },
        created() {
            // this.getData();
            if (tokenHandle.get()) {
                this.postAssistVerify().catch(() => {
                    tokenHandle.remove();
                });
                this.getUserInfo();
            }
        }
    }
</script>

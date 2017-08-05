<template>
    <div>

    <top/>
    <headerComp/>
    <mTop title="联系我们"/>
    <div class="View container">
        <div class="info">
            <div class="hd">3ICO</div>
            <div class="bd">
                <!-- <div class="item">
                    <span class="label">业务咨询</span>
                    <div class="content">0991-2300336</div>
                </div>
                <div class="item">
                    <span class="label">总机服务</span>
                    <div class="content">0991-2300336</div>
                </div>
                <div class="item">
                    <span class="label">售后服务</span>
                    <div class="content">0991-2300336</div>
                </div>
                <div class="item">
                    <span class="label">传真</span>
                    <div class="content">0991-2300336</div>
                </div>
                <div class="item">
                    <span class="label">QQ</span>
                    <div class="content">16216833624</div>
                </div>
                <div class="item">
                    <span class="label">联系邮箱</span>
                    <div class="content">zhtx@163.com</div>
                </div> -->
                <div class="item">
                    <span class="label">官方QQ群</span>
                    <div class="content">①661222492 ②661733862</div>
                </div>
                <div class="item">
                    <span class="label">客服QQ</span>
                    <div class="content">①489941545 ②1690176159</div>
                </div>
                <div class="item">
                    <span class="label">联系地址</span>
                    <div class="content">深圳市南山区大学城创客小镇</div>
                </div>
            </div>
        </div>
        <div class="map">
            <div class="tip">看电子地图，更快的找到我们！</div>
            <img src="../assets/img/demo/map.jpeg">
        </div>
    </div>
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
import mTop from './module/top.vue';

export default{
    // title: '注册',
    components: {
        top,
        headerComp,
        bottom,
        mTop,
    },

};
</script>

<style lang="scss" scoped>
.container{
    margin-top: 60px;
    padding-bottom: 140px;
}
.info{
    float: left;
    width: 390px;
    .hd{
        padding-bottom: 14px;
        font-size: 24px;
        color: #22a875;
        border-bottom: 1px solid #e6e6e6;
    }
    .item{
        position: relative;
        margin-top: 30px;
        padding-left: 90px;
        color: #666;
        .label{
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            width: 80px;
            font-weight: bold;
        }
    }
}
.map{
    float: right;
    width: 500px;
    .tip{
        margin-bottom: 12px;
        font-size: 14px;
        color: #666;
    }
    img{
        width: 100%;
    }
}
</style>

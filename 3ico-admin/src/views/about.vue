<template>
    <div>

    <top/>
    <headerComp/>
    <mTop title="关于我们"/>

        <div class="info">
            <div class="View container">
                <div class="hd">ABOUT US</div>
                <div class="left">
                    <div class="title">公司简介</div>
                    <div class="content">
                        3ico于2017年08月上线，是一个为ICO项目提供一站式服务的平台。
                        广大投资者可以在3ico平台查阅和筛选ICO项目进行投资，项目方可
                        以在3ico平台发布项目信息并开展ICO。在此过程中，我们专注于为
                        投资者提供更加全面、真实和客观的项目资讯及评估报告，以帮助投
                        资者做出正确而明智的选择；同时为项目方提供项目诊断咨询服务，
                        以协助项目取得成功。
                    </div>
                </div>
                <div class="right">
                    <div class="title">关于我们</div>
                    <div class="content">
                        <img src="../assets/img/demo/us.jpg">
                    </div>
                </div>
            </div>
        </div>
        <div class="advantage">
            <div class="bg"></div>
            <div class="View container">
                <div class="hd">ADVANTAGE</div>
                <div class="sub">公司优势</div>
                <div class="bd">
                    <div class="item">
                        <i class="ico-credit"></i><br/><br/>
                        <span>专业</span>
                    </div>
                    <div class="item">
                        <i class="ico-safe"></i><br/><br/>
                        <span>安全</span>
                    </div>
                    <div class="item">
                        <i class="ico-transparent"></i><br/><br/>
                        <span>透明</span>
                    </div>
                    <div class="item">
                        <i class="ico-fair"></i><br/><br/>
                        <span>公平</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="group1">
            <div class="View container">
                <ul class="bd">
                    <li>
                        <div class="ico group"></div>
                        <div class="content">
                            <div class="title">全面的ICO资讯</div>
                            <div class="desc">团队成员搜集全球各类ICO项目资讯的步伐从未停歇，对区块链行业的发展始终保持着高度的关注，以帮助投资者合理制定投资计划。</div>
                        </div>
                    </li>
                    <li>
                        <div class="ico cloud"></div>
                        <div class="content">
                            <div class="title">专业的ICO服务</div>
                            <div class="desc">团队专业人员从投资者的角度对项目进行分析，综合考察项目团队成员背景、技术优势以及可能的应用场景等方面，从而为投资者及项目方提供客观真实的评估报告。</div>
                        </div>
                    </li>
                    <li>
                        <div class="ico idea"></div>
                        <div class="content">
                            <div class="title">优秀的合作伙伴</div>
                            <div class="desc">与国内外区块链行业的多家初创企业达成战略合作，以实现在最大程度上帮助ICO项目方了解国内外市场，制定合理的ICO方案，收集投资者反馈，促使ICO项目取得成功。</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="group2">
            <div class="View container">
                <div class="hd">我们的团队</div>
                <div class="bd">
                    <div class="item">
                        <img class="avatar" src="../assets/img/demo/ceo1.jpg">
                        <!-- <div class="name">张立成 <span class="title">- CEO</span></div>
                        <div class="desc">
                            互联网金融创业者， 拥有6 年以上的金融产品设计与运营，以及团队管理经验，熟悉互联网金融的各种运作模式，进入数字货币行业三年多，对区块链有比较深的理解，较强的市场敏锐感，坚持产品设计必须与市场需求相结合
                        </div> -->
                    </div>
                    <div class="item">
                        <img class="avatar" src="../assets/img/demo/ceo2.jpg">
                        <!-- <div class="name">张立成 <span class="title">- CEO</span></div>
                        <div class="desc">
                            互联网金融创业者， 拥有6 年以上的金融产品设计与运营，以及团队管理经验，熟悉互联网金融的各种运作模式，进入数字货币行业三年多，对区块链有比较深的理解，较强的市场敏锐感，坚持产品设计必须与市场需求相结合
                        </div> -->
                    </div>
                    <div class="item">
                        <img class="avatar" src="../assets/img/demo/ceo3.jpg">
                        <!-- <div class="name">张立成 <span class="title">- CEO</span></div>
                        <div class="desc">
                            互联网金融创业者， 拥有6 年以上的金融产品设计与运营，以及团队管理经验，熟悉互联网金融的各种运作模式，进入数字货币行业三年多，对区块链有比较深的理解，较强的市场敏锐感，坚持产品设计必须与市场需求相结合
                        </div> -->
                    </div>
                    <div class="item">
                        <img class="avatar" src="../assets/img/demo/ceo4.jpg">
                        <!-- <div class="name">张立成 <span class="title">- CEO</span></div>
                        <div class="desc">
                            互联网金融创业者， 拥有6 年以上的金融产品设计与运营，以及团队管理经验，熟悉互联网金融的各种运作模式，进入数字货币行业三年多，对区块链有比较深的理解，较强的市场敏锐感，坚持产品设计必须与市场需求相结合
                        </div> -->
                    </div>
                </div>
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
@import '../assets/scss/mixins.scss';
.container{

}
.info{
    margin-top: 60px;
    @include clearfix;
    .hd{
        margin-bottom: 30px;
        font-size: 34px;
        color: #22a875;
        text-align: center;
    }
    .left{
        float: left;
        width: 490px;
        line-height: 1.8;
        color: #333;
        .title{
            margin-bottom: 20px;
            font-size: 20px;
        }
    }
    .right {
        float: right;
        width: 490px;
        .title{
            margin-bottom: 20px;
            font-size: 20px;
        }
        img{
            width: 100%;
        }
    }
}
.advantage{
    position: relative;
    margin-top: 90px;
    .hd{
        font-size: 34px;
        color: #22a875;
    }
    .sub{
        font-size: 30px;
        color: #1d1d1d;
    }
    .bg{
        position: absolute;
        top: 130px;
        width: 100%;
        height: 120px;
        background-color: #f2f2f2;
    }
    .bd{
        padding: 60px 0 0;
        background-color: #fff;
        .item{
            display: inline-block;
            width: 24%;
            text-align: center;
            font-size: 24px;
            color: #333;
        }
        .ico-safe, .ico-credit, .ico-fair, .ico-transparent{
            display: inline-block;
            width: 150px;
            height: 150px;
            background-image: url(../assets/img/ico-about2.png);
            background-repeat: no-repeat;
        }
        .ico-safe{
            background-position: 0 0;
        }
        .ico-credit{
            background-position: -150px 0;
        }
        .ico-fair{
            background-position: -300px 0;
        }
        .ico-transparent{
            background-position: -450px 0;
        }
    }
}
.group1{
    margin-top: 100px;
    .bd{
        margin: 0;
        padding: 0;
        list-style: none;
        li{
            position: relative;
            margin-top: 50px;
            padding-left: 120px;
            .title{
                font-size: 24px;
                color: #22a875;
            }
            .desc{
                margin-top: 20px;
                font-size: 14px;
            }
        }
        .ico{
            position: absolute;
            top: 0;
            left: 0;
            width: 70px;
            height: 70px;
            background-image: url(../assets/img/ico-about.png);
            background-repeat: no-repeat;
            background-size: 210px;
            &.group{
                background-position: 0 0;
            }
            &.cloud{
                background-position: -70px 0;
            }
            &.idea{
                background-position: -140px 0;
            }
        }
    }
}
.group2{
    margin-top: 80px;
    padding-bottom: 80px;
    .hd{
        font-size: 30px;
        color: #1d1d1d;
    }
    .bd{
        margin-top: 50px;
        margin-left: -20px;
        .item{
            float: left;
            margin-left: 20px;
            width: 233px;
            .avatar{
                display: block;
                width: 100%;
            }
            .name{
                margin-top: 20px;
                font-size: 18px;
                font-weight: bold;
                .title{
                    font-size: 14px;
                    color: #666;
                    font-weight: normal;
                }
            }
            .desc{
                margin-top: 20px;
                font-size: 14px;
                color: #666;
                line-height: 2;
            }
        }
    }
}
</style>

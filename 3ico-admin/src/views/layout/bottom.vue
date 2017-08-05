<template>
    <div>
        <div class="Frame bottom">
            <div class="View container">
                <div class="menus">
                    <ul>
                        <li><i class="ico arrow"></i><a href="/">首页</a></li>
                        <li>
                        <i class="ico arrow"></i>
                        <router-link to="/projects">
                        项目信息</router-link>
                        </li>
                        <!-- <li><i class="ico arrow"></i><a href="javascript:;">PUSH集市</a></li> -->
                        <li>
                            <i class="ico arrow"></i>
                        <router-link to="/about">
                        关于我们</router-link>
                        </li>
                        <li><i class="ico arrow"></i>
                        <router-link to="/contact">
                        联系我们</router-link></li>
                    </ul>
                </div>
                <div class="contact">
                    <div class="hd">联系我们</div>
                    <ul>
                        <!-- <li>
                            <i class="ico telephone"></i>
                            010-4029182
                        </li> -->
                        <li>
                            <i class="ico mail"></i>
                            官方QQ群：<br/>
                            ①661222492<br/>
                            ②661733862
                        </li>
                        <li>
                            <i class="ico mail"></i>
                            客服QQ：<br/>
                            ①489941545<br/>
                            ②1690176159
                        </li>
                        <!-- <li>
                            <i class="ico phone"></i>
                            13715933598
                        </li> -->
                        <li>
                            <i class="ico location"></i>
                            深圳市南山区大学城创客小镇
                        </li>
                    </ul>
                </div>
                <div class="map">
                    <div class="hd">公司地图</div>
                    <div class="inner">
                        <img src="../../assets/img/demo/map.jpeg">
                    </div>
                </div>
                <!-- <div class="follow">
                    <div class="qrcode">
                    3ico微信关注<br/><br/>
                    <img src="../../assets/img/qrcode.jpg"></div>
                </div> -->
            </div>
        </div>
        <div class="copyright">
            <div class="View container">
                CopyRight © 2017 All Rights Reserved. 版权所有 ©
                <a href="/">www.3ico.com</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

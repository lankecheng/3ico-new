<template>
    <div class="header">
        <div class="View container">
            <h1 class="logo">
                <a href="/"><img src="../../assets/img/logo.png"></a>
            </h1>
            <ul class="menus">
                <li>
                    <a href="/">首页</a>
                </li>
                <li>
                    <router-link
                    :class="{active: $route.path === '/projects'}"
                    to="/projects">项目信息</router-link>
                </li>
                <!-- <li>
                    <a href="javascript:;">push集市</a>
                </li> -->
                <li>
                    <router-link
                    :class="{active: $route.path === '/about'}"
                    to="/about">关于我们</router-link>
                </li>
                <li>
                    <router-link
                    :class="{active: $route.path === '/contact'}"
                    to="/contact">联系我们</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

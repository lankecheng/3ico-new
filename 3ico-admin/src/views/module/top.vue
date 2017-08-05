<template>
    <div class="Module top">
        <div class="View container">
            <div class="title">{{title}}</div>
            <div v-if="crumb" class="crumb">{{crumb}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            title: String,
            crumb: String,
        }
    }
</script>

<style lang="scss">
    .Module.top{
        padding: 35px 0;
        background-color: #373737;
        .title{
            font-size: 30px;
            color: #fff;
        }
        .crumb{
            margin-top: 10px;
            font-size: 14px;
            color: rgba(245, 245, 245, .6);
        }
    }
</style>

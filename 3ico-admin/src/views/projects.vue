<template>
    <div class="project-list">

    <top/>
    <headerComp/>
    <mTop title="ICO日历"/>

    <div class="View container">
        <div class="tabs">
            <ul>
                <li><router-link @click.native="tabChange" :class="{
                    active: !$route.query.status
                    }" to="/projects">全部</router-link></li>
                <li><router-link @click.native="tabChange" :class="{
                    active: $route.query.status == 3
                    }" to="/projects?status=3">已完成</router-link></li>
                <li><router-link @click.native="tabChange" :class="{
                    active: $route.query.status == 2
                    }" to="/projects?status=2">进行中</router-link></li>
            </ul>
        </div>
    </div>

    <div class="View container">
    <div class="list">
        <table v-if="projects.length > 0">
            <thead>
                <tr>
                    <th>项目名称</th>
                    <th>开始时间</th>
                    <th>结束时间</th>
                    <th style="width: 300px;">备注</th>
                    <th style="width: 130px;"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="project in projects">
                    <!-- <td></td> -->
                    <td>
                        <div class="name">{{project.name}}</div>
                        <div class="desc"></div>
                    </td>
                    <td>{{project.begin_time}}</td>
                    <td>{{project.end_time}}</td>
                    <td>{{project.digest}}</td>
                    <td><a class="link" :href="project.href">查看详情</a></td>
                </tr>
            </tbody>
        </table>
        <div style="padding: 100px; text-align: center;" v-else>暂无数据</div>
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
    title: 'ICO日历',
    components: {
        top,
        headerComp,
        bottom,
        mTop,
    },
    data () {
        return {
        };
    },
    computed: {
        ...mapState({
            projects: state => state.feProjects,
        }),
    },
    methods: {
        ...mapActions({
            getFEProjects: 'getFEProjects',
        }),
        tabChange() {
            const status = this.$route.query.status;
            this.getFEProjects({
                status: status
            });
        },
    },
    created() {
        const status = this.$route.query.status;
        this.getFEProjects({
            status: status
        });
    }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/mixins.scss';
.project-list{
    .tabs{
        margin-top: 40px;
        border-bottom: 1px solid #e3e3e3;
        ul{
            @include clearfix;
            margin: 0;
            margin-bottom: -1px;
            padding: 0;
            list-style: none;
        }
        li{
            float: left;
            margin-right: 30px;
            font-size: 18px;
            color: #333;
            a{
                display: block;
                padding: 10px;
                color: #333;
                border-bottom-width: 2px;
                border-bottom-style: solid;
                border-bottom-color: transparent;
                &.active,&:hover{
                    border-bottom-color: #005bac;
                }
            }
        }
    }
    .list{
        padding-bottom: 70px;
        table{
            margin-top: 30px;
            width: 100%;
            table-layout: fixed;
            border-collapse: 0;
            border-spacing: 0;
            th{
                padding: 16px 10px;
                background-color: #f6f6f6;
                font-size: 16px;
                color: #333;
                text-align: left;
            }
            tbody{
                td{
                    padding: 30px 20px;
                    border-bottom: 1px solid #e3e3e3;
                    font-size: 14px;
                    color: #333;
                }
                .name{
                    margin-bottom: 16px;
                    color: #005bac;
                    font-size: 16px;
                    font-weight: bold;
                }
                .link{
                    display: block;
                    padding: 5px;
                    background-color: #23ab77;
                    color: #fff;
                    text-align: center;
                    border-radius: 3px;
                    &:hover{
                        opacity: 0.9;
                    }
                }
            }
        }
    }
}
</style>

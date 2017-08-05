<template>
  <div>
    欢迎使用3ICO后台管理系统~
  </div>
</template>

<script type="text/babel">
import {mapState} from 'vuex';

export default{
    title: '个人中心',
    data () {
        return {}
    },
    computed: {
        ...mapState({
            user: state => state.user,
        })
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            setTimeout(() => {
                const role = vm.user.role;
                if (role && role == 3) {
                    vm.$router.push({
                        path: '/admin/personal/info'
                    });
                }
            }, 300);
            // 避免导航条目仍在激活状态
            vm.$parent.activeIndex = new Date().toString();
        });
    },
};
</script>

<style lang="scss" scoped>
</style>

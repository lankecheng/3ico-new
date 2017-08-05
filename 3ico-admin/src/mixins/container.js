// 内容主体的子组件用来获取主体组件
export default {
    computed: {
        container() {
            let parent = this.$parent;

            while (
                parent &&
                parent.$options.name !== 'container'
            ) {
                parent = parent.$parent;
            }

            return parent;
        }

    }
};

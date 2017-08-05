import {mapMutations} from 'vuex';

export default {
    methods: {
        ...mapMutations({
            setTopTitle: 'SET_TITLE',
        }),
    },
    mounted () {
        const {title} = this.$options;
        if (!title) return;
        if (typeof title === 'string') {
            this.setTopTitle(title);
        }
        if (typeof title === 'function') {
            this.setTopTitle(title.call(this));
        }
    }
};

import Vue from 'vue';

const components = [];

components.forEach(component => {
    Vue.component(component.name, component);
});

export default {

};

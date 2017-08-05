import Vue from 'vue';
import VeeValidate, {Validator} from 'vee-validate';
import zhCN from 'vee-validate/dist/locale/zh_CN';

Validator.addLocale(zhCN);

Vue.use(VeeValidate, {
    locale: 'zh_CN',
});

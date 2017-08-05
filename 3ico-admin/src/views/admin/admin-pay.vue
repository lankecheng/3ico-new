<template>
    <div>
        <el-form ref="form" :model="data" :rules="rules" label-width="100px">
                    <el-form-item label="币种" prop="currency">
                        <el-select v-model="data.currency">
                          <el-option v-for="c in currencies" :label="c.text" :value="c.val"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="mobile">
                        <el-input v-model="data.mobile" style="width: 200px;"/>
                    </el-form-item>
                    <el-form-item label="数量" prop="amount">
                        <el-input v-model="data.amount" style="width: 100px;"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="onSubmit" type="primary">确认</el-button>
                    </el-form-item>
                </el-form>
    </div>
</template>

<script>
import {
    mapActions,
    mapState,
} from 'vuex';
    export default {
        title: '万能充值',
        data() {
            return {
                data: {
                    currency: 0,
                    mobile: '',
                    amount: '',
                },
                rules: {}
            }
        },
        computed: {
            ...mapState({
                currencies: 'currencies',
            })
        },
        methods: {
            ...mapActions({
                postAdminTopUp: 'postAdminTopUp'
            }),
            onSubmit() {
                this.postAdminTopUp(this.data).then((res) => {
                    this.$message('操作成功');
                });
            }
        }
    }
</script>

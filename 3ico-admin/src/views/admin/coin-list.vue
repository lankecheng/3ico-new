<template>
  <div>
    <el-table
        v-loading="loading"
        :data="coins"
        stripe
        border>
        <el-table-column
          prop="name"
          label="项目">
          </el-table-column>
          <el-table-column
          label="币种">
          <template scope="scope">
            {{currencies[scope.row.currency].text}}
          </template>
          </el-table-column>
          <el-table-column
          prop="complete_amount"
          label="获得数">
          </el-table-column>
          <el-table-column
          prop="number"
          label="支持人数">
          </el-table-column>
          <el-table-column
          prop="coin_name"
          label="代币名称">
          </el-table-column>
          <el-table-column
          prop="coin_ratio"
          label="发放比例">
          </el-table-column>
          <el-table-column
          prop="coin_vip_fee"
          label="VIP手续费">
          </el-table-column>
          <el-table-column
          prop="coin_fee"
          label="手续费">
          </el-table-column>
          <el-table-column
          prop="coin_time"
          label="发放时间">
          </el-table-column>
        <el-table-column
        label="操作">
          <template scope="scope">
            <el-button
            v-if="!scope.row.coin_ratio"
            @click="handleFafa(scope.row)" size="small">发放</el-button>
            <el-button
            v-else
            @click="handleReFafa(scope.row)" size="small">重新发放</el-button>
          </template>
        </el-table-column>
    </el-table>
    <el-dialog
    size="tiny"
    title="发放"
    :visible.sync="dialog.show"
    :modal-append-to-body="false">
        <el-form ref="form" :model="dialog.data" :rules="dialog.rules" label-width="80px">

            <el-form-item label="代币名称" prop="coin_name">
                <el-input v-model="dialog.data.coin_name"/>
            </el-form-item>
            <el-form-item label="发放比例" prop="coin_ratio">
                <el-input v-model="dialog.data.coin_ratio"/>
            </el-form-item>
            <el-form-item label="VIP手续费%" prop="coin_vip_fee">
                <el-input v-model="dialog.data.coin_vip_fee"/>
            </el-form-item>
            <el-form-item label="手续费%" prop="coin_fee">
                <el-input v-model="dialog.data.coin_fee"/>
            </el-form-item>
        </el-form>
        <div slot="footer">
        <el-button @click="handleSubmit" type="primary">确认</el-button>
        <el-button @click="dialog.show = false">取消</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script type="text/babel">
import {
    mapState,
    mapActions,
} from 'vuex';

export default{
    title: '代币发放',
    data () {
        return {
            loading: true,
            dialog: {
              show: false,
              data: {
                pid: '',
                coin_name: '',
                coin_ratio: '',
                coin_fee: '',
                coin_vip_fee: '',
              },
              rules: {}
            }
        };
    },
    computed: {
        ...mapState({
            user: 'user',
            coins: 'coins',
            currencies: 'currencies',
        }),
    },
    methods: {
        ...mapActions({
            postCoinIssue: 'postCoinIssue',
            getCoinList: 'getCoinList',
        }),
        initList() {
            this.loading = true;
            this.getCoinList().then(() => {
                this.loading = false;
            }).catch(() => {
                this.loading = false;
            });
        },
        handleFafa(item) {
          this.dialog.data.pid = item.id;
          this.dialog.data.coin_name = '';
          this.dialog.data.coin_ratio = '';
          this.dialog.data.coin_fee = '';
          this.dialog.data.coin_vip_fee = '';
          this.dialog.show = true;
        },
        handleReFafa(item) {
          this.dialog.data.pid = item.id;
          this.dialog.data.coin_name = item.coin_name;
          this.dialog.data.coin_ratio = item.coin_ratio;
          this.dialog.data.coin_fee = item.coin_fee;
          this.dialog.data.coin_vip_fee = item.coin_vip_fee;
          this.dialog.show = true;
        },
        handleSubmit() {
          this.dialog.show = false;
          this.postCoinIssue(this.dialog.data).then((res) => {
            this.$message('操作成功');
            this.initList();
          });
        },
    },
    created() {
        this.initList();
    }
};
</script>

<style lang="scss" scoped>
.hd{
    margin-bottom: 20px;
}
</style>

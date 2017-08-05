<template>
  <div>
    <div class="hd">
        <el-form :inline="true">
            <el-form-item label="用户ID">
                <el-input v-model="query.code"/>
            </el-form-item>
            <el-form-item label="手机">
                <el-input v-model="query.mobile"/>
            </el-form-item>
            <el-form-item label="项目名称">
                <el-input v-model="query.pname"/>
            </el-form-item>
            <el-form-item label="币种">
                <el-select v-model="query.currency">
                      <el-option v-for="c in currencies" :label="c.text" :value="c.val"></el-option>
                  </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="handleSearch" type="primary">搜索</el-button>
            </el-form-item>
        </el-form>
    </div>
    <el-table
    v-loading="loading"
        :data="coinLogs"
        stripe
        border>
        <el-table-column
          prop="code"
          label="用户ID">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机">
        </el-table-column>
        <el-table-column
          prop="fullname"
          label="姓名">
        </el-table-column>
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
          prop="invested_amount"
          label="投入数量">
        </el-table-column>
        <el-table-column
          prop="coin_name"
          label="代币名称">
        </el-table-column>
        <el-table-column
          prop="coin_amount"
          label="发放数量">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="发放时间">
        </el-table-column>
    </el-table>
    <el-pagination
      class="page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="query.page"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="query.count"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script type="text/babel">
import {
  mapState,
  mapActions,
} from 'vuex';

const DEFAULT_QUERY = {
    page: 1,
    count: 20,
    mobile: '',
    code: '',
    currency: 0,
    pname: '',
};

export default{
    title: '代币发放记录',
    data () {
        return {
          total: 0,
          loading: false,
          status: {
            0: '待处理',
            1: '审核通过',
            2: '转出成功',
            3: '撤销',
          },
          query: Object.assign({}, DEFAULT_QUERY, this.$route.query),
        };
    },
    computed: {
      ...mapState({
        coinLogs: 'coinLogs',
        currencies: 'currencies',
      }),
    },
    methods: {
      ...mapActions({
        getCoinLogs: 'getCoinLogs',
      }),
        handleSizeChange(val) {
          this.query.page = 1;
          this.query.count = val;
          this.initList();
        },
        handleCurrentChange(val) {
          this.query.page = val;
          this.initList();
        },
        initList() {
          this.loading = true;
          this.getCoinLogs(this.query).then((res) => {
            this.total = res.total;
            // this.query.count = res.count;
            this.loading = false;
          }).catch(() => {
            this.loading = false;
          });
        },
        handleSearch() {
          this.initList();
        }
    },
    created() {
      this.initList();
    }
};
</script>

<style lang="scss" scoped>
.hd{
    // margin-bottom: 20px;
}
.page{
    text-align: right;
    margin-top: 20px;
}
</style>

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
            <el-form-item>
                <el-button @click="handleSearch" type="primary">搜索</el-button>
            </el-form-item>
        </el-form>
    </div>
    <el-table
    v-loading="loading"
        :data="lRecords"
        stripe
        border>
        <el-table-column
          prop="ucode"
          label="用户ID">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机">
        </el-table-column>
          <el-table-column
          prop="type"
          label="类型">
          <template scope="scope">
            {{type[scope.row.type]}}
          </template>
        </el-table-column>
        <el-table-column
          prop="ip"
          label="IP">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="time"
          label="时间">
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
    ucode: '',
};

export default{
    title: '登录日志',
    data () {
        return {
          total: 0,
          loading: false,
          type: {
            0: '登录',
            1: '登出'
          },
          query: Object.assign({}, DEFAULT_QUERY, this.$route.query),
        };
    },
    computed: {
      ...mapState({
        lRecords: 'lRecords',
      }),
    },
    methods: {
      ...mapActions({
        getLRecords: 'getLRecords'
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
          this.getLRecords(this.query).then((res) => {
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

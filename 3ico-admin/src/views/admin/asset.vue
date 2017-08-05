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
        :data="journals"
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
        prop="fullname"
          label="姓名">
        </el-table-column>
        <el-table-column
          label="变动类型">
          <template scope="scope">
            {{type[scope.row.type]}}
          </template>
        </el-table-column>
        <el-table-column
          prop="project"
          label="项目">
        </el-table-column>
        <el-table-column
          prop="before"
          label="变动前">
        </el-table-column>
        <el-table-column
          prop="change"
          label="变动额">
        </el-table-column>
        <el-table-column
          prop="after"
          label="变动后">
        </el-table-column>
        <el-table-column
          width="180"
          prop="create_time"
          label="变动时间">
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
};

export default{
    title: '资产流水',
    data () {
        return {
          total: 0,
          loading: false,
            query: Object.assign({}, DEFAULT_QUERY, this.$route.query),
            type: {
              0: '充值',
              1: '投资',
              2: '投资失败',
              3: '提现',
              4: '撤销提现',
            }
        };
    },
    computed: {
      ...mapState({
        journals: 'bgJournals',
        currencies: 'currencies',
      }),
    },
    methods: {
      ...mapActions({
        getBgJournals: 'getBgJournals'
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
          this.getBgJournals(this.query).then((res) => {
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

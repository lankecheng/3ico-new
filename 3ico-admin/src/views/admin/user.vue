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
                <el-select v-model="query.vip">
                  <el-option label="所有用户" value=""></el-option>
                  <el-option label="VIP" :value="1"></el-option>
                  <el-option label="普通用户" :value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="handleSearch" type="primary">搜索</el-button>
            </el-form-item>
        </el-form>
    </div>
    <el-table
    v-loading="loading"
        :data="users"
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
          label="是否认证">
          <template scope="scope">
            {{scope.row.auth ? '是' : '否'}}
          </template>
        </el-table-column>
          <el-table-column
          prop="fullname"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="id_number"
          label="身份证">
        </el-table-column>
        <el-table-column
          label="是否VIP">
          <template scope="scope">
            {{scope.row.vip ? '是' : '否'}}
          </template>
        </el-table-column>
        <el-table-column
          label="状态">
          <template scope="scope">
            {{status[scope.row.status]}}
          </template>
        </el-table-column>
        <el-table-column
          width="180"
          prop="create_time"
          label="注册时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <template scope="scope">
              <el-button-group>
              <el-button v-if="scope.row.status == 0"
              @click="handleFreeze(scope.row, 1)" size="small">冻结</el-button>
              <el-button v-else @click="handleFreeze(scope.row, 0)" size="small">恢复</el-button>
              <el-button v-if="!scope.row.vip"
              @click="handleVip(scope.row, 1)" size="small">VIP</el-button>
              <el-button v-else @click="handleVip(scope.row, 0)" size="small">取消VIP</el-button>
              </el-button-group>
          </template>
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
    vip: '',
};


export default{
    title: '用户列表',
    data () {
        return {
          total: 0,
          loading: false,
            query: Object.assign({}, DEFAULT_QUERY, this.$route.query),
            status: {
              0: '正常',
              1: '被冻结',
            }
        };
    },
    computed: {
      ...mapState({
        users: 'users',
      }),
    },
    methods: {
      ...mapActions({
        getUsers: 'getUsers',
        freezeUser: 'freezeUser',
        vipUser: 'vipUser',
      }),
      handleFreeze(user, status) {
        this.freezeUser({
          uid: user.uid,
          status: status
        }).then(() => {
          this.$message('操作成功');
          this.initList();
        });
      },
      handleVip(user, vip) {
        this.vipUser({
          uid: user.uid,
          vip: vip
        }).then(() => {
          this.$message('操作成功');
          this.initList();
        });
      },
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
          this.getUsers(this.query).then((res) => {
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

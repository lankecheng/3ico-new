<template>
  <div>
    <!-- <div class="hd">
        <el-button type="success" @click="handleAdd">新增</el-button>
    </div> -->
    <el-table
        v-loading="loading"
        :data="projects"
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
          width="180"
          label="众筹周期">
          <template scope="scope">
            {{scope.row.begin_time}}<br/>
            - <br/>
            {{scope.row.end_time}}
          </template>
          </el-table-column>
          <el-table-column
          prop="target_amount"
          label="目标">
          </el-table-column>
          <el-table-column
          label="允许超购">
          <template scope="scope">
            {{scope.row.allow_over ? '是' : '否'}}
          </template>
          </el-table-column>
          <el-table-column
          prop="personal_max"
          label="个人限额">
          </el-table-column>
          <el-table-column
          prop="complete_amount"
          label="获取数">
          </el-table-column>
          <el-table-column
          label="状态">
          <template scope="scope">
            {{status[scope.row.status]}}
          </template>
          </el-table-column>
        <el-table-column
          label="众筹成功">
          <template scope="scope">
          <span v-if="scope.row.successful !== undefined">
            {{scope.row.successful ? '是' : '否'}}
          </span>
          </template>
        </el-table-column>
        <el-table-column
        label="操作">
          <template scope="scope">
            <el-button-group>
            <el-button v-if="scope.row.status == 0" @click="handlePublish(scope)" size="small">发布</el-button>
            <el-button v-if="[1,2].indexOf(scope.row.status) !== -1" @click="handleEnd(scope)" size="small">提前结束</el-button>
            <el-button v-if="scope.row.status == 2" @click="handleStop(scope)" size="small">终止</el-button>
            <el-button
            v-if="scope.row.successful == undefined && scope.row.status == 3"
            @click="handleSuccess(scope)" size="small">众筹成功</el-button>
            <el-button
            v-if="scope.row.successful == undefined && scope.row.status == 3"
            @click="handleFail(scope)" size="small">众筹失败</el-button>
            <el-button
            v-if="scope.row.successful == undefined && [1,2,3].indexOf(scope.row.status) !== -1"
            @click="handleDelay(scope)" size="small">延期</el-button>
            </el-button-group>
          </template>
        </el-table-column>
    </el-table>
    <el-dialog
    size="tiny"
    title="项目设置"
    :visible.sync="dialog.show"
    :modal-append-to-body="false">
        <el-form ref="form" :model="dialog.data" :rules="dialog.rules" label-width="80px">
            <!-- <el-form-item label="项目编码" prop="code">
                <el-input v-model="dialog.data.code"/>
            </el-form-item> -->
            <el-form-item label="币种" prop="currency">
                <el-select v-model="dialog.data.currency">
                      <el-option v-for="c in currencies" :label="c.text" :value="c.val"></el-option>
                  </el-select>
            </el-form-item>
            <el-form-item label="项目名称" prop="name">
                <el-input v-model="dialog.data.name"/>
            </el-form-item>
            <el-form-item label="开始时间" prop="begin_time">
                <el-date-picker
                  v-model="dialog.data.begin_time"
                  type="datetime"
                  @change="handleTime($event, 'begin_time')"
                  placeholder="选择开始时间"/>
            </el-form-item>
            <el-form-item label="结束时间" prop="end_time">
                <el-date-picker
                  v-model="dialog.data.end_time"
                  type="datetime"
                  @change="handleTime($event, 'end_time')"
                  placeholder="选择结束时间"/>
            </el-form-item>
            <el-form-item label="目标" prop="target_amount">
                <el-input v-model="dialog.data.target_amount"/>
            </el-form-item>
            <el-form-item label="个人限额" prop="personal_max">
                <el-input v-model="dialog.data.personal_max"/>
            </el-form-item>
            <el-form-item label="超额认购" prop="allow_over">
              <el-checkbox v-model="dialog.data.allow_over"/>
            </el-form-item>
        </el-form>
        <div slot="footer">
        <el-button @click="handleSubmit" type="primary">确认</el-button>
        <el-button @click="dialog.show = false">取消</el-button>
        </div>
    </el-dialog>
    <el-dialog
    size="tiny"
    title="延期"
    :visible.sync="delay.show"
    :modal-append-to-body="false">
        <el-form ref="form" :model="delay.data" :rules="delay.rules" label-width="80px">
            <el-form-item label="结束时间" prop="end_time">
                <el-date-picker
                  v-model="delay.data.end_time"
                  type="datetime"
                  @change="handleDelayTime($event, 'end_time')"
                  placeholder="选择结束时间"/>
            </el-form-item>
        </el-form>
        <div slot="footer">
        <el-button @click="handleSubmitDelay" type="primary">确认</el-button>
        <el-button @click="delay.show = false">取消</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script type="text/babel">
import {
    mapState,
    mapActions,
} from 'vuex';

const DEFAULT_DATA = {
    // code: '',
    name: '',
    begin_time: '',
    end_time: '',
    target_amount: '',
    personal_max: '',
    currency: 0,
    allow_over: false,
};

export default{
    title: '项目状态变更',
    data () {
        return {
            loading: true,
            status: {
                0: '未发布',
                1: '即将ICO',
                2: '正在ICO',
                3: 'ICO结束',
                4: '终止',
            },
            dialog: {
                show: false,
                isEdit: false,
                data: Object.assign({}, DEFAULT_DATA),
                rules: {
                    // code: [
                    //     { required: true, message: '请输入项目编码', trigger: 'blur' },
                    // ],
                    // name: [
                    //     { required: true, message: '请输入项目名称', trigger: 'blur' },
                    // ],
                    // begin_time: [
                    //     { required: true, message: '请输入开始时间', trigger: 'blur' },
                    // ],
                    // end_time: [
                    //     { required: true, message: '请输入结束时间', trigger: 'blur' },
                    // ],
                    // target_amount: [
                    //     { required: true, message: '请输入目标金额', trigger: 'blur' },
                    // ],
                    // personal_max: [
                    //     { required: true, message: '请输入个人限额', trigger: 'blur' },
                    // ],
                }
            },
            delay: {
              show: false,
              data: {
                pid: '',
                end_time: '',
              },
              rules: {}
            }
        };
    },
    computed: {
        ...mapState({
            user: 'user',
            projects: 'projects',
            currencies: 'currencies',
        }),
    },
    methods: {
        ...mapActions({
            getProjects: 'getProjects',
            createProject: 'createProject',
            modifyProject: 'modifyProject',
            publishProject: 'publishProject',
            stopProject: 'stopProject',
            successProject: 'successProject',
            failProject: 'failProject',
            delayProject: 'delayProject',
            endProject: 'endProject',
        }),
        handleDialog() {
            if (this.$refs.form) this.$refs.form.resetFields();
            this.dialog.show = true;
        },
        handlePublish(item) {
          this.$confirm('确认发布?', {
              type: 'warning'
          }).then(() => {
            this.publishProject({pid: item.row.id}).then((res) => {
                this.$message('发布成功');
                this.initList();
            });
          });
        },
        handleEnd(item) {
          this.$confirm('确认结束?', {
              type: 'warning'
          }).then(() => {
            this.endProject({pid: item.row.id}).then((res) => {
                this.$message('结束成功');
                this.initList();
            });
          });
        },
        handleStop(item) {
          this.$confirm('确认终止?', {
              type: 'warning'
          }).then(() => {
            this.stopProject({pid: item.row.id}).then((res) => {
                this.$message('终止成功');
                this.initList();
            });
          });
        },
        handleSuccess(item) {
          this.$confirm('确认成功?', {
              type: 'warning'
          }).then(() => {
            this.successProject({pid: item.row.id}).then((res) => {
                this.$message('操作成功');
                this.initList();
            });
          });

        },
        handleFail(item) {
          this.$confirm('确认失败?', {
              type: 'warning'
          }).then(() => {
            this.failProject({pid: item.row.id}).then((res) => {
                this.$message('操作成功');
                this.initList();
            });
          });

        },
        handleDelay(item) {
          this.delay.data.pid = item.row.id;
          this.delay.show = true;
        },
        handleSubmitDelay() {
            this.delayProject(this.delay.data).then((res) => {
                this.$message('操作成功');
                this.initList();
            });
        },
        handleTime(val, name) {
            this.dialog.data[name] = val;
        },
        handleDelayTime(val, name) {
            this.delay.data[name] = val;
        },
        handleSubmit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                  let pos = null;
                  const isEdit = this.dialog.isEdit;
                  if (isEdit) {
                    pos = this.modifyProject(this.dialog.data);
                  } else {
                    pos = this.createProject(this.dialog.data);
                  }
                    pos.then((res) => {
                        this.$message('操作成功');
                        if (!isEdit) {
                          this.$router.push({
                              path: '/admin/projects/detail',
                              query: {
                                  pid: res.id,
                              }
                          });
                        } else {
                          this.initList();
                        }
                    });
                    this.dialog.show = false;
                }
            });
        },
        initList() {
            this.loading = true;
            this.getProjects().then(() => {
                this.loading = false;
            }).catch(() => {
                this.loading = false;
            });
        }
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

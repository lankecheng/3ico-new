<template>
  <div>
    <div class="hd">
        <el-button type="success" @click="handleAdd">新增</el-button>
    </div>
    <el-table
        v-loading="loading"
        :data="anncs"
        stripe
        border>
        <el-table-column
          prop="title"
          label="标题">
          </el-table-column>
          <el-table-column
          prop="content"
          label="内容">
          </el-table-column>
          <el-table-column
          label="发布">
          <template scope="scope">
            {{scope.row.publish ? '是' : '否'}}
          </template>
          </el-table-column>
          <el-table-column
          prop="seq"
          label="显示顺序">
          </el-table-column>
          <el-table-column
          prop="create_time"
          label="创建时间">
          </el-table-column>
        <el-table-column
        label="操作">
          <template scope="scope">
            <el-button-group>
            <el-button
            @click="handleEdit(scope.row)" size="small">编辑</el-button>
            <el-button @click="handleDel(scope.row)" size="small">删除</el-button>
            </el-button-group>
          </template>
        </el-table-column>
    </el-table>
    <el-dialog
    size="tiny"
    title="公告设置"
    :visible.sync="dialog.show"
    :modal-append-to-body="false">
        <el-form ref="form" :model="dialog.data" :rules="dialog.rules" label-width="100px">
            <!-- <el-form-item label="项目编码" prop="code">
                <el-input v-model="dialog.data.code"/>
            </el-form-item> -->
            <el-form-item label="标题" prop="title">
                <el-input v-model="dialog.data.title"/>
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <el-input type="textarea" v-model="dialog.data.content"/>
            </el-form-item>
            <el-form-item label="发布" prop="publish">
            <el-checkbox v-model="dialog.data.publish"/>
            </el-form-item>
            <el-form-item label="显示顺序" prop="seq">
                <el-input v-model="dialog.data.seq"/>
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

const DEFAULT_DATA = {
    // code: '',
    title: '',
    content: '',
    publish: false,
    seq: '',
};

export default{
    title: '公告',
    data () {
        return {
            loading: true,
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
        };
    },
    computed: {
        ...mapState({
            anncs: 'anncs',
        }),
    },
    methods: {
        ...mapActions({
            getAnncs: 'getAnncs',
            addAnnc: 'addAnnc',
            modifyAnnc: 'modifyAnnc',
            delAnnc: 'delAnnc',
        }),
        handleDialog() {
            if (this.$refs.form) this.$refs.form.resetFields();
            this.dialog.show = true;
        },
        handleAdd() {
            this.dialog.isEdit = false;
            this.dialog.data = Object.assign({}, DEFAULT_DATA);
            this.handleDialog();
        },
        handleEdit(item) {
            this.dialog.isEdit = true;
            this.dialog.data = Object.assign({}, item);
            this.handleDialog();
        },
        handleDel(item) {
            this.$confirm('确认删除?', {
                type: 'warning'
            }).then(() => {
                this.delAnnc({
                    id: item.id
                }).then((res) => {
                    this.$message('删除成功');
                    this.initList();
                });
            });
        },
        handleSubmit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                  let pos = null;
                  const isEdit = this.dialog.isEdit;
                  if (isEdit) {
                    pos = this.modifyAnnc(this.dialog.data);
                  } else {
                    pos = this.addAnnc(this.dialog.data);
                  }
                    pos.then((res) => {
                        this.$message('操作成功');
                        this.initList();
                    });
                    this.dialog.show = false;
                }
            });
        },
        initList() {
            this.loading = true;
            this.getAnncs().then(() => {
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

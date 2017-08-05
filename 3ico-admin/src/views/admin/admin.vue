<template>
  <div>
    <div class="hd">
        <el-button type="success" @click="handleAdd">新增</el-button>
    </div>
    <el-table
        v-loading="loading"
        :data="admins"
        stripe
        border>
        <el-table-column
          prop="nick"
          label="昵称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="pwd"
          label="密码"
          width="200">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建日期">
        </el-table-column>
        <el-table-column
        width="180"
        label="操作">
          <template scope="scope">
            <el-button-group>
            <el-button @click="handleEdit(scope)" size="small">修改</el-button>
            <el-button @click="handleDel(scope)" size="small">删除</el-button>
            </el-button-group>
          </template>
        </el-table-column>
    </el-table>
    <el-dialog
    size="tiny"
    title="管理员设置"
    :visible.sync="dialog.show"
    :modal-append-to-body="false">
        <el-form ref="form" :model="dialog.data" :rules="dialog.rules" label-width="80px">
            <el-form-item label="用户名" prop="nick">
                <el-input v-if="!dialog.isEdit" v-model="dialog.data.nick"/>
                <span v-else>{{dialog.data.nick}}</span>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
                <el-input v-model="dialog.data.pwd" type="password"/>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPwd">
                <el-input v-model="dialog.data.checkPwd" type="password"/>
            </el-form-item>
        </el-form>
        <div slot="footer">
        <el-button @click="handleSubmit" type="primary">确认</el-button>
        <el-button @click="dialog.show = false">取消</el-button>
        </div>
    </el-dialog>
    <div class="title">首页图片</div>
    <banner></banner>
    <div class="title">公告</div>
    <annc></annc>
  </div>
</template>

<script type="text/babel">
import {
    mapState,
    mapActions,
} from 'vuex';

import banner from './banner';
import annc from './annc';

export default{
    title: '项目管理员',
    data () {
        const validNick = (rule, value, callback) => {
            if (!value.match(/^[\u4E00-\u9FA5a-z0-9]+$/)) {
                callback(new Error('昵称由小写英文字母、中文、数字组成!'));
            } else {
                callback();
            }
        };

        const validPass = (rule, value, callback) => {
            if (!value.match(/^[A-Za-z0-9~!@#$%^&*_-]+$/)) {
                callback(new Error('密码由英文字母、数字、符号组成!'));
            } else if (this.dialog.data.checkPwd !== '') {
                this.$refs.form.validateField('checkPwd');
            }
            callback();
        };

        const validCheckPass = (rule, value, callback) => {
            if (value !== this.dialog.data.pwd) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            loading: true,
            dialog: {
                show: false,
                isEdit: false,
                data: {
                    nick: '',
                    pwd: '',
                    checkPwd: '',
                    id: '',
                },
                rules: {
                    nick: [
                        { required: true, message: '请输入昵称', trigger: 'blur' },
                        { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' },
                        {
                            validator: validNick,
                            trigger: 'blur'
                        },
                    ],
                    pwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        {
                            validator: validPass,
                            trigger: 'blur'
                        },
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                    ],
                    checkPwd: [
                        { required: true, message: '请再次输入密码', trigger: 'blur' },
                        {
                            validator: validCheckPass,
                            trigger: 'blur',
                        },
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                    ],
                },
            },
        };
    },
    computed: {
        ...mapState({
            admins: 'admins',
        }),
    },
    methods: {
        ...mapActions({
            getAdmins: 'getAdmins',
            createAdmin: 'createAdmin',
            modifyAdmin: 'modifyAdmin',
            delAdmin: 'delAdmin',
        }),
        handleDialog() {
            if (this.$refs.form) this.$refs.form.resetFields();
            this.dialog.show = true;
        },
        handleAdd() {
            this.dialog.isEdit = false;
            this.handleDialog();
            this.dialog.data.nick = '';
        },
        handleEdit(item) {
            this.dialog.isEdit = true;
            this.handleDialog();
            this.dialog.data.nick = item.row.nick;
            this.dialog.data.id = item.row.id;
        },
        handleDel(item) {
            this.$confirm('确认删除?', {
                type: 'warning'
            }).then(() => {
                this.delAdmin({
                    id: item.row.id
                }).then(() => {
                    this.$message('删除成功');
                    this.initList();
                });
            });
        },
        handleSubmit() {
            const data = this.dialog.data;
            this.$refs.form.validate((valid) => {
                if (valid) {
                    const isEdit = this.dialog.isEdit;
                    let pos;
                    if (isEdit) {
                        pos = this.modifyAdmin({
                            id: data.id,
                            pwd: data.pwd,
                        });
                    } else {
                        pos = this.createAdmin({
                            nick: data.nick,
                            pwd: data.pwd,
                        });
                    }
                    pos.then((res) => {
                        this.$message('操作成功');
                        this.dialog.show = false;
                        this.initList();
                    }).catch(() => {
                        this.dialog.show = false;
                    });
                }
            });
        },
        initList() {
            this.loading = true;
            this.getAdmins().then(() => {
                this.loading = false;
            }).catch(() => {
                this.loading = false;
            });
        }
    },
    created() {
        this.initList();
    },
    components:{
        banner,
        annc
    }
};
</script>

<style lang="scss" scoped>
.hd{
    margin-bottom: 20px;
}
.title{
    position: relative;
    margin-bottom: 20px;
    margin-top:20px;
    padding: 0 0 16px 15px;
    font-size: 24px;
    line-height: 30px;
    color: #09aa83;
    border-bottom: 1px solid #d6d6d6;
    &:before{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 30px;
        background-color: #33c524;
    }
}
</style>

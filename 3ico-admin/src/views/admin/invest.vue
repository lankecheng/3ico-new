<template>
    <div>
        <!-- <div class="hd">

        </div> -->
        <el-table
            v-loading="loading"
            :data="investRecords"
            stripe
            border>
              <el-table-column
              prop="project_name"
              label="目标项目">
              </el-table-column>
              <el-table-column
              prop="amount"
              label="数量">
              </el-table-column>
              <el-table-column
              prop="create_time"
              label="时间">
              </el-table-column>

              <el-table-column
              label="状态">
              <template scope="scope">
              {{investStatus[scope.row.status].text}}
              </template>
              </el-table-column>
        </el-table>
        <el-dialog
        size="small"
        title="充值"
        :visible.sync="dialog.show"
        :modal-append-to-body="false">
            <el-form ref="form" :model="dialog.data" :rules="dialog.rules" label-width="80px">
                <el-form-item label="金额" prop="amount">
                    <el-input v-model.number="dialog.data.amount"/>
                </el-form-item>
                <el-form-item label="地址" prop="addr">
                    <el-input v-model="dialog.data.addr"/>
                </el-form-item>
                <!-- <el-form-item label="验证码" prop="pin_code">
                    <el-input v-model="dialog.data.pin_code" style="width: 100px;"/>
                    <el-button @click="handleGetVcode">获取验证码</el-button>
                </el-form-item> -->
            </el-form>
            <div slot="footer">
            <el-button @click="handleSubmit" type="primary">确认</el-button>
            <el-button @click="dialog.show = false">取消</el-button>
            </div>
        </el-dialog>
        <!-- <el-dialog
        title="图形验证码"
        :visible.sync="vcodeDialog.show"
        size="tiny">
            <div>
                <el-input v-model="vcodeDialog.value" style="width: 100px; vertical-align: top;"/>
                <img :src="vcodeDialog.b64" height="36" />
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleSendPinCode">确 定</el-button>
            </span>
        </el-dialog> -->
    </div>
</template>

<script>
import {
    mapState,
    mapActions,
} from 'vuex';

const DEFAULT_DATA = {
    amount: '',
    addr: '',
};

export default {
    title: '数字代币投资',
    data() {
        return {
            loading: true,
            captcha_id: '',
            dialog: {
              show: false,
              data: Object.assign({}, DEFAULT_DATA),
              rules: {
                amount: [
                    { required: true, message: '请输入金额' },
                    { type: 'number', message: '请输入正确金额' },
                ],
                addr: [
                    { required: true, message: '请输入地址', trigger: 'blur' },
                ],
                pin_code: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                ],
              },
            },
            vcodeDialog: {
                show: false,
                b64: '',
                value: '',
            },
            topUpAddr: {},
        }
    },
    computed: {
      ...mapState({
            investRecords: 'investRecords',
            investStatus: 'investStatus',
        }),
    },
    methods: {
        ...mapActions({
            getInvestRecords: 'getInvestRecords',
            getCaptcha: 'getCaptcha',
            sendPinCode: 'sendPinCode',
        }),
        handleAdd() {
            this.$refs.form && this.$refs.form.resetFields();
          this.dialog.show = true;
        },
        initList() {
            this.loading = true;
            this.getInvestRecords().then((res) => {
                this.loading = false;
            }).catch(() => {
                this.loading = false;
            });
        },
        handleGetVcode() {
            this.getCaptcha().then((res) => {
                this.vcodeDialog.b64 = 'data:image/png;base64,' + res.data.captcha;
                this.captcha_id = res.data.captcha_id;
            });
            this.vcodeDialog.show = true;
        },
        handleSendPinCode() {
            const captcha = this.vcodeDialog.value;
            if (!captcha) return;
            this.sendPinCode({
              captcha_id: this.captcha_id,
              captcha: captcha,
            }).then((res) => {
              this.vcodeDialog.show = false;
            });
        },
        handleSubmit() {
          this.$refs.form.validate((valid) => {
                if (valid) {
                    this.postTopUp(this.dialog.data).then((res) => {
                        this.$message('充值成功');
                        this.initList();
                    });
                    this.dialog.show = false;
                }
            });
        },
        handleDel(item) {
          this.$confirm('确认删除?', {
              type: 'warning'
          }).then(() => {
            this.delWithdrawAddr({
              addr_id: item.row.id
            }).then((res) => {
              this.$message('删除成功');
              this.initList();
            });
          });
        }
    },
    created() {
        this.initList();
    }
}
</script>

<style lang="scss" scoped>
.hd{
    margin-bottom: 20px;
}
</style>

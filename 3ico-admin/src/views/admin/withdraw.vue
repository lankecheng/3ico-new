<template>
    <div>
        <div class="hd">
            <el-button type="success" @click="handleAdd">提现</el-button>
        </div>
        <el-table
            v-loading="loading"
            :data="withdrawRecords"
            stripe
            border>
            <el-table-column
              label="币种">
              <template scope="scope">
              {{currencies[scope.row.currency].text}}
              </template>
              </el-table-column>
              <el-table-column
              prop="amount"
              label="数量">
              </el-table-column>
              <el-table-column
              prop="address"
              label="地址">
              </el-table-column>
          <el-table-column
          prop="final_amount"
          label="最终转出数量">
          </el-table-column>
              <el-table-column
              prop="commit_time"
              label="提交时间">
              </el-table-column>
              <el-table-column
              prop="confirm_time"
              label="确认时间">
              </el-table-column>
              <el-table-column
              label="状态">
              <template scope="scope">
              {{status[scope.row.status]}}
              </template>
              </el-table-column>
        </el-table>
        <el-dialog
        size="tiny"
        title="新增数字代币提现地址"
        :visible.sync="dialog.show"
        :modal-append-to-body="false">
            <el-form ref="form" :model="dialog.data" :rules="dialog.rules" label-width="100px">
                <el-form-item label="数量" prop="amount">
                    <el-input style="width: 100px" v-model.number="dialog.data.amount"/>
                </el-form-item>
                <el-form-item label="地址" prop="addr_id">
                    <el-select v-model="dialog.data.addr_id">
                      <el-option v-for="addr in withdrawAddrs" :label="addr.descr" :value="addr.id"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="短信验证码" prop="pin_code">
                    <el-input v-model="dialog.data.pin_code" style="width: 100px;"/>
                    <el-button @click="handleGetVcode">获取图形验证码</el-button>
                </el-form-item>
            </el-form>
            <div slot="footer">
            <el-button @click="handleSubmit" type="primary">确认</el-button>
            <el-button @click="dialog.show = false">取消</el-button>
            </div>
        </el-dialog>
        <el-dialog
        title="图形验证码"
        :visible.sync="vcodeDialog.show"
        size="tiny">
            <div>
                <el-input v-model="vcodeDialog.value" style="width: 100px; vertical-align: top;"/>
                <img @click="refreshCaptcha"
                            title="点击刷新"
                :src="vcodeDialog.b64" height="36" />
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleSendPinCode">发送短信验证码</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {
    mapState,
    mapActions,
} from 'vuex';

const DEFAULT_DATA = {
    amount: '',
    addr_id: '',
    pin_code: '',
};

export default {
    title: '数字代币提现',
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
                addr_id: [
                    { required: true, message: '请选择地址' },
                    { type: 'number', message: '请选择地址' },
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
            status: {
                0: '待处理',
                1: '审核通过',
                2: '转出成功',
                3: '撤销',
            }
        }
    },
    computed: {
      ...mapState({
            withdrawRecords: 'withdrawRecords',
            withdrawAddrs: 'withdrawAddrs',
            currencies: 'currencies',
        }),
    },
    methods: {
        ...mapActions({
            getWithdrawRecords: 'getWithdrawRecords',
            getWithdrawAddrs: 'getWithdrawAddrs',
            getCaptcha: 'getCaptcha',
            sendPinCode: 'sendPinCode',
            postWithdrawApply: 'postWithdrawApply',
        }),
        handleAdd() {
          this.dialog.show = true;
        },
        initList() {
            this.loading = true;
            this.getWithdrawAddrs();
            this.getWithdrawRecords().then(() => {
                this.loading = false;
            }).catch(() => {
                this.loading = false;
            });
        },
        handleGetVcode() {
            this.refreshCaptcha();
            this.vcodeDialog.show = true;
        },
        refreshCaptcha() {
            this.getCaptcha().then((res) => {
                this.vcodeDialog.b64 = 'data:image/png;base64,' + res.data.captcha;
                this.captcha_id = res.data.captcha_id;
            });
        },
        handleSendPinCode() {
            const captcha = this.vcodeDialog.value;
            if (!captcha) return;
            this.sendPinCode({
              captcha_id: this.captcha_id,
              captcha: captcha,
              type: 6,
            }).then((res) => {
              this.vcodeDialog.show = false;
            });
        },
        handleSubmit() {
          this.$refs.form.validate((valid) => {
                if (valid) {
                    this.postWithdrawApply(this.dialog.data).then((res) => {
                        this.$message('提现成功');
                        this.initList();
                    });
                    this.dialog.show = false;
                }
            });
        },
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

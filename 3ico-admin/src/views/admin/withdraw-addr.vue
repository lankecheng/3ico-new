<template>
    <div>
        <div class="hd">
            <el-button type="success" @click="handleAdd">新增</el-button>
        </div>
        <el-table
            v-loading="loading"
            :data="withdrawAddrs"
            stripe
            border>
              <el-table-column
              label="类型">
              <template scope="scope">
              {{currencies[scope.row.currency].text}}
              </template>
              </el-table-column>
              <el-table-column
              prop="addr"
              label="地址">
              </el-table-column>
              <el-table-column
              prop="descr"
              label="地址说明">
              </el-table-column>
            <el-table-column
            label="操作">
              <template scope="scope">
                <el-button @click="handleDel(scope)" type="danger" size="small">删除</el-button>
              </template>
            </el-table-column>
        </el-table>
        <el-dialog
        size="small"
        title="新增数字代币提现地址"
        :visible.sync="dialog.show"
        :modal-append-to-body="false">
            <el-form ref="form" :model="dialog.data" :rules="dialog.rules" label-width="100px">
                <el-form-item label="币种" prop="currency">
                    <el-select v-model="dialog.data.currency">
                      <el-option v-for="c in currencies" :label="c.text" :value="c.val"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="地址" prop="addr">
                    <el-input v-model="dialog.data.addr"/>
                </el-form-item>
                <el-form-item label="地址说明" prop="descr">
                    <el-input v-model="dialog.data.descr"/>
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
                :src="vcodeDialog.b64" style="cursor: pointer" height="36" />
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
    currency: 0,
    descr: '',
    addr: '',
    pin_code: '',
};

export default {
    title: '提现地址管理',
    data() {
        return {
            loading: true,
            captcha_id: '',
            dialog: {
              show: false,
              data: Object.assign({}, DEFAULT_DATA),
              rules: {
                // currency: [
                //     { required: true, message: '请选择币种', trigger: 'blur' },
                // ],
                // addr: [
                //     { required: true, message: '请输入地址', trigger: 'blur' },
                // ],
                // descr: [
                //     { required: true, message: '请输入地址说明', trigger: 'blur' },
                // ],
                // pin_code: [
                //     { required: true, message: '请输入验证码', trigger: 'blur' },
                // ],
              },
            },
            vcodeDialog: {
                show: false,
                b64: '',
                value: '',
            },
        }
    },
    computed: {
      ...mapState({
            withdrawAddrs: 'withdrawAddrs',
            currencies: 'currencies',
        }),
    },
    methods: {
        ...mapActions({
            getWithdrawAddrs: 'getWithdrawAddrs',
            getCaptcha: 'getCaptcha',
            sendPinCode: 'sendPinCode',
            createWithdrawAddr: 'createWithdrawAddr',
            delWithdrawAddr: 'delWithdrawAddr',
        }),
        handleAdd() {
          this.dialog.show = true;
        },
        initList() {
            this.loading = true;
            this.getWithdrawAddrs().then(() => {
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
              type: 5
            }).then((res) => {
              this.vcodeDialog.show = false;
            });
        },
        handleSubmit() {
          this.$refs.form.validate((valid) => {
                if (valid) {
                  const body = Object.assign({}, this.dialog.data, {
                    currency: Number(this.dialog.data.currency)
                  });
                    this.createWithdrawAddr(body).then((res) => {
                        this.$message('新增成功');
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

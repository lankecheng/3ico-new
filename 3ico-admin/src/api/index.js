/**
 * 全局api
 */

import io from './io';

export default {
    checkNickname(query) {
        return io.get('/api/assist/check_nick', {
            params: query
        });
    },
    checkMobile(query) {
        return io.get('/api/assist/check_mobile', {
            params: query
        });
    },
    getUserInfo(query) {
        return io.get('/api/user/profile/info', {
            params: {
                uid: localStorage.getItem('uid')
            }
        });
    },
    getCaptcha() {
        return io.get('/api/assist/captcha');
    },
    login(body) {
        return io.post('/api/auth/login', body);
    },
    logout(body) {
        return io.post('/api/auth/logout', body);
    },
    register(body) {
        return io.post('/api/auth/register', body);
    },
    getProjects(query) {
        return io.get('/api/project_admin/list', {
            params: {
                uid: localStorage.getItem('uid')
            }
        });
    },
    postProject(body) {
        body.personal_max = body.personal_max - 0;
        body.target_amount = body.target_amount - 0;

        return io.post('/api/project_admin/create', body);
    },
    modifyProject(body) {
        body.personal_max = body.personal_max - 0;
        body.target_amount = body.target_amount - 0;

        return io.post('/api/project_admin/modify_basic_info', body);
    },
    publishProject(body) {
        return io.post('/api/project_admin/publish', body);
    },
    stopProject(body) {
        return io.post('/api/project_admin/terminate', body);
    },
    endProject(body) {
        return io.post('/api/project_admin/early_done', body);
    },
    successProject(body) {
        return io.post('/api/project_admin/success', body);
    },
    failProject(body) {
        return io.post('/api/project_admin/fail', body);
    },
    delayProject(body) {
        return io.post('/api/project_admin/delay', body);
    },

    getProjectIntro(query) {
        return io.get('/api/project_admin/intro', {
            params: query
        });
    },
    postProjectIntro(body) {
        return io.post('/api/project_admin/modify_intro', body);
    },
    getAdmins() {
        return io.get('/api/bg/list_project_admin');
    },
    postAdmin(body) {
        return io.post('/api/bg/create_project_admin', body);
    },
    putAdmin(body) {
        return io.post('/api/bg/modify_project_admin', body);
    },
    delAdmin(body) {
        return io.post('/api/bg/del_project_admin', body);
    },
    postPinCode(body) {
        return io.post('/api/assist/send_pin_code', body);
    },
    postUserCertificate(body) {
        return io.post('/api/user/profile/certificate', body);
    },
    putUserPwd(body) {
        return io.post('/api/user/profile/pwd', body);
    },
    putUserTradePwd(body) {
        return io.post('/api/user/profile/trading_pwd', body);
    },
    getWithdrawAddrs() {
        return io.get('/api/user/withdrawal/addr_list');
    },
    putWithdrawAddr(body) {
        return io.post('/api/user/withdrawal/addr', body);
    },
    delWithdrawAddr(body) {
        return io.post('/api/user/withdrawal/del_addr', body);
    },
    getTopUpAddr() {
        return io.get('/api/user/top_up/addr');
    },
    postTopUp(body) {
        return io.post('/api/user/top_up/mock', body);
    },
    postAdminTopUp(body) {
        return io.post('/api/bg/top_up', body);
    },
    getTopUpRecords() {
        return io.get('/api/user/top_up/records');
    },
    getInvestRecords() {
        return io.get('/api/user/invest/records');
    },
    getWithdrawRecords() {
        return io.get('/api/user/withdrawal/records');
    },
    postWithdrawApply(body) {
        return io.post('/api/user/withdrawal/apply', body);
    },
    getFEProjects(query) {
        return io.get('/api/project_list', {
            params: query
        });
    },
    postAssistVerify() {
        return io.post('/api/assist/verify');
    },
    getUsers(query) {
        return io.get('/api/bg/users', {
            params: query
        });
    },
    getUserAccounts(query) {
        return io.get('/api/bg/user_accounts', {
            params: query
        });
    },
    getLRecords(query) {
        return io.get('/api/bg/login_logout_records', {
            params: query
        });
    },
    getAdminWithdrawRecords(query) {
        return io.get('/api/bg/withdrawal_records', {
            params: query
        });
    },
    postAdminWithdrawCancel(body) {
        return io.post('/api/bg/withdrawal_cancel', body);
    },
    postAdminWithdrawApprove(body) {
        return io.post('/api/bg/withdrawal_approve', body);
    },
    postAdminWithdrawSuccess(body) {
        return io.post('/api/bg/withdrawal_success', body);
    },
    uploadIcon(body) {
        return io.post('/api/project_admin/upload_icon', body);
    },
    uploadIcon(body) {
        return io.post('/api/project_admin/upload_wp', body);
    },
    getUserJournals(query) {
        return io.get('/api/user/journals', {
            params: query,
        });
    },
    getBgJournals(query) {
        return io.get('/api/bg/journals', {
            params: query,
        });
    },
    postFreezeUser(body) {
        return io.post('/api/bg/freeze_user', body);
    },
    postVipUser(body) {
        return io.post('/api/bg/vip_user', body);
    },
    getCoinList(query) {
        return io.get('/api/project_admin/coin_list', query);
    },
    postCoinIssue(body) {
        return io.post('/api/project_admin/coin_issue', body);
    },
    getCoinLogs(query) {
        return io.get('/api/bg/user_coin_list', query);
    },
    getUserCoinLogs(query) {
        return io.get('/api/user/coin_list', query);
    },
    getBanners() {
        return io.get('/api/bg/home_pic_list');
    },
    addBanner(body) {
        return io.post('/api/bg/upload_home_pic', body);
    },
    delBanner(body) {
        return io.post('/api/bg/del_home_pic', body);
    },
    getAnncs() {
        return io.get('/api/bg/annc_list');
    },
    addAnnc(body) {
        return io.post('/api/bg/create_annc', body);
    },
    modifyAnnc(body) {
        return io.post('/api/bg/modify_annc', body);
    },
    delAnnc(body) {
        return io.post('/api/bg/del_annc', body);
    },
    resetPwd(body) {
        return io.post('/api/auth/reset_pwd', body);
    },
    postIntroPic(body) {
        return io.post('/api/project_admin/upload_intro_pic', body);
    },
}

<template>
  <div>
  <div>建议的图片size:1918*730,最大不可超过16M</div><br/><br/>
  <el-form ref="form" label-width="100px">
  <el-form-item label="图片1">
        <el-upload
      class="banner-uploader"
      :action="API_ORIGIN + '/api/bg/upload_home_pic'"
      :show-file-list="false"
      :headers="{
            Authorization: localStorage.getItem('token'),
            'Home-Pic-Index': 0
        }"
        :with-credentials="true"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-upload="beforeIconUpload"
        :on-success="handleIconSuccess">
      <img v-if="banners[0]" :src="banners[0]" class="banner">
      <i v-else class="el-icon-plus banner-uploader-icon"></i>
    </el-upload>
    <el-button size="small" @click="handleDel($event, 0)">删除</el-button>
    </el-form-item>
    <el-form-item label="图片2">
        <el-upload
      class="banner-uploader"
      :action="API_ORIGIN + '/api/bg/upload_home_pic'"
      :show-file-list="false"
      :headers="{
            Authorization: localStorage.getItem('token'),
            'Home-Pic-Index': 1
        }"
        :with-credentials="true"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-upload="beforeIconUpload"
        :on-success="handleIconSuccess">
      <img v-if="banners[1]" :src="banners[1]" class="banner">
      <i v-else class="el-icon-plus banner-uploader-icon"></i>
    </el-upload>
    <el-button size="small" @click="handleDel($event, 1)">删除</el-button>
    </el-form-item>
    <el-form-item label="图片3">
        <el-upload
      class="banner-uploader"
      :action="API_ORIGIN + '/api/bg/upload_home_pic'"
      :show-file-list="false"
      :headers="{
            Authorization: localStorage.getItem('token'),
            'Home-Pic-Index': 2
        }"
        :with-credentials="true"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-upload="beforeIconUpload"
        :on-success="handleIconSuccess">
      <img v-if="banners[2]" :src="banners[2]" class="banner">
      <i v-else class="el-icon-plus banner-uploader-icon"></i>
    </el-upload>
    <el-button size="small" @click="handleDel($event, 2)">删除</el-button>
    </el-form-item>
    <el-form-item label="图片4">
        <el-upload
      class="banner-uploader"
      :action="API_ORIGIN + '/api/bg/upload_home_pic'"
      :show-file-list="false"
      :headers="{
            Authorization: localStorage.getItem('token'),
            'Home-Pic-Index': 3
        }"
        :with-credentials="true"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-upload="beforeIconUpload"
        :on-success="handleIconSuccess">
      <img v-if="banners[3]" :src="banners[3]" class="banner">
      <i v-else class="el-icon-plus banner-uploader-icon"></i>
    </el-upload>
    <el-button size="small" @click="handleDel($event, 3)">删除</el-button>
    </el-form-item>
    <el-form-item label="图片5">
        <el-upload
      class="banner-uploader"
      :action="API_ORIGIN + '/api/bg/upload_home_pic'"
      :show-file-list="false"
      :headers="{
            Authorization: localStorage.getItem('token'),
            'Home-Pic-Index': 4
        }"
        :with-credentials="true"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-upload="beforeIconUpload"
        :on-success="handleIconSuccess">
      <img v-if="banners[4]" :src="banners[4]" class="banner">
      <i v-else class="el-icon-plus banner-uploader-icon"></i>
    </el-upload>
    <el-button size="small" @click="handleDel($event, 4)">删除</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script type="text/babel">
import { VueEditor } from 'vue2-editor';
import {
    mapState,
    mapActions,
} from 'vuex';

export default{
    title: '首页图片',
    components: {
        VueEditor,
    },
    data() {
        return {
            API_ORIGIN: API_ORIGIN,
            localStorage: localStorage,
            banners: []
        }
    },
    computed: {
    },
    methods: {
        ...mapActions({
            getBanners: 'getBanners',
            delBanner: 'delBanner',
        }),
        beforeIconUpload() {
            // console.log(arguments);
        },
        handlePreview(file) {
            // console.log(arguments);
        },
        handleRemove(file) {
            // console.log(arguments);
        },
        handleIconSuccess(res, file) {
          this.banners.splice(res.index, 1, res.pic);
        },
        handleDel(e, index) {
          if (this.banners[index]) {
            this.$confirm('确认删除?', {
                type: 'warning'
            }).then(() => {
              this.delBanner({
                index: index
              }).then((res) => {
                this.$message('删除成功');
                this.banners.splice(res.index, 1, '');
              });
            });
          }
        }
    },
    created() {
        this.getBanners().then((res) => {
            this.banners = res.pics;
        });
    }
};
</script>

<style lang="scss">
.banner-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .banner-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .banner-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 320px;
    height: 160px;
    line-height: 160px;
    text-align: center;
  }
  .banner {
    width: 320px;
    height: 160px;
    display: block;
  }
</style>

<template>
  <a-row class="upload-pic">
    <a-upload
        list-type="picture"
        class="upload-list-inline"
        :multiple="false"
        :customRequest="myUpload"
        :showUploadList="true"
        accept="image/jpeg,image/jpg,image/png"
    >
      <a-button>
        <a-icon type="upload"/>
        选择图片
      </a-button>
    </a-upload>
    <a-form-item label="name">
      <a-input v-model="picInfo.picBase.picName"/>
    </a-form-item>
    <a-form-item label="Description">
      <a-input v-model="picInfo.picDtl.picDescription"/>
    </a-form-item>
    <a-button @click="mySummit()" style="float: right; width: 300px">
      上传
    </a-button>
  </a-row>
</template>

<script>
export default {
  data() {
    return {
      pic: {},
      picInfo: {
        picBase: {
          picAuthorId: null,
          picName: null,
        },
        picDtl: {
          picDescription: null,
          picArea: null,
          picDevice: null,
          picEdit: null,
        }
      }
    };
  },
  computed: {
    userId() {
      return this.$store.state.userId
    }
  },
  methods: {
    myUpload: function (options) {
      this.pic = options.file
    },
    mySummit: function () {
      this.picInfo.picBase.picAuthorId = this.userId
      // console.log("userId:" + this.userId)
      let formData = new FormData()
      formData.append("bigPicDTO", JSON.stringify(this.picInfo))
      formData.append("file", this.pic)
      this.$axios.post("/api/pic/add", formData
      ).then(res => {
        // console.log("res:" + res.data.msg)
        this.$router.push({ name: 'User' })
      })
    },
  }
};
</script>
<style scoped>
.upload-pic {
  padding: 20px;
}
</style>
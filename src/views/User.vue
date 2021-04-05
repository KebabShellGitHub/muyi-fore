<template>
  <div>
    <a-row>
      <a-col :span="8" style="text-align: center">
        <a-avatar :size="256" :src="'/api/pic/' + userDtl.userAvatarUrl"
                  style="border: 2px solid cornflowerblue"/>
      </a-col>
      <a-col :span="10">
        <a-row>
          <h1 style="font-size: 30px">{{ userBase.userName }}</h1>
        </a-row>
        <a-row>
          <p style="word-break: break-word">{{ userBase.userIntroduction }}</p>
        </a-row>
      </a-col>
      <a-col :span="6">
        <h2>sort</h2>
        <a-button v-for="item in 3" :key="item" class="sort-btn">test</a-button>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="12" style="padding: 20px">
        <a-card hoverable title="title">
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <a-button v-if="ownFlag" style="float: right">test</a-button>
        </a-card>
      </a-col>
      <a-col :span="12" style="padding: 20px">
        <a-button @click="toUpload()">添加图片</a-button>
      </a-col>
    </a-row>
    <a-card v-for="item in 6" :key="item" hoverable style="width: 300px" class="card">
      <img slot="cover" alt="example" src="../assets/fly.jpg"/>
      <a-card-meta title="pic name" description="pic desc"/>
    </a-card>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      userBase: {
        userId: 0,
        userName: '',
      },
      userDtl: {
        userId: 0,
        userAvatarUrl: ''
      }
    }
  },
  created() {
    this.getUser()
  },
  computed: {
    nowUserId() {
      return this.$route.params.id
    },
    // 判断是不是自己
    ownFlag() {
      let userId = sessionStorage.getItem("userId")
      // console.log("userId:" + userId)
      if (typeof (this.nowUserId) === "undefined") {
        return true;
      }
      // console.log("nowUserId:" + this.nowUserId)
      return this.nowUserId === userId;
    }
  },
  methods: {
    getUser: function () {
      this.$axios.get("/api/user/get",
          {
            params: {
              userId: this.nowUserId
            },
            headers: {
              Token: sessionStorage.getItem("Token")
            }
          })
          .then(response => {
            this.userBase = response.data.data.userBase;
            this.userDtl = response.data.data.userDtl;
          })
          .catch(error => {
            console.log("error")
          })
    },
    toUpload() {
      this.$router.push({name: 'Upload'})
    }
  }
};
</script>

<style scoped>
.sort-btn {
  margin-right: 10px;
}

.card {
  display: inline-block;
  margin: 20px;
  overflow: auto;
}
</style>

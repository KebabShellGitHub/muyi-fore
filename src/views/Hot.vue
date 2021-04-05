<template>
  <div style="text-align: center">
    <a-card v-for="item in pics" :key="item.pic.id" hoverable style="width: 400px" class="card">
      <img slot="cover" alt="example"
           :src="'/api/pic/' + item.pic.picThumbUrl"
           @click="toPicDetail(item.pic.id)"/>
      <a-card-meta :title="item.author.userName" :description="item.author.userIntroduction">
        <a-avatar
            slot="avatar"
            :src="'/api/pic/' + item.author.userAvatarThumbUrl"
            @click="toAuthorDetail(item.author.userId)"
        />
      </a-card-meta>
      <div style="margin-top: 20px;">
        <div class="carPart">
          <a-icon type="eye"/>
          {{ item.statistic.hitCount }}
        </div>
        <div class="carPart">
          <a-icon type="file-text"/>
          {{ item.statistic.commCount }}
        </div>
        <div class="carPart">
          <a-icon type="like"/>
          {{ item.statistic.likeCount }}
        </div>
      </div>
    </a-card>
    <div>
      <a-button @click="getMorePics">more</a-button>
    </div>

  </div>
</template>

<script>
export default {
  name: "Hot",
  data() {
    return {
      pageNum: 1,
      count: 6,
      pics: []
    }
  },
  created() {
    this.getPics();
  },
  methods: {
    // 拿到count数目的图片
    getPics() {
      this.$axios.get("/api/pic/hot/all?pageNum=" + this.pageNum + "&count=" + this.count)
          .then(res => {
            this.pics = res.data.data
          })
    },
    // 拿到更多图片
    getMorePics() {
      this.pageNum++;
      this.$axios.get("/api/pic/hot/all?pageNum=" + this.pageNum + "&count=" + this.count)
          .then(res => {
            this.pics.push.apply(this.pics, res.data.data);
          })
    },
    // 跳转到具体图片页面
    toPicDetail(picId) {
      console.log(picId);
      this.$router.push({
        name: 'PicDetail',
        params: {
          id: picId
        }
      })
    },
    // 跳转到作者页面
    toAuthorDetail(authorId) {
      console.log(authorId);
      this.$router.push({
        name: 'User',
        params: {
          id: authorId
        }
      })
    }
  }
};
</script>

<style scoped>
.card {
  display: inline-block;
  margin: 20px;
  overflow: auto;
}

.ant-card-cover img {
  object-fit: cover;
  height: 250px;
}

.carPart {
  display: inline;
  margin: 10px;
}
</style>

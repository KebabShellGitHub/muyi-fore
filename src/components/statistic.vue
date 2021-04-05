<template>
  <a-row>
    <a-col :span="8" class="part">
      <a-icon style="font-size: 25px" type="like"/>
      <h2> {{ this.statistics.likeCount }}</h2>
    </a-col>
    <a-col :span="8" class="part">
      <a-icon style="font-size: 25px" type="file-text"/>
      <h2> {{ this.statistics.commentCount }}</h2>
    </a-col>
    <a-col :span="8" class="part">
      <a-icon style="font-size: 25px" type="eye"/>
      <h2> {{ this.statistics.hitCount }}</h2>
    </a-col>
  </a-row>
</template>

<script>
// 图片的统计数据
export default {
  name: "statistic",
  data() {
    return {
      statistics: {
        hits: 0,
        likes: 0,
        comm: 0,
      }
    }
  },
  props: ["picId"],
  created() {
    // console.log("picId:" + this.picId);
    this.getPicStatistic(this.picId);
  },
  methods: {
    getPicStatistic(picId){
      this.$axios.get("/api/pic/statistic", {
        params: {
          picId: picId
        }
      }).then(res => {
        this.statistics = res.data.data
      })
    },
  }
}
</script>

<style scoped>
.part {
  text-align: center;
}
</style>
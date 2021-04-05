<template>
  <div>
    <a-row>
      <a-col :span="20" style="text-align: center">
        <a-card v-for="item in pics" :key="item.pic.id" hoverable style="width: 250px" class="card">
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
        </a-card>
        <div>
          <a-button @click="getMorePics(1)">more</a-button>
        </div>
      </a-col>
      <a-col :span="4">
        <div class="sortPart">
          <h1>分类</h1>
          <a-checkbox-group
              v-model="sortValue"
              :options="sortNames"
              @change="onChange"
          />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: "Category",
  data() {
    return {
      pageNum: 1,
      count: 3,
      pics: [],
      sortNames: ['t1', 't2'],
      sortValue: [],
    }
  },
  created() {
    let sortName = this.$route.params.sortName;
    let sortNames = [];
    if (typeof (sortName) == 'undefined') {
      // 从菜单栏过来的，没有带分类信息
      console.log("undefined")
      // 那就请求并渲染全部热门数据
    } else {
      // 有带分类信息
      console.log("sortName:" + sortName)
      sortNames.push(sortName);
      // 请求并渲染此分类集合的热门数据
    }
    this.getPics(sortNames).then(res => {
      this.pics = res.data.data
    });
  },
  methods: {
    // 分类集合变化时
    onChange(checkedValues) {
      // console.log('checked = ', checkedValues);
      // console.log('value = ', this.sortValue);
      // 通过选中的分类集合来请求图片
      this.getPics(this.sortValue).then(res => {
        this.pics = res.data.data
      });
    },
    // 拿到分类集合的count数目的图片
    getPics(sortName) {
      // 根据分类id来拿到这个分类的4张热门图片
      return this.$axios.get("/api/pic/hm/sort?sortName="
          + sortName.join() + "&pageNum=1&count=" + this.count)
    },
    // 拿到更多图片
    getMorePics() {
      this.pageNum++;
      this.$axios.get("/api/pic/hm/sort?pageNum=" + this.pageNum + "&count=" + this.count)
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
  },
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

.sortPart {
  position: fixed;
  width: 200px;
  margin-top: 20px;
  padding: 30px 20px 80px 20px;
  border: 2px solid gray;
  border-radius: 10px;
}
</style>

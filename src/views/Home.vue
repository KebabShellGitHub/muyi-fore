<template>
  <div>
    <div>
      <a-carousel autoplay>
        <!--     car:carousel走马灯     -->
        <div class="gradient">
          <!--    gradient:渐变    -->
          <img class="car-img" :src="'/api/pic/' + carFirstPic.picUrl" @click="toPicDetail(carFirstPic.picId)"/>
        </div>
        <img v-for="item in carPics" :key="item.picId" class="car-img" :src="'http://localhost:8080/pic/' + item.picUrl"
             @click="toPicDetail(item.picId)"/>
      </a-carousel>
    </div>
    <!--  cpn:component  -->
    <div class="cpn-title">
      <h1>推荐</h1>
      <a-button type="link" size="small"
      >更多
        <a-icon type="right"/>
      </a-button>
    </div>
    <div class="all-card">
      <a-card v-for="item in recPics" :key="item.picId" hoverable style="width: 300px" class="card">
        <img slot="cover" alt="example" :src="item.thumbPic" @click="toPicDetail(item.picId)"/>
        <a-card-meta :title="item.authorName" :description="item.authorDesc">
          <a-avatar
              slot="avatar"
              :src="item.thumbAvatar"
              @click="toAuthorDetail(item.authorId)"
          />
        </a-card-meta>
      </a-card>
    </div>
    <div class="cpn-title">
      <h1>今日热门</h1>
      <a-button type="link" size="small"
      >更多
        <a-icon type="right"/>
      </a-button>
    </div>
    <div class="all-card">
      <a-card v-for="item in hotPics" :key="item.pic.id" hoverable style="width: 300px" class="card">
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
    </div>
    <div class="cpn-title">
      <h1>{{ hotSorts[0].sortName }}</h1>
      <a-button type="link" size="small" @click="toCategory(hotSorts[0].sortName)"
      >更多
        <a-icon type="right"/>
      </a-button>
    </div>
    <div class="all-card">
      <a-card v-for="item in hotSort1Pics" :key="item.pic.id" hoverable style="width: 300px" class="card">
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
    </div>
    <div class="cpn-title">
      <h1>{{ hotSorts[1].sortName }}</h1>
      <a-button type="link" size="small"
      >更多
        <a-icon type="right"/>
      </a-button>
    </div>
    <div class="all-card">
      <a-card v-for="item in hotSort2Pics" :key="item.pic.id" hoverable style="width: 300px" class="card">
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
    </div>
    <div class="cpn-title">
      <h1>{{ hotSorts[2].sortName }}</h1>
      <a-button type="link" size="small"
      >更多
        <a-icon type="right"/>
      </a-button>
    </div>
    <div class="all-card">
      <a-card v-for="item in hotSort3Pics" :key="item.pic.id" hoverable style="width: 300px" class="card">
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
    </div>
    <div class="cpn-title">
      <h1>热门摄影师</h1>
      <a-button type="link" size="small"
      >更多
        <a-icon type="right"/>
      </a-button>
    </div>
    <div class="all-card-er">
      <a-card v-for="item in hotAuthors" :key="item.userId" hoverable style="width: 300px" class="card"
              @click="toAuthorDetail(item.userId)">
        <a-card-meta :title="item.userName" :description="item.userIntroduction">
          <a-avatar
              slot="avatar"
              :src="'/api/pic/' + item.userAvatarThumbUrl"
          />
        </a-card-meta>
      </a-card>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      // 走马灯第一张图片
      carFirstPic: {},
      // 走马灯剩下的图片
      carPics: [],
      // 推荐的4个图片
      recPics: [],
      // 今日热门的4个图片
      hotPics: [],
      // 3个热门分类
      hotSorts: [
        {
          id: 0,
          sortName: 'sort'
        },
        {
          id: 1,
          sortName: 'sort'
        },
        {
          id: 2,
          sortName: 'sort'
        },
      ],
      // 热门分类1的4个图片
      hotSort1Pics: [],
      // 热门分类2的4个图片
      hotSort2Pics: [],
      // 热门分类3的4个图片
      hotSort3Pics: [],

      // 摄影师
      // author: {
      //   id: 0,
      //   name: '',
      //   avatar: ''
      // },
      // 热门摄影师的4个
      hotAuthors: []
    };
  },
  created() {
    this.getCarPics()
    this.getRecPics()
    this.getHotPics()
    this.getHotSorts();
    this.getHotAuthor()
  },
  methods: {
    // 拿到走马灯的图片
    async getCarPics() {
      // axios请求拿到 getCarPics
      this.$axios.get("/api/pic/hm/car?count=" + 5)
      .then(res => {
        this.carPics = res.data.data
        this.carFirstPic = this.carPics.shift()
      })
    },
    // 拿到推荐图片
    getRecPics() {
      this.recPics = [
        {
          picId: 1,
          thumbAvatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          thumbPic: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
          authorName: 'author',
          authorId: 0,
          authorDesc: 'description'
        },
        {
          picId: 2,
          thumbAvatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          thumbPic: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
          authorName: 'author',
          authorId: 0,
          authorDesc: 'description'
        },
        {
          picId: 3,
          thumbAvatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          thumbPic: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
          authorName: 'author',
          authorId: 0,
          authorDesc: 'description'
        },
        {
          picId: 4,
          thumbAvatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          thumbPic: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
          authorName: 'author',
          authorId: 0,
          authorDesc: 'description'
        },
      ];
    },
    // 拿到热门图片
    getHotPics() {
      this.$axios.get("/api/pic/hm/hot?count=" + 5)
      .then(res => {
        this.hotPics = res.data.data
      }).catch(error => {
        console.log("getHotPics error:" + error.message)
      })
    },
    // 拿到3个热门分类信息，再拿到分类下的热门图片
    getHotSorts() {
      this.getHotSortPics(["t1"]).then(res => { this.hotSort1Pics = res.data.data });
      this.getHotSortPics(["t2"]).then(res => { this.hotSort2Pics = res.data.data });
      this.getHotSortPics([]).then(res => { this.hotSort3Pics = res.data.data });
    },
    // 拿到某个分类的4张热门图片
    getHotSortPics(sortName) {
      // 根据分类id来拿到这个分类的4张热门图片
      return this.$axios.get("/api/pic/hm/sort?sortName="
          + sortName.join() + "&pageNum=1&count=4")
    },
    // 拿到4个热门摄影师的信息
    getHotAuthor() {
      this.$axios.get("/api/user/hm/hot?count=4")
      .then(res => {
        this.hotAuthors = res.data.data
      })
    },
    // 跳转到具体图片页面
    toPicDetail(picId) {
      // console.log(picId);
      this.$router.push({
        name: 'PicDetail',
        params: {
          id: picId
        }
      })
    },
    // 跳转到作者页面
    toAuthorDetail(authorId) {
      // console.log(authorId);
      this.$router.push({
        name: 'User',
        params: {
          id: authorId
        }
      })
    },
    // 跳转到分类页面
    toCategory(sortName){
      this.$router.push({
        name: 'Category',
        params: {
          sortName: sortName
        }
      })
    }
  }
};
</script>

<style scoped>
.ant-carousel >>> .slick-slide {
  height: 550px;
}

.gradient::before {
  background: rgba(0, 0, 0, 0) linear-gradient(transparent, #1a1c1e) repeat scroll 0 0;
  bottom: 0;
  content: "";
  display: block;
  height: 20%;
  left: 0;
  position: absolute;
  width: 100%;
  z-index: 10;
}

.car-img {
  height: 550px;
  width: 100%;
  object-fit: cover;
}

.cpn-title {
  width: 20%;
  margin-top: 20px;
  border-bottom: 2px solid #736991;
  padding-left: 10px;
}

.cpn-title h1 {
  display: inline-block;
}

.card {
  display: inline-block;
  margin: 20px;
  overflow: auto;
}

.ant-card-cover img {
  object-fit: cover;
  height: 150px;
}
</style>

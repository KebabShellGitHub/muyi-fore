<template>
  <div>
    <!--  大图  -->
    <div>
      <img style="width: 100%" :src="picDetail.picDtl.picUrl ? ('/api/pic/' + picDetail.picDtl.picUrl) : ''"/>
    </div>
    <!--图片详细数据-->
    <div class="pic-dtl">
      <a-row>
        <a-col :span="6">拍摄地点 - {{ picDetail.picDtl.picArea ? picDetail.picDtl.picArea : 'no info' }}</a-col>
        <a-col :span="6">拍摄日期 - {{ picDetail.picBase.gmtCreate ? picDetail.picBase.gmtCreate : 'no info' }}</a-col>
        <a-col :span="6">拍摄设备 - {{ picDetail.picDtl.picDevice ? picDetail.picDtl.picDevice : 'no info' }}</a-col>
        <a-col :span="6">编辑软件 - {{ picDetail.picDtl.picEdit ? picDetail.picDtl.picEdit : 'no info' }}</a-col>
      </a-row>
    </div>
    <!--图片名+描述-->
    <div class="pic-description">
      <h1>{{ picDetail.picBase.picName ? picDetail.picBase.picName : 'no info' }}</h1>
      <p class="pic-description-font">
        {{ picDetail.picBase.picDescription ? picDetail.picBase.picDescription : 'no info' }}
      </p>
    </div>
    <!--  作者部分  -->
    <div class="author">
      <a-row>
        <!--作者头像-->
        <a-col :span="4" style="text-align: center">
          <a-avatar :size="128" :src="'/api/pic/' + authorBase.userDtl.userAvatarUrl"
                    style="border: 2px solid cornflowerblue"/>
        </a-col>
        <!--作者简介-->
        <a-col :span="16" style="padding-left: 20px; padding-right: 20px;">
          <h1>{{ authorBase.userBase.userName ? authorBase.userBase.userName : 'no info' }}</h1>
          <p style="font-size: 25px; word-break: break-word">
            {{ authorBase.userBase.userIntroduction ? authorBase.userBase.userIntroduction : 'no info' }}
          </p>
        </a-col>
        <!--图片统计数据-->
        <a-col :span="4">
          <!--数据-->
          <a-row>
            <statistic :pic-id="picDetail.picBase.id"/>
          </a-row>
          <!--分类-->
          <a-row>
            <a-button v-for="item in 5" :key="item" class="sort-btn">sort</a-button>
          </a-row>
        </a-col>
      </a-row>
    </div>
    <!--分类部分-->
    <div class="comm" v-if="commentsFlag">
      <!--“分类”标题-->
      <h1 style="margin: 40px">Comments</h1>
      <!--v-for评论-->
      <div class="single-comm" v-for="item in this.comments" :key="item.commentBase.id">
        <a-row>
          <!--评论人-->
          <a-col :span="2" style="text-align: center; border-right: 1px solid gray">
            <!--头像-->
            <a-row>
              <a-avatar size="large" :src="'/api/pic/' + item.userBase.userAvatarThumbUrl"
                        style="border: 2px solid cornflowerblue"/>
            </a-row>
            <!--用户名-->
            <a-row style="text-align: center; margin-top: 10px">
              {{ item.userBase.userName }}
            </a-row>
          </a-col>
          <!--评论内容-->
          <a-col :span="22" style="padding-left: 50px">
            <!--内容-->
            <a-row style="font-size: 20px; word-break: break-word">
              {{ item.commentBase.commentContent }}
            </a-row>
            <!--评论时间-->
            <a-row style="text-align: right">
              {{ item.commentBase.gmtCreate }}
            </a-row>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="add-comm">
      <a-row>
        <a-col :span="16">
          <a-comment>
            <div slot="content">
              <a-form-item>
                <a-textarea :rows="4" />
              </a-form-item>
              <a-form-item>
                <a-button html-type="submit" type="primary">
                  Add Comment
                </a-button>
              </a-form-item>
            </div>
          </a-comment>
        </a-col>
        <a-col :span="8">
          <div class="add-comm-other">
            <a-row>
              <a-col :span="12">
                二维码
              </a-col>
              <a-col :span="12">
                二维码
              </a-col>
            </a-row>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import statistic from "@/components/statistic";

export default {
  name: "PicDetail",
  data() {
    return {
      pageNums: 1,
      picBase: {},
      picDetail: {},
      authorBase: {},
      sorts: [],
      statistics: {},
      comments: [],
      commentsFlag: false,
      commentCount: 4,
      commentPageNum: 1
    }
  },
  components: {
    statistic
  },
  created() {
    let picId = this.$route.params.id;
    this.picDetail.id = picId;
    // console.log('id:' + this.$route.params.id);

    // 通过图片id拿到图片详细信息
    this.getPicDtl(picId)
    .then(res => {
      this.picDetail = res.data.data

      let userId = this.picDetail.picBase.picAuthorId
      this.getAuthor(userId).then(res => {
        this.authorBase = res.data.data
      })
    })
    // 通过图片id拿到所属分类
    let sorts = [];
    // 通过图片id拿到前N条评论
    this.getComm(picId)
    .then(res => {
      this.comments = res.data.data
      this.commentsFlag = true
    })

  },
  methods: {
    getPicDtl(picId){
      return this.$axios.get("/api/pic/one?picId=" + picId)
    },
    getAuthor(userId){
      return this.$axios.get("/api/user/get", {
        params: {
          userId: userId
        }
      })
    },
    /**
     * 通过图片id拿到前count条评论
     * @param picId
     * @param count
     */
    getComm(picId) {
      return this.$axios.get("/api/cm/get", {
        params: {
          picId: picId,
          pageNum: this.commentPageNum,
          count: this.commentCount
        }
      })
    },
    /**
     * 通过图片id拿到更多count条评论
     * @param picId
     * @param count
     * @param pageNums
     */
    getMoreComm(picId, count, pageNums) {
      this.pageNums++;
      let moreComm = [];
      this.comments.push.apply(this.comments, moreComm);
    }
  }
};
</script>

<style scoped>
.pic-dtl {
  background-color: lightgray;
  padding: 15px;
  word-break: break-word;
  font-size: 10px;
}

.pic-description {
  background-color: antiquewhite;
  padding: 20px;
  word-break: break-word;
}
.pic-description-font{
  font-size: 20px;
}
.author {
  margin-top: 20px;
  /*border: 1px solid gray;*/
  padding: 10px;
  border-radius: 5px;
}

/*.statistic {*/
/*  margin-top: 20px;*/
/*  padding: 10px 10px 10px 50px;*/
/*  !*border: 1px solid gray;*!*/
/*  border-radius: 5px;*/
/*}*/
.comm {
  margin-top: 20px;
  padding: 20px 40px 20px 40px;
}

.single-comm {
  margin-bottom: 10px;
  padding: 20px 40px 20px 40px;
  /*border: 1px solid gray;*/
}

.sort-btn {
  margin: 5px;
}
.add-comm{
  padding: 20px;
}
.add-comm-other{
  margin: 30px;
  /*background-color: lightslategray;*/
  text-align: center;
}
</style>

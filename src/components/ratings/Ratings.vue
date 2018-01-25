<<template>
  <div class="ratings" ref="ratingView">
    <div class="ratings-wrapper" >
      <div class="overview">
        <div class="overview-left">
          <div class="comment-score">
            <p class="score">{{ratings.comment_score}}</p>
            <p class="text">商家评分</p>
          </div>
          <div class="other-score">
            <div class="quality-score item">
              <span class="text">口味</span>
              <Star :score="ratings.quality_score" class="star"></Star>
              <span class="score">{{ratings.quality_score}}</span>
            </div>
            <div class="pack-score item">
              <span class="text">包装</span>
              <Star :score="ratings.pack_score" class="star"></Star>
              <span class="score">{{ratings.pack_score}}</span>
            </div>
          </div>
        </div>
        <div class="overview-right">
          <div class="delivery-score">
            <p class="score">{{ratings.delivery_score}}</p>
            <p class="text">配送评分</p>
          </div>
        </div>
      </div>

      <Split></Split>

      <div class="content">
        <div class="rating-select" v-if="ratings.tab">
          <span class="item" @click="selectTypeFn(2)" :class="{'active':selectType==2}">
            {{ratings.tab[0].comment_score_title}}
          </span>
          <span class="item" @click="selectTypeFn(1)" :class="{'active':selectType==1}">
            {{ratings.tab[1].comment_score_title}}
          </span>
          <span class="item" @click="selectTypeFn(0)" :class="{'active':selectType==0}">
            <img src="./icon_sub_tab_dp_normal@2x.png" v-show="selectType!=0"/>
            <img class="active" src="./icon_sub_tab_dp_highlighted@2x.png" v-show="selectType==0"/>
            {{ratings.tab[2].comment_score_title}}
            </span>
        </div>
        <div class="labels-view">
          <span v-for="item in ratings.labels" class="item" :class="{'highlight':item.label_star>0}">
            {{item.content}}{{item.label_count}}
          </span>
        </div>
        <ul class="rating-list">
          <li v-for="rating in selectComments" class="rating-item">
            <div class="rating-header">
              <img :src="rating.user_pic_url" class="icon" v-if="rating.user_pic_url"/>
              <img src="./anonymity.png" class="icon" v-if="!rating.user_pic_url"/>
            </div>
            <div class="rating-main">
              <div class="user">
                {{rating.user_name}}
              </div>
              <div class="time">
                {{formatDate(rating.comment_time)}}
              </div>
              <div class="star-wrapper">
                <span class="text">评分</span>
                <Star :score="rating.order_comment_score" class="star"></Star>
              </div>
              <div class="contents" v-if="rating.comment" v-html="commentStr(rating.comment)">
                
              </div>
              <div class="img-wrapper" v-if="rating.comment_pics.length">
                <img v-for="img in rating.comment_pics" :src="img.thumbnail_url"/>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Star from 'components/star/Star';
  import Split from 'components/split/Split';
  import BScroll from 'better-scroll';

  const ALL = 2; // all
  const PICTURE = 1;
  const COMMENT = 0;

  export default {
    data() {
      return {
        ratings: {},
        selectType: ALL
      }
    },

    components: {
      Star,
      Split,
      BScroll
    },

    created() {
      const that = this;

      this.$axios.get('/api/ratings')
      .then((response) => {
        const dataSource = response.data;
        if (dataSource.code === 0) {
          that.ratings = dataSource.data;

          this.$nextTick(() => {
            if (!that.scroll) {
              that.scroll = new BScroll(that.$refs.ratingView, {
                click: true
              });
            } else {
              that.scroll.refresh();
            }
          })
        }
      })
      .catch((err) => {

      });
    },

    methods: {
      selectTypeFn(type) {
        this.selectType = type;
      },

      formatDate(time) {
        let newDate = new Date(time * 1000);

        let year = newDate.getFullYear().toString();
        let month = newDate.getMonth() + 1;
        let date = newDate.getDate();

        if (month < 10) {
          month = '0' + month;
        }
        if (date < 10) {
          date = '0' + date;
        }

        return `${year}.${month}.${date}`;
      },

      commentStr(content) {
        let rel = /#[^#]+#/g;

        return content.replace(rel, '<i>$&</i>')
      }
    },

    computed: {
      selectComments() {
        if (this.selectType == ALL) {
          return this.ratings.comments;
        } else if (this.selectType == PICTURE) {
          return this.ratings.comments.filter((item) => {
            return item.comment_pics.length > 0;
          });
        } else {
          return this.ratings.comments_dp.comments;
        }
      }
    }
  }
</script>

<style>
  @import url('ratings.css');
</style>

 <<template>
  <div class="header">
      
      <div class="top-wrapper">
        <div class="back-wrapper">
          <span class="icon-arrow_lift"></span>
        </div>

        <form class="search-wrapper">
          <span class="search-icon"></span>
          <input class="search-bar" type="text" placeholder="搜索店内商品" />
        </form>

        <div class="more-wrapper">
          <a class="spelling-bt" href="#">拼单</a>
          <div class="more-bt">
            <i class="c-radius"></i>
            <i class="c-radius"></i>
            <i class="c-radius"></i>
          </div>
        </div>

        <div class="bg-wrapper" :style="content_bg">
          <!-- <img :src="poiInfo.head_pic_url" /> -->
        </div>

      </div>

      <div class="content-wrapper">
        <div class="icon" :style="head_bg">
          <!-- <img :src="poiInfo.pic_url" /> -->
        </div>
        <div class="name">
          <h3>{{poiInfo.name}}</h3>
        </div>
        <div class="collect">
          <img src="../../../resource/img/star.png" />
          <span>收藏</span>
        </div>
      </div>

      <div class="bulletin-wrapper">
        <img class="icon" v-if="poiInfo.discounts2" :src="poiInfo.discounts2[0].icon_url" />
        <span class="text" v-if="poiInfo.discounts2">{{poiInfo.discounts2[0].info}}</span>
        <div class="detail" v-if="poiInfo.discounts2" @click="toggleBulletin">
          {{poiInfo.discounts2.length}}个活动
          <span class="icon-keyboard_arrow_right"></span>
        </div>
      </div>

      <div class="bulletin-detail" v-show="isShow">
        <div class="detail-wrapper">
          <div class="main-wrapper" :style="detail_bg">
            <div class="icon" :style="head_bg"></div>
            <h3 class="name">{{poiInfo.name}} </h3>
            <p class="tip">
              {{poiInfo.min_price_tip}} <i>|</i>
              {{poiInfo.shipping_fee_tip}} <i>|</i>
              {{poiInfo.delivery_time_tip}} <i>|</i>
            </p>
            <p class="time">
              配送时间：
              {{poiInfo.shipping_time}}
            </p>
            <div class="discounts" v-if="poiInfo.discounts2">
              <p>
                <img :src="poiInfo.discounts2[0].icon_url" />
                <span> {{poiInfo.discounts2[0].info}} </span>
              </p>
            </div>
          </div>
          
          <div class="close-wrapper">
            <span class="icon-close" @click="toggleBulletin"></span>
          </div>
        </div>
      </div>
  </div>
</template>

<<script>
  export default {
    data() {
      return {
        isShow: false
      }
    },
    props: {
      poiInfo: {
        type: Object,
        default: {}
      },
    },
    computed: {
      content_bg() {
        return `background-image: url("${this.poiInfo.head_pic_url}")`
      },
      head_bg() {
        return `background-image: url("${this.poiInfo.pic_url}")`
      },
      detail_bg() {
        return `background-image: url("${this.poiInfo.poi_back_pic_url}")`
      }
    },
    methods: {
      toggleBulletin() {
        this.isShow = !this.isShow;
      }
    }
  }
</script>

<<style>
  @import url("../../common/styles/icon.css");
  @import url("header.css");

</style>



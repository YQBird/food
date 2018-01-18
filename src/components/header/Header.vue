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
        
      </div>

      <div class="bulletin-wrapper"></div>
  </div>
</template>

<<script>
  export default {
    props: {
      poiInfo: {
        type: Object,
        default: {}
      }
    },
    computed: {
      content_bg() {
        return `background-image: url("${this.poiInfo.head_pic_url}")`
      }
    }
  }
</script>

<<style>
  @import url("../../common/styles/icon.css");
  @import url("header.css");

</style>



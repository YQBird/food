<<template>
  <div class="sellers">
    <div class="seller-wrapper">
      <Split></Split>
      <div class="seller-view">
        <div class="address-wrapper">
          <div class="address-left">
            {{seller.address}}
          </div>
          <div class="address-right">
            <div class="bg"></div>
          </div>
        </div>
        <div class="pics-wrapper" v-if="seller.poi_env" ref="picView">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="imgUrl in seller.poi_env.thumbnails_url_list" ref="picItem">
              <img :src="imgUrl" />
            </li>
          </ul>
        </div>
        <div class="security-wrapper">
          查看食品安全档案
          <span class="icon-keyboard_arrow_right"></span>
        </div>
      </div>

      <Split></Split>
      <div class="tip-wrapper">
        <div class="delivery-wrapper">
          配送服务：{{seller.app_delivery_tip}}
        </div>
        <div class="shipping-wrapper">
          配送时间：{{seller.shipping_time}}
        </div>
      </div>

      <Split></Split>
      <div class="other-wrapper">
        <div class="service-wrapper">
          商家服务
          <div class="poi-service" v-for="service in seller.poi_service">
            <img :src="service.icon" class="icon"/>
            {{service.content}}
          </div>
        </div>
        <div class="discount-wrapper" v-for="item in seller.discounts2">
          <div class="discount-item">
            <div class="icon">
              <img :src="item.icon_url">
            </div>
            <div class="text">
              {{item.info}}
            </div>
          </div>
        </div>
      </div>

      <Split class="bottom"></Split>
    </div>
  </div>
</template>

<script>
import Split from 'components/split/Split';
import BScroll from 'better-scroll';

export default {
  components: {
    Split,
    BScroll
  },

  data() {
    return {
      seller: {}
    }
  },

  created() {
    const that = this;

      this.$axios.get('/api/seller')
      .then((response) => {
        const dataSource = response.data;
        if (dataSource.code === 0) {
          that.seller = dataSource.data;

          this.$nextTick(() => {
            if (that.seller.poi_env.thumbnails_url_list.length) {
              let imgW = that.$refs.picItem[0].clientWidth;
              let marginR = 11;
              let width = (imgW + marginR) * that.seller.poi_env.thumbnails_url_list.length

              that.$refs.picList.style.width = width + 'px';
            }

            if (!that.scroll) {
              that.scroll = new BScroll(that.$refs.picView, {
                click: true,
                scrollX: true
              });
            } else {
              that.scroll.refresh();
            }
          })
        }
      })
      .catch((err) => {

      });
  }
}
</script>

<style>
  @import url('seller.css');
</style>

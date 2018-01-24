<<template>
  <div class="ratings">
    <div class="ratings-wrapper">
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
    </div>
  </div>
</template>

<script>
  import Star from 'components/star/Star';
  import Split from 'components/split/Split';

  export default {
    data() {
      return {
        ratings: {}
      }
    },

    components: {
      Star,
      Split
    },

    created() {
      const that = this;

      this.$axios.get('/api/ratings')
      .then((response) => {
        const dataSource = response.data;
        if (dataSource.code === 0) {
          that.ratings = dataSource.data;
        }
      })
      .catch((err) => {

      });
    }
  }
</script>

<style>
  @import url('ratings.css');
</style>

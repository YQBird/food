<<template>
  <div class="goods">
    
    <div class="menu-wrapper" ref="menuScroll">
      <ul>
        <li class="menu-item" :class="{'current': currentIndex===0}" @click="clickMenu(0)">
          <div class="text">
            <img :src="container.tag_icon" v-if="container.tag_icon" class="icon" />
            {{container.tag_name}} 
          </div>
        </li>

        <li class="menu-item" v-for="(item, index) in goods" :class="{'current': currentIndex===index+1}"
        @click="clickMenu(index+1)">
          <p class="text">
            <img :src="item.icon" v-if="item.icon" class="icon" />
            {{item.name}}
          </p>
          <i class="num" v-show="menuCount(item.spus)">{{menuCount(item.spus)}}</i>
        </li>
      </ul>
    </div>

    <div class="food-wrapper" ref="foodScroll">
      <ul>
        <!-- special -->
        <li class="container-list food-list-hook">
          <div v-for="item in container.operation_source_list">
            <img :src="item.pic_url" />
          </div>
        </li>
        <!-- category -->
        <li v-for="item in goods" class="food-list food-list-hook">
          <h3 class="title">{{item.name}}</h3>

          <ul>
            <li v-for="food in item.spus" class="food-item">
              <div class="icon" :style="head_bg(food.picture)">
              </div>

              <div class="content">
                <h3 class="name">{{food.name}}</h3>
                <p class="description" v-if="food.description">{{food.description}}</p>
                <div class="extra">
                  <span class="saled">{{food.month_saled_content}}</span>
                  <span class="praise">{{food.praise_content}}</span>
                </div>
                <img class="product" v-if="food.product_label_picture" :src="food.product_label_picture"/>
                <p class="price">
                  <span class="text">¥{{food.min_price}}</span>
                  <span class="unit">/{{food.unit}}</span>
                </p>
              </div>

              <div class="cartControl-wrapper">
                <CartControl :food="food"></CartControl>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    
    <Shopcart :selectedFood="selectedFood" :poiInfo="poiInfo"></Shopcart>
  </div>
</template>

<<script>
import BScroll from 'better-scroll';
import Shopcart from 'components/shopcart/Shopcart';
import CartControl from 'components/cartControl/CartControl';
export default {
  data() {
    return {
      container: {},
      goods: [],
      poiInfo: {},
      listHeight: [],
      scrollY: 0,
      menuScroll: {},
      foodScroll: {}
    }
  },

  components: {
    Shopcart,
    CartControl
  },

  created() {
    const that = this;

    this.$axios.get('/api/goods')
      .then((response) => {
        const dataSource = response.data;
        console.log(dataSource);
        if (dataSource.code === 0) {
          that.container = dataSource.data.container_operation_source;
          that.goods = dataSource.data.food_spu_tags;
          that.poiInfo = dataSource.data.poi_info;
          console.log(that.container);
          console.log(that.goods);

          that.$nextTick(() => {
            that.initScroll();

            // calculated div height
            that.getHeights();
          })
        }
      })
      .catch((err) => {

      })
  },

  methods: {
    head_bg(imageName) {
      return `background-image: url(${imageName})`;
    },
    initScroll() {
      // init better scroll with DOM object or component
      // use this.$ref
      this.menuScroll = new BScroll(this.$refs.menuScroll, { probeType: 3, click: true });
      this.foodScroll = new BScroll(this.$refs.foodScroll, { probeType: 3, click: true });

      this.foodScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      })
    },
    getHeights() {
      // use $refs to get DOM elements
      let foodlist = this.$refs.foodScroll.getElementsByClassName('food-list-hook'); 

      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodlist.length; i++) {
        height += foodlist[i].clientHeight
        this.listHeight.push(height);
      }
    },

    clickMenu(index) {
      //console.log(index);
      let foodlist = this.$refs.foodScroll.getElementsByClassName('food-list-hook');
      let el = foodlist[index];

      this.foodScroll.scrollToElement(el, 250);
    },

    menuCount(spus) {
      let count = 0;
      spus.forEach((food) => {
        if (food.count > 0) {
          count += food.count;
        }
      });

      return count;
    }
  },
  computed: {
    currentIndex() {
      for (let i = 0 ; i < this.listHeight.length - 1; i++) {
        let current = this.listHeight[i];
        let next = this.listHeight[i + 1];

        if ( this.scrollY >= current && this.scrollY <= next) {
          return i;
        }
      }

      return 0;
    },

    selectedFood() {
      let foods = [];
      this.goods.forEach((good) => {
        good.spus.forEach((food) => {
          if (food.count > 0) {
            foods.push(food);
          }
        });
      });

      return foods;
    }
  }
}
</script>

<<style>
.goods {
  display: flex;

  position: absolute;
  top: 190px;
  bottom: 51px;

  overflow: hidden;
  width: 100%
}

.goods .menu-wrapper {
  /* grow, shrink, basis detault 0 1 auto */
  flex: 0 0 85px;
  background-color: #F4F4F4;
}

.goods .menu-wrapper .menu-item {
  padding: 16px 23px 15px 10px;
  border-bottom: 1px solid #E4E4E4;
  position: relative;
}

.goods .menu-wrapper .current {
  background-color: white;
  font-weight: bold;
  margin-top: -1px;
}

.goods .menu-wrapper .menu-item .text {
  font-size: 13px;
  line-height: 17px;
  color: #333333;
  vertical-align: middle;

  /* webkit extension to force max two line text */
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.goods .menu-wrapper .menu-item .num {
  position: absolute;
  right: 5px;
  top: 5px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  color: white;
  background: red;
  text-align: center;
  font-size: 10px;
  line-height: 13px;
}

.goods .menu-wrapper .menu-item .text .icon {
  width: 15px;
  height: 15px;
  vertical-align: middle;
}

.goods .food-wrapper {
  flex: 1;
}

.goods .food-wrapper .container-list {
  padding: 11px 11px 0 11px;
  border-bottom: 1px solid #E4E4E4;
}

.goods .food-wrapper .container-list img {
  width: 100%;
  margin-bottom: 11px;
  border-radius: 5px;
}

.goods .food-wrapper .food-list {
  padding: 11px;
}

.goods .food-wrapper .food-list .title {
  font-size: 13px;
  line-height: 13px;
  background: url(btn_yellow_highlighted@2x.png) no-repeat left top;
  background-size: 2px 10px;
  padding-left: 7px;
  margin-bottom: 12px;
  text-align: left;
}

.goods .food-wrapper .food-list .food-item {
  display: flex;
  margin-bottom: 25px;
  position: relative;  
}

.goods .food-wrapper .food-list .food-item .cartControl-wrapper {
  position: absolute;
  right: 0;
  bottom: 0;
}

.goods .food-wrapper .food-list .food-item .icon {
  flex: 0 0 63px;
  background-position: center;
  height: 75px;
  background-size: 120% 100%;
  background-repeat: no-repeat;
  margin-right: 11px;
}

.goods .food-wrapper .food-list .food-item .content {
  flex: 1;
  text-align: left;
}

.goods .food-wrapper .food-list .food-item .content .name {
  font-size: 16px;
  line-height: 21px;
  color: #333333;
  margin-bottom: 10px;
  padding-right: 27px;
}

.goods .food-wrapper .food-list .food-item .content .description {
  font-size: 10px;
  line-height: 19px;
  color: #bfbfbf;
  margin-bottom: 8px;

  /* overflow show with ... */
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.goods .food-wrapper .food-list .food-item .content .extra {
  font-size: 16px;
  color: #bfbfbf;
  margin-bottom: 7px;  
}

.goods .food-wrapper .food-list .food-item .content .extra .saled {
  margin-right: 14px;
}

.goods .food-wrapper .food-list .food-item .content .product {
  height: 15px;
  margin-bottom: 6px;
}

.goods .food-wrapper .food-list .food-item .content .price {
  font-size: 0;
}

.goods .food-wrapper .food-list .food-item .content .price .text {
  color: #fb4e44;
  font-size: 14px;
}

.goods .food-wrapper .food-list .food-item .content .price .unit {
  font-size: 12px;
  color: #bfbfbf;
  /* vertical-align: middle; */
}
</style>



<template>
  <div class="shopcart">
    <div class="shopcart-wrapper" :class="{'highlight': totalCount>0}">
        <div class="content-left">
        <div class="logo-wrapper" :class="{'highlight': totalCount>0}" @click="toggleClick">
          <span class="icon-shopping_cart logo" :class="{'highlight': totalCount>0}"></span>
          <i class="count" v-show="totalCount">{{totalCount}}</i>
        </div>
        <div class="price-wrapper">
          <p class="total-price" v-show="totalPrice">¥ {{totalPrice}}</p>
          <p class="tip" :class="{'highlight': totalCount>0}">另需{{poiInfo.shipping_fee_tip}}</p>
        </div>
      </div>

      <div class="content-right" :class="{'highlight': totalCount>0}">
        {{payStr}}
      </div>

      <div class="shopcart-list" v-show="listShow" :class="{'show': listShow}">
        <div class="list-top" v-if="poiInfo.discounts2">
          {{poiInfo.discounts2[0].info}}
        </div>
        <div class="list-header">
          <h3 class="title">一号口袋</h3>
          <div class="empty" @click="emptyFood">
            <img src="./ash_bin.png" />
            <span>清空购物车</span>
          </div>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food" v-for="food in selectedFood">
              <div class="desc-wrapper">
                <div class="desc-left">
                  <p class="name">{{food.name}}</p>
                  <p class="unit" v-show="!food.description">{{food.unit}}</p>
                  <p class="description" v-show="food.description">{{food.description}}</p>
                </div>
                <div class="desc-right">
                  <span class="price">¥ {{food.min_price}}</span>
                </div>
              </div>
              <div class="cartControl-wrapper">
                <CartControl :food="food"></CartControl>
              </div>
            </li>
          </ul>
        </div>
        <div class="list-footer"></div>
      </div>
    </div>
    
    <div class="shopcart-mask" v-show="listShow" @click="hideMask"></div>
  </div>
</template>

<script>
import CartControl from 'components/cartControl/CartControl';
import BScroll from 'better-scroll';

export default {
  data() {
    return {
      fold: true
    }
  },
  components: {
    CartControl,
    BScroll
  },
  props: {
    poiInfo: {
      type: Object,
      default: {}
    },
    selectedFood: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  computed: {
    totalCount() {
      let num = 0;
      this.selectedFood.forEach( (food) => {
        num += food.count;
      })
      return num;
    },

    totalPrice() {
      let total = 0;
      this.selectedFood.forEach((food) => {
        total += food.min_price * food.count;
      })

      return total;
    },

    payStr() {
      if (this.totalCount > 0) {
        return "去结算";
      } else {
        return this.poiInfo.min_price_tip;
      }
    },

    listShow() {
      if (!this.totalCount) {
        this.fold = true;

        return false;
      }

      let show = !this.fold;
      if (show) {
        // after render DOM element init BS instance
        this.$nextTick(() => {
          if(!this.shopScroll) {
            this.shipScroll = new BScroll(this.$refs.listContent, {
              click: true
            });
          } else {
            this.shipScroll.refresh();
          }
        });
        
      }
      return show;
    }
  },

  methods: {
    toggleClick() {
      if (!this.totalCount) {
        return;
      }

      this.fold = !this.fold;
    },

    emptyFood() {
      this.selectedFood.forEach((food) => {
        food.count = 0;
      })
    },

    hideMask() {
      this.fold = true;
    }
  }
}
</script>

<style>
.shopcart-wrapper {
  width: 100%;
  height: 51px;
  background-color: #514f4f;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  z-index: 99;
}
.shopcart-wrapper.highlight {
  background: #2d2b2a;
}

.shopcart-wrapper .content-left {
  flex: 1;
}

.shopcart-wrapper .content-left .logo-wrapper {
  width: 50px;
  height: 50px;
  background: #666666; 
  border-radius: 50%;
  position: relative;
  top: -14px;
  left: 10px;
  text-align: center;
  float: left;
}

.shopcart-wrapper .content-left .logo-wrapper.highlight {
  background: #ffd161;
}

.shopcart-wrapper .content-left .logo-wrapper .logo {
  font-size: 28px;
  color: #c4c4c4;
  line-height: 50px;
}

.shopcart-wrapper .content-left .logo-wrapper .logo.highlight {
  color: #2d2b2a;
}

.shopcart-wrapper .content-left .logo-wrapper .count {
  width: 15px;
  height: 15px;
  line-height: 15px;
  border-radius: 50%;
  font-size: 9px;
  color: white;
  background: red;
  position: absolute;
  right: 0;
  top: 0;
}

.shopcart-wrapper .content-left .price-wrapper {
  float: left;
  margin-left: 23px;
  box-sizing: border-box;
}

.shopcart-wrapper .content-left .price-wrapper .total-price {
  line-height: 33px;
  font-size: 18px;
  color: white;
  text-align: left;
}

.shopcart-wrapper .content-left .price-wrapper .tip {
  font-size: 12px;
  color: #bab9b9;
  line-height: 51px; 
}

.shopcart-wrapper .content-left .price-wrapper .tip.highlight {
  font-size: 12px;
  line-height: 12px;
}

.shopcart-wrapper .content-right {
  flex: 0 0 110px;
  font-size: 15px;
  color: #bab9b9;
  line-height: 51px;
}

.shopcart-wrapper .content-right.highlight {
  background: #FFD161;
  color: #2D2B2A;
}

.shopcart-wrapper .shopcart-list {
  position: absolute;
  left: 0;
  right: 0;
  z-index: -1;
  width: 100%;
}

.shopcart-wrapper .shopcart-list.show {
  transform: translateY(-100%);
}

.shopcart-wrapper .shopcart-list .list-top {
  text-align: center;
  font-size: 11px;
  height: 30px;
  background: #f3e6c6;
  line-height: 30px;
  color: #646158;
}

.shopcart-wrapper .shopcart-list .list-header {
  height: 30px;
  background: #f4f4f4;
}

.shopcart-wrapper .shopcart-list .list-header .title {
  float: left;
  border-left: 4px solid #53c123;
  padding-left: 6px;
  line-height: 30px;
  font-size: 12px;
}

.shopcart-wrapper .shopcart-list .list-header .empty {
  float: right;
  font-size: 0;
  margin-right: 10px;
  line-height: 30px;
}

.shopcart-wrapper .shopcart-list .list-header .empty img {
  height: 14px;
  margin-right: 9px;
  /* line-height: 30px; */
  vertical-align: middle;
}

.shopcart-wrapper .shopcart-list .list-header .empty span {
  font-size: 12px;
  vertical-align: middle;
}

.shopcart-wrapper .shopcart-list .list-content {
  max-height: 360px;
  overflow: hidden;
  background: white;
}

.shopcart-wrapper .shopcart-list .list-content .food {
  height: 38px;
  padding: 12px 12px 10px 12px;
  border-bottom: 1px solid #F4F4F4;
}

.shopcart-wrapper .shopcart-list .list-content .food .desc-wrapper {
  float: left;
  width: 240px;
}

.shopcart-wrapper .shopcart-list .list-content .food .desc-wrapper .desc-left {
  float: left;
  width: 170px;
  text-align: left;
}

.shopcart-wrapper .shopcart-list .list-content .food .desc-wrapper .desc-left .name {
  font-size: 16px;
  height: 16px;
  margin-bottom: 8px;

  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.shopcart-wrapper .shopcart-list .list-content .food .desc-wrapper .desc-left .unit {
  font-size: 12px;
  color: #b4b4b4;
}

.shopcart-wrapper .shopcart-list .list-content .food .desc-wrapper .desc-left .description {
  font-size: 12px;
  height: 12px;
  color: #b4b4b4;

  /* -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical; */
  overflow: hidden;
}

.shopcart-wrapper .shopcart-list .list-content .food .desc-wrapper .desc-right {
  float: right;
  width: 70px;
  text-align: right;
} 

.shopcart-wrapper .shopcart-list .list-content .food .desc-wrapper .desc-right .price {
  font-size: 12px;
  line-height: 38px;
}

.shopcart-wrapper .shopcart-list .list-content .food .cartControl-wrapper {
  margin-top: 6px;
  float: right;
}

.shopcart-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 98 ;
  background: rgba(7, 17, 27, 0.6);
}

</style>

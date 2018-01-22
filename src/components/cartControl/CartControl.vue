<template>
  <div class="cartControl">
    <transition name="move">
      <div class="cart-decrease " @click="decreaseCount" v-show="food.count">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    

    <div class="cart-count" v-show="food.count">{{food.count}}</div>
    <div class="cart-increase icon-add_circle" @click="increaseCount">
      <i class="bg"></i>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    decreaseCount() {
      this.food.count--;
    },

    increaseCount() {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
    }
  }
}
</script>

<style>
.cartControl {
  /* use font-size to remove space between inline-clock item */
  font-size: 0;
}

.cartControl .cart-decrease {
  display: inline-block;
  width: 26px;
  height: 26px;
  font-size: 26px;
  color: #b4b4b4;
}

.cartControl .cart-increase {
  display: inline-block;
  width: 26px;
  height: 26px;
  font-size: 26px;
  color: #ffd161;
  position: relative;
}

.cartControl .cart-count {
  display: inline-block;
  width: 25px;
  text-align: center;
  font-size: 12px;
  line-height: 26px;
  vertical-align: top;
}

.cartControl .cart-increase .bg {
  position: absolute;
  top: 3px;
  left: 3px;
  background-color: black;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  z-index: -1;
}

.move-enter-active, .move-leave-active {
  transition: all 0.5s linear;
}

.move-enter, .move-leave-to {
   transform: translateX(20px) rotate(180deg);
}
</style>

<<template>
  <div class="star">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script>
  // star length
  const LENGTH = 5;
  // star class
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';

  export default {
    props: {
      score: {
        type: Number
      }
    },
    computed: {
      itemClasses() {
        let score = Math.floor(this.score * 2) / 2; 
        let hasDecimal = score % 1 !== 0;
        let integer = score / 1;
        let classes = [];
        
        for(let i=0; i < integer; i++) {
          classes.push(CLS_ON);
        }

        if (hasDecimal) {
          classes.push(CLS_HALF);
        }

        while(classes.length < LENGTH) {
          classes.push(CLS_OFF);
        }

        return classes;
      }
    }
  }
</script>

<style>
.star {
  font-size: 0px;
}

.star .star-item {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 3px;
  background-repeat: no-repeat;
  background-size: 10px 10px;
}

.star .star-item:last-child {
  margin-right: 0;
}

.star .on {
  background-image: url(star24_on@2x.png);
}

.star .half {
  background-image: url(star24_half@2x.png);
}

.star .off {
  background-image: url(star24_off@2x.png);
}

</style>

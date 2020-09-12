<template>
  <div class="log" style="display: flex">
      <div class="info_block">
        <h4 class="list-group-item-heading">{{detail}}</h4>
        <div class="detailedinfo">
          <p>
            <i class="fab fa-buffer"></i>
            <span class="list-group-item-text">操作类型：{{type}}</span>
          </p>
          <p>
            <i class="fas fa-user-circle"></i>
            <span class="list-group-item-text">操作者：{{operator}}</span>
          </p>
          <p>
            <i class="far fa-clock"></i>
            <span class="list-group-item-text">操作时间：{{ formatTime(operate_time) }}</span>
          </p>
        </div>
      </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import {Component, Vue, Prop, Watch} from 'vue-property-decorator'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
@Component
export default class Log extends Vue {

  @Prop({type: String}) type
  @Prop({type: String}) operator
  @Prop({type: Number}) operate_time
  @Prop({type: String}) detail

  formatTime (timestamp) {
    return (new Date(timestamp * 1000)).toLocaleString('zh-CN');
  }
}

</script>

<style scoped>

.btn-default{
  margin: 0 5px;
  width: 42px;
  height: 100%;
}

</style>

<template>
  <div class="user" style="display: flex" @click="readit">
      <div class="info_block">
        <h4 class="list-group-item-heading">{{detail}}</h4>
        <div class="detailedinfo">
          <p>
            <i class="fas fa-user-circle"></i>
            <span class="list-group-item-text">{{type}}</span>
          </p>
          <p>
            <i class="fas fa-user-circle"></i>
            <span class="list-group-item-text">{{operator}}</span>
          </p>
          <p>
            <i class="fas fa-user-circle"></i>
            <span class="list-group-item-text">{{operate_time}}</span>
          </p>
        </div>
      </div>
      <span class="badge" style="height: 18px; background-color: red">{{unread}}</span>
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

  unread = '!'

  @Prop({type: String}) type
  @Prop({type: String}) operator
  @Prop({type: String}) operate_time
  @Prop({type: String}) detail

  readit(){
    this.unread = ''
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

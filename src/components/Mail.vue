<template>
  <div class="mail" style="display: flex">
    <span class="badge" style="height: 18px; background-color: red" v-if="!status">!</span>
      <div class="info_block">
        <h4 class="list-group-item-heading">{{sender}}</h4>
        <div class="detailedinfo">
          <p>
            <i class="far fa-clock"></i>
            <span class="list-group-item-text">{{send_time}}</span>
          </p>
          <p>
            <span class="list-group-item-text">{{detail}}</span>
          </p>
        </div>
      </div>
      
      <div v-if="!status" >
        <button type="button" class="btn btn-default">
          <i class="fas fa-check-circle"></i>
        </button>
      </div>
      <div>
        <button type="button" class="btn btn-default">
          <i class="fas fa-trash-alt"></i>
        </button>
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
export default class Mail extends Vue {
  @Prop({type: String}) sender
  @Prop({type: String}) send_time
  @Prop({type: String}) detail
  @Prop({type: Boolean}) status
  @Prop({type: String}) type
  @Prop({type: Number}) relatedID

  // TODO: 点击确认后改为已读
  // TODO: 点击删除后删除站内信
}




</script>

<style scoped>

.btn-default{
  margin: 0 5px;
  width: 42px;
  height: 100%;
}

</style>

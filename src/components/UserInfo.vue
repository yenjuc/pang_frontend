<template>
  <div class="user">
      <div class="info_block">
        <h4 class="list-group-item-heading">{{username}}</h4>
        <div class="detailedinfo">
          <i class="fas fa-user-circle"></i>
          <span class="list-group-item-text">{{role}}</span>
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
export default class UserInfo extends Vue {
  @Prop({type: String}) username
  @Prop({type: String}) role
}
</script>

<style scoped>

.btn-default{
  margin: 0 5px;
  width: 42px;
}

</style>

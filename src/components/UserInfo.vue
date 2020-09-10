<template>
  <div class="user" style="display: flex">
      <div class="info_block">
        <h4 class="list-group-item-heading">{{username}}</h4>
        <div class="detailedinfo">
          <i class="fas fa-user-circle"></i>
          <span class="list-group-item-text">{{role}}</span>
        </div>
      </div>
      <div v-if="need_examine" >
        <button type="button" class="btn btn-default">
          <i class="fas fa-check-circle"></i>
        </button>
      </div>
      <div v-if="need_examine">
        <button type="button" class="btn btn-default">
          <i class="fas fa-times-circle"></i>
        </button>
      </div>
      <div v-if="deletable">
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
export default class UserInfo extends Vue {
  @Prop({type: String}) username
  @Prop({type: String}) role

  @Prop({type: Boolean, default: true}) deletable
  @Prop({type: Boolean, default: false}) need_examine
}

// TODO: 将Admin中apply_check_pass移入userinfo组件中，并且完善false逻辑

</script>

<style scoped>

.btn-default{
  margin: 0 5px;
  width: 42px;
  height: 100%;
}

</style>

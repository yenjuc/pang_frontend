<template>
<div>
  <div class="user" style="display: flex">
      <div class="info_block">
        <h4 class="list-group-item-heading">{{username}}</h4>
        <div class="detailedinfo">
          <i class="fas fa-user-circle"></i>
          <span class="list-group-item-text">{{role}}</span>
        </div>
        <div v-if="show_detail">
            <ul>
              <li>实验室信息：{{userlab}}</li>
              <li>联系电话：{{usertel}}</li>
              <li>地址：{{useraddress}}</li>
              <li>申请理由：{{userdescription}}</li>
            </ul>
        </div>
      </div>
      <div v-if="need_examine" >
        <button type="button" @click="apply_check_pass('true')" class="btn btn-default">
          <i class="fas fa-check-circle"></i>
        </button>
      </div>
      <div v-if="need_examine">
        <button type="button" @click="showExamine = !showExamine" class="btn btn-default">
          <i class="fas fa-times-circle"></i>
        </button>
      </div>
      <div v-if="deletable">
        <button type="button" @click="user_delete" class="btn btn-default">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
  </div>
  <div v-if='showExamine' style='display: contents; width: 100%'>
    <textarea rows='7' class='form-control' placeholder='拒绝原因…'
      style='margin-bottom: 6px; width: 90%; margin: 20px 5% 0'
      v-model='reviewResponse'></textarea>
    <br>
    <button type="button" class="btn btn-primary" @click="apply_check_pass('false')">
      <i class="fas fa-paper-plane"></i> 提交
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

  @Prop({type: Boolean, default: false}) show_detail
  @Prop({type: String, default:''}) userlab
  @Prop({type: String, default:''}) usertel
  @Prop({type: String, default:''}) useraddress
  @Prop({type: String, default:''}) userdescription

  showExamine = false
  reviewResponse = ''

  querystring = require('querystring')

  async user_delete () {
    try {
      await axios.post(`/apis/admin/users/${this.username}/delete`, this.querystring.stringify({'username': this.username}))
      this.$message.success('成功删除用户！')
      this.$emit('user_load')
    } catch (e) {
      this.$message.error(JSON.stringify(e.response.data.error))
    }
  }


  async apply_check_pass (pass) {
    if (pass === 'true') {
      try {
        await axios.post('/apis/admin/users/check/apply', this.querystring.stringify({username: this.username, pass: pass}))
        this.$emit('apply_user_load')
      } catch (e) {
        this.$message.error(JSON.stringify(e.response.data.error))
      }
    }
    else if (pass === 'false' )
    {
      try{
        // TODO:此处非目前需做，暂时将reason置为空，待在前端实现当管理者拒绝时弹出文本框时，再将reason置为文本框的值
        await axios.post('/apis/admin/users/check/apply', this.querystring.stringify({username: this.username, pass: pass,reason: this.reviewResponse}))
        this.$emit('apply_user_load')
      }catch (e){
        this.$message.error(JSON.stringify(e.response.data.error))
      }
    }
  }

}

</script>

<style scoped>

.btn-default{
  margin: 0 5px;
  width: 42px;
  height: 100%;
}

li{
  list-style-type: none;
}

</style>

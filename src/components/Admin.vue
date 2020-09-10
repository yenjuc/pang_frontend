<template>
  <div class="admin">
    <ul class="nav nav-pills">
      <li role="presentation" :class="type === 'users'? 'active' : '' "><a href="/admin/users">管理用户</a></li>
      <li role="presentation" :class="type === 'devices'? 'active' : '' "><a href="/admin/devices">管理设备</a></li>
      <li role="presentation" :class="type === 'loan_apply'? 'active' : '' "><a href="/admin/loan_apply">管理租借申请</a></li>
      <li role="presentation" :class="type === 'provider_apply'? 'active' : '' "><a href="/admin/provider_apply">管理提供者申请</a></li>
      <li role="presentation" :class="type === 'device_apply'? 'active' : '' "><a href="/admin/device_apply">管理设备上架</a></li>
      <li role="presentation" :class="type === 'statistics'? 'active' : '' "><a href="/admin/statistics">平台数据一览</a></li>
    </ul>

    <div class="list-group">
      <div v-if="type === 'users'">
        <a v-for="(user,index) in user_list" :key="user.username" v-show="index >= (page-1)*10 && index < page*10" class="list-group-item">
          <user-info :username=user.user_name :role=user.user_type :deletable="true" :need_examine="false"></user-info>
        </a>
      </div>
      <div v-if="type === 'devices'">
        <!-- v-for="(item,index) in lists" v-show="index >= (page-1)*10 && index < page*10" class="list-group-item"-->
        <a v-for="index of 30" :key="index" v-show="index >= (page-1)*10 && index < page*10" class="list-group-item">
          <!--device-info :device_name...></device-info-->
          <device-info device_name="test device name" device_address="test device address" device_owner="test timeout" :device_contact=test 
          :editable="true" :deletable="true"></device-info>
        </a>
      </div>
      <div v-if="type === 'loan_apply'">
        <!-- v-for="(item,index) in lists" v-show="index >= (page-1)*10 && index < page*10" class="list-group-item"-->
         <a v-for="index of 30" :key="index" v-show="index >= (page-1)*10 && index < page*10" class="list-group-item">
          <!--loan-info :equipment=item.equipment...></loan-info-->
          <loan-info equipment="123" start_time="0908" end_time="0910" :statement=test :need_examine="true" :deletable="true"></loan-info>
        </a>
      </div>
      <div v-if="type === 'provider_apply'">
        <a v-for="(item,index) in provider_apply_list" :key="item.user_name" v-show="index >= (page-1)*10 && index < page*10" class="list-group-item">
          <user-info :username="item.user_name" :role="item.user_type" :need_examine="true"></user-info>
          <div>
            <ol>
              <li>实验室信息：{{item.user_info_lab}}</li>
              <li>联系电话：{{item.user_info_tel}}</li>
              <li>地址：{{item.user_info_address}}</li>
              <li>申请理由：{{item.user_info_description}}</li>
            </ol>
          </div>
          <!--将下面功能移植到user-info组件中-->
          <!--div>
            <button type="button" @click="apply_check_pass(item.user_name,'true')" class="btn btn-default">
              <i class="fas fa-check-circle"></i>
            </button>
            <button type="button" class="btn btn-default">
              <i class="fas fa-times-circle"></i>
            </button>
            <button type="button" class="btn btn-default">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div-->
        </a>
      </div>
      <div v-if="type === 'device_apply'">
        <!-- v-for="(item,index) in lists" v-show="index >= (page-1)*10 && index < page*10" class="list-group-item"-->
        <a v-for="index of 30" :key="index" v-show="index >= (page-1)*10 && index < page*10" class="list-group-item">
          <!--device-info :device_name=item.equipment...></device-info-->
          <device-info device_name="test device name" device_address="test device address" device_timeout="test timeout" :device_contact=test 
          :need_examine="true" :deletable="true"></device-info>
        </a>
      </div>
      <div v-if="type === 'statistics'">
        <!--
          设备提供商/用户数
          可用设备/上架设备/所有设备
          用户租借申请量
          ...
          -->
      </div>
    </div>

    <nav aria-label="Page navigation" v-if="type !== 'statistics'">
      <ul class="pagination">
        <li :class="page - 1 > 0 ? '':'disabled'">
          <a href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li><a href="#" v-show="page-2 > 0" v-on:click="page -= 2">{{page - 2}}</a></li>
        <li><a href="#" v-show="page-1 > 0" v-on:click="page -= 1">{{page - 1}}</a></li>
        <li class="active"><span>{{page}}</span></li>
        <li><a href="#" v-on:click="page += 1">{{page + 1}}</a></li>
        <li><a href="#" v-on:click="page += 2">{{page + 2}}</a></li>
        <li>
          <a href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>

  </div>
</template>

<script>
/* eslint-disable camelcase */
// eslint-disable-next-line no-unused-vars
import {Component, Vue, Prop, Watch} from 'vue-property-decorator'
import axios from 'axios'
import VueAxios from 'vue-axios'
import UserInfo from './UserInfo'
import DeviceInfo from './DeviceInfo'
import LoanInfo from './LoanInfo'

Vue.use(VueAxios, axios)
@Component({components: {UserInfo, DeviceInfo, LoanInfo}})

export default class Admin extends Vue {
  type = this.$route.params.type || 'users'
  page = 1
  list = []
  user_list=[]
  provider_apply_list=[]
  res={}
  test= 'test bind'
  userInfo={}
  async user_load () {
    try {
      this.res = await axios({
        url: '/apis/admin/users/query',
        params: {
          examining: 'false'
        }
      })
      this.user_list = this.res.data
    } catch (e) {
      console.log(e.response.data)
    }
  }

  async getInfo () {
    try{
      let response = await axios.get('/apis/users/info')
      this.role=response.data.user_type
      this.userInfo['type']=response.data.user_type
      this.userInfo['examining']=response.data.user_examining
      this.userInfo['lab']=response.data.user_info_lab
      this.userInfo['tel']=response.data.user_info_tel
      this.userInfo['description']=response.data.user_info_description
      this.userInfo['name']=response.data.user_name
      this.userInfo['address']=response.data.user_info_address
      this.userInfo['reject']=response.data.user_info_reject
    }
    catch (e){
      console.log('getInfo:error')
    }
  }

  async apply_user_load () {
    try {
      this.res = await axios({
        url: '/apis/admin/users/query',
        params: {
          examining: 'true'
        }
      })
      this.provider_apply_list = this.res.data
    } catch (e) {
      console.log(e.response.data)
    }
  }

  querystring = require('querystring')

  // TODO: 将user_delete移入userinfo组件中（userinfo组件中有记录username，应该只要复制黏贴就可以了）
  async user_delete (username) {
    try {
      await axios.post(`/apis/admin/users/${username}/delete`, this.querystring.stringify({'username': username}))
      await this.user_load()
    } catch (e) {
      console.log(e.response.data)
    }
  }

  mounted () {
    this.user_load()
    this.apply_user_load()
    this.getInfo()
  }

  // TODO: html中展示逻辑完善（devices, loan_apply, device_apply），多余或不足的props可以再添加。完成statistics

  // TODO: 将apply_check_pass移入userinfo组件中
  async apply_check_pass (username, pass) {
    if (pass === 'true') {
      try {
        await axios.post('/apis/admin/users/check/apply', this.querystring.stringify({username: username, pass: pass}))
        await this.apply_user_load()
      } catch (e) {
        console.log('error')
      }
    }
  }

  async user_self_info () {
    // eslint-disable-next-line no-unused-vars
    let res = axios.get('/apis/users/info')
  }
}
</script>>

<style scoped>
.admin{
  background-color:rgba(255, 255, 255, 0.7);
  margin: 10px auto;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  width: 75%;
}

li{
  list-style-type: none;
}
</style>

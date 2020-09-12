<template>
  <div class="admin">
    <ul class="nav nav-pills">
      <li role="presentation" :class="type === 'users'? 'active' : '' "><a href="/admin/users">管理用户</a></li>
      <li role="presentation" :class="type === 'devices'? 'active' : '' "><a href="/admin/devices">管理设备</a></li>
      <li role="presentation" :class="type === 'loan_apply'? 'active' : '' "><a href="/admin/loan_apply">管理租借申请</a></li>
      <li role="presentation" :class="type === 'provider_apply'? 'active' : '' "><a href="/admin/provider_apply">管理提供者申请</a></li>
      <li role="presentation" :class="type === 'device_apply'? 'active' : '' "><a href="/admin/device_apply">管理设备上架</a></li>
      <li role="presentation" :class="type === 'statistics'? 'active' : '' "><a href="/admin/statistics">平台数据一览</a></li>
      <li role="presentation" :class="type === 'system_log'? 'active' : '' "><a href="/admin/system_log">系统日志</a></li>
    </ul>

    <div class="list-group">
      <div v-if="type === 'users'">
        <div class="searchBar">
         <form>
          <select name="searchMode" style="margin: 0 10px" v-model="searchUserMode">
            <option value="All">All Users</option>
            <option value="student">Students</option>
            <option value="provider">Providers</option>
            <option value="admin">Admins</option>
          </select>
          <input type="text" placeholder="Search User(s) by Username..." v-model="searchKey"/>
        </form>
        </div>
        <a v-for="(user,index) in searchUsers" :key="user.username" v-show="index >= (page-1)*10 && index < page*10" class="list-group-item">
          <user-info @user_load="user_load" :username=user.user_name :role=user.user_type :deletable="true" :need_examine="false"></user-info>
        </a>
      </div>
      <div v-if="type === 'devices'">
        <div class="searchBar">
         <form>
          <select name="searchMode" style="margin: 0 10px" v-model="searchDeviceMode">
            <option value="DeviceName">Device Name</option>
            <option value="DeviceInfo">Device Info</option>
            <option value="DeviceOwner">Device Owner</option>
          </select>
          <input type="text" placeholder="Search..." v-model="searchKey"/>
        </form>
        </div>
        <a v-for="(item,index) in searchAllDevicesResult" :key="item.id" v-show="index >= (page-1)*10 && index < page*10" class="list-group-item">
          <device-info :device_id=item.id :device_name=item.name :device_info=item.info :device_contact=item.contact :device_occs=item.occupancies
           :device_status=item.status :editable="true" :deletable="true"></device-info>
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
          <user-info @apply_user_load="apply_user_load" :username="item.user_name" :role="item.user_type" 
          :userlab="item.user_info_lab" :usertel="item.user_info_tel" :useraddress="item.user_info_address" :userdescription="item.user_info_description"
          :need_examine="true" :deletable="false" :show_detail="true"></user-info>
        </a>
      </div>
      <div v-if="type === 'device_apply'">
        <!-- v-for="(item,index) in lists" v-show="index >= (page-1)*10 && index < page*10" class="list-group-item"-->
        <a v-for="(item,index) in device_apply_list"  :key="index" v-show="index >= (page-1)*10 && index < page*10" class="list-group-item">
          <!--device-info :device_name=item.equipment...></device-info-->
          <device-info @apply_equipment_load="getExaminingDevices" :device_name=item.name :device_contact=item.contact :device_id="item.id" :device_info="item.info"
          :need_examine="true" :deletable="false"></device-info>
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
      <div v-if="type === 'system_log'">
        <a v-for="(item, index) in system_log_list" :key="index" v-show="index >= (page-1)*10 && index < page*10" class="list-group-item">
          <log :detail=item.detail :type=item.type :operator=item.operator :operate_time=item.time></log>
        </a>
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
import Log from './Log'

Vue.use(VueAxios, axios)
@Component({components: {UserInfo, DeviceInfo, LoanInfo, Log}})

export default class Admin extends Vue {
  type = this.$route.params.type || 'users'
  page = 1
  list = []
  user_list=[]
  device_list=[]
  provider_apply_list=[]
  device_apply_list=[]
  system_log_list=[]
  role=''
  res={}
  test= 'test bind'
  userInfo={}

  searchUserMode = 'All'
  searchDeviceMode = 'DeviceName'
  searchKey = ''

  get searchUsers(){
    if (this.searchUserMode === 'All'){
      return this.user_list.filter((user) => {
        return user.user_name.match(this.searchKey)
      })
    } else {
      return this.user_list.filter((user) => {
        return user.user_name.match(this.searchKey) && user.user_type === this.searchUserMode
      })
    }
  }

  get searchAllDevicesResult(){
    if (this.searchDeviceMode === 'DeviceName'){
      return this.device_list.filter((device) => {
        return device.name.match(this.searchKey)
      })
    } else if (this.searchDeviceMode === 'DeviceInfo'){
      return this.device_list.filter((device) => {
        return device.info.match(this.searchKey)
      })
    } else {
      return this.device_list.filter((device) => {
        return device.contact[0].match(this.searchKey)
      })
    }
  }

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
      this.$message.error(JSON.stringify(e.response.data.error))
    }
  }

  async device_load() {
    try {
      let response = await axios.get('/apis/equipment/search/admin')
      this.device_list = response.data.equipments
    } catch (e) {
      this.$message.error(JSON.stringify(e.response.data.error)) // 弹框提醒
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
      await this.getExaminingDevices()
    }
    catch (e){
      this.$message.error(JSON.stringify(e.response.data.error))
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
      this.$message.error(JSON.stringify(e.response.data.error))
    }
  }

  async getExaminingDevices () {
    try {
      let response = await axios.get(`/apis/equipment/search/${this.role}`)
      if (response.status === 200) {
        let device_list=response.data.equipments
        for(let device of device_list){
          if(device.status === 'wait_on_shelf' && device.examining_status === 'Examining'){
            this.device_apply_list.push(device)
          }
        }
      }
    } catch (e) {
      this.$message.error(JSON.stringify(e.response.data.error)) // 在此处弹出提示框
    }
  }

  async systemlog_load () {
    try {
      this.res = await axios.get('/apis/logs/search')
      this.system_log_list = this.res.data
    } catch (e) {
      this.$message.error(JSON.stringify(e.response.data.error))
    }
  }

  mounted () {
    this.user_load()
    this.apply_user_load()
    this.getInfo()
    this.device_load()
    this.systemlog_load()
  }

  async user_self_info () {
    // eslint-disable-next-line no-unused-vars
    let res = axios.get('/apis/users/info')
  }
}
</script>

<style scoped>
.admin{
  background-color:rgba(255, 255, 255, 0.7);
  margin: 10px auto;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  width: 75%;
}

.searchBar{
  margin: 16px;
}

.searchBar select{
  background-color:rgba(255, 255, 255, 0.5);
  border-style: none;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
}

.searchBar input{
  width: 60%;
  height: 22px;
  text-align: center;
  background-color:rgba(255, 255, 255, 0.5);
  border-style: none;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
}
</style>

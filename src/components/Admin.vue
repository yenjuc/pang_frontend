<template>
  <div class="admin">
    <ul class="nav nav-pills">
      <li role="presentation" :class="type === 'users'? 'active' : '' "><a href="/admin/users">管理用户</a></li>
      <li role="presentation" :class="type === 'devices'? 'active' : '' "><a href="/admin/devices">管理设备</a></li>
      <li role="presentation" :class="type === 'loan_apply'? 'active' : '' "><a href="/admin/loan_apply">管理租借申请</a></li>
      <li role="presentation" :class="type === 'provider_apply'? 'active' : '' "><a href="/admin/provider_apply">
        管理提供者申请 <span class="badge">{{provider_apply_list.length ? provider_apply_list.length : ''}}</span></a></li>
      <li role="presentation" :class="type === 'device_apply'? 'active' : '' "><a href="/admin/device_apply">
        管理设备上架 <span class="badge">{{device_apply_list.length ? device_apply_list.length : ''}}</span></a></li>
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
           :device_status=item.status :admin="true" :shelf_op="true" :editable="true" :deletable="true"></device-info>
        </a>
      </div>
      <div v-if="type === 'loan_apply'">
        <div class="searchBar">
         <form>
          <select name="filterLoanApplState" style="margin: 0 10px" v-model="filterLoanApplState">
            <option v-for='s in ["all", "pending", "rejected", "approved", "prefinish", "finish"]'
              :value='s' :key='s'>{{ s }}</option>
          </select>
          <input type="text" placeholder="Search by device name or username..." v-model="filterLoanApplDevice"/>
        </form>
        </div>
        <a v-for="(item,index) in search_loan_appls_list" v-show="index >= (page-1)*10 && index < page*10" class="list-group-item">
          <loan-info :appl='item' :need_examine='item.status === "pending"'></loan-info>
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
        <a v-for="(item,index) in device_apply_list"  :key="index" v-show="index >= (page-1)*10 && index < page*10" class="list-group-item">
          <device-info @apply_equipment_load="getExaminingDevices" :device_name=item.name :device_contact=item.contact :device_id="item.id" :device_info="item.info"
          :need_examine="true" :deletable="false"></device-info>
        </a>
      </div>
      <div v-if="type === 'statistics'">
        <div class='row' style='margin-top: 5ex'>
          <div class='col-md-2' />
          <div class='col-md-4'>
            <h1><i class="fas fa-user"></i> {{ stats.user_count }}</h1>
            <h3>用户数量</h3>
          </div>
          <div class='col-md-4'>
            <h1 class='text-primary'><i class="fas fa-user"></i> {{ stats.provider_count }}</h1>
            <h3 class='text-primary'>设备提供者</h3>
          </div>
          <div class='col-md-2' />
        </div>
        <div class='row' style='margin-top: 5ex'>
          <div class='col-md-4'>
            <h1><i class="fas fa-box"></i> {{ stats.devices_count }}</h1>
            <h3>设备总数</h3>
          </div>
          <div class='col-md-4'>
            <h1 class='text-success'><i class="fas fa-box"></i> {{ stats.on_shelf_count }}</h1>
            <h3 class='text-success'>已上架设备数</h3>
          </div>
          <div class='col-md-4'>
            <h1 class='text-warning'><i class="fas fa-box"></i> {{ stats.wait_on_shelf_count }}</h1>
            <h3 class='text-warning'>待审核上架设备数</h3>
          </div>
        </div>
        <div class='row' style='margin-top: 5ex'>
          <div class='col-md-4'>
            <h1><i class="far fa-sticky-note"></i> {{ stats.appls_count }}</h1>
            <h3>租借申请总数</h3>
          </div>
          <div class='col-md-4'>
            <h1 class='text-success'><i class="far fa-sticky-note"></i> {{ stats.appls_approved_count }}</h1>
            <h3 class='text-success'>已通过租借申请数</h3>
          </div>
          <div class='col-md-4'>
            <h1 class='text-warning'><i class="far fa-sticky-note"></i> {{ stats.appls_pending_count }}</h1>
            <h3 class='text-warning'>待审核租借申请数</h3>
          </div>
        </div>
        <div class='row' style='margin-top: 5ex'>
          <div class='col-md-2' />
          <div class='col-md-4'>
            <h1 class='text-muted'><i class="fas fa-history"></i> {{ stats.last_week_appls_count }}</h1>
            <h3 class='text-muted'>过去一周租借完成数</h3>
          </div>
          <div class='col-md-4'>
            <h1 class='text-muted'><i class="far fa-clock"></i> {{ stats.next_week_appls_count }}</h1>
            <h3 class='text-muted'>未来一周租借预约数</h3>
          </div>
          <div class='col-md-2' />
        </div>
      </div>
      <div v-if="type === 'system_log'">
        <div class="searchBar">
         <form>
          <select name="searchLogMode" style="margin: 0 10px" v-model="searchLogMode">
            <option v-for='s in ["All", "Add", "Delete", "Change"]'
              :value='s' :key='s'>{{ s }}</option>
          </select>
          <input type="text" placeholder="Search System Log by Operator Name..." v-model="searchKey"/>
        </form>
        </div>
        <a v-for="(item, index) in searchLog" :key="index" v-show="index >= (page-1)*10 && index < page*10" class="list-group-item">
          <log :detail=item.detail :type=item.type :operator=item.operator :operate_time=item.time></log>
        </a>
      </div>
    </div>

    <nav aria-label="Page navigation" v-if="type !== 'statistics'">
      <ul class="pagination">
        <li :class="page > 1 ? '':'disabled'">
          <a href="#" aria-label="Previous" v-on:click="page -= (page > 1) ? 1:0">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li><a href="#" v-show="page > 2" v-on:click="page -= 2">{{page - 2}}</a></li>
        <li><a href="#" v-show="page > 1" v-on:click="page -= 1">{{page - 1}}</a></li>
        <li class="active"><span>{{page}}</span></li>
        <li><a href="#" v-show="page < totalPage" v-on:click="page += 1">{{page + 1}}</a></li>
        <li><a href="#" v-show="page + 1 < totalPage" v-on:click="page += 2">{{page + 2}}</a></li>
        <li :class="page < totalPage ? '':'disabled'">
          <a href="#" aria-label="Next" v-on:click="page += (page < totalPage) ? 1:0">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>

    <a @click='logout'><div class="logout">
      <span style='margin-right: 0.5em; margin-top: -1ex;
        position: relative; top: 0.5ex'>{{ userInfo['name'] }}</span>
      <i class="fas fa-sign-out-alt" title="登出"></i>
    </div></a>
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
  user_list=[]
  device_list=[]
  loan_appls_list = []
  provider_apply_list=[]
  device_apply_list=[]
  system_log_list=[]
  role=''
  res={}
  test= 'test bind'
  userInfo={}

  searchUserMode = 'All'
  searchDeviceMode = 'DeviceName'
  searchLogMode = 'All'
  searchKey = ''

  filterLoanApplState = 'all'
  filterLoanApplDevice = ''

  stats = {}

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

  get searchLog(){
    if(this.searchLogMode === 'All'){
      return this.system_log_list.filter((log) => {
        return log.operator.match(this.searchKey)
      })
    } else {
      return this.system_log_list.filter((log) => {
        return log.type.match(this.searchLogMode) && log.operator.match(this.searchKey)
      })
    }
  }

  get totalPage(){
    let total_page = 1
    switch(this.type){
      case 'users':
        total_page = Math.floor(this.searchUsers.length/10) + (this.searchUsers.length % 10 === 0 ? 0 : 1)
        break
      case 'devices':
        total_page = Math.floor(this.searchAllDevicesResult.length/10) + (this.searchAllDevicesResult.length % 10 === 0 ? 0 : 1)
        break
      case 'loan_apply':
        total_page = Math.floor(this.search_loan_appls_list.length/10) + (this.search_loan_appls_list.length % 10 === 0 ? 0 : 1)
        break
      case 'provider_apply':
        total_page = Math.floor(this.provider_apply_list.length/10) + (this.provider_apply_list.length % 10 === 0 ? 0 : 1)
        break
      case 'device_apply':
        total_page = Math.floor(this.device_apply_list.length/10) + (this.device_apply_list.length % 10 === 0 ? 0 : 1)
        break
      case 'system_log':
        total_page = Math.floor(this.searchLog.length/10) + (this.searchLog.length % 10 === 0 ? 0 : 1)
        break
      default:
        break
    }
    return total_page
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
      this.device_list = response.data.equipments.reverse()
    } catch (e) {
      this.$message.error(JSON.stringify(e.response.data.error)) // 弹框提醒
    }
  }

  async loan_appls_load() {
    try {
      let response = await axios.get('/apis/loan/my_equipments')
      this.loan_appls_list = response.data.reverse()
      // this.loan_appls_list.sort((a, b) => a.id > b.id)
    } catch (e) {
      this.$message.error(JSON.stringify(e.response.data.error)) // 弹框提醒
    }
  }

  get search_loan_appls_list() {
    return this.loan_appls_list.filter((a) => {
      const typesMatch = (this.filterLoanApplState === 'all' ||
        this.filterLoanApplState === a.status);
      const namesMatch = (!this.filterLoanApplDevice ||
        a.equipment.name.toLowerCase().indexOf(this.filterLoanApplDevice.toLowerCase()) !== -1 ||
        a.owner.username.toLowerCase().indexOf(this.filterLoanApplDevice.toLowerCase()) !== -1 ||
        a.applicant.username.toLowerCase().indexOf(this.filterLoanApplDevice.toLowerCase()) !== -1);
      return typesMatch && namesMatch;
    });
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
      this.provider_apply_list = this.res.data.reverse()
    } catch (e) {
      this.$message.error(JSON.stringify(e.response.data.error))
    }
  }

  async getExaminingDevices () {
    try {
      let response = await axios.get(`/apis/equipment/search/${this.role}`)
      if (response.status === 200) {
        let device_list=response.data.equipments.reverse()
        this.device_apply_list = device_list.filter((device) => {
          return device.status === 'wait_on_shelf' && device.examining_status === 'Examining'
        })
      }
    } catch (e) {
      this.$message.error(JSON.stringify(e.response.data.error)) // 在此处弹出提示框
    }
  }

  async stats_load () {
    try {
      let response = await axios.get('/apis/admin/statistics')
      if (response.status === 200) this.stats = response.data
    } catch (e) {
      this.$message.error(JSON.stringify(e.response.data.error))
    }
  }

  async logout(){
    try{
      await axios.post('/apis/users/logout')
      this.$router.push('/login')
    }
    catch (e) {
      this.$message.error(JSON.stringify(e.response.data.error))
    }
  }

  async systemlog_load () {
    try {
      this.res = await axios.get('/apis/logs/search')
      this.system_log_list = this.res.data.reverse()
    } catch (e) {
      this.$message.error(JSON.stringify(e.response.data.error))
    }
  }

  mounted () {
    this.user_load()
    this.apply_user_load()
    this.getInfo()
    this.device_load()
    this.loan_appls_load()
    this.stats_load()
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

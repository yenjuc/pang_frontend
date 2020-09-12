<template>
  <div class="user">
    <ul class="nav nav-pills">
      <li role="presentation" :class="type === 'all_devices'? 'active' : '' "><a href="/all_devices">所有上架设备</a></li>
      <li role="presentation" :class="type === 'apply_history'? 'active' : '' "><a href="/apply_history">查看申请历史</a></li>
      <li role="presentation" :class="type === 'loaned_devices'? 'active' : '' "><a href="/loaned_devices">查看已借设备</a></li>
      <li v-if="role !== 'provider'" role="presentation" :class="type === 'apply_provider'? 'active' : '' "><a href="/apply_provider">申请成为设备提供者</a></li>
      <li v-if="role === 'provider'" role="presentation" :class="type === 'manage_devices'? 'active' : '' "><a href="/manage_devices">管理自己的设备</a></li>
      <li v-if="role === 'provider'" role="presentation" :class="type === 'manage_loan_apply'? 'active' : '' "><a href="/manage_loan_apply">审核租借申请</a></li>
      <li v-if="role === 'provider'" role="presentation" :class="type === 'loaned_history'? 'active' : '' "><a href="/loaned_history">已借出设备历史</a></li>
      <li v-if="role === 'provider'" role="presentation" :class="type === 'add_device'? 'active' : '' "><a href="/add_device">增加设备</a></li>
      <li role="presentation" :class="type === 'mailbox'? 'active' : '' "><a href="/mailbox">站内信</a></li>
    </ul>

    <div class="list-group">
      <div v-if="type === 'all_devices'">
        <div class="searchBar">
         <form>
          <select name="searchMode" style="margin: 0 10px" v-model="searchMode">
            <option value="DeviceName">Device Name</option>
            <option value="DeviceInfo">Device Info</option>
            <option value="DeviceOwner">Device Owner</option>
          </select>
          <input type="text" placeholder="Search..." v-model="searchKey"/>
        </form>
        </div>
        <a v-for="(item,index) in searchAllDevicesResult" :key="index" v-show="index >= (page-1)*10 && index < page*10" class="list-group-item">
          <device-info :device_id=item.id :device_name=item.name :device_info=item.info :device_contact=item.contact :device_occs=item.occupancies
          :open_apply="true"></device-info>
        </a>
      </div>
      <div v-if="type === 'apply_history'">
        <a v-for="(item,index) in myLoanAppls" :key="index" v-show="index >= (page-1)*10 && index < page*10" class="list-group-item">
          <loan-info :appl="item"></loan-info>
        </a>
      </div>
      <div v-if="type === 'loaned_devices'">
        <a v-for="(item,index) in myLoanApplsActive" :key="index" v-show="index >= (page-1)*10 && index < page*10" class="list-group-item">
          <loan-info :need_return="true" :appl="item" :timer='true' :username="userInfo['name']"></loan-info>
        </a>
      </div>
      <div class="apply_panel" v-if="type === 'apply_provider' && role !== 'provider'">
        <i class="fas fa-user-circle" style="font-size: 100px; margin: 40px"></i>
        <div class="input-group">
          <span class="input-group-addon"><i class="fas fa-flask"></i></span>
          <input type="text" class="form-control" placeholder="Name of Your Lab" v-model="infoLab" required/>
        </div>
        <div class="input-group">
          <span class="input-group-addon"><i class="fas fa-map-marked-alt"></i></span>
          <input type="text" class="form-control" placeholder="Contact Address" v-model="infoAddress" required/>
        </div>
        <div class="input-group">
          <span class="input-group-addon"><i class="fas fa-phone-square-alt"></i></span>
          <input type="text" class="form-control" placeholder="Contact Number" v-model="infoTel" required/>
        </div>
        <div class="input-group">
          <span class="input-group-addon"><i class="fas fa-info"></i></span>
          <input type="text" class="form-control" placeholder="Description" v-model="infoDescription" required/>
        </div>
        <button @click="applyProvider" class="add_button">Apply</button>
      </div>
      <div v-if="type === 'manage_devices' && role === 'provider'">
        <div class="searchBar">
         <form>
          <select name="searchMode" style="margin: 0 10px" v-model="searchMode">
            <option value="DeviceName">Device Name</option>
            <option value="DeviceInfo">Device Info</option>
          </select>
          <input type="text" placeholder="Search..." v-model="searchKey"/>
        </form>
        </div>
        <a v-for="(item,index) in searchMyDevicesResult" :key="index" v-show="index >= (page-1)*10 && index < page*10" class="list-group-item">
          <device-info :device_id=item.id :device_name=item.name :device_info=item.info :device_status=item.status
          :editable="true" :deletable="true" :shelf_op="true"></device-info>
        </a>
      </div>
      <div v-if="type === 'manage_loan_apply' && role === 'provider'">
        <a v-for="(item,index) in myEquipmentsLoanApplications" v-show="index >= (page-1)*10 && index < page*10" class="list-group-item">
          <loan-info :appl='item' :need_examine='item.status === "pending"'></loan-info>
        </a>
      </div>
      <div v-if="type === 'loaned_history' && role === 'provider'">
        <!-- v-for="(item,index) in lists" v-show="index >= (page-1)*10 && index < page*10" class="list-group-item"-->
        <a v-for="index of 30" :key="index" v-show="index >= (page-1)*10 && index < page*10" class="list-group-item">
          <!--device-info :device_name...></device-info-->
          <device-info device_name="test device name" device_address="test device address" device_timeout="test timeout" :device_contact=test></device-info>
          <div class="status_tag">
            <span class="label label-primary">Status</span>
          </div>
        </a>
      </div>
      <div class="apply_panel" v-if="type === 'add_device' && role === 'provider'">
        <i class="fas fa-laptop-house" style="font-size: 100px; margin: 40px"></i>
        <div class="input-group">
          <span class="input-group-addon"><i class="fas fa-tablet-alt"></i></span>
          <input type="text" class="form-control" placeholder="Name of the Device" v-model="deviceName" required/>
        </div>
        <div class="input-group">
          <span class="input-group-addon"><i class="fas fa-info"></i></span>
          <input type="text" class="form-control" placeholder="Device Information" v-model="deviceInfo" required/>
        </div>
        <button class="add_button" v-on:click="addEquipment()">Add Device</button>
      </div>
      <div v-if="type === 'mailbox'">
        <a v-for="(item,index) in mailsList" :key="index" v-show="index >= (page-1)*10 && index < page*10" class="list-group-item">
          <mail :sender="item.sender" :detail="item.detail" :send_time="item.time" :status="item.status" :type="item.type" :related-i-d="item.relatedID"></mail>
        </a>
      </div>
    </div>

    <nav aria-label="Page navigation" v-if="type !== 'add_device' && type !== 'apply_provider'">
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
/* eslint-disable no-unused-vars */
import {Component, Vue, Prop, Watch} from 'vue-property-decorator'
import axios from 'axios'
import VueAxios from 'vue-axios'
import UserInfo from './UserInfo'
import DeviceInfo from './DeviceInfo'
import LoanInfo from './LoanInfo'
import Mail from './Mail'
import {Modal} from "ant-design-vue";
import * as querystring from "querystring";

Vue.use(VueAxios, axios)
@Component({
  components: {UserInfo, DeviceInfo, LoanInfo, Mail}
})

export default class CommonUser extends Vue {
  type = this.$route.params.type || 'all_devices'
  page = 1
  role = ''
  userInfo={}
  deviceName = ''
  deviceInfo = ''
  infoLab = ''
  infoAddress = ''
  infoTel = ''
  infoDescription = ''
  devices_list = []
  provider_devices_list = []
  myLoanAppls = []
  myLoanApplsActive = []
  myEquipmentsLoanApplications = []
  mailsList = []
  
  searchMode = 'DeviceName'
  searchKey = ''

  querystring = require('querystring')

  get searchAllDevicesResult(){
    if (this.searchMode === 'DeviceName'){
      return this.devices_list.filter((device) => {
        return device.name.match(this.searchKey)
      })
    } else if (this.searchMode === 'DeviceInfo'){
      return this.devices_list.filter((device) => {
        return device.info.match(this.searchKey)
      })
    } else {
      return this.devices_list.filter((device) => {
        return device.contact[0].match(this.searchKey)
      })
    }
  }

  get searchMyDevicesResult(){
    if (this.searchMode === 'DeviceName'){
      return this.provider_devices_list.filter((device) => {
        return device.name.match(this.searchKey)
      })
    } else {
      return this.provider_devices_list.filter((device) => {
        return device.info.match(this.searchKey)
      })
    }
  }



  async getAllDevices () {
    try {
      let response = await axios.get('/apis/equipment/search/student')
      if (response.status === 200) {
        this.devices_list = response.data.equipments
      }
    } catch (e) {
      this.$message.error(JSON.stringify(e.response.data.error)) // 在此处弹出提示框
    }
  }
  async getInfo(){
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
      this.checkExaminingStatus()
      if (this.role === 'provider') {
        await this.getProviderDevices()
        await this.getMyEquipmentsLoanApplications()
      } else if (this.role === 'admin'){
        await this.$router.push('/admin')
      }
    }
    catch (e){
      this.$message.error('getInfo:error')
    }
  }

  checkExaminingStatus(){
    if(this.userInfo['examining']==='Pass'){
      Modal.success({content:'您申请成为设备提供者的请求已经通过','onOk':()=>this.confirm()})
    }
    if(this.userInfo['examining']==='Reject'){
      Modal.error({content:`您申请成为设备提供者的请求被拒绝：原因为“${this.userInfo['reject']}”`,'onOk':()=>this.confirm()})
    }
  }

  async confirm(){
    try{
      await axios.post('/apis/users/confirm/apply')
    }
    catch (e){
      this.$message.error('confirm:error')
    }
  }

  async getMails(){
    try{
      let response=await axios.get('/apis/mails/search')
      this.mailsList = response.data
    }
    catch (e){
      this.$message.error(JSON.stringify(e.response.data))
    }
  }

  async applyProvider(){
    try{
      let querystring=require('querystring')
      await axios.post('/apis/users/apply_provider',querystring.stringify({'info_lab':this.infoLab,'info_address':this.infoAddress,
      'info_tel':this.infoTel,'info_description':this.infoDescription}))
       this.infoLab=''
       this.infoTel=''
       this.infoDescription=''
       this.infoAddress=''
      this.$message.success('申请成功！等待管理员审核中')
    }
    catch (e){
      this.$message.error('applyProvider:error')
    }
  }

  async getProviderDevices () {
    try {
      let response = await axios.get('/apis/equipment/search/provider')
      if (response.status === 200) {
        this.provider_devices_list = response.data.equipments
      }
    } catch (e) {
      this.$message.error(JSON.stringify(e.response.data.error)) // 在此处弹出提示框
    }
  }


  async getMyLoanApplications () {
    try {
      let response = await axios.get('/apis/loan/my')
      if (response.status === 200) {
        this.myLoanAppls = response.data.reverse()
        this.myLoanApplsActive = this.myLoanAppls.filter(
          (appl) => appl.status === 'approved' &&
            appl.end_time * 1000 >= Date.now()
        )
      }
    } catch (e) {
      this.$message.error(JSON.stringify(e.response.data.error))
    }
  }

  async getMyEquipmentsLoanApplications () {
    try {
      let response = await axios.get('/apis/loan/my_equipments')
      if (response.status === 200) {
        this.myEquipmentsLoanApplications = response.data
      }
    } catch (e) {
      this.$message.error(JSON.stringify(e.response.data.error))
    }
  }

  async addEquipment () {
    try {
      let response = await axios.post('/apis/provider/add', this.querystring.stringify({
        name: this.deviceName,
        info: this.deviceInfo
      }))
      if (response.status === 200) {
        this.$message.success('添加成功！')
        this.deviceName = ''
        this.deviceInfo = ''
      }
    } catch (e) {
      this.$message.error(JSON.stringify(e.response.data.error)) // 在此处弹出提示框
    }
  }

  mounted () {  
    this.getInfo()
    this.getAllDevices()
    this.getMyLoanApplications()
    this.getMails()
  }
}
  // TODO: redirect

</script>

<style scoped>
.user{
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

.status_tag{
  padding: 5px 10px;
  text-align: left;
}

.apply_panel{
  margin: 20px auto;
  width: 60%
}

.input-group{
  margin: 20px auto;
  width: 75%;
}

.input-group-addon{
  width: 45px;
}

.add_button{
  border-radius: 4px;
  border-color: transparent;
  margin: 25px auto;
  width: 75%;
  height: 36px;
  background: #0079D3;
  color: white;
  text-decoration: none;
}

.add_button:hover{
  background: #0091FF;
  cursor: pointer;
}
</style>

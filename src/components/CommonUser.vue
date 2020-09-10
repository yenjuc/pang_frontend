<template>
<div class="user">
    <ul class="nav nav-pills">
      <li role="presentation" :class="type === 'all_devices'? 'active' : '' "><a href="/all_devices">所有上架设备</a></li>
      <li role="presentation" :class="type === 'apply_history'? 'active' : '' "><a href="/apply_history">查看申请历史</a></li>
      <li role="presentation" :class="type === 'loaned_devices'? 'active' : '' "><a href="/loaned_devices">查看已借设备</a></li>
      <li v-if="role !== 'provider'" role="presentation" :class="type === 'apply_provider'? 'active' : '' "><a href="/apply_provider">申请成为设备提供者</a></li>
      <li v-if="role === 'provider'" role="presentation" :class="type === 'manage_devices'? 'active' : '' "><a href="/manage_devices">管理自己的设备</a></li>
      <li v-if="role === 'provider'" role="presentation" :class="type === 'loan_apply'? 'active' : '' "><a href="/loan_apply">审核租借申请</a></li>
      <li v-if="role === 'provider'" role="presentation" :class="type === 'loaned_history'? 'active' : '' "><a href="/loaned_history">已借出设备历史</a></li>
      <li v-if="role === 'provider'" role="presentation" :class="type === 'add_device'? 'active' : '' "><a href="/add_device">增加设备</a></li>
    </ul>

    <!--v-for item in list...-->
    <div class="list-group">
      <div v-if="type === 'all_devices'">
        <!-- v-for="(item,index) in lists" v-show="index > (page-1)*10 && index <= page*10" class="list-group-item"-->
        <a v-for="(item,index) in devices_list" :key="index" v-show="index >= (page-1)*10 && index <= page*10" class="list-group-item">
          <!--device-info :device_name...></device-info-->
          <device-info :device_name=item.name :device_info=item.info :device_owner=item.contact[0] :device_address=item.contact[2] :device_contact=item.contact[3]></device-info>
          <div>
            <!-- v-if="可申请"-->
            <button type="button" class="btn btn-default">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </a>
      </div>
      <div v-if="type === 'apply_history'">
        <!-- v-for="(item,index) in lists" v-show="index > (page-1)*10 && index <= page*10" class="list-group-item"-->
         <a v-for="index of 30" :key="index" v-show="index > (page-1)*10 && index <= page*10" class="list-group-item">
          <!--loan-info :equipment=item.equipment...></loan-info-->
          <loan-info :appl="{start_time: 1234, end_time: 99999, status: 'accepted', equipment: {name: 999, id: 234}, statement: 'qwqwqwqwq', response: 'quq'}"></loan-info>
        </a>
      </div>
      <div v-if="type === 'loaned_devices'">
        <!-- v-for="(item,index) in lists" v-show="index > (page-1)*10 && index <= page*10" class="list-group-item"-->
        <a v-for="index of 30" :key="index" v-show="index > (page-1)*10 && index <= page*10" class="list-group-item">
          <!--device-info :device_name...></device-info-->
          <device-info device_name="test device name" device_address="test device address" device_timeout="test timeout" :device_contact=test></device-info>
          <div class="status_tag">
            <span class="label label-primary">Status</span>
          </div>
        </a>
      </div>
      <div class="apply_panel" v-if="type === 'apply_provider'">
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
        <button class="add_button">Apply</button>
      </div>
      <div v-if="type === 'manage_devices'">
        <!-- v-for="(item,index) in lists" v-show="index > (page-1)*10 && index <= page*10" class="list-group-item"-->
        <a v-for="index of 30" :key="index" v-show="index > (page-1)*10 && index <= page*10" class="list-group-item">
          <!--device-info :device_name...></device-info-->
          <device-info device_name="test device name" device_address="test device address" device_timeout="test timeout" :device_contact=test></device-info>
          <div>
            <!-- v-show="(!)在架上"-->
            <button type="button" class="btn btn-default">
              <i class="fas fa-arrow-circle-up"></i>
            </button>
            <button type="button" class="btn btn-default">
              <i class="fas fa-arrow-circle-down"></i>
            </button>
            <button type="button" class="btn btn-default">
              <i class="fas fa-edit"></i>
            </button>
            <button type="button" class="btn btn-default">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </a>
      </div>
      <div v-if="type === 'loan_apply'">
        <!-- v-for="(item,index) in lists" v-show="index > (page-1)*10 && index <= page*10" class="list-group-item"-->
         <a v-for="index of 30" :key="index" v-show="index > (page-1)*10 && index <= page*10" class="list-group-item">
          <!--loan-info :equipment=item.equipment...></loan-info-->
          <div>
            <button type="button" class="btn btn-default">
              <i class="fas fa-check-circle"></i>
            </button>
            <button type="button" class="btn btn-default">
              <i class="fas fa-times-circle"></i>
            </button>
          </div>
        </a>
      </div>
      <div v-if="type === 'loaned_history'">
        <!-- v-for="(item,index) in lists" v-show="index > (page-1)*10 && index <= page*10" class="list-group-item"-->
        <a v-for="index of 30" :key="index" v-show="index > (page-1)*10 && index <= page*10" class="list-group-item">
          <!--device-info :device_name...></device-info-->
          <device-info device_name="test device name" device_address="test device address" device_timeout="test timeout" :device_contact=test></device-info>
          <div class="status_tag">
            <span class="label label-primary">Status</span>
          </div>
        </a>
      </div>
      <div class="apply_panel" v-if="type === 'add_device'">
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

Vue.use(VueAxios, axios)
@Component({
  components: {UserInfo, DeviceInfo, LoanInfo}
})

export default class CommonUser extends Vue {
  type = this.$route.params.type || 'users'
  page = 1
  role = 'provider'
  deviceName = ''
  deviceInfo = ''
  infoLab = ''
  infoAddress = ''
  infoTel = ''
  infoDescription = ''
  devices_list = []

  querystring = require('querystring')

  async getAllDevices () {
    try {
      let response = await axios.get('/apis/equipment/search/student')
      if (response.status === 200) {
        this.devices_list = response.data.equipments
      }
    } catch (e) {
      console.log(e.response) // 在此处弹出提示框
    }
  }

  async addEquipment () {
    try {
      let response = await axios.post('/apis/provider/add', this.querystring.stringify({
        name: this.deviceName,
        info: this.deviceInfo
      }))
      if (response.status === 200) {
        // 在此处弹出提示 添加成功

      }
    } catch (e) {
      console.log(e.response.data.error) // 在此处弹出提示框
    }
  }

  mounted () {
    this.getAllDevices()
  }
}

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

<template>
<div class="user">
    <ul class="nav nav-pills">
      <li role="presentation" :class="type === 'all_devices'? 'active' : '' "><a href="/all_devices">所有设备</a></li>
      <li role="presentation" :class="type === 'apply_history'? 'active' : '' "><a href="/apply_history">申请历史</a></li>
      <li role="presentation" :class="type === 'loaned_devices'? 'active' : '' "><a href="/loaned_devices">查看已借设备</a></li>
      <li v-if="role === 'provider'" role="presentation" :class="type === 'manage_devices'? 'active' : '' "><a href="/manage_devices">管理设备</a></li>
      <li v-if="role === 'provider'" role="presentation" :class="type === 'loan_apply'? 'active' : '' "><a href="/loan_apply">审核租借申请</a></li>
      <li v-if="role === 'provider'" role="presentation" :class="type === 'loaned_history'? 'active' : '' "><a href="/loaned_history">已借出设备历史</a></li>
      <li v-if="role === 'provider'" role="presentation" :class="type === 'add_device'? 'active' : '' "><a href="/add_device">上架设备</a></li>
    </ul>

    <!--v-for item in list...-->
    <div class="list-group">
      <div class="devicelist" v-if="type === 'all_devices'">
        <!-- v-for="(item,index) in lists" v-show="index > (page-1)*10 && index <= page*10" class="list-group-item"-->
        <a v-for="index of 30" :key="index" v-show="index > (page-1)*10 && index <= page*10" class="list-group-item">
          <!--device-info :device_name...></device-info-->
          <device-info device_name="test device name" device_address="test device address" device_timeout="test timeout" :device_contact=test></device-info>
          <div>
            <!-- v-if="可申请"-->
            <button type="button" class="btn btn-default">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </a>
      </div>
      <div class="loanlist" v-if="type === 'apply_history'">
        <!-- v-for="(item,index) in lists" v-show="index > (page-1)*10 && index <= page*10" class="list-group-item"-->
         <a v-for="index of 30" :key="index" v-show="index > (page-1)*10 && index <= page*10" class="list-group-item">
          <!--loan-info :equipment=item.equipment...></loan-info-->
          <loan-info equipment="123" start_time="0908" end_time="0910" :statement=test></loan-info>
          <div class="status_tag">
            <span class="label label-primary">Status</span>
          </div>
        </a>
      </div>
      <div class="devicelist" v-if="type === 'loaned_devices'">
        <!-- v-for="(item,index) in lists" v-show="index > (page-1)*10 && index <= page*10" class="list-group-item"-->
        <a v-for="index of 30" :key="index" v-show="index > (page-1)*10 && index <= page*10" class="list-group-item">
          <!--device-info :device_name...></device-info-->
          <device-info device_name="test device name" device_address="test device address" device_timeout="test timeout" :device_contact=test></device-info>
          <div class="status_tag">
            <span class="label label-primary">Status</span>
          </div>
        </a>
      </div>
      <div class="devicelist" v-if="type === 'manage_devices'">
        <!-- v-for="(item,index) in lists" v-show="index > (page-1)*10 && index <= page*10" class="list-group-item"-->
        <a v-for="index of 30" :key="index" v-show="index > (page-1)*10 && index <= page*10" class="list-group-item">
          <!--device-info :device_name...></device-info-->
          <device-info device_name="test device name" device_address="test device address" device_timeout="test timeout" :device_contact=test></device-info>
          <div>
            <button type="button" class="btn btn-default">
              <i class="fas fa-edit"></i>
            </button>
            <button type="button" class="btn btn-default">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </a>
      </div>
      <div class="loanlist" v-if="type === 'loan_apply'">
        <!-- v-for="(item,index) in lists" v-show="index > (page-1)*10 && index <= page*10" class="list-group-item"-->
         <a v-for="index of 30" :key="index" v-show="index > (page-1)*10 && index <= page*10" class="list-group-item">
          <!--loan-info :equipment=item.equipment...></loan-info-->
          <loan-info equipment="123" start_time="0908" end_time="0910" :statement=test></loan-info>
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
      <div class="devicelist" v-if="type === 'loaned_history'">
        <!-- v-for="(item,index) in lists" v-show="index > (page-1)*10 && index <= page*10" class="list-group-item"-->
        <a v-for="index of 30" :key="index" v-show="index > (page-1)*10 && index <= page*10" class="list-group-item">
          <!--device-info :device_name...></device-info-->
          <device-info device_name="test device name" device_address="test device address" device_timeout="test timeout" :device_contact=test></device-info>
          <div class="status_tag">
            <span class="label label-primary">Status</span>
          </div>
        </a>
      </div>
    </div>

    <nav aria-label="Page navigation" v-if="type !== 'add_device'">
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
/* eslint-disable no-unused-vars */
import {Component, Vue, Prop, Watch} from 'vue-property-decorator'
import axios from 'axios'
import VueAxios from 'vue-axios'
import UserInfo from './UserInfo'
import DeviceInfo from './DeviceInfo'
import LoanInfo from './LoanInfo'

Vue.use(VueAxios, axios)
@Component({components: {UserInfo, DeviceInfo, LoanInfo}})

export default class CommonUser extends Vue {
  type = this.$route.params.type || 'users'
  page = 1
  role = 'provider'
  list = []
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
</style>

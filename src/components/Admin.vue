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

    <!--v-for item in list...-->
    <div class="list-group">
      <div v-if="type === 'users'">
        <!-- v-for="(item,index) in lists" v-show="index > (page-1)*10 && index <= page*10" class="list-group-item"-->
        <a v-for="index of 30" :key="index" v-show="index > (page-1)*10 && index <= page*10" class="list-group-item">
          <!--user-info :username=item.username :email=item.email></user-info-->
          <user-info username="test name" email="test email"></user-info>
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
      <div v-if="type === 'devices'">
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
      <div v-if="type === 'loan_apply'">
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
            <button type="button" class="btn btn-default">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </a>
      </div>
      <div v-if="type === 'provider_apply'">
        <!-- v-for="(item,index) in lists" v-show="index > (page-1)*10 && index <= page*10" class="list-group-item"-->
        <a v-for="index of 30" :key="index" v-show="index > (page-1)*10 && index <= page*10" class="list-group-item">
          <!--user-info :username=item.username :email=item.email></user-info-->
          <user-info username="test name" email="test email"></user-info>
          <div>
            <button type="button" class="btn btn-default">
              <i class="fas fa-check-circle"></i>
            </button>
            <button type="button" class="btn btn-default">
              <i class="fas fa-times-circle"></i>
            </button>
            <button type="button" class="btn btn-default">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </a>
      </div>
      <div v-if="type === 'device_apply'">
        <!-- v-for="(item,index) in lists" v-show="index > (page-1)*10 && index <= page*10" class="list-group-item"-->
        <a v-for="index of 30" :key="index" v-show="index > (page-1)*10 && index <= page*10" class="list-group-item">
          <!--device-info :device_name=item.equipment...></device-info-->
          <device-info device_name="test device name" device_address="test device address" device_timeout="test timeout" :device_contact=test></device-info>
          <div>
            <button type="button" class="btn btn-default">
              <i class="fas fa-check-circle"></i>
            </button>
            <button type="button" class="btn btn-default">
              <i class="fas fa-times-circle"></i>
            </button>
            <button type="button" class="btn btn-default">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
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

Vue.use(VueAxios, axios)
@Component({components: {UserInfo, DeviceInfo, LoanInfo}})

export default class Admin extends Vue {
  type = this.$route.params.type || 'users'
  page = 1
  list = []
  res={}
  test= 'test bind'
  async user_load (examining) {
    this.res = await axios({
      url: 'http://localhost:8000/admin/users/query',
      params: {
        examining: examining
      }
    })
  }

  querystring = require('querystring')

  async user_delete (username) {
    await axios.post(`http://localhost:8000/admin/users/${username}/delete`, this.querystring({'username': username}))
  }
  mounted () {
    this.user_load('false')
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
</style>

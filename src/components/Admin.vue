<template>
  <div class="admin">
    <ul class="nav nav-pills">
      <li role="presentation" :class="type === 'users'? 'active' : '' "><a href="/admin/users">管理用户</a></li>
      <li role="presentation" :class="type === 'devices'? 'active' : '' "><a href="/admin/devices">管理设备</a></li>
      <li role="presentation" :class="type === 'rent_apply'? 'active' : '' "><a href="/admin/rent_apply">管理租借申请</a></li>
      <li role="presentation" :class="type === 'provider_apply'? 'active' : '' "><a href="/admin/provider_apply">管理提供者申请</a></li>
      <li role="presentation" :class="type === 'device_apply'? 'active' : '' "><a href="/admin/device_apply">管理设备上架</a></li>
      <li role="presentation" :class="type === 'statistics'? 'active' : '' "><a href="/admin/statistics">平台数据一览</a></li>
    </ul>

    <!--v-for item in list...-->
    <div class="list-group">
      <div class="userslist" v-if="type === 'users'">
        <!-- v-for="(item,index) in lists" v-show="index > (page-1)*10 && index <= page*10" class="list-group-item"-->
        <a v-for="index of 30" :key="index" v-show="index > (page-1)*10 && index <= page*10" class="list-group-item">
          <!--user-info username=item.username email=item.email></username-->
          <user-info username="test name" email="test email"></user-info>
        </a>
      </div>
    </div>

    <nav aria-label="Page navigation">
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
// eslint-disable-next-line no-unused-vars
import {Component, Vue, Prop, Watch} from 'vue-property-decorator'
import axios from 'axios'
import VueAxios from 'vue-axios'
import UserInfo from './UserInfo'
import instance from '../axios_baseurl'

Vue.use(VueAxios, axios)
@Component({components: {UserInfo}})

export default class Admin extends Vue {
  type = this.$route.params.type || 'users'
  page = 1
  list = []
  res={}

  async user_load(examining) {
      this.res = await axios({
        url: 'http://localhost:8000/admin/users/query',
        params: {
          examining: examining
        }
      })
  }

  mounted(){
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

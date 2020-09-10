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
    <!--child component-->
    <div class="list-group">
      <a v-for="index of 30" :key="index" v-show="index > (page-1)*10 && index <= page*10" class="list-group-item" style="display: flex">
        <div class="info_block">
          <h4 class="list-group-item-heading">Username {{index}}</h4>
          <p class="list-group-item-text">@email</p>
        </div>
        <!--div class="dropdown open">
          <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          设定用户类型
          <span class="caret"></span>
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li><a href="#">普通用户</a></li>
            <li><a href="#">设备提供者</a></li>
          </ul>
        </div-->
        <button type="button" class="btn btn-default">
          <i class="fas fa-edit"></i>
        </button>
        <button type="button" class="btn btn-default">
          <i class="fas fa-trash-alt"></i>
        </button>
      </a>
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
export default {
  data () {
    return {
      type: this.$route.params.type || 'users',
      page: 1,
      list: []
    }
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

.info_block{
  width: 90%;
  padding: 10px;
  text-align: left;
}

.btn-default{
  margin: 0 auto;
}
</style>

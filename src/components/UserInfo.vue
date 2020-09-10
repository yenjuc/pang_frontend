<template>
  <div class="user" style="display: flex">
      <div class="info_block">
        <h4 class="list-group-item-heading">{{username}}</h4>
        <div class="detailedinfo">
          <i class="fas fa-envelope"></i>
          <span class="list-group-item-text">{{email}}</span>
        </div>
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
  </div>
</template>

<script>
export default {
  props: ['username', 'email']
}
</script>>

<style scoped>

.btn-default{
  margin: 0 5px;
  width: 42px;
}

</style>

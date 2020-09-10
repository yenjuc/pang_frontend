<template>
  <div class="admin">
    <ul class="nav nav-pills">
      <li role="presentation" class="active"><a href="#">管理用户</a></li>
      <li role="presentation"><a href="#">管理设备</a></li>
      <li role="presentation"><a href="#">管理租借申请</a></li>
      <li role="presentation"><a href="#">管理提供者申请</a></li>
      <li role="presentation"><a href="#">管理设备上架</a></li>
      <li role="presentation"><a href="#">平台数据一览</a></li>
    </ul>

    <!--v-for ...-->
    <div class="list-group">
      <a href="#" class="list-group-item" style="display: flex">
        <h4 class="list-group-item-heading">Username</h4>
        <p class="list-group-item-text">@email</p>
        <div class="dropdown open">
          <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          设定用户类型
          <span class="caret"></span>
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li><a href="#">普通用户</a></li>
            <li><a href="#">设备提供者</a></li>
          </ul>
        </div>
      </a>
    </div>

    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li>
          <a href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li><a href="#">1</a></li>
        <li><a href="#">2</a></li>
        <li><a href="#">3</a></li>
        <li><a href="#">4</a></li>
        <li><a href="#">5</a></li>
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

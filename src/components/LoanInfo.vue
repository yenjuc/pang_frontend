<template>
  <div class="loan">
      <div class="info_block">
        <h4 class="list-group-item-heading">设备id：{{equipment}}</h4>
        <div style="display: inline-block">
          <div class="detailedinfo">
            <i class="fas fa-clock"></i>
            <span class="list-group-item-text">{{start_time}}-{{end_time}}</span>
          </div>
          <div class="detailedinfo">
            <i class="fas fa-thumbtack"></i>
            <span class="list-group-item-text">{{statement}}</span>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: ['equipment', 'start_time', 'end_time', 'statement']
}
</script>>

<style scoped>

.btn-default{
  margin: 0 5px;
  width: 42px;
}

</style>

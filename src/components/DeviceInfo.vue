<template>
  <div class="device">
      <div class="info_block">
        <h4 class="list-group-item-heading">{{device_name}}</h4>
        <div style="display: inline-block">
          <div class="detailedinfo">
            <i class="fas fa-clock"></i>
            <span class="list-group-item-text">{{device_info}}</span>
          </div>
          <div class="detailedinfo">
            <i class="fas fa-map-marker-alt"></i>
            <span class="list-group-item-text">{{device_address}}</span>
          </div>
          <div class="detailedinfo">
            <i class="fas fa-user-circle"></i>
            <span class="list-group-item-text">{{device_owner}}</span>
          </div>
          <div class="detailedinfo">
            <i class="fas fa-address-book"></i>
            <span class="list-group-item-text">{{device_contact}}</span>
          </div>
          <div class="detailedinfo">
            <i class="fas fa-address-book"></i>
            <span class="list-group-item-text">{{device_status}}</span>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: ['device_name', 'device_address', 'device_info', 'device_owner', 'device_contact', 'device_status']
}
</script>>

<style scoped>

.btn-default{
  margin: 0 5px;
  width: 42px;
}

</style>

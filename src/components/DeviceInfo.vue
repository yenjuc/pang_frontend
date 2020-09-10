<template>
  <div class="device">
      <div class="info_block">
        <h4 class="list-group-item-heading">{{device_name}}</h4>
        <div style="display: inline-block">
          <div class="detailedinfo">
            <i class="fas fa-user-circle"></i>
            <span class="list-group-item-text">{{device_contact[0]}}</span>
          </div>
          <div class="detailedinfo">
            <i class="fas fa-map-marker-alt"></i>
            <span class="list-group-item-text">{{device_contact[1]}} ({{device_contact[2]}})</span>
          </div>
          <div class="detailedinfo">
            <i class="fas fa-address-book"></i>
            <span class="list-group-item-text">{{device_contact[3]}}</span>
          </div>
          <span v-for='(occ, idx) in device_occs' :key='idx'>
            <br>
            <div class="detailedinfo" style='margin-top: -10px'>
              <i class="fas fa-clock"></i>
              <span class="list-group-item-text">已被占用于 {{ formatTime(occ[0]) }} – {{ formatTime(occ[1]) }}</span>
            </div>
          </span>
        </div>
        <h5>详细信息</h5>
        <p>{{ device_info }}</p>
      </div>
  </div>
</template>

<script>
import {Component, Vue, Prop, Watch} from 'vue-property-decorator'

@Component
export default class DeviceInfo extends Vue {
  @Prop({type: String}) device_name
  @Prop({type: Array}) device_contact
  @Prop({type: Array}) device_occs
  @Prop({type: String}) device_info

  formatTime (timestamp) {
    return (new Date(timestamp * 1000)).toLocaleString('zh-CN');
  }
}
</script>

<style scoped>

.btn-default{
  margin: 0 5px;
  width: 42px;
}

h5 {
  margin: 18px 0 6px 0;
}

</style>

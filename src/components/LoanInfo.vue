<template>
  <div class="loan">
      <div class="info_block">
        <h4 class="list-group-item-heading">
          <span>{{appl.equipment.name}}</span>
          <span :class="'label label-' + (appl.status === 'pending' ? 'default' :
            (appl.status === 'accepted' ? 'success' : 'danger'))">{{ appl.status }}</span>
        </h4>
        <div style="display: inline-block">
          <div class="detailedinfo">
            <i class="fas fa-clock"></i>
            <span class="list-group-item-text">{{formatTime(appl.start_time)}} – {{formatTime(appl.end_time)}}</span>
          </div>
        </div>
        <h5>申请理由</h5>
        <p>{{appl.statement}}</p>
        <h5>审核留言</h5>
        <p>{{appl.response}}</p>
      </div>
      <div class="status_tag">
      </div>
  </div>
</template>

<script>
import {Component, Vue, Prop, Watch} from 'vue-property-decorator'

@Component
export default class LoanInfo extends Vue {
  @Prop({type: Object}) appl

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

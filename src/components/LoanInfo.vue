<template>
  <div class="loan" style="display: flex">
    <div class="info_block">
        <h4 class="list-group-item-heading">
          <span>(#{{appl.id}}) {{appl.equipment.name}}</span>
          <span v-if='timer'
            :class="'label label-' + (countdown() < 0 ? 'warning' : 'success')">
              距{{ countdown() < 0 ? '开始' : '归还' }} {{ Math.ceil(Math.abs(countdown()) / 86400000) }} 天
          </span>
          <span v-else
            :class="'label label-' + (appl.status === 'pending' ? 'default' :
            (appl.status === 'approved' ? 'success' : 'danger'))">{{ appl.status }}</span>
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
      <div v-if="need_examine">
        <button type="button" class="btn btn-default">
          <i class="fas fa-check-circle"></i>
        </button>
      </div>
      <div v-if="need_examine">
        <button type="button" class="btn btn-default">
          <i class="fas fa-times-circle" style="font-size: 40px"></i>
        </button>
      </div>
      <div v-if="deletable">
        <button type="button" class="btn btn-default">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
  </div>
</template>

<script>
import {Component, Vue, Prop, Watch} from 'vue-property-decorator'

@Component
export default class LoanInfo extends Vue {
  @Prop({type: Object}) appl
  @Prop({type: Boolean}) timer

  // TODO: check whether the buttons are shown properly (have not tested)
  @Prop({type: Boolean, default: false}) deletable
  @Prop({type: Boolean, default: false}) need_examine

  formatTime (timestamp) {
    return (new Date(timestamp * 1000)).toLocaleString('zh-CN');
  }

  countdown () {
    const now = Date.now()
    if (this.appl.start_time * 1000 > now) {
      // Not yet started
      return -(this.appl.start_time * 1000 - now);
    } else {
      // Active
      return Math.max(0, this.appl.end_time * 1000 - now);
    }
  }
}
</script>

<style scoped>

.btn-default{
  margin: 0 5px;
  width: 42px;
  height: 100%;
}

h5 {
  margin: 18px 0 6px 0;
}

</style>

<template>
<div>
  <div class="loan" style="display: flex">
    <div class="info_block">
        <h4 class="list-group-item-heading">
          <span>(#{{appl.id}}) {{appl.equipment.name}}</span>
          <span v-if='timer'
            :class="'label label-' + (countdown() < 0 ? 'warning' : countdown() === 0 ? 'danger' : 'success')">
              距{{ countdown() < 0 ? '开始' : '归还' }} {{ Math.ceil(Math.abs(countdown()) / 86400000) }} 天
          </span>
          <span v-if='!timer || appl.status === "prefinish"'
            :class="'label label-' + (appl.status === 'pending' ? 'default' :
            (appl.status === 'approved' ? 'success' :
             appl.status === 'prefinish' ? 'warning' :
             appl.status === 'finished' ? 'primary' : 'danger'))">{{
              appl.status === 'prefinish' ? 'returned' :
              appl.status }}</span>
        </h4>
        <div style="display: inline-block">
          <div class="detailedinfo">
            <i class="fas fa-user-circle"></i>
            <span class="list-group-item-text">拥有者：{{ appl.owner.username }}</span>
          </div>
          <div class="detailedinfo">
            <i class="fas fa-user-circle"></i>
            <span class="list-group-item-text">申请者：{{ appl.applicant.username }}</span>
          </div>
          <div class="detailedinfo">
            <i class="fas fa-clock"></i>
            <span class="list-group-item-text">{{formatTime(appl.start_time)}} – {{formatTime(appl.end_time)}}</span>
          </div>
        </div>
        <h5>申请理由</h5>
        <p>{{appl.statement}}</p>
        <template v-if="appl.status !== 'pending'">
          <h5>审核留言</h5>
          <p>{{appl.response}}</p>
        </template>
      </div>
      <div v-if="need_examine">
        <button type="button" class="btn btn-default" @click='showExamine = !showExamine'>
          <i class="fas fa-pencil-alt"></i>
        </button>
      </div>
      <div v-if="deletable">
        <button type="button" class="btn btn-default">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
      <div v-if="need_return && !returned">
        <button type="button" class="btn btn-default" v-on:click="return_device()">
          <i class="fas fa-reply"></i>
        </button>
      </div>
    </div>
  <div v-if='showExamine' style='display: contents; width: 100%'>
    <label><input type='radio' name='approve' v-model='reviewApprove' :value='true'> Approve</label>
    <label><input type='radio' name='approve' v-model='reviewApprove' :value='false'> Reject</label>
    <textarea rows='7' class='form-control' placeholder='审核留言…'
      style='margin-bottom: 6px; width: 90%; margin: 0 5%'
      v-model='reviewResponse'></textarea>
    <br>
    <button type="button" class="btn btn-primary" @click='submitReview'>
      <i class="fas fa-paper-plane"></i> 提交
    </button>
  </div>
</div>
</template>

<script>
import {Component, Vue, Prop, Watch} from 'vue-property-decorator'
import axios from 'axios'
import VueAxios from 'vue-axios'
import * as querystring from "querystring";

Vue.use(VueAxios, axios);

@Component
export default class LoanInfo extends Vue {
  @Prop({type: Object}) appl
  @Prop({type: String}) username
  @Prop({type: Boolean}) timer

  @Prop({type: Boolean, default: false}) deletable
  @Prop({type: Boolean, default: false}) need_examine
  @Prop({type: Boolean, default: false}) need_return
  returned = false  // 归还之后的临时标记

  showExamine = false
  reviewApprove = true
  reviewResponse = ''

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

  async submitReview () {
    try {
      const response = await axios.post(
        `/apis/loan/${this.appl.id}/review`, querystring.stringify({
          accept: (this.reviewApprove ? 1 : 0),
          response: this.reviewResponse,
        })
      );
      if (response.status === 200) {
        this.showExamine = false
        this.appl.status = (this.reviewApprove ? 'approved' : 'rejected');
        this.appl.response = this.reviewResponse;
        // 发送站内信
        await axios.post('/apis/mails/add',querystring.stringify({receiver:this.appl.applicant.username,detail:`your application for equipment ${this.appl.equipment.name} is ${this.appl.status}，
        the reason is ${this.appl.response}`, type:'LoanReturn',relatedID:this.appl.id}))
      }
    } catch (e) {
      this.$message.error(JSON.stringify(e.response.data.error));
    }
  }

  async return_device() {
    try {
      const response = await axios.post(
          `/apis/loan/prefinish/${this.appl.id}`);
      if (response.status === 200) {
        await axios.post('/apis/mails/add', querystring.stringify({receiver:this.appl.equipment.ownername,detail:`您的设备${this.appl.equipment.name}已被用户${this.appl.applicant.username}归还`,
          type:'LoanReturn',relatedID:this.appl.id}))
        this.returned = true;
        this.$message.success('已成功标记为归还');
      }
    } catch (e) {
      this.$message.error(JSON.stringify(e.response.data.error));
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

label {
  margin: 0 2em;
}

</style>

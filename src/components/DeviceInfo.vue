<template>
<div>
  <div class="device" style="display: flex">
      <div class="info_block">
        <h4 class="list-group-item-heading">{{device_name_updated}}
          <span v-if='device_status_updated'
            :class="'label label-' +
              (device_status_updated === 'exist' ? 'default' :
               device_status_updated === 'on_shelf' ? 'success' : 'warning')"
            >{{ device_status_updated === 'exist' ? 'off_shelf' : device_status_updated }}</span>
        </h4>
        <div style="display: inline-block">
          <template v-if="device_contact != undefined">
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
          </template>
          <span v-for='(occ, idx) in device_occs' :key='idx'>
            <br>
            <div class="detailedinfo" style='margin-top: -10px'>
              <i class="fas fa-clock"></i>
              <span class="list-group-item-text">已被占用于 {{ formatTime(occ[0]) }} – {{ formatTime(occ[1]) }}</span>
            </div>
          </span>
        </div>
        <h5>详细信息</h5>
        <p>{{ device_info_updated }}</p>
      </div>

      <div v-if="open_apply">
        <button type="button" class="btn btn-default" v-on:click="showApply = !showApply">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
      <div v-if="need_examine" @click="device_check_pass('true')">
        <button type="button" class="btn btn-default">
          <i class="fas fa-check-circle"></i>
        </button>
      </div>
      <div v-if="need_examine" @click="showExamine = !showExamine">
        <button type="button" class="btn btn-default">
          <i class="fas fa-times-circle"></i>
        </button>
      </div>
      <div v-if="shelf_op && device_status_updated === 'exist'">
        <button v-on:click="on_shelf()" type="button" class="btn btn-default">
          <i class="fas fa-arrow-circle-up"></i>
        </button>
      </div>
      <div v-if="shelf_op && device_status_updated === 'on_shelf'">
        <button v-on:click="down_shelf()" type="button" class="btn btn-default">
          <i class="fas fa-arrow-circle-down"></i>
        </button>
      </div>

      <div v-if="editable && (admin || device_status_updated === 'exist')">
        <button type="button" class="btn btn-default" v-on:click="showEdit = !showEdit; editName = device_name_updated; editInfo = device_info_updated">
          <i class="fas fa-edit"></i>
        </button>
      </div>
      <div v-if="deletable && device_status_updated === 'exist'">
        <button v-on:click="delete_device()" type="button" class="btn btn-default">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>

    <div class="pop_panel" id="edit_panel" v-if="showEdit && (admin || device_status_updated === 'exist')">
      <div class="input-group">
        <span class="input-group-addon"><i class="fas fa-tablet-alt"></i></span>
        <input type="text" class="form-control" placeholder="Edit Device Name" v-model="editName">
      </div>
      <div class="input-group">
        <span class="input-group-addon"><i class="fas fa-info"></i></span>
        <input type="text" class="form-control" placeholder="Edit Device Info" v-model="editInfo">
        <span class="input-group-btn">
          <button class="btn btn-default" type="button" v-on:click="update_device()">
            <i class="fas fa-check-square"></i>
          </button>
        </span>
      </div>
    </div>

    <div class="pop_panel" id="apply_panel" style='display: contents' v-if="showApply">
      <h5>租借申请表</h5>
      <div>
        <input class='form-control' type='date' placeholder='起始日期'
          style='margin-bottom: 6px; width: 45%; display: inline'
          v-model='loanStartDate'>
        <input class='form-control' type='time' placeholder='时间'
          style='margin-bottom: 6px; width: 45%; display: inline'
          v-model='loanStartTime'>
      </div>
      <div>
        <input class='form-control' type='date' placeholder='结束日期'
          style='margin-bottom: 6px; width: 45%; display: inline'
          v-model='loanEndDate'>
        <input class='form-control' type='time' placeholder='时间'
          style='margin-bottom: 6px; width: 45%; display: inline'
          v-model='loanEndTime'>
      </div>
      <textarea rows='7' class='form-control' placeholder='申请理由…'
        style='margin-bottom: 6px; width: 90%; margin: 0 5%'
        v-model='loanStatement'></textarea>
      <br>
      <button type="button" class="btn btn-primary" @click='submitLoanApplForm'>
        <i class="fas fa-paper-plane"></i> 提交
      </button>
    </div>

    <div v-if="showExamine" style='display: contents; width: 100%'>
    <textarea rows='7' class='form-control' placeholder='拒绝原因…'
      style='margin-bottom: 6px; width: 90%; margin: 20px 5% 0'
      v-model='reviewResponse'></textarea>
    <br>
    <button type="button" class="btn btn-primary" @click="device_check_pass('false')">
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

Vue.use(VueAxios, axios)
@Component
export default class DeviceInfo extends Vue {

  showEdit = false
  showApply = false
  showExamine = false

  reviewResponse = ''

  editName = ''
  editInfo = ''

  loanStartDate = ''
  loanStartTime = '00:00:00'
  loanEndDate = ''
  loanEndTime = '00:00:00'
  loanStatement = ''

  @Prop({type: Boolean}) admin

  @Prop({type: Number}) device_id
  @Prop({type: String}) device_name
  @Prop({type: Array})  device_contact
  @Prop({type: Array})  device_occs
  @Prop({type: String}) device_info
  @Prop({type: String}) device_status

  device_status_override = ''
  device_name_override = ''
  device_info_override = ''
  get device_status_updated () { return this.device_status_override || this.device_status; }
  get device_name_updated () { return this.device_name_override || this.device_name; }
  get device_info_updated () { return this.device_info_override || this.device_info; }

  @Prop({type: Boolean, default: false}) deletable
  @Prop({type: Boolean, default: false}) editable
  @Prop({type: Boolean, default: false}) need_examine
  @Prop({type: Boolean, default: false}) open_apply
  @Prop({type: Boolean, default: false}) shelf_op

  formatTime (timestamp) {
    return (new Date(timestamp * 1000)).toLocaleString('zh-CN');
  }


  async on_shelf() {
    try {
      let response = await axios.post(`/apis/provider/on-shelf-apply/${this.device_id}`)
      if (response.status === 200) {
        // 弹框 表示发送上架审核申请成功 然后刷新
        this.$message.success(h => {
          return h('span', [
            h('span', '设备 '),
            h('strong', this.device_name),
            h('span', ' 已申请上架'),
          ]);
        });
        this.device_status_override = 'wait_on_shelf';
      }
    } catch (e) {
      this.$message.error(JSON.stringify(e.response.data.error)) // 在此处弹出提示框
    }
  }

  querystring=require('querystring')

  async device_check_pass (pass) {
    if (pass === 'true') {
      try {
        await axios.post(`/apis/admin/equipment/check/apply/${this.device_id}`, this.querystring.stringify({pass: pass}))
        await axios.post('/apis/mails/add',this.querystring.stringify({receiver:this.device_contact[0],detail:`您的设备${this.device_name}上架申请已被通过`,
        type:'EquipmentOnShelf',relatedID:this.device_id}))
        this.$emit('apply_equipment_load')
        window.location = window.location
      } catch (e) {
        this.$message.error(JSON.stringify(e.response.data.error))
      }
    }
    else if (pass === 'false' )
    {
      try{
        await axios.post(`/apis/admin/equipment/check/apply/${this.device_id}`, this.querystring.stringify({pass: pass,reason:'no reason'}))
        await axios.post('/apis/mails/add',this.querystring.stringify({receiver:this.device_contact[0],detail:`您的设备${this.device_name}上架申请被拒绝，
        拒绝理由为${this.reviewResponse}`, type:'EquipmentOnShelf',relatedID:this.device_id}))
        this.$emit('apply_equipment_load')
        window.location = window.location
      }catch (e){
        this.$message.error(JSON.stringify(e.response.data.error))
      }
    }
  }

  async down_shelf() {
    try {
      let response = await axios.post(`/apis/provider/undercarriage/${this.device_id}`)
      if (response.status === 200) {
        // 弹框 表示下架成功 然后刷新
        this.$message.success(h => {
          return h('span', [
            h('span', '设备 '),
            h('strong', this.device_name),
            h('span', ' 已下架'),
          ]);
        });
        this.device_status_override = 'exist';
      }
    } catch (e) {
      this.$message.error(JSON.stringify(e.response.data.error)) // 在此处弹出提示框
    }
  }


  async delete_device() {
    try {
      let response = await axios.post(`/apis/equipment/delete/${this.device_id}`)
      if (response.status === 200) {
        // 弹框 表示删除成功 然后刷新
        window.location = window.location
      }
    } catch (e) {
      this.$message.error(JSON.stringify(e.response.data.error)) // 在此处弹出提示框
    }
  }


  querystring = require('querystring')
  async update_device() {
    try {
      let response = await axios.post(`/apis/provider/update/${this.device_id}`, this.querystring.stringify({
        name: this.editName,
        info: this.editInfo,
      }))
      if (response.status === 200) {
        // 在此处弹出提示 修改成功
        this.device_name_override = this.editName
        this.device_info_override = this.editInfo
        this.showEdit = false
        this.$message.success('设备信息修改成功')
      }
    } catch (e) {
      this.$message.error(JSON.stringify(e.response.data.error)) // 在此处弹出提示框
    }
  }


  // TODO: 函数属性（get (?)）判断是否为可租借设备（即当前没有租借出去）   --- 考虑直接从设备status获取

  // TODO: 点击修改提交发送修改设备申请（内容：this.editName, this.editInfo）

  // TODO: (optional) 点击修改打开修改列表时，利用"通过设备id获取详细信息"接口（传入this.device_id）取得修改前的值载入editName和editInfo中

  async submitLoanApplForm() {
    const startDate = new Date(this.loanStartDate + ' ' + this.loanStartTime)
    const endDate = new Date(this.loanEndDate + ' ' + this.loanEndTime)
    if (!isFinite(startDate) || !isFinite(endDate)) {
      this.$message.error('无效日期');
      return;
    }
    if (startDate >= endDate) {
      this.$message.error('起始日期需要早于结束日期');
      return;
    }
    try{
    const response = await axios.post(
      '/apis/loan/create', querystring.stringify({
        equipment: this.device_id,
        start_time: Math.ceil(startDate.getTime() / 1000),
        end_time: Math.floor(endDate.getTime() / 1000),
        statement: this.loanStatement,
      })
    );
    if (response.status === 200) {
      // await this.$router.push('/apply_history');
      window.location = '/apply_history';
    }
    }
    catch (e){
      this.$message.error(JSON.stringify(e.response.data))
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

.pop_panel{
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 10px 0;
  height: 30px;
}

</style>

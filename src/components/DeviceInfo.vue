<template>
<div>
  <div class="device" style="display: flex">
      <div class="info_block">
        <h4 class="list-group-item-heading">{{device_name}}</h4>
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
        <p>{{ device_info }}</p>
      </div>

      <!-- v-if open_apply && can_apply -->
      <div v-if="open_apply">
        <button type="button" class="btn btn-default" v-on:click="showApply = !showApply">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
      <div v-if="need_examine">
        <button type="button" class="btn btn-default">
          <i class="fas fa-check-circle"></i>
        </button>
      </div>
      <div v-if="need_examine">
        <button type="button" class="btn btn-default">
          <i class="fas fa-times-circle"></i>
        </button>
      </div>
      <!-- v-if="shelf_op && device_status === '...'" 判断是否可以上架（未上架）或下架（正在架上）属性值不是很清楚，明天询问-->
      <div v-if="shelf_op">
        <button v-on:click="on_shelf()" type="button" class="btn btn-default">
          <i class="fas fa-arrow-circle-up"></i>
        </button>
      </div>
      <div v-if="shelf_op">
        <button v-on:click="down_shelf()" type="button" class="btn btn-default">
          <i class="fas fa-arrow-circle-down"></i>
        </button>
      </div>

      <div v-if="editable">
        <button type="button" class="btn btn-default" v-on:click="showEdit = !showEdit">
          <i class="fas fa-edit"></i>
        </button>
      </div>
      <div v-if="deletable">
        <button v-on:click="delete_device()" type="button" class="btn btn-default">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>

    <div class="pop_panel" id="edit_panel" v-if="showEdit">
      <div class="input-group">
        <span class="input-group-addon"><i class="fas fa-tablet-alt"></i></span>
        <input type="text" class="form-control" placeholder="Edit Device Name" v-model="editName">
      </div>
      <div class="input-group">
        <span class="input-group-addon"><i class="fas fa-info"></i></span>
        <input type="text" class="form-control" placeholder="Edit Device Info" v-model="editInfo">
        <span class="input-group-btn">
          <button class="btn btn-default" type="button" v-on:click="showEdit != showEdit">
            <i class="fas fa-check-square"></i>
          </button>
        </span>
      </div>
    </div>

    <div class="pop_panel" id="apply_panel" v-if="showApply">
      <div class="input-group">
        <span class="input-group-addon"><i class="fas fa-info"></i></span>
        <input type="text" class="form-control" placeholder="Reasons" v-model="loanReason">
      </div>
      <div class="input-group">
        <span class="input-group-addon"><i class="far fa-calendar-alt"></i></span>
        <input type="date" class="form-control" v-model="loanEndTime">
        <span class="input-group-btn">
          <button class="btn btn-default" type="button" v-on:click="showApply != showApply">
            <i class="fas fa-check-square"></i>
          </button>
        </span>
      </div>
    </div>
</div>
</template>

<script>
import {Component, Vue, Prop, Watch} from 'vue-property-decorator'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
@Component
export default class DeviceInfo extends Vue {

  showEdit = false
  showApply = false

  editName = ""
  editInfo = ""

  loanReason = ""
  // TODO: 确认input data的类型、是否有成功绑定到loanEndTime上
  loanEndTime = ""

  @Prop({type: Number}) device_id
  @Prop({type: String}) device_name
  @Prop({type: Array})  device_contact
  @Prop({type: Array})  device_occs
  @Prop({type: String}) device_info

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
      }
    } catch (e) {
      console.log(e.response) // 在此处弹出提示框
    }
  }


  async down_shelf() {
    try {
      let response = await axios.post(`/apis/provider/undercarriage/${this.device_id}`)
      if (response.status === 200) {
        // 弹框 表示下架成功 然后刷新
      }
    } catch (e) {
      console.log(e.response) // 在此处弹出提示框
    }
  }


  async delete_device() {
    try {
      let response = await axios.post(`/apis/equipment/delete/${this.device_id}`)
      if (response.status === 200) {
        // 弹框 表示删除成功 然后刷新
      }
    } catch (e) {
      console.log(e.response) // 在此处弹出提示框
    }
  }


  // TODO: 函数属性（get (?)）判断是否为可租借设备（即当前没有租借出去）

  // TODO: 点击修改提交发送修改设备申请（内容：this.editName, this.editInfo）

  // TODO: (optional) 点击修改打开修改列表时，利用"通过设备id获取详细信息"接口（传入this.device_id）取得修改前的值载入editName和editInfo中

  // TODO: 点击申请按钮发送租借申请（内容：this.loanReason, this.loanEndTime）

  // TODO: 上架(on_shelf)与下架(down_shelf)逻辑
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

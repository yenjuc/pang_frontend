<template>
  <div class="login-panel">
    <div class="input-group">
      <span class="input-group-addon"><i class="fas fa-user-circle"></i></span>
      <input type="text" class="form-control" placeholder="Username">
    </div>

    <div class="input-group">
      <span class="input-group-addon"><i class="fas fa-unlock-alt"></i></span>
      <input type="text" class="form-control" placeholder="Password">
    </div>

    <div class="btn-group" role="group" aria-label="...">
      <button type="button" class="btn btn-default">Logon</button>
      <button type="button" class="btn btn-default">Login</button>
    </div>

  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import {Component, Vue, Prop, Watch} from 'vue-property-decorator'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
@Component
export default class Login extends Vue {
}
</script>>

<style scoped>
.login-panel{
  left: 50%;
  top: 50%;
  background-color:rgba(255, 255, 255, 0.7);
  margin: 10px auto;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  width: 70%;
}

.login-panel i{
  color: #2C3E50;
  font-size: 20px;
}

.input-group{
  margin: 10px auto;
  width: 80%;
}

.input-group-addon{
  width: 45px;
}

</style>

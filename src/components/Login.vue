<template>
  <div class="login-panel">
    <i class="fas fa-dolly-flatbed" style="font-size: 100px; margin: 40px"></i>
    <div class="input-group">
      <span class="input-group-addon"><i class="fas fa-user-circle"></i></span>
      <input type="text" class="form-control" placeholder="Username" v-model="username">
    </div>

    <div class="input-group">
      <span class="input-group-addon"><i class="fas fa-unlock-alt"></i></span>
      <input type="password" class="form-control" placeholder="Password" v-model="password">
    </div>

    <div style="display: flex; width: 50%; margin:30px auto 10px">
      <router-link v-bind:to="'/logon'">Logon</router-link>
      <button class="login-button">Login</button>
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
      username=''
      password=''
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
  width: 40%;
}

i{
  color: #2C3E50;
  font-size: 20px;
}

button{
  border-radius: 4px;
  border-color: transparent;
  background-color: transparent;
  margin: 25px auto;
  width: 45%;
  height: 36px;
  text-decoration: underline;
}

a{
  width: 45%;
  margin: 25px auto;
  line-height: 36px;
  text-decoration: underline;
}

.login-button{
  background: #0079D3;
  color: white;
  display: block;
  text-decoration: none;
}

.login-button:hover{
  background: #0091FF;
  cursor: pointer;
}

.input-group{
  margin: 20px auto;
  width: 75%;
}

.input-group-addon{
  width: 45px;
}

</style>

<template>
  <div class="login-panel">
    <i class="fas fa-dolly-flatbed" style="font-size: 100px; margin: 40px"></i>
    <div class="alert alert-success" role="alert" v-if="$route.query.verified">
      用户 <strong>{{ $route.query.verified }}</strong> 的邮箱验证完成！请在下方登录平台。
    </div>
    <div class="alert alert-warning" role="alert" v-if="$route.query.require_verif">
      已向邮箱 <strong>{{ $route.query.require_verif }}</strong> 发送了一封验证邮件，请访问邮件中的链接完成邮箱验证，然后再登录。
    </div>

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
      <button class="login-button" v-on:click="login()">Login</button>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class Login extends Vue {
  username = ''
  password = ''

  querystring = require('querystring')

  async login () {
    try {
      let response = await axios.post('/apis/users/login', this.querystring.stringify({
        username: this.username,
        password: this.password
      }))
      if (response.status === 200) {
        if (response.data.role === 'admin') {
          await this.$router.push('/admin')
        } else {
          await this.$router.push('/')
        }
      }
    } catch (e) {
      this.$message.error(JSON.stringify(e.response.data.error))
    }
  }

  mounted () {
    this.username = (this.$route.query.verified || '')
  }
}
</script>

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

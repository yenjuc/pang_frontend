<template>
  <div class="logon-panel">
    <i class="fas fa-dolly-flatbed" style="font-size: 100px; margin: 40px"></i>
    <div class="input-group">
      <span class="input-group-addon"><i class="fas fa-user-circle"></i></span>
      <input type="text" class="form-control" placeholder="Username" v-model="username">
    </div>

    <div class="input-group">
      <span class="input-group-addon"><i class="fas fa-envelope"></i></span>
      <input type="text" class="form-control" placeholder="Email Address" v-model="email">
    </div>

    <div class="input-group">
      <span class="input-group-addon"><i class="fas fa-unlock-alt"></i></span>
      <input type="password" class="form-control" placeholder="Password" v-model="password">
    </div>

    <button class="logon-button">Logon</button>

  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      email: '',
      password: ''
    }
  }
}
</script>>

<style scoped>
.logon-panel{
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
  background: #BBBBBB;
  margin: 40px auto 25px;
  width: 75%;
  height: 36px;
  text-decoration: underline;
}

.logon-button{
  background: #0079D3;
  color: white;
  display: block;
  text-decoration: none;
}

.logon-button:hover{
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

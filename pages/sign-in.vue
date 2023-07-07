<template>
  <div class="container flex items-center justify-center h-screen">
    <div class="box--lg">
      <h3>Войти через телеграм</h3>
      <p class="tg__text mt-24">Вы можете добавить и взять заказ войдя через Telegram аккаунт </p>

      <TelegramLogin class="mt-24" telegram-login="prspotlogin_bot" mode="callback" requestAccess="write" @callback="userCallBack" />
      <div class="sign_btn mt-24">
        <button @click="cancel">Отмена<img src="@/assets/svg/back(red).svg" alt=""></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "telegram",
  methods: {
    cancel(){
      localStorage.removeItem("user")
      this.$router.go(-1)
    },
    async userCallBack(user) {
      if(user){
        localStorage.setItem("user",JSON.stringify(user))
        await this.$axios.get('/api/users/'+user.id).then((res)=>{
          let new_user = res && res.data && res.data.result && res.data.result
          this.$axios.put('/api/profilePicture/'+new_user._id,{profilePicture:new_user.photo_url})
        })
        this.$router.go()
      }
    }
  },
  mounted(){
    let user = localStorage && localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"))
    if(user){
        this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>

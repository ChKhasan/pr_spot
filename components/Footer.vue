<template>
  <div class="footer">
    <div class="container_xl w-screen">
      <div class="col-10">
        <div class="flex gap-24 sm_flex-col sm_gap-48 items-center justify-between">
          <nuxt-link class="footer-logo" to="/" >
            <img src="~/assets/svg/logo.svg" alt="err">
          </nuxt-link>
          <div class="flex gap-24 footer-menu">
            <nuxt-link to="/">Главная</nuxt-link>
            <nuxt-link to="/order">Заказы</nuxt-link>
            <nuxt-link to="/order">Полиграфии</nuxt-link>
          </div>

          <div class="footer-cer">
            <div class="flex footer-dev">
              <p>Сервис от</p>
              <a href="#">NDC.uz</a>
            </div>
            <span class="required">Сервис работает в тестовом режиме</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>

</style>
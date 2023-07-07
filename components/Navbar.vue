<template>
  <div class="navbar">
    <div class="container_xl" v-if="loading">
      <div class="dv flex items-center justify-between h-88">
        <div class="flex gap-24 items-center">
          <nuxt-link to="/" class="">
            <img src="~/assets/svg/logo.svg" alt="err" />
          </nuxt-link>
          <div class="nav_menu flex gap-16">
            <nuxt-link to="/order" class="">
              <img src="~/assets/svg/order.svg" alt="err" />
              <p>Заказы</p>
            </nuxt-link>
            <nuxt-link to="/order" class="">
              <img src="~/assets/svg/poligraph.svg" alt="err" />
              <p>Полиграфии</p>
            </nuxt-link>
            <!-- <nuxt-link to="/order"  class="">
              <img src="~/assets/svg/notification.svg" alt="err">
              <p>Рекламные организации</p>
            </nuxt-link>
            <nuxt-link to="/order"  class="">
              <img src="~/assets/svg/notification.svg" alt="err">
              <p>Маркет</p>
            </nuxt-link>
            <nuxt-link to="/order"  class="">
              <img src="~/assets/svg/notification.svg" alt="err">
              <p>Блог</p> -->
            <!-- </nuxt-link> -->
          </div>
        </div>

        <div class="flex gap-24">
          <nuxt-link to="/order/add" class="flex add_order">
            <img src="@/assets/svg/plus.svg" alt="" />
            <div class="add_order_text">Заказать</div>
          </nuxt-link>
          <nuxt-link
            v-if="user"
            :to="{ path: '/profile', query: { tab: 'myorder' } }"
            class="flex user_applications"
          >
            <div class="user_applications_text flex gap-8">
              Заявки
              <!-- <span>(5)</span> -->
            </div>
          </nuxt-link>
          <nuxt-link
            v-if="$store.state.user"
            :to="{ path: '/profile' }"
            class="flex signin_user"
          >
            <img class="avatar" :src="$store.state.user.avatar" alt="" />
            <div class="signin_user_text">{{ $store.state.user?.username }}</div>
            <img src="@/assets/svg/arrowdown.svg" alt="" />
          </nuxt-link>
          <nuxt-link v-else to="/sign-in" class="flex signin">
            <img src="@/assets/svg/login.svg" alt="" />
            <div class="signin_text">Войти</div>
          </nuxt-link>
          <!-- <nuxt-link to="/order" class="flex ">
            <img src="@/assets/svg/message.svg" alt="">
          </nuxt-link>
          <nuxt-link to="/order" class="flex ">
            <img src="@/assets/svg/notification.svg" alt="">
          </nuxt-link> -->
        </div>
      </div>
      <div class="mv items-center">
        <nuxt-link to="/" class="mv_logo">
          <img src="~/assets/svg/logo.svg" alt="err" />
        </nuxt-link>
        <div class="flex gap-32 relative align-center">
          <button
            @click="(sidemenu = !sidemenu), (menu = false)"
            v-if="$store.state.user"
            class="flex signin_user mv_sign mv_w-screen"
          >
            <img class="avatar" :src="$store.state.user.photo_url" alt="" />
            <img src="@/assets/svg/arrowdown.svg" alt="" />
          </button>
          <div class="absolute mv_menu" v-if="sidemenu">
            <nuxt-link
              @click.native="menuCloser"
              :to="{ path: '/profile', query: { tab: 'myorder' } }"
              >Мои заказы</nuxt-link
            >
            <nuxt-link
              @click.native="menuCloser"
              :to="{ path: '/profile', query: { tab: 'settings' } }"
              >Настройки</nuxt-link
            >
            <nuxt-link
              @click.native="menuCloser"
              :to="{ path: '/profile', query: { tab: 'performer' } }"
              >Я - Исполнитель</nuxt-link
            >
          </div>
          <button class="menu_close" @click="(menu = !menu), (sidemenu = false)">
            <img v-if="menu" src="@/assets/svg/noun-close-1028422.svg" />
            <img v-else src="@/assets/svg/menu.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
    <Loader v-else />
    <div class="menu-mobile" :class="{ menu_mobile: menu }">
      <div class="mv_nav">
        <nuxt-link @click.native="menu = false" to="/order" class="flex">
          <img src="~/assets/svg/order.svg" alt="err" />
          <p>Заказы</p>
        </nuxt-link>
        <nuxt-link @click.native="menu = false" to="/order" class="flex">
          <img src="~/assets/svg/poligraph.svg" alt="err" />
          <p>Полиграфии</p>
        </nuxt-link>
      </div>

      <div class="flex gap-24">
        <nuxt-link
          @click.native="menu = false"
          to="/order/add"
          class="flex add_order mv_w-screen"
        >
          <img src="@/assets/svg/plus.svg" alt="" />
          <div class="add_order_text">Заказать</div>
        </nuxt-link>
        <nuxt-link
          @click.native="menu = false"
          v-if="user"
          :to="{ path: '/profile', query: { tab: 'myorder' } }"
          class="flex user_applications mv_w-screen"
        >
          <div class="user_applications_text flex gap-8">Заявки</div>
        </nuxt-link>
        <nuxt-link
          @click.native="menu = false"
          v-else
          to="/sign-in"
          class="flex signin mv_w-screen"
        >
          <img src="@/assets/svg/login.svg" alt="" />
          <div class="signin_text">Войти</div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
export default {
  name: "Navbar",
  components: { Loader },
  data() {
    return {
      user: null,
      menu: false,
      sidemenu: false,
      loading: false,
    };
  },
  mounted() {
    this.loading = false;
    this.user =
      localStorage &&
      localStorage.getItem("user") &&
      JSON.parse(localStorage.getItem("user"));
    this.$store.commit("getUserInfo", this.user);
    this.loading = true;
  },
  methods: {
    menuCloser() {
      this.menu = false;
      this.sidemenu = false;
    },
  },
};
</script>

<style scoped></style>

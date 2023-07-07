<template>
  <div class="section b-white">
    <div class="container_xl">
      <div class="banner">
        <div class="banner_content">
          <img class="banner_logo" src="@/assets/svg/logo.svg" alt="" />
          <h2 class="mt-8">Онлайн заказ печатной продукции</h2>
          <p class="mt-8">
            Большое спасибо за всю мебель. Очень качественно и по доступным ценам Мы очень
            рады совместной работе с вами!
          </p>
          <nuxt-link tag="button" to="/order/add" class="mt-24">
            <img src="@/assets/svg/plus_border.svg" alt="" /> Опубликовать заказ
          </nuxt-link>
        </div>
        <img class="img" src="@/assets/images/Union.png" alt="" />
      </div>
      <div class="home_services">
        <div class="home_services_block">
          <div class="home_services_card">
            <img src="@/assets/svg/pen.svg" alt="" />
            <h3 class="mt-24">Заказчик</h3>
            <p class="mt-8">Заказчик размещает свой заказа минуту</p>
          </div>
          <div class="home_services_card">
            <img src="@/assets/svg/green_contact.svg" alt="" />
            <h3 class="mt-24">Poligrafiya</h3>
            <p class="mt-8">Заказчик размещает свой заказа минуту</p>
          </div>
          <div class="home_services_card">
            <img src="@/assets/svg/mf.svg" alt="" />
            <h3 class="mt-24">Заказчик</h3>
            <p class="mt-8">Заказчик размещает свой заказа минуту</p>
          </div>
          <div class="home_services_card">
            <img src="@/assets/svg/connec.svg" alt="" />
            <h3 class="mt-24">Poligrafiya</h3>
            <p class="mt-8">Заказчик размещает свой заказа минуту</p>
          </div>
        </div>
        <nuxt-link tag="button" to="/order/add" class="public_order w-screen"
          ><img src="@/assets/svg/plus_border(orange).svg" alt="" /> Опубликовать
          заказ</nuxt-link
        >
      </div>
    </div>
    <div class="section_block b-gray" v-if="true">
      <div class="container_xl">
        <div class="home_order flex items-center mb-32 gap-24">
          <h2>Заказы</h2>
          <nuxt-link tag="button" to="/order" class="public_order"
            ><img src="@/assets/svg/plus_border(orange).svg" alt="" /> Все
            заказы</nuxt-link
          >
        </div>
        <div class="grid-2 mv_grid-1">
          <!-- <div class="form_block mb-16" >
            <div class="w-screen flex gap-16">
              <div class="home_order_wimg" v-if="order?.images.length > 0">
                <img
                  v-for="(img, index) in order.images.slice(0, 3)"
                  :key="img?.id"
                  :src="img.image"
                  alt=""
                />
               
                <div v-if="order.images.length > 3">+{{ order.images.length - 3 }}</div>
              </div>
              <div class="flex flex-col gap-8 w-screen">
                <div class="flex justify-between">
                  <nuxt-link
                    tag="span"
                    :to="{ path: '/order', query: { category: 'el?.category' } }"
                    class="form_order_info_type"
                    >Flayer</nuxt-link
                  >
                  <div class="mv_font-12 span line-2">
                    {{ moment(order?.date).format("hh:mm DD.MM.YYYY") }}
                  </div>
                </div>
                <h4 class="form_order_info_label">{{ order?.title }}</h4>
                <span class="dv mt-8 line-2" v-html="order?.desc"> </span>
              </div>
            </div>
            <span class="mv mt-8 line-2">werewrewr</span>
            <div
              class="flex justify-between mv_flex-col items-center mt-41 mv_mt-18 w-screen"
            >
              <div class="flex gap-16">
                <div class="flex items-center gap-8">
                  <Icons color="#5D5D5F" icon="eye" /> {{ order?.views }}
                </div>
                <div class="flex items-center gap-8">
                  <Icons color="#5D5D5F" icon="message" />
                  {{ order?.offers_count }} запросов
                </div>
              </div>
              <div class="flex gap-16 mv_flex-col-rev mv_w-screen mv_mt-24 items-center">
                <nuxt-link class="text-black text-underline" :to="`/order/${order?.id}`"
                  >Подробнее</nuxt-link
                >
                <nuxt-link
                  :to="`/order/${order?.id}`"
                  class="flex order show mv_w-screen"
                >
                  <div class="show_text">Отправить заявку</div>
                  <Icons color="#3C4BDC" icon="success" />
                </nuxt-link>
              </div>
            </div>
          </div> -->
          <CardsOrderCard v-for="order in orders" :key="order?.id" :order="order" />
        </div>
        <div v-if="orders.length" class="all_ads dv">
          <nuxt-link to="/order" tag="button">Все заказы</nuxt-link>
        </div>
      </div>
    </div>
    <div class="section_block container_xl mt-16">
      <div class="mv_w">
        <h2 class="mb-32">Рекламные организации</h2>
        <div class="advertising_organizations" v-if="loading && org">
          <div
            class="advertising_organizations_card"
            v-for="(el, index) in org"
            :key="index"
          >
            <div class="advertising_organizations_content">
              <img class="org_logo" :src="el?.logotip?.path" alt="" />
              <div class="advertising_organizations_content_text">
                <p>{{ el.name }}</p>
                <a class="dv" :href="'tel:' + el.phoneNumber"
                  ><img src="@/assets/svg/phone.svg" alt="" />{{ el.phoneNumber }}</a
                >
                <span class="dv"
                  ><img src="@/assets/svg/location.svg" alt="" /> {{ el.address }}</span
                >
              </div>
            </div>
            <div class="mv flex justify-between flex-wrap gap-8">
              <a :href="'tel:' + el.phoneNumber"
                ><img src="@/assets/svg/phone.svg" alt="" />{{ el.phoneNumber }}</a
              >
              <span><img src="@/assets/svg/location.svg" alt="" /> {{ el.address }}</span>
            </div>
            <nuxt-link tag="button" to="/order"
              >Отправить заявку
              <Icons color="#3C4BDC" icon="success" />
            </nuxt-link>
          </div>
        </div>
        <!-- <div class="all_ads">
              <button>Все полиграфии</button>
            </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      loading: false,
      orders: [],
      org: [],
    };
  },
  methods: {
    moment,
  },
  async asyncData({ store }) {
    const [ordersData] = await Promise.all([store.dispatch("fetchOrders/getOrders")]);
    const orders = ordersData?.results;
    return {
      orders,
    };
  },
  async mounted() {
    const [ordersData] = await Promise.all([
      this.$store.dispatch("fetchOrders/getOrders"),
    ]);
    console.log(ordersData);
    this.loading = false;
    this.user =
      localStorage &&
      localStorage.getItem("user") &&
      JSON.parse(localStorage.getItem("user"));
    this.loading = true;
  },
};
</script>

<template lang="html">
  <div class="order__card">
    <!-- <div class="form_block mb-16">
      <div class="w-screen flex gap-16">
        <div class="home_order_wimg" v-if="order?.images.length > 3">
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
              >{{ order?.category?.title }}</nuxt-link
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
      <div class="flex justify-between mv_flex-col items-center mt-41 mv_mt-18 w-screen">
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
          <nuxt-link :to="`/order/${order?.id}`" class="flex order show mv_w-screen">
            <div class="show_text">Отправить заявку</div>
            <Icons color="#3C4BDC" icon="success" />
          </nuxt-link>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import moment from "moment";
export default {
  props: ["order"],
  methods: {
    moment,
  },
};
</script>

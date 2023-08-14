<template>
  <div class="section">
    <div class="container" v-if="loading">
      <div class="form">
        <div class="back_btn mv_w">
          <button @click="$router.go(-1)">Отмена</button>
        </div>
        <div class="flex justify-between items-center mt-32 mv_mt-24 mv_w">
          <h3 v-if="order?.id">Заказ #{{ order?.id }}</h3>
        </div>
        <div class="form_block mb-16">
          <div class="form_order_info w-screen">
            <div class="flex justify-between items-center mv_flex-col">
              <div class="flex gap-16">
                <div class="publication_date">
                  <span class="opacity-05">Опубликовано:</span>
                  <p>{{ order?.date | dateFilter }}</p>
                </div>
                <div class="publication_date">
                  <span class="opacity-05">ID заказа</span>
                  <p v-if="order?.id">#{{ order?.id }}</p>
                </div>
              </div>
              <div class="profile_status" :class="order?.status?.key">
                {{ order?.status?.value }}
              </div>
            </div>
            <div class="hr"></div>
            <div class="flex flex-col gap-8 w-70 mv_w-screen">
              <nuxt-link
                tag="span"
                :to="{ path: '/order', query: { category: el?.category?.title } }"
                class="form_order_info_type"
                >{{ el?.category?.title }}</nuxt-link
              >
              <h4>{{ order?.title }}</h4>
              <span class="mt-8" v-html="order?.desc"></span>
              <div v-if="order && order.images" class="flex gap-16 mt-8 order_img">
                <img
                  class="w-screen"
                  v-for="(img, index) in order.images"
                  :key="index"
                  :src="img.image"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="dv hr"></div>
          <div class="flex justify-between items-center mt-24 w-screen mv_flex-wrap">
            <div class="flex gap-16">
              <div class="flex items-center gap-8">
                <Icons color="#5D5D5F" icon="eye" />
                {{ order?.views }}
              </div>
              <div class="flex items-center gap-8">
                <Icons color="#5D5D5F" icon="message" />
                {{ order?.offers_count }} запросов
              </div>
            </div>
            <button
              v-if="order?.status == 'OPENED'"
              @click="changeStatus('CANCELED')"
              class="flex order show red_btn mv_mt-16 mv_w-screen"
            >
              Отменить заказ
            </button>
            <button
              v-if="order?.status == 'SELECTED'"
              @click="changeStatus('COMPLETED')"
              class="flex order accept mv_mt-16 mv_w-screen"
            >
              Завершить заказ
            </button>
          </div>
        </div>
        <div>
          <div
            class="flex justify-between items-center mt-40 mb-16"
            v-if="order?.offers.length > 0"
          >
            <h4 class="mv_w">Заявки</h4>
          </div>
          <div
            class="form_block apply_users mb-32"
            v-for="(el, index) in order?.offers"
            :key="index"
          >
            <div class="flex justify-between mv_flex-wrap gap-32 mv_gap-16 h-100">
              <div class="w-70 mv_w-screen flex flex-col justify-between">
                <div class="w-screen flex gap-16">
                  <div class="flex justify-between gap-8 w-screen">
                    <div class="flex gap-16 flex-wrap">
                      <div class="publication_date">
                        <span>Цена:</span>
                        <p>{{ el?.price }}</p>
                      </div>
                      <div class="publication_date">
                        <span>Срок:</span>
                        <p>{{ el?.days }} дней</p>
                      </div>
                    </div>
                    <div class="mv_font-12 span items-start">
                      {{ el?.date | dateFilter }}
                    </div>
                  </div>
                </div>
                <span class="mt-8" v-html="el?.info"></span>
                <div
                  class="flex justify-between mv_flex-col items-center mt-41 mv_mt-18 w-screen"
                >
                  <div
                    class="flex gap-16 mv_flex-col-rev mv_w-screen mv_mt-24 items-center"
                  >
                    <button
                      v-if="true"
                      @click="chooseOffer(el.id)"
                      disabled
                      class="flex order accept mv_w-screen disabled-btn"
                    >
                      <div class="show_text">Принять</div>
                      <Icons color="#FFFFFF" icon="success" />
                    </button>
                    <button
                      v-else
                      @click="chooseOffer(el.id)"
                      class="flex order accept cancel mv_w-screen"
                    >
                      <div class="show_text">Отменить заказ</div>
                    </button>
                  </div>
                </div>
              </div>
              <div class="wall_hr"></div>
              <div class="accept_org flex flex-col justify-between">
                <div class="flex items-center gap-12">
                  <img
                    class="img"
                    :src="el?.executor?.business_profile?.business_avatar"
                    alt=""
                  />
                  <p class="line-2">{{ el?.executor?.business_profile?.organization }}</p>
                </div>
                <div class="flex flex-wrap gap-8">
                  <a :href="'tel:' + el?.executor?.business_profile?.phone_number"
                    ><img src="@/assets/svg/phone.svg" alt="" />{{
                      el?.executor?.business_profile?.phone_number
                    }}</a
                  >
                  <span
                    ><img src="@/assets/svg/location.svg" alt="" />
                    {{ el?.executor?.business_profile?.address }}</span
                  >
                </div>
                <a
                  class="btn"
                  :href="'https://t.me/' + el?.executor?.business_profile?.phone_number"
                  >Написать в телеграм <Icons color="#3C4BDC" icon="telegram"
                /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Icons from "@/components/icons.vue";
export default {
  components: { Icons },
  data() {
    return {
      order: {},
      loading: false,
      apps: [],
    };
  },
  methods: {
    chooseOffer(id) {
      this.__CHOOSE_APPLICATION(id);
    },
    async __CHOOSE_APPLICATION(offerId) {
      try {
        const data = await this.$store.dispatch("fetchOrders/postChooseApplication", {
          id: offerId,
          order_id: this.order.id,
        });
        console.log(data);
      } catch (e) {}
    },
    changeStatus(e, el) {
      let data = {};
      if (el) {
        data.applicationID = el._id;
        data.organization = el.organization;
      }
      data.status = e;
      this.$axios
        .put("/api/orders/" + this.$route.params.id + "/select", data)
        .then((res) => {
          if (res && res.data) {
            this.$message.success("Успешно");
            setTimeout(() => {
              this.$router.go();
            }, 1000);
          } else {
            this.$message.error("Что-то пошло не так");
          }
        });
    },
  },
  async mounted() {
    let user =
      localStorage &&
      localStorage.getItem("access_token") &&
      JSON.parse(localStorage.getItem("access_token"));
    if (!user) {
      this.$router.push("/sign-in");
    }
    const orderData = await this.$store.dispatch(
      "fetchOrders/getOrderByIdProfile",
      this.$route.params.id
    );
    this.order = orderData;
    this.loading = false;

    this.loading = true;
  },
  filters: {
    dateFilter(e) {
      if (!!e) {
        let date = new Date(e);
        let newdate =
          ("0" + date.getDate()).slice(-2) +
          "." +
          ("0" + (date.getMonth() + 1)).slice(-2) +
          "." +
          date.getFullYear();
        return newdate;
      } else {
        return "-";
      }
    },
  },
};
</script>

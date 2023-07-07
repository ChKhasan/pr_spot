<template>
  <div class="section">
    <div class="container" v-if="true">
      <div class="form">
        <div class="breadcrubms mv_w">
          <nuxt-link to="/order">Заказы</nuxt-link><span class="opacity-05">/</span>
          <nuxt-link to="/order">Заказы</nuxt-link><span class="opacity-05">/</span>
          <nuxt-link class="last-brcm" :to="'/order/' + order?.id">{{
            order?.title
          }}</nuxt-link>
        </div>
        <div class="flex justify-between items-center mt-32 mv_mt-4 mv_w">
          <h3>Карточка тендера</h3>
        </div>
        <div class="form_block mb-16">
          <div class="form_order_info w-screen">
            <div class="flex justify-between items-center mv_flex-col">
              <div class="flex gap-16 mv_justify-between mv_w-screen">
                <div class="publication_date">
                  <span class="opacity-05">Опубликовано:</span>
                  <p>{{ moment(order?.date).format("DD MMMM YYYYY") }}</p>
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
                :to="{ path: '/order', query: { category: order?.category?.id } }"
                class="form_order_info_type"
                >{{ order?.category?.title }}</nuxt-link
              >
              <h4>{{ order?.title }}</h4>
              <span class="mt-8" v-html="order?.desc"></span>
              <div v-if="order && order.images" class="flex gap-16 mt-8 order_img">
                <img
                  @click="(images = order.images), (indexI = index)"
                  class="w-screen"
                  v-for="(img, index) in order.images"
                  :key="index"
                  :src="img.image"
                  alt=""
                />
                <imageViewer
                  :index="indexI"
                  @close="closeVw"
                  v-if="images.length"
                  :images="images"
                />
              </div>
            </div>
          </div>
          <div class="dv hr"></div>
          <div
            class="flex justify-between items-center mv_items-start mt-24 w-screen mv_flex-col mv_gap-12"
          >
            <div v-if="$store.state.user" class="flex items-center gap-12">
              <img class="avatar-50" :src="order?.profilePicture" alt="" />
              <p>{{ $store.state.user.username }}</p>
            </div>
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
          </div>
        </div>
        <a-form-model ref="ruleFormApp" :model="form" :rules="rules">
          <div class="form_block" v-if="true">
            <h6>Отправить заявку на получение заказа</h6>
            <div class="flex order-inputs gap-12 mv_gap-0 mv_flex-col mv_w-screen">
              <div class="form_other_info mv_w-screen">
                <label for="textarea"
                  >Срок изготовление<span class="required">*</span></label
                >
                <a-form-model-item class="mb-0 w-100" prop="days">
                  <input type="number" v-model="form.days" placeholder="0 дней" />
                </a-form-model-item>
              </div>
              <div class="form_other_info mv_w-screen">
                <label for="textarea">Цена<span class="required">*</span></label>
                <a-form-model-item class="mb-0 w-100" prop="price">
                  <input type="number" v-model="form.price" placeholder="0 сум" />
                  <!-- <a-input-number
                    v-model="form.price"
                    :default-value="1000"
                    :formatter="
                      (value) => {
                        if (Number(value)) {
                          return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                        } else {
                          var num = [];
                          value.split('').forEach((item) => {
                            if (Number(item) || item == 0) {
                              num.push(item);
                            }
                          });
                          return `${num.join('')}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                        }
                      }
                    "
                    placeholder="Введите сумму"
                    :parser="(value) => value.replace(/\$\s?|( *)/g, '')"
                  /> -->
                </a-form-model-item>
              </div>
              <div class="form_other_info mv_w-screen">
                <label for="textarea"
                  >Ваш номер телефона<span class="required">*</span></label
                >
                <a-form-model-item class="mb-0 w-100" prop="phone_number">
                  <input
                    v-mask="'+998 (##) ### ## ##'"
                    v-model="form.phone_number"
                    placeholder="+998 (__) ___ __ __"
                  />
                </a-form-model-item>
              </div>
            </div>
            <div class="form_other_info w-screen">
              <label for="textarea">Дополнительная информация</label>
              <textarea v-model="form.info" placeholder="Дополнительная информация" />
            </div>
            <div
              class="flex justify-between items-center mt-41 mv_mt-16 mv_flex-wrap mv_gap-16"
            >
              <div
                class="flex items-center gap-12 mv_w-screen"
                v-if="$store.state.user?.business_profile"
              >
                <img
                  class="avatar-50"
                  :src="$store.state.user?.business_profile?.business_avatar"
                  alt=""
                />
                <p>{{ $store.state.user?.business_profile?.organization }}</p>
              </div>
              <button @click="submit" class="flex order signin mv_w-screen">
                <div class="signin_text">Отправить заявку</div>
                <Icons color="#ffffff" icon="success" />
              </button>
            </div>
          </div>
        </a-form-model>
        <div class="flex justify-between items-center mt-40 mb-16">
          <h4 class="mv_w">Другие заказы</h4>
        </div>
        <div class="flex flex-col gap-8">
          <OrderCard
            v-for="order in order?.other_orders"
            :key="order?.id"
            :order="order"
          />
        </div>
      </div>
    </div>
    <a-modal
      :body-style="{ padding: '0' }"
      v-model="visible"
      centered
      :closable="false"
      width="528px"
      @ok="handleOk"
    >
      <div class="vmodal-container">
        <div class="vmodal-success__image">
          <img src="../../assets/images/Frame 4144568.png" alt="" />
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="114"
              height="114"
              viewBox="0 0 114 114"
              fill="none"
            >
              <path
                opacity="0.4"
                d="M56.9998 97.8334C79.5515 97.8334 97.8332 79.5517 97.8332 57C97.8332 34.4484 79.5515 16.1667 56.9998 16.1667C34.4482 16.1667 16.1665 34.4484 16.1665 57C16.1665 79.5517 34.4482 97.8334 56.9998 97.8334Z"
                fill="white"
              />
              <path
                d="M51.2019 71.6184C50.3852 71.6184 49.6094 71.2917 49.0377 70.72L37.4819 59.1642C36.2977 57.98 36.2977 56.02 37.4819 54.8359C38.666 53.6517 40.626 53.6517 41.8102 54.8359L51.2019 64.2275L72.1902 43.2392C73.3744 42.055 75.3344 42.055 76.5185 43.2392C77.7027 44.4234 77.7027 46.3834 76.5185 47.5675L53.366 70.72C52.7944 71.2917 52.0185 71.6184 51.2019 71.6184Z"
                fill="white"
              />
              <circle cx="57" cy="57" r="48.5" stroke="white" />
              <circle cx="57" cy="57" r="56.5" stroke="white" stroke-opacity="0.4" />
            </svg>
          </span>
        </div>
        <div class="vmodal-success__body">
          <h2>Arizangiz qabul qilindi</h2>
          <nuxt-link to="/">Bosh sahifaga qaytish</nuxt-link>
        </div>
      </div>
    </a-modal>
    <a-modal
      :body-style="{ padding: '0' }"
      v-model="visibleError"
      centered
      :closable="false"
      width="528px"
      @ok="handleOk"
    >
      <div class="vmodal-container">
        <div class="vmodal-success__image">
          <img src="../../assets/images/Frame 4144568-2.png" alt="" />
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="114"
              height="114"
              viewBox="0 0 114 114"
              fill="none"
            >
              <circle cx="57" cy="57" r="48.5" stroke="white" />
              <circle cx="57" cy="57" r="56.5" stroke="white" stroke-opacity="0.24" />
              <path
                opacity="0.4"
                d="M56.9998 97.8334C79.5515 97.8334 97.8332 79.5517 97.8332 57C97.8332 34.4484 79.5515 16.1667 56.9998 16.1667C34.4482 16.1667 16.1665 34.4484 16.1665 57C16.1665 79.5517 34.4482 97.8334 56.9998 97.8334Z"
                fill="white"
              />
              <path
                d="M61.3286 57L70.7202 47.6083C71.9044 46.4241 71.9044 44.4641 70.7202 43.28C69.536 42.0958 67.576 42.0958 66.3919 43.28L57.0002 52.6716L47.6085 43.28C46.4244 42.0958 44.4644 42.0958 43.2802 43.28C42.096 44.4641 42.096 46.4241 43.2802 47.6083L52.6719 57L43.2802 66.3916C42.096 67.5758 42.096 69.5358 43.2802 70.72C43.8927 71.3325 44.6685 71.6183 45.4444 71.6183C46.2202 71.6183 46.996 71.3325 47.6085 70.72L57.0002 61.3283L66.3919 70.72C67.0044 71.3325 67.7802 71.6183 68.556 71.6183C69.3319 71.6183 70.1077 71.3325 70.7202 70.72C71.9044 69.5358 71.9044 67.5758 70.7202 66.3916L61.3286 57Z"
                fill="white"
              />
            </svg>
          </span>
        </div>
        <div class="vmodal-success__body">
          <h2>Arizangiz qabul qilinmadi, boshqattan urinib ko‘ring</h2>
          <nuxt-link to="/">Bosh sahifaga qaytish</nuxt-link>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import OrderCard from "../../components/cards/orderCard.vue";
import { required } from "vuelidate/lib/validators";
import Icons from "@/components/icons.vue";
import moment from "moment";
export default {
  components: { Icons, OrderCard },
  data() {
    return {
      mynomer: null,
      visibleError: false,
      visible: false,
      order: null,
      form: {},
      price: null,
      orders: [],
      images: [],
      loading: false,
      indexI: null,
      form: {
        order: "",
        days: "",
        price: "",
        info: "",
        phone_number: "",
        executor: null,
      },
      rules: {
        days: [
          {
            required: true,
            message: "This field is required",
            trigger: "change",
          },
        ],
        desc: [
          {
            required: true,
            message: "This field is required",
            trigger: "change",
          },
        ],
        phone_number: [
          {
            required: true,
            message: "This field is required",
            trigger: "change",
          },
        ],
      },
    };
  },
  validations: {
    form: {
      price: { required },
      duration: { required },
    },
  },
  watch: {
    price() {
      if (this.price.split("").length) {
        this.form.price = this.price
          .split(" ")
          .join("")
          .split("")
          .reverse()
          .join("")
          .match(/.{1,3}/g)
          .join(" ")
          .split("")
          .reverse()
          .join("");
        this.price = this.price
          .split(" ")
          .join("")
          .split("")
          .reverse()
          .join("")
          .match(/.{1,3}/g)
          .join(" ")
          .split("")
          .reverse()
          .join("");
      }
    },
  },
  async asyncData({ store, params }) {
    const [orderData] = await Promise.all([
      store.dispatch("fetchOrders/getOrderById", params.id),
    ]);
    console.log(orderData);
    const order = orderData;
    return {
      order,
    };
  },
  methods: {
    submit() {
      this.form.order = this.order.id;
      this.$refs.ruleFormApp.validate((valid) => {
        if (valid) {
          this.__POST_APPLICATION();
        } else {
          return false;
        }
      });
    },
    async __POST_APPLICATION() {
      try {
        const data = await this.$store.dispatch(
          "fetchOrders/postApplications",
          this.form
        );
        this.visible = true;
      } catch (e) {
        this.visibleError = true;
      }
    },
    closeVw() {
      this.images = [];
    },
    moment,
    category(e) {
      return e == "CARD"
        ? "Визитка"
        : e == "BANNER"
        ? "Баннер"
        : e == "CATALOG"
        ? "Каталог"
        : e == "BOOK"
        ? "Книга"
        : e == "STAND"
        ? "Стенд"
        : e == "CLOTHEPRINT"
        ? "Одежда печать"
        : e == "FLYER"
        ? "Флаер"
        : e == "OTHER"
        ? "Другие"
        : "-";
    },
    checkForm() {
      if (!this.$store.state.user.organization) {
        this.$router.push({ path: "/profile", query: { tab: "performer" } });
      } else {
        if (!this.form.price || !this.form.duration || this.$v.$invalid) {
          this.$v.$touch();
          this.$message.error("Пожалуйста, заполните обязательные поля");
          return;
        } else {
          this.sendForm();
        }
      }
    },
    // sendForm() {
    //   let user =
    //     localStorage &&
    //     localStorage.getItem("user") &&
    //     JSON.parse(localStorage.getItem("user"));
    //   if (user) {
    //     let data = this.form;
    //     data.performerID = this.$store.state.user._id;
    //     return this.$axios({
    //       method: "POST",
    //       url: "/api/apply/" + this.$route.params.id,
    //       data: data,
    //     })
    //       .then((res) => {
    //         if (res && res.data) {
    //           if (res && res.data) {
    //             this.$message.success("Успешно");
    //             setTimeout(() => {
    //               this.$router.push("/order");
    //             }, 1000);
    //           } else {
    //             this.$message.error("Что-то пошло не так");
    //           }
    //         }
    //       })
    //       .catch((err) => {
    //         return err;
    //       });
    //   }
    // },
  },
  async mounted() {
    // this.loading = false;
    console.log("Asdasdasdasasdasdasdasd");
    //   this.orders.forEach((k, index) => {
    //     k._id == this.order._id ? this.orders.splice(index, 1) : "";
    //   });
    // this.loading = true;
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
<style lang="css">
.order-inputs {
  width: 90%;
}
</style>

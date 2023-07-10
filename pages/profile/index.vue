<template>
  <div class="section">
    <div class="container">
      <div class="form mh-80v" v-if="true">
        <div class="flex mv_w justify-between items-center">
          <h3>Профиль</h3>
        </div>
        <div class="flex mv_w items-center flex-wrap gap-8 mb-24 profil_tab">
          <button
            @click="changetab('myorder')"
            :class="{ active: tab == 'myorder' }"
            class="flex"
          >
            Мои заявки <Icons color="#FF5C00" icon="myorder" />
          </button>
          <button
            @click="changetab('settings')"
            :class="{ active: tab == 'settings' }"
            class="flex"
          >
            Настройки <Icons color="white" icon="settings" />
          </button>
          <button
            @click="changetab('performer')"
            :class="{ active: tab == 'performer' }"
            class="flex"
          >
            Я - Исполнитель <Icons icon="settings" />
          </button>
        </div>
        <div v-if="tab == 'myorder'">
          <h1 class="mt-40 mb-60 h-40v" v-if="$store.state.user?.orders > 0">
            У вас пока нет заявки
          </h1>
          <div
            class="form_block mb-16"
            v-for="(el, index) in $store.state.user?.orders"
            :key="index"
          >
            <div class="form_order_info w-screen">
              <div class="flex items-center mv_flex-col gap-16">
                <div class="profile_status" :class="el?.status?.key">
                  {{ el?.status?.value }}
                </div>
                <div class="flex gap-16 items-center mv_justify-between mv_w-screen">
                  <div class="publication_date">
                    <span class="opacity-05">Опубликовано:</span>
                    <p>{{ el?.date | dateFilter }}</p>
                  </div>
                  <div v-if="el?.id" class="publication_date">
                    <span class="opacity-05">ID заказа</span>
                    <p>#{{ el?.id }}</p>
                  </div>
                </div>
              </div>
              <div class="hr"></div>
              <div class="w-screen flex gap-16">
                <div v-if="el.images && el.images.length > 2" class="home_order_wimg">
                  <img
                    v-for="(img, index) in el.images.slice(0, 3)"
                    :key="index"
                    :src="img.image"
                    alt=""
                  />
                  <div v-if="el.images && el.images.length > 3">+3</div>
                </div>
                <div class="flex flex-col gap-8 w-screen">
                  <nuxt-link
                    tag="span"
                    :to="{ path: '/order', query: { category: el?.category?.title } }"
                    class="form_order_info_type"
                    >{{ el?.category?.title }}</nuxt-link
                  >
                  <h4>{{ el?.title }}</h4>
                  <span class="dv mt-8" v-html="el?.desc"></span>
                </div>
              </div>
            </div>
            <span class="mv mt-8" v-html="el?.desc"></span>
            <div
              class="flex justify-between mv_flex-col items-center mt-41 mv_mt-18 w-screen"
            >
              <div class="flex gap-16">
                <div class="flex items-center gap-8">
                  <Icons color="#5D5D5F" icon="eye" />
                  {{ el.views }}
                </div>
                <div class="flex items-center gap-8">
                  <Icons color="#5D5D5F" icon="message" />
                  {{ el.offers_count }} запросов
                </div>
              </div>
              <div class="flex gap-16 mv_flex-col-rev mv_w-screen mv_mt-24 items-center">
                <nuxt-link :to="`/profile/${el.id}`">Подробнее</nuxt-link>
                <nuxt-link :to="`/profile/${el.id}`" class="flex order show mv_w-screen">
                  <div class="show_text">Просмотреть</div>
                  <Icons color="#3C4BDC" icon="success" />
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
        <div v-if="tab == 'settings'" class="form_block">
          <h4>Мои данные</h4>
          <div class="form_other_info w-50 mv_w-screen">
            <label for="textarea">Имя</label>
            <input v-model="name" placeholder="Дополнительная информация" />
          </div>
          <div class="flex justify-between items-center mt-41 w-70 mv_w-screen">
            <button @click="sendForm2" class="flex order signin mv_w-screen">
              <div class="signin_text">Сохранить</div>
              <Icons color="#ffffff" icon="success" />
            </button>
          </div>
        </div>
        <div v-if="tab == 'performer'" class="form_block">
          <h4>Я - Исполнитель</h4>
          <a-form-model ref="ruleFormProfile" :model="form" :rules="rules">
            <div class="form_other_info mv_w-screen">
              <label for="textarea">Название организации</label>
              <a-form-model-item class="mb-0 w-100" prop="organization">
                <input v-model="form.organization" placeholder="Название организации" />
              </a-form-model-item>
            </div>
            <div class="form_other_info mv_w-screen">
              <label for="textarea">Номер телефона</label>
              <a-form-model-item class="mb-0 w-100" prop="phone_number">
                <input
                  v-model="form.phone_number"
                  v-mask="'+998-##-###-##-##'"
                  placeholder="+998"
                />
              </a-form-model-item>
            </div>
            <div class="form_other_info mv_w-screen">
              <label for="textarea">Адрес</label>
              <a-form-model-item class="mb-0 w-100" prop="phone_number">
                <input v-model="form.address" placeholder="Адрес" />
              </a-form-model-item>
            </div>
            <div class="form_other_info gap-8">
              <label for="textarea">Логотип организации</label>

              <a-upload
                action="https://prweb.pythonanywhere.com/api/upload_image"
                class="profile-upload"
                list-type="picture-card"
                :file-list="fileList"
                @preview="handlePreview"
                @change="($event) => handleChange($event)"
              >
                <div v-if="fileList.length < 1">
                  <img class="uplaod-svg" src="@/assets/svg/addimg.svg" alt="" />
                </div>
              </a-upload>
              <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                <img alt="example" style="width: 100%" :src="previewImage" />
              </a-modal>
            </div>
          </a-form-model>
          <div class="flex justify-between items-center mt-41 w-70 mv_w-screen">
            <button @click="submit" class="flex order signin mv_w-screen">
              <div class="signin_text">Сохранить</div>
              <Icons color="#ffffff" icon="success" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Icons from "@/components/icons.vue";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  components: { Icons },
  data() {
    return {
      mynomer: null,
      tab: "myorder",
      form3: {},
      name: null,
      fileList: [],
      orders: [],
      loading: false,
      img: null,
      previewVisible: false,
      previewImage: "",
      rules: {
        title: [
          {
            required: true,
            message: "This field is required",
            trigger: "blur",
          },
        ],
        desc: [
          {
            required: true,
            message: "This field is required",
            trigger: "blur",
          },
        ],
      },
      form: {
        organization: "",
        phone_number: "",
        address: "",
        business_avatar: "",
        active: true,
      },
    };
  },
  methods: {
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
    changetab(e) {
      this.tab = e;
      this.$router.push({
        query: {
          ...this.$route.query,
          tab: e,
        },
      });
    },
    addImg(e) {
      this.img = URL.createObjectURL(e.target.files[0]);
      this.form3.image = e.target.files[0];
    },
    async handleChange({ fileList }) {
      this.fileList = fileList;
      if (fileList[0]?.response?.upload_url) {
        this.form.business_avatar = fileList[0]?.response?.upload_url;
      }
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    submit() {
      this.$refs.ruleFormProfile.validate((valid) => {
        if (valid) {
          this.__PROFILE_UPDATE();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async __PROFILE_UPDATE() {
      try {
        const data = await this.$store.dispatch("fetchAuth/postProfileUpdate", this.form);
        // this.visible = true;
      } catch (e) {
        // this.visibleError = true;
      }
    },
  },
  async mounted() {
    console.log("sdfsf");
    this.loading = false;
    this.tab = this.$route.query.tab || "myorder";
    this.user =
      localStorage &&
      localStorage.getItem("access_token") &&
      JSON.parse(localStorage.getItem("access_token"));
    // this.user &&
    //   (await this.$axios.get("/api/users/" + this.user.id).then((res) => {
    //     this.$store.state.user = res && res.data && res.data.result;
    //   }));
    // this.$store.state.user ? (this.name = this.$store.state.user.name) : "";

    // if (this.$store.state.user && this.$store.state.user.organization) {
    //   this.form3.name = this.$store.state.user.organization.name;
    //   this.form3.phoneNumber = this.$store.state.user.organization.phoneNumber;
    //   this.form3.address = this.$store.state.user.organization.address;
    // }
    // this.user &&
    //   (await this.$axios
    //     .get("/api/users/" + this.$store.state.user._id + "/orders")
    //     .then((res) => {
    //       this.orders = res && res.data && res.data.result;
    //     }));

    this.loading = true;
    console.log("user");
    console.log(this.user);
    // if (!this.user) {
    //   this.$router.push("/sign-in");
    // }
    // this.$axios.put("/api/users/"+user.id,data)
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
        let newtime =
          ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
        return newtime + " " + newdate;
      } else {
        return "-";
      }
    },
  },
};
</script>
<style lang="css">
.profile-upload .ant-upload-select-picture-card {
  width: 130px;
  height: 130px;
  border-radius: 50%;
}
.uplaod-svg {
  width: 17px;
  height: 17px;
}
.profile-upload .ant-upload-list-picture-card .ant-upload-list-item {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  padding: 0 !important;
  overflow: hidden;
}
.weather-drop__mobile h1 {
  font-size: 44px;
}
</style>

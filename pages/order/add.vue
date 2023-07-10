<template>
  <div class="section">
    <div class="container px-0">
      <div class="form">
        <div class="breadcrubms mv_w">
          <nuxt-link to="/">Заказы</nuxt-link><span>/</span>
          <nuxt-link to="/">Заказы</nuxt-link><span>/</span>
          <nuxt-link class="last-brcm" to="/">Добавить заказ</nuxt-link>
        </div>
        <div class="flex justify-between items-center mv_mt-4 mv_w">
          <h3>Добавить заказ</h3>
          <div class="back_btn mx-auto dv">
            <nuxt-link to="/order" tag="button"
              >Отмена<img src="@/assets/svg/back.svg" alt=""
            /></nuxt-link>
          </div>
        </div>
        <a-form-model ref="ruleFormOrder" :model="form" :rules="rules">
          <div class="form_block" v-if="loading">
            <h6>Информация о заказе</h6>
            <div class="form_other_info w-screen">
              <label for="textarea">Выберите категорию</label>
              <div class="flex gap-12 mv_flex-wrap">
                <div
                  :class="active_category == category?.id ? 'active' : ''"
                  class="order_category flex gap-8 flex-col items-center"
                  v-for="category in categories"
                  :key="category?.id"
                  @click="activeCategory(category?.id)"
                >
                  <img class="category_img" :src="category?.image" alt="" />
                  <p>{{ category?.title }}</p>
                </div>
              </div>
            </div>
            <div class="form_other_info mv_w-screen">
              <label for="textarea">Название заказа</label>
              <a-form-model-item class="mb-0 w-100" prop="title">
                <input v-model="form.title" placeholder="Дополнительная информация" />
              </a-form-model-item>
            </div>
            <div class="form_other_info mv_w-screen">
              <label for="textarea">Логотип организации</label>
              <drop-list
                :items="totalImage"
                class="item-upload"
                @insert="($event) => onInsert($event, 'id')"
                @dragend="($event) => dragEnd($event)"
                @reorder="$event.apply(totalImage)"
              >
                <template v-slot:item="{ item }" @dragend="dragEnd">
                  <drag :key="item.uid" :disabled="item.uid == 0">
                    <a-upload
                      :disabled="imagesData >= 7"
                      v-if="item.uid == 0"
                      :class="`${item.uid} order-add`"
                      action="https://prweb.pythonanywhere.com/api/upload_image"
                      list-type="picture-card"
                      :showUploadList="false"
                      :file-list="imagesData"
                      @preview="handlePreview"
                      @change="($event) => handleChangeVatiant($event)"
                    >
                      <div>
                        <div class="ant-upload-text">Добавить фото</div>
                      </div>
                    </a-upload>
                    <div
                      class="img-vw"
                      v-if="!item.uid == 0 && !dataDrag.includes(item.uid)"
                    >
                      <img
                        v-if="item?.response?.show_url"
                        :src="item?.response?.show_url"
                        alt=""
                      />
                      <a-spin tip="Uploading..." v-if="!item?.response?.show_url">
                      </a-spin>
                      <div class="img-vwb" v-if="item?.response?.show_url">
                        <button @click="uploadSHow(item)">
                          <img src="@/assets/svg/loop.svg" alt="" />
                        </button>
                        <button @click="uploadDelete(item.uid)">
                          <img src="@/assets/svg/del.svg" alt="" />
                        </button>
                      </div>
                    </div>
                    <label
                      v-if="!item.uid == 0 && item.uid <= 7"
                      class="form_other_info_label"
                      ><img src="@/assets/svg/addimg.svg" alt=""
                    /></label>
                  </drag>
                </template>

                <template v-slot:feedback="{ data }">
                  <div class="item feedback" :key="data">{{ data }}</div>
                </template>
              </drop-list>
            </div>
            <!-- <CoolLightBox 
            :items="new_images" 
            :index="index"
            @close="index = null">
          </CoolLightBox> -->

            <div class="form_other_info mv_w-screen">
              <label for="textarea">Дополнительная информация</label>
              <textarea
                v-model="form.desc"
                placeholder="Большое спасибо за всю мебель. Очень качественно и по доступным ценам Мы очень рады совместной работе с вами!  "
                id="textarea"
              ></textarea>
              <p class="mt-16">
                Опубликованный заказ будет отображаться на сайта для приема заявок
              </p>
            </div>
            <div class="form_other_info w-35 mv_w-screen">
              <label for="textarea">Nomer telefona <span class="required">*</span></label>
              <input
                v-mask="'+998-##-###-##-##'"
                v-model="form.phoneNumber"
                :class="{
                  required_b: $v.form.phoneNumber.$dirty && !$v.form.phoneNumber.required,
                }"
                placeholder="+998"
              />
              <span
                v-if="$v.form.phoneNumber.$dirty && !$v.form.phoneNumber.required"
                class="required mt-4"
                >Заполните поле</span
              >
            </div>
            <div
              class="flex justify-between items-center mt-41 w-70 mv_w-screen mv_flex-wrap mv_gap-12 mv_mt-24"
            >
              <div v-if="user" class="flex items-center gap-12">
                <img class="org_img" :src="user.photo_url" alt="" />
                <p>{{ $store.state.user?.username }}</p>
              </div>
              <button @click="submit" class="flex order signin mv_w-screen">
                <div class="signin_text">Отправить заявку</div>
                <Icons color="#ffffff" icon="success" />
              </button>
            </div>
          </div>
        </a-form-model>
      </div>
    </div>
    <a-modal v-model="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
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
import { required } from "vuelidate/lib/validators";
import { Drag, DropList } from "vue-easy-dnd";
// import CoolLightBox from 'vue-cool-lightbox'
// import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  components: {
    Drag,
    DropList,
  },
  data() {
    return {
      visible: false,
      visibleError: false,
      dataDrag: [1, 2, 3, 4, 5, 6, 7],
      emptyImages: [],
      active_category: null,
      loading: false,
      fileList: [],
      imagesData: [],
      previewVisible: false,
      previewImage: "",
      totalImage: [],
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
        title: "",
        desc: "",
        category: null,
        images: [
          {
            image: "",
            order: 1,
          },
        ],
      },
    };
  },
  validations: {
    form: {
      // category:{required},
      phoneNumber: { required },
    },
  },
  computed: {
    imageList() {
      return this.imagesData.length;
    },
  },
  methods: {
    submit() {
      this.form.images = this.imagesData.map((item, index) => {
        return {
          image: item.response.upload_url,
          order: index + 1,
        };
      });
      this.$refs.ruleFormOrder.validate((valid) => {
        if (valid) {
          this.__POST_ORDER();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleOk() {
      this.visible = false;
    },
    async handleChangeVatiant({ fileList }, id) {
      this.imagesData = await [...fileList];
      if (fileList[0]?.response?.show_url) {
        this.imagesData = [...fileList];
      }
      console.log(this.imagesData);
      this.totalImage = [
        {
          uid: 0,
        },
        ...this.imagesData,
        ...this.emptyImages,
      ];
    },
    async __POST_ORDER() {
      try {
        const data = await this.$store.dispatch("fetchOrders/postOrder", this.form);
        this.visible = true;
      } catch (e) {
        this.visibleError = true;
      }
    },
    uploadSHow(img) {
      this.previewImage = img.response.show_url;
      this.previewVisible = true;
    },
    uploadDelete(imgId) {
      this.imagesData = this.imagesData.filter((item) => item.uid != imgId);
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
    activeCategory(id) {
      this.active_category = id;
      this.form.category = id;
    },
    onInsert(event, id) {
      this.totalImage.splice(event.index, 0, event.data);
      this.imagesData = this.totalImage.filter(
        (item) => ![0, 1, 2, 3, 4, 5, 6, 7].includes(item.uid)
      );
      console.log(id);
    },
    dragEnd() {
      console.log("asdfasdasd");
    },
  },
  async asyncData({ store }) {
    const [categoriesData] = await Promise.all([
      store.dispatch("fetchCategories/getCategories"),
    ]);
    const categories = categoriesData?.results;
    return {
      categories,
    };
  },

  mounted() {
    if (this.emptyImages.length < this.dataDrag.length) {
      console.log(this.dataDrag.length - this.emptyImages.length);
      const imgLength = this.emptyImages.length;
      for (let i = 1; i <= this.dataDrag.length - imgLength; i++) {
        console.log(i);
        this.emptyImages.push({
          uid: i,
          id: i,
        });
      }
      this.totalImage = [
        {
          uid: 0,
        },
        ...this.imagesData,
        ...this.emptyImages,
      ];
    }
    this.loading = false;
    this.user =
      localStorage &&
      localStorage.getItem("access_token") &&
      JSON.parse(localStorage.getItem("access_token"));
    if (!this.user) {
      this.$router.push("/sign-in");
    }
    this.loading = true;
  },

  watch: {
    imageList(val) {
      const currentImages = val;
      const emptyImages = this.emptyImages.length;
      const deff = currentImages + emptyImages;
      const deff1 = deff - 7;
      if (deff1 > 0) {
        for (let i = 0; i < deff1; i++) {
          this.emptyImages = this.emptyImages.filter((item, index) => index != i);
        }
      }
      this.totalImage = [
        {
          uid: 0,
        },
        ...this.imagesData,
        ...this.emptyImages,
      ];
    },
  },
};
</script>
<style lang="css">
.order-add .ant-upload.ant-upload-select-picture-card {
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  height: 130px;
  align-items: center;
  background: #fafafc;
  border: 1px solid #ebebeb;
  border-radius: 8px;
}
.order-add .ant-upload.ant-upload-select-picture-card span {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}
.ant-upload-text {
  -webkit-text-decoration-line: underline;
  text-decoration-line: underline;
  color: #3c4bdc !important;
}
.item-upload {
  display: grid;
  grid-template-columns: calc(25% - 6px) calc(25% - 6px) calc(25% - 6px) calc(25% - 6px);
  grid-gap: 8px;
  gap: 8px;
}
.img-vw img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.img-vw {
  width: 100%;
  height: 130px;
  border-radius: 8px;
  overflow: hidden;
}
.vmodal-success__image {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.vmodal-success__image span {
  position: absolute;
}
.vmodal-success__body {
  padding: 32px 68px 40px 68px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.vmodal-success__body h2 {
  color: #000;
  text-align: center;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 130%;
  margin-bottom: 0;
}
.vmodal-success__body a {
  color: #00c008;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  margin-top: 53px;
}
</style>

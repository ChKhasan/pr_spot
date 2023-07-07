<template>
  <div class="section">
    <div class="container_xl">
      <div class="section_block home_order mt-0 pt-0">
        <h2 class="mb-32">Все заказы</h2>
        <div class="order">
          <div class="dv order_tabs">
            <h3>Категория</h3>
            <div class="flex flex-col gap-12 mt-20 justify-center">
              <div
                :class="{
                  active: !Object.keys($route.query).includes('category'),
                }"
                @click="tab = null"
                class="order_tab"
              >
                <div class="flex items-center gap-12">
                  <Icons color="#FFF9F5" icon="pen" />Все заказы
                </div>
                <span>{{ totalCount }}</span>
              </div>
              <div
                v-for="(category, index) in categories"
                :key="index"
                @click="tab = category.id"
                :class="{ active: $route.query.category == category.id }"
                class="order_tab"
              >
                <div class="flex items-center gap-12">
                  <Icons
                    :color="tab == category.id ? '#000000' : '#FFF9F5'"
                    icon="pen"
                  />{{ category.title }}
                </div>
                <span>{{ category?.order_count }}</span>
              </div>
              <!-- <div @click="tab='CARD'" :class="{active:tab=='CARD'}" class="order_tab"><div class="flex items-center gap-12"><Icons :color="tab=='CARD' ? '#000000' : '#FFF9F5'" icon="pen" />Визитка</div> <span>12</span> </div>
              <div @click="tab='BANNER'" :class="{active:tab=='BANNER'}" class="order_tab"><div class="flex items-center gap-12"><Icons :color="tab=='BANNER' ? '#000000' : '#FFF9F5'" icon="pen" />Баннер</div> <span>12</span> </div>
              <div @click="tab='CATALOG'" :class="{active:tab=='CATALOG'}" class="order_tab"><div class="flex items-center gap-12"><Icons :color="tab=='CATALOG' ? '#000000' : '#FFF9F5'" icon="pen" />Каталог</div> <span>12</span> </div>
              <div @click="tab='BOOK'" :class="{active:tab=='BOOK'}" class="order_tab"><div class="flex items-center gap-12"><Icons :color="tab=='BOOK' ? '#000000' : '#FFF9F5'" icon="pen" />Книга</div> <span>12</span> </div>
              <div @click="tab='STAND'" :class="{active:tab=='STAND'}" class="order_tab"><div class="flex items-center gap-12"><Icons :color="tab=='STAND' ? '#000000' : '#FFF9F5'" icon="pen" />Стенд</div> <span>12</span> </div>
              <div @click="tab='CLOTHEPRINT'" :class="{active:tab=='CLOTHEPRINT'}" class="order_tab"><div class="flex items-center gap-12"><Icons :color="tab=='CLOTHEPRINT' ? '#000000' : '#FFF9F5'" icon="pen" />Одежда печать</div> <span>12</span> </div>
              <div @click="tab='FLYER'" :class="{active:tab=='FLYER'}" class="order_tab"><div class="flex items-center gap-12"><Icons :color="tab=='FLYER' ? '#000000' : '#FFF9F5'" icon="pen" />Флаер</div> <span>12</span> </div>
              <div @click="tab='OTHER'" :class="{active:tab=='OTHER'}" class="order_tab"><div class="flex items-center gap-12"><Icons :color="tab=='OTHER' ? '#000000' : '#FFF9F5'" icon="pen" />Другие</div> <span>12</span> </div> -->
            </div>
          </div>
          <div class="mv select_category">
            <h3>Категория</h3>
            <el-select v-model="tab" clearable placeholder="Bыберите">
              <el-option
                v-for="(item, index) in categories"
                :key="index"
                :label="item.title"
                @change="filterCat"
                :value="item.id"
              >
                <span>{{ item.title }}</span>
                <span
                  style="
                    color: #ff5c00;
                    background: #fff9f5;
                    border-radius: 50%;
                    padding: 5px;
                    margin-left: 10px;
                  "
                  >(1)</span
                >
              </el-option>
            </el-select>
          </div>
          <div class="orders">
            <div class="order_top">
              <input
                @input="search"
                v-model="searchVal"
                placeholder="Поиск заказов"
                type="text"
              />
              <nuxt-link tag="button" to="/order/add" class="public_order w-screen dv"
                ><img src="@/assets/svg/plus_border(orange).svg" alt="" /> Опубликовать
                заказ</nuxt-link
              >
            </div>
            <div class="spin__container" v-if="loading">
              <a-spin size="large" />
            </div>
            <div class="flex flex-col gap-8" v-else>
              <!-- <OrderCard />/ -->
              <OrderCard v-for="order in orders" :key="order?.id" :order="order" />
            </div>
          </div>
        </div>
        <!-- <Loader v-else /> -->
      </div>
    </div>
  </div>
</template>
<script>
import OrderCard from "../../components/cards/orderCard.vue";
import Loader from "@/components/Loader.vue";
import moment from "moment";
export default {
  components: { Loader, OrderCard },
  data() {
    return {
      mynomer: null,
      active_category: null,
      orders: [],
      new_images: [],
      images: [],
      loading: false,
      cat_orders: [],
      searchVal: "",
      tab: "",
      options: [
        {
          value: "CARD",
          label: "Визитка",
        },
        {
          value: "BANNER",
          label: "Баннер",
        },
        {
          value: "CATALOG",
          label: "Каталог",
        },
        {
          value: "BOOK",
          label: "Книга",
        },
        {
          value: "STAND",
          label: "Стенд",
        },
        {
          value: "CLOTHEPRINT",
          label: "Одежда печать",
        },
        {
          value: "FLYER",
          label: "Флайер",
        },
        {
          value: "OTHER",
          label: "Другие",
        },
      ],
      value: "",
      timeout: null,
    };
  },
  // async asyncData({ store }) {
  //   const [ordersData] = await Promise.all([store.dispatch("fetchOrders/getOrders")]);
  //   const orders = ordersData?.results;
  //   return {
  //     orders,
  //   };
  // },
  async asyncData({ store, query }) {
    const [categoriesData, ordersData, totalCountData] = await Promise.all([
      store.dispatch("fetchCategories/getCategories"),
      store.dispatch("fetchOrders/getOrders", { params: { ...query } }),
      store.dispatch("fetchOrders/getOrders"),
    ]);
    const categories = categoriesData?.results;
    const orders = ordersData?.results;
    const totalCount = totalCountData?.count;
    return {
      categories,
      orders,
      totalCount,
    };
  },
  watch: {
    async tab(val) {
      if (val) {
        await this.$router.replace({
          path: `order`,
          query: {
            category: val,
          },
        });
        this.__GET_ORDERS();
      } else {
        await this.$router.replace({
          path: `order`,
          query: {},
        });
        this.__GET_ORDERS();
      }
      this.searchVal = "";
    },
    searchVal(val) {
      this.changeSearch(val);
    },
  },
  methods: {
    async __GET_ORDERS() {
      try {
        this.loading = true;
        const ordersData = await this.$store.dispatch("fetchOrders/getOrders", {
          params: { ...this.$route.query },
        });
        this.loading = false;
        this.orders = ordersData?.results;
      } catch (e) {}
    },
    moment,
    async changeSearch(val) {
      if (val.length > 2) {
        if (this.$route.query?.search != val)
          await this.$router.replace({
            path: "order",
            query: { ...this.$route.query, search: val },
          });
        if (val == this.$route.query.search) this.__GET_ORDERS();
      } else if (val.length == 0) {
        this.clearQuery("order", "__GET_ORDERS");
      }
    },
    async clearQuery(url, func) {
      const query = { ...this.$route.query };
      delete query.search;
      if (this.$route.query?.search) {
        await this.$router.replace({
          path: url,
          query: { ...query },
        });
        this[func]();
      }
    },
    filterCat() {
      this.$axios.get("/api/orders", { params: { category: this.tab } }).then((res) => {
        this.orders = res && res.data && res.data.result && res.data.result.orders;
      });
    },
    search() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        this.$axios
          .get("/api/orders", { params: { searchWord: this.search_text } })
          .then((res) => {
            this.orders = res && res.data && res.data.result && res.data.result.orders;
          });
      }, 500);
    },
  },
  async mounted() {
    console.log(Object.keys(this.$route.query));
  },
};
</script>

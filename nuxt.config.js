// import 'element-ui/lib/theme-chalk/index.css';
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "PR Spot",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      { src: "https://telegram.org/js/telegram-widget.js?22", async: true },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/css/main.scss",
    "~/assets/css/colors.scss",
    "~/assets/css/variable.scss",
    "~/assets/css/media.scss",
    "element-ui/lib/theme-chalk/index.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "./plugins/mask.js",
    "./plugins/element.js",
    "./plugins/vuelidate.js",
    "./plugins/telegram.js",
    { src: "~plugins/antd-ui.js", ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/style-resources",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    credentials: false,
    init(axios) {
      axios.defaults.withCredentials = true;
    },
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "https://prspot.uz/",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  target: "server",
  server: {
    port: 8000,
    host: "localhost",
  },
};

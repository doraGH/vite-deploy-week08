import { createApp } from 'vue';
import { createPinia } from 'pinia';

import VueAxios from 'vue-axios';
import axios from 'axios';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import * as AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Vue3Toasity, { toast } from 'vue3-toastify';
import router from './router';
import App from './App.vue';

import 'vue3-toastify/dist/index.css';
import './assets/css/all.scss';

library.add(fas, fab);

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});

setLocale('zh_TW');

const app = createApp(App);

app.component('VueLoading', Loading);
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('VField', Field);
app.component('VForm', Form);
app.component('ErrorMessage', ErrorMessage);
app.use(VueAxios, axios);
app.use(createPinia());
app.use(router);

app.use(Vue3Toasity, {
  autoClose: 500,
  position: toast.POSITION.TOP_CENTER,
  toastStyle: {
    fontSize: '12px',
    minHeight: '50px',
    marginBottom: '0.5rem',
  },
});

app.mount('#app');

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import VueAxios from 'vue-axios';
import axios from 'axios';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import CKEditor from '@ckeditor/ckeditor5-vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner, faEye } from '@fortawesome/free-solid-svg-icons';

import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import * as AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

import 'bootstrap';
import Vue3Toasity, { toast } from 'vue3-toastify';
import router from './router';
import App from './App.vue';

import 'vue3-toastify/dist/index.css';
import './assets/all.scss';

library.add(faSpinner, faEye);

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});

// 設定預設語系
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
app.use(CKEditor);

// 吐司套件
app.use(Vue3Toasity, {
  autoClose: 2000, // 自動關閉時間
  position: toast.POSITION.TOP_RIGHT, // 提示窗位置
  toastStyle: {
    fontSize: '12px',
    minHeight: '50px',
    marginBottom: '0.5rem',
  },
});

app.mount('#app');

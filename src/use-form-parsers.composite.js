import Vue from 'vue';
import VueCompositionApi, { ref } from '@vue/composition-api';

Vue.use(VueCompositionApi);

export const parseResult = ref(r => r);
export const parseError = ref(e => e);

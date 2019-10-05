import VueCompositionApi from '@vue/composition-api';
import VueFormState from './vue-form-state';
import useFormState from './vue-form-state.composite';

export { VueFormState, useFormState };

export default class VueFormStatePlugin {
    static install(
        Vue,
        options = {}
    ) {
        Vue.use(VueCompositionApi);

        const name = options.name || 'form-state';
        const parseError = options.parseError || function(error) { return error };
        const parseResult = options.parseResult || function(result) { return result };

        Vue.component(name, VueFormState);

        Vue.prototype.$formState = {
            parseError,
            parseResult,
        };
    }
}

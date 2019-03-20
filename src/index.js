import VueFormState from './vue-form-state';

export { VueFormState };

export default class VueFormStatePlugin {
    static install(
        Vue,
        options = {}
    ) {
        const name = options.name || 'form-state';
        const parseError = options.parseError || function(error) { return error };
        const parseResponse = options.parseResponse || function(response) { return response };

        Vue.component(name, VueFormState);

        Vue.prototype.$formState = {
            parseError,
            parseResponse,
        };
    }
}

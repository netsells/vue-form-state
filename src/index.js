import VueFormState from './vue-form-state';
import withFormState from './with-form-state.mixin';

export { VueFormState, withFormState };

export default class VueFormStatePlugin {
    static install(
        Vue,
        options = {}
    ) {
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

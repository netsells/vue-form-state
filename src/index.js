import VueCompositionApi from '@vue/composition-api';

import VueFormState from './vue-form-state';
import useFormState from './vue-form-state.composite';

export { VueFormState, useFormState };

export default class VueFormStatePlugin {
    static install(
        Vue,
        options = {}
    ) {
        const { parseResult, parseError } = require('./use-form-parsers.composite');

        const name = options.name || 'form-state';
        if (options.parseError) parseError.value = options.parseError;
        if (options.parseResult) parseResult.value = options.parseResult;

        Vue.component(name, VueFormState);
    }
}

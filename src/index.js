import VueCompositionApi from '@vue/composition-api';

import VueFormState from './vue-form-state';
import useFormState from './use-form-state.composite';
import useFormParsers from './use-form-parsers.composite';

export { VueFormState, useFormState, useFormParsers };

export default class VueFormStatePlugin {
    static install(
        Vue,
        options = {}
    ) {
        Vue.use(VueCompositionApi);

        const { parseResult, parseError } = useFormParsers();

        const name = options.name || 'form-state';
        if (options.parseError) parseError.value = options.parseError;
        if (options.parseResult) parseResult.value = options.parseResult;

        Vue.component(name, VueFormState);
    }
}

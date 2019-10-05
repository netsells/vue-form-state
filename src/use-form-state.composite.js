import { ref, computed } from '@vue/composition-api';

import useFormParsers from './use-form-parsers.composite';
import usePromiseState from './use-promise-state.composite';

const useFormState = (submit) => {
    const {
        fire,
        loading,
        error: rawError,
        result: rawResult,
    } = usePromiseState();

    const { parseError, parseResult } = useFormParsers();

    return {
        async submit(...args) {
            await fire(submit(...args));
        },

        loading,
        rawError,
        rawResult,

        result: computed(() => parseResult.value(rawResult.value)),
        error: computed(() => parseError.value(rawError.value)),
    };
};

export default useFormState;

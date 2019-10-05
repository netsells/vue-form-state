import { ref, computed } from '@vue/composition-api';

import useFormParsers from './use-form-parsers.composite';

const useFormState = (submit) => {
    const loading = ref(false);
    const rawError = ref(null);
    const rawResult = ref(null);
    const { parseError, parseResult } = useFormParsers();

    return {
        async submit(...args) {
            try {
                loading.value = true;
                rawError.value = null;
                rawResult.value = null;

                rawResult.value = await submit(...args);
            } catch(e) {
                rawError.value = e;
            } finally {
                loading.value = false;
            }
        },

        loading,
        rawError,
        rawResult,

        result: computed(() => parseResult.value(rawResult.value)),
        error: computed(() => parseError.value(rawError.value)),
    };
};

export default useFormState;

import { ref } from '@vue/composition-api';

const useFormState = (submit) => {
    const loading = ref(false);
    const rawError = ref(null);
    const rawResult = ref(null);

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
    };
};

export default useFormState;

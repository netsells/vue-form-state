import { ref } from '@vue/composition-api';

const usePromiseState = () => {
    const loading = ref(false);
    const error = ref(null);
    const result = ref(null);

    return {
        async fire(promise) {
            try {
                result.value = null;
                error.value = null;
                loading.value = true;

                result.value = await promise;
            } catch(e) {
                error.value = e;
            } finally {
                loading.value = false;
            }
        },

        loading,
        error,
        result,
    };
};

export default usePromiseState;

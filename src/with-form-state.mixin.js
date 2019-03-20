export default ({
    submit = 'submit',
    loading = 'loading',
    rawError = 'rawError',
    rawResult = 'rawResult',
    result = 'result',
    error = 'error',
    handleSubmit = 'handleSubmit',
} = {}) => ({
    data() {
        return {
            [loading]: false,
            [rawError]: null,
            [rawResult]: null,
        };
    },

    computed: {
        [result]() {
            return this.$formState.parseResult(this[rawResult]);
        },

        [error]() {
            return this.$formState.parseError(this[rawError]);
        },
    },

    methods: {
        async [handleSubmit](...args) {
            try {
                this[loading] = true;
                this[rawError] = null;
                this[rawResult] = null;

                this[rawResult] = await this[submit](...args);
            } catch(e) {
                this[rawError] = e;
            } finally {
                this[loading] = false;
            }
        },
    },
});

<template>
    <div class="vue-form-state">
        <slot
            :loading="loading"
            :raw-result="rawResult"
            :raw-error="rawError"
            :result="result"
            :error="error"
            :submit="handleSubmit"
        />
    </div>
</template>

<script>
    export default {
        name: 'vue-form-state',

        props: {
            submit: {
                type: Function,
                required: true,
            },
        },

        data() {
            return {
                loading: false,
                rawError: null,
                rawResult: null,
            };
        },

        computed: {
            result() {
                return this.$formState.parseResult(this.rawResult);
            },

            error() {
                return this.$formState.parseError(this.rawError);
            },
        },

        methods: {
            async handleSubmit(...args) {
                try {
                    this.loading = true;
                    this.rawError = null;
                    this.rawResult = null;

                    this.rawResult = await this.submit(...args);
                } catch(e) {
                    this.rawError = e;
                } finally {
                    this.loading = false;
                }
            },
        },
    };
</script>

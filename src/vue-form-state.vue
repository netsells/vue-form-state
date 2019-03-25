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
    import withFormState from './with-form-state.mixin';

    export default {
        name: 'vue-form-state',

        mixins: [
            withFormState({
                handleSubmit: 'handleSubmitMixin'
            }),
        ],

        props: {
            submit: {
                type: Function,
                required: true,
            },
        },

        methods: {
            async handleSubmit(...args) {
                await this.handleSubmitMixin(...args);

                if (this.result) {
                    this.$emit('result', this.result);
                }

                if (this.error) {
                    this.$emit('error', this.error);
                }
            },
        },
    };
</script>

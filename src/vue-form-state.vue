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
    import useFormState from './vue-form-state.composite';

    export default {
        props: {
            submit: {
                type: Function,
                required: true,
            },
        },

        setup(props) {
            const { submit: handleSubmitComposite, ...rest } = useFormState(props.submit);

            return {
                ...rest,
                handleSubmitComposite,
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
                await this.handleSubmitComposite(...args);

                if (this.result) {
                    this.$emit('result', this.result, this.rawResult);
                }

                if (this.error) {
                    this.$emit('error', this.error, this.rawError);
                }
            },
        },
    };
</script>

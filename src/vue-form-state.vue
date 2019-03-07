<template>
    <div class="vue-form-state">
        <slot
            :loading="loading"
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
                error: null,
                result: null,
            };
        },

        methods: {
            async handleSubmit(...args) {
                try {
                    this.loading = true;
                    this.error = null;

                    this.result = await this.submit(...args);
                } catch(e) {
                    this.error = e;
                } finally {
                    this.loading = false;
                }
            },
        },
    };
</script>

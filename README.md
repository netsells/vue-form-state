[![npm version](https://badge.fury.io/js/%40netsells%2Fvue-form-state.svg)](https://badge.fury.io/js/%40netsells%2Fvue-form-state)
[![Build Status](https://travis-ci.com/netsells/vue-form-state.svg?branch=master)](https://travis-ci.com/netsells/vue-form-state)
[![codecov](https://codecov.io/gh/netsells/vue-form-state/branch/master/graph/badge.svg)](https://codecov.io/gh/netsells/vue-form-state)

# Vue Form State

Handle asynchronous loading, error and result states based on the result of a
promise.

## Installation
```
yarn add @netsells/vue-form-state
```

```javascript
import Vue from 'vue';
import VueFormState from '@netsells/vue-form-state';

Vue.use(VueFormState);
```

### Options

You can pass the following options to change the way it functions

```javascript
Vue.use(VueFormState, {
    parseError(error) {
        return error.response.data.message;
    },

    name: 'handle-form-state',
});
```

#### parseError

Parses an error for every form (i.e. globally). Output is stored in `error`
(original error is in `rawError`)

#### parseResult

Parses a response for every form (i.e. globally). Output is stored in `result`
(original response is in `rawResult`)

#### name

Change the name of the component (`form-state` by default)

## Using the composition

```html
<template>
    <form @submit.prevent="submit">
        <p>Result: {{ result }}</p>
        <p>Error: {{ error }}</p>
        <button :disabled="loading">Submit</button>
    </form>
</template>
```

```javascript
import { useFormState } from '@netsells/vue-form-state';

export default {
    setup() {
        return useFormState(async () => await fetch());
    },
};
```

## Using the component

In your template:

```html
    <form-state :submit="submitForm">
        <template
            v-slot:default="{
                submit,
                error,
                loading,
                result,
            }"
        >
            <form @submit.prevent="submit">
                <!-- your form -->
            </form>
        </template>
    </form-state>
```

Note that the `submit` callback is a prop on the `form-state` component. This is
so it has access to the return value (your promise).

In your methods:

```javascript
methods: {
    submitForm() {
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(this.formData),
        });
    }
}
```

The result of this promise will be set to `rawResult` in the slot. If it errors,
the error will be set to the `rawError` scoped slot. If you have supplied either
a `parseResult` or `parseError` optional functional, the result of these will be
available as `result` and `error` respectively.

You can also get the result or error via an event emitted by `form-state`:

```html
<form-state
    :submit="submitForm"
    @result="handleResult"
    @error="handleError"
>
    <!-- template -->
</form-state>
```

```javascript
methods: {
    handleResult(result, rawResult) {
        // code
    },

    handleError(error, rawError) {
        // code
    },
}
```

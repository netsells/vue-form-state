import { createLocalVue, mount } from '@vue/test-utils';
import Vue from 'vue';

import VueFormState from '@/index';

Vue.use(VueFormState);

describe('VueFormState', () => {
    it('exists', () => {
        expect(VueFormState).toBeTruthy();
    });

    it('installs its functions', () => {
        const vm = new Vue();

        expect(vm.$formState).toEqual({
            parseResult: expect.any(Function),
            parseError: expect.any(Function),
        });
    });

    describe('when the form-state component is used', () => {
        let localVue;
        let wrapper;
        let submit;
        let testComponent;
        let promise;
        let resolve;
        let reject;

        beforeEach(() => {
            promise = new Promise((res, rej) => {
                resolve = res;
                reject = rej;
            });

            localVue = createLocalVue();

            submit = jest.fn().mockImplementation(() => promise);

            testComponent = {
                template: `
                    <form-state :submit="submit">
                        <template
                            v-slot:default="{
                                submit,
                                rawResult,
                                rawError,
                                error,
                                loading,
                                result,
                            }"
                        >
                            <form @submit.prevent="submit">
                                <div id="rawResult">{{ rawResult }}</div>
                                <div id="rawError">{{ rawError }}</div>
                                <div id="error">{{ error }}</div>
                                <div id="result">{{ result }}</div>
                                <div id="loading">{{ loading }}</div>
                            </form>
                        </template>
                    </form-state>
                `,

                methods: {
                    submit,
                },
            };
        });

        const sharedTests = (parsedResult, parsedError) => {
            it('renders a div', () => {
                expect(wrapper.contains('div')).toBe(true);
            });

            it('renders the slot', () => {
                expect(wrapper.contains('form')).toBe(true);
            });

            it('sets loading to false', () => {
                expect(wrapper.find('#loading').text()).toBe('false');
            });

            describe('when form submitted', () => {
                beforeEach(() => {
                    wrapper.find('form').trigger('submit');
                });

                afterEach(() => {
                    resolve();
                });

                it('calls the submit function', () => {
                    expect(submit).toHaveBeenCalled();
                });

                it('sets loading to true', () => {
                    expect(wrapper.find('#loading').text()).toBe('true');
                });

                describe('when promise resolves', () => {
                    beforeEach(() => {
                        resolve('foo');
                    });

                    it('sets the raw result to the response', () => {
                        expect(wrapper.find('#rawResult').text()).toBe('foo');
                    });

                    it('sets the result to the parsed result', () => {
                        expect(wrapper.find('#result').text()).toBe(parsedResult);
                    });

                    it('sets loading to false', () => {
                        expect(wrapper.find('#loading').text()).toBe('false');
                    });
                });

                describe('when promise rejects', () => {
                    beforeEach(() => {
                        reject('bar');
                    });

                    it('sets the raw error to the response', () => {
                        expect(wrapper.find('#rawError').text()).toBe('bar');
                    });

                    it('sets the error to the parsed error', () => {
                        expect(wrapper.find('#error').text()).toBe(parsedError);
                    });

                    it('sets loading to false', () => {
                        expect(wrapper.find('#loading').text()).toBe('false');
                    });
                });
            });
        };

        describe('when parse functions are used', () => {
            beforeEach(() => {
                localVue.use(VueFormState, {
                    parseError: error => error && error.toUpperCase(),
                    parseResult: resp => resp && resp.toString().split('').reverse().join(''),
                });

                wrapper = mount(testComponent, {
                    localVue,
                });
            });

            sharedTests('oof', 'BAR');
        });

        describe('when parse functions are not used', () => {
            beforeEach(() => {
                localVue.use(VueFormState);

                wrapper = mount(testComponent, {
                    localVue,
                });
            });

            sharedTests('foo', 'bar');
        });
    });
});

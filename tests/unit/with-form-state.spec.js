import { withFormState } from '@/index';

describe('withFormState', () => {
    it('sets handleSubmit name to default if not specified', () => {
        expect(withFormState().methods.handleSubmit).toEqual(expect.any(Function));
    });
});

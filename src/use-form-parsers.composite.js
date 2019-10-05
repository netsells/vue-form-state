import { ref } from '@vue/composition-api';

let parseResult;
let parseError;

const useFormParsers = () => {
    parseResult = parseResult || ref(r => r);
    parseError = parseError || ref(e => e);

    return {
        parseResult,
        parseError,
    };
};

export default useFormParsers;


import { useState } from "react";
import { validateValue } from "../utils/validators";

function useInput(inputValue, validators, isValidDefault=false) {

    const [value, setValue] = useState(inputValue);
    const [valueIsValid, setValueIsValid] = useState(isValidDefault);
    const [errMessage, setErrMessage] = useState("");

    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const valueInput = target.value;

        setValue(valueInput);
        const { valueIsValid, errMessage } = validateValue(name, valueInput, validators);
        setValueIsValid(valueIsValid);
        setErrMessage(errMessage)
        
    };

    return [ value, handleChange, valueIsValid, errMessage]

}

export default useInput;
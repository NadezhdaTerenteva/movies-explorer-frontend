import { useState, useCallback, useEffect } from "react";

function validateValue(name, value, validators) {

    let valueIsValid = true;
    let errMessage = "";

    if (name in validators) {
        for (const item of validators[name]) {
            valueIsValid = item.validator(value) && value.length > 0;

            if (!valueIsValid) {
                errMessage = item.errMessage; 
                break;

            }
        }
    }
    
    return { valueIsValid, errMessage};

}

const hasError = (errors) => {
    let result = false;
    for (const [key, value] of Object.entries(errors)) {
        result = value !== "";

        if (result) {
            break;
        }
    }

    return result;
}

//хук управления формой и валидации формы
function useFormWithValidation(initialValues, validators) {
    const [formInputs, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
    const [form, setForm] = useState();
    useEffect(()=>{
        setIsValid(!hasError(errors) && form.closest("form").checkValidity());
    }, [errors, form])
    
    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        const { valueIsValid, errMessage } = validateValue(name, value, validators);
        setValues({ ...formInputs, [name]: value });
        setErrors({ ...errors, [name]: errMessage });
        setForm(target.closest("form"));
        console.log(errors);
        
    };

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );

    return { formInputs, setValues, handleChange, errors, setErrors, isValid, setIsValid, resetForm };
}

export default useFormWithValidation;
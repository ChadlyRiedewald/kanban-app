import { Field, FieldArray, useFormikContext } from 'formik';
import { Label, Checkbox } from './index';
import { useEffect } from 'react';

export const CheckboxGroup = ({ label, name, subtasks, ...props }) => {
    // useEffect(() => {
    //     if (values !== initialValues) {
    //         submitForm();
    //     }
    // }, [values]);

    return (
        <Label variant='input' {...props}>
            {label}
            <FieldArray name={name}></FieldArray>
        </Label>
    );
};

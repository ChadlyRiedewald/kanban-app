import { Field, FieldArray } from 'formik';
import { Label, StyledInput } from './index';
import { ReactComponent as Delete } from '../../../assets/icon-cross.svg';
import Button from '../button';

export const InputGroup = ({ values, label, name, placeholder }) => {
    return (
        <Label variant='input'>
            {label}
            <FieldArray name={name}>
                {({ push, remove }) => (
                    <>
                        {values.map((_, index) => (
                            <Label key={index} variant='input-group'>
                                <Field
                                    as={StyledInput}
                                    name={`${name}.${index}`}
                                    type='text'
                                    placeholder={placeholder}
                                />
                                <Delete onClick={() => remove(index)} />
                            </Label>
                        ))}
                        <Button
                            onClick={() => push('')}
                            type='button'
                            variant='secondary'
                            size='medium'
                            fluid
                        >
                            + Add New Subtask
                        </Button>
                    </>
                )}
            </FieldArray>
        </Label>
    );
};

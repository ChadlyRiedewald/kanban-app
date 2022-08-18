import { Field, FieldArray } from 'formik';
import { ErrorMessage, Label, StyledInput } from './index';
import { ReactComponent as Delete } from '../../../assets/icon-cross.svg';
import Button from '../button';
import styled from 'styled-components/macro';

const InputsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
`;

export const InputGroup = ({ label, name, values }) => {
    return (
        <Label variant='input'>
            {label}
            <InputsWrapper>
                <FieldArray name={name}>
                    {({ push, remove }) => (
                        <>
                            {values.map((input, index) => (
                                <Label key={index} variant='input-group'>
                                    <Field name={`${name}.${index}.title`}>
                                        {({ field, meta }) => (
                                            <>
                                                <StyledInput
                                                    {...field}
                                                    name={`${name}.${index}.title`}
                                                    placeholder={
                                                        input.placeholder
                                                    }
                                                    error={
                                                        meta.touched &&
                                                        !!meta.error
                                                    }
                                                />
                                                {meta.touched && meta.error ? (
                                                    <ErrorMessage inputGroup>
                                                        {meta.error}
                                                    </ErrorMessage>
                                                ) : null}
                                            </>
                                        )}
                                    </Field>
                                    <Delete onClick={() => remove(index)} />
                                </Label>
                            ))}
                            <Button
                                disabled={values.length >= 8}
                                onClick={() => push('')}
                                type='button'
                                variant='secondary'
                                size='medium'
                                fluid
                            >
                                + Add{' '}
                                {name === 'columns' ? 'Column' : 'Subtask'}
                            </Button>
                        </>
                    )}
                </FieldArray>
            </InputsWrapper>
        </Label>
    );
};

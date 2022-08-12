import { Label } from './Label';
import { nanoid } from '@reduxjs/toolkit';

export const TextInput = ({ label, ...otherProps }) => {
    const id = nanoid();

    return (
        <Label htmlFor={id}>
            {label}
            <input id={id} type='text' {...otherProps} />
        </Label>
    );
};

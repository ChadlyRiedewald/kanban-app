import { Label } from './Label';
import { nanoid } from '@reduxjs/toolkit';

export const TextArea = ({ label, ...otherProps }) => {
    const id = nanoid();

    return (
        <Label htmlFor={id}>
            {label}
            <textarea id={id} {...otherProps} />
        </Label>
    );
};

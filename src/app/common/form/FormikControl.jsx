import { Input, TextArea, Select, Checkbox, InputGroup } from './index';

export function FormikControl({ control, ...props }) {
    switch (control) {
        case 'input':
            return <Input {...props} />;
        case 'input-group':
            return <InputGroup {...props} />;
        case 'textarea':
            return <TextArea {...props} />;
        case 'select':
            return <Select {...props} />;
        case 'checkbox':
            return <Checkbox {...props} />;
        default:
            return null;
    }
}

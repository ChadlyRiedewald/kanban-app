import styled from 'styled-components/macro';
import { Root } from '@radix-ui/react-label';
import { primaryBg, textColor } from '../../../constants';

//=====================
// STYLED COMPONENTS
const BaseLabel = styled(Root)`
    font-size: var(--font-xs);
    font-weight: var(--font-bold);
    line-height: var(--line-height-xs);
    position: relative;
`;

const InputGroupLabel = styled(BaseLabel)`
    display: flex;
    gap: var(--space-sm);
    align-items: center;
    cursor: pointer;

    svg {
        flex-shrink: 0;
    }
`;

const SignInLabel = styled(InputGroupLabel)`
    svg {
        position: absolute;
        width: 14px;
        height: 14px;
    }
`;

const InputLabel = styled(BaseLabel)`
    color: var(--color-gray-600);
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
`;

const SelectLabel = styled(InputLabel)`
    svg {
        position: absolute;
        bottom: 16px;
        right: 16px;
    }
`;

const CheckboxLabel = styled(BaseLabel)`
    display: flex;
    cursor: pointer;
    gap: var(--space-sm);
    align-items: center;
    line-height: var(--line-height-sm);
    font-size: var(--font-xs);
    width: 100%;
    padding: 14px 12px;
    border-radius: var(--radii-sm);
    text-decoration-thickness: 1px;
    background-color: ${primaryBg};
    text-decoration: ${p => p.checked && 'line-through'};
    color: ${p => (p.checked ? 'var(--color-gray-500)' : textColor)};
    position: relative;
    transition: all 0.3s ease-in-out;

    svg {
        position: absolute;
        width: 14px;
        height: 14px;
    }

    &:hover {
        background-color: var(--color-purple-300);
    }
`;

//=====================
// COMPONENTS
export const Label = ({ children, variant, ...props }) => {
    let Component;

    switch (variant) {
        case 'checkbox': {
            Component = CheckboxLabel;
            break;
        }
        case 'sign-in': {
            Component = SignInLabel;
            break;
        }
        case 'select': {
            Component = SelectLabel;
            break;
        }
        case 'input-group': {
            Component = InputGroupLabel;
            break;
        }
        case 'input':
        default: {
            Component = InputLabel;
        }
    }
    return <Component {...props}>{children}</Component>;
};

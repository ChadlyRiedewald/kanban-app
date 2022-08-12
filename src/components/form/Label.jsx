import styled from 'styled-components/macro';
import * as LabelPrimitive from '@radix-ui/react-label';

const StyledLabel = styled(LabelPrimitive.Root)`
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    font-size: var(--font-xs);
    font-weight: var(--font-bold);
    color: var(--color-gray-600);
    line-height: var(--line-height-xs);
    cursor: default;
`;

// Exports
const LabelRoot = StyledLabel;

export const Label = ({ children, ...otherProps }) => {
    return <LabelRoot {...otherProps}>{children}</LabelRoot>;
};

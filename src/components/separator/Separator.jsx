import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { borderColor } from '../../constants';
import styled from 'styled-components/macro';

const Separator = styled(SeparatorPrimitive.Root)`
    background-color: ${borderColor};
    &[data-orientation='horizontal'] {
        height: 1px;
        width: 100%;
    }
    &[data-orientation='vertical'] {
        height: 100%;
        width: 1px;
    }
`;

export default Separator;

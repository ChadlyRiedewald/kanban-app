import styled from 'styled-components/macro';
import { BREAKPOINTS } from '../../constants';

const DesktopOnly = styled.div`
    display: none;
    @media screen and ${BREAKPOINTS.tablet} {
        display: revert;
    }
`;

export default DesktopOnly;

import styled from 'styled-components/macro';
import { BREAKPOINTS } from '../../constants';

const MobileOnly = styled.div`
    @media screen and ${BREAKPOINTS.tablet} {
        display: none;
    }
`;

export default MobileOnly;

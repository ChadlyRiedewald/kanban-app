import styled from 'styled-components/macro';
import { borderColor, secondaryBg, textColor } from '../../../constants';
import { AddNewTask } from '../AddNewTask';
import { ReactComponent as Logo } from '../../../assets/logo.svg';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import VisuallyHidden from '../../visuallyHidden';

const Wrapper = styled.header`
    height: var(--height-topbar);
    width: 100%;
    background-color: ${secondaryBg};
    border-bottom: 1px solid ${borderColor};
    position: fixed;
    display: flex;
    align-items: center;
    padding-inline-start: var(--width-sidebar);

    svg path {
        fill: ${textColor};
    }
`;

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    padding-inline: var(--space-md);
`;

const LogoLink = styled(Link)`
    width: fit-content;
    padding: var(--space-xxs) var(--space-xs);
    margin: -4px -8px;
    border-radius: var(--radii-sm);
    svg path {
        fill: ${textColor};
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 5px var(--color-purple-shadow);
    }

    &:focus:not(:focus-visible) {
        box-shadow: none;
    }
`;

const LogoWrapper = styled.div`
    height: var(--height-topbar);
    padding-inline: var(--space-md);
    min-width: fit-content;
    display: flex;
    align-items: center;
    border-right: 1px solid ${borderColor};
`;

export const Topbar = () => {
    const { open } = useSelector(state => state.sidebar);

    return (
        <Wrapper>
            {!open && (
                <LogoWrapper>
                    <LogoLink to='/'>
                        <VisuallyHidden>Home</VisuallyHidden>
                        <Logo />
                    </LogoLink>
                </LogoWrapper>
            )}
            <Flex>
                <h1>Platform Launch</h1>
                <AddNewTask />
            </Flex>
        </Wrapper>
    );
};

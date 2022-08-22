import { Outlet } from 'react-router-dom';
import styled from 'styled-components/macro';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as LogoMobile } from '../../assets/logo-mobile.svg';
import BannerLight from '../../assets/auth-banner-light.webp';
import BannerDark from '../../assets/auth-banner-dark.webp';
import { BREAKPOINTS, secondaryBg, textColor } from '../../constants';
import { useSelector } from 'react-redux';
import theme from 'styled-theming';
import MobileOnly from '../../app/common/mobileOnly';

//=====================
// DYNAMIC COLORS
export const authBg = theme('colorMode', {
    light: 'var(--color-white)',
    dark: 'var(--color-gray-100)',
});

export const bannerBg = theme('colorMode', {
    light: 'var(--color-gray-800)',
    dark: 'var(--color-gray-200)',
});

//=====================
// STYLED COMPONENTS
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: var(--space-lg);

    @media screen and ${BREAKPOINTS.desktop} {
        flex-direction: revert;
    }
`;

const Topbar = styled.header`
    height: var(--height-topbar-mobile);
    width: 100%;
    background-color: ${secondaryBg};
    padding-inline: var(--space-sm);
    gap: var(--space-sm);
    display: flex;
    align-items: center;

    span {
        font-weight: 800;
        font-size: 18px;
    }
`;

const AuthWrapper = styled.section`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;

    @media screen and ${BREAKPOINTS.tablet} {
        background-color: ${authBg};
        align-items: center;
    }

    @media screen and ${BREAKPOINTS.desktop} {
        width: 50%;
    }
`;

const BannerWrapper = styled.section`
    display: none;
    @media screen and ${BREAKPOINTS.desktop} {
        background-color: ${bannerBg};
        width: 50%;
        padding-inline-start: var(--space-xl);
        padding-block: var(--space-xl);
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: var(--space-lg);
        overflow: hidden;

        svg path {
            fill: ${textColor};
        }
    }
`;

const BannerHeading = styled.header`
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);

    h2 {
        max-width: 524px;
        padding-inline-end: var(--space-xl);
    }
`;

const Figure = styled.figure`
    img {
        max-width: revert;
        border-radius: 20px;
    }
`;

//=====================
// COMPONENTS
export const Auth = () => {
    const { colorMode } = useSelector(state => state.ui.theme);

    return (
        <Wrapper>
            <MobileOnly>
                <Topbar>
                    <LogoMobile />
                    <span>kanban</span>
                </Topbar>
            </MobileOnly>
            <AuthWrapper>
                <Outlet />
            </AuthWrapper>
            <BannerWrapper>
                <BannerHeading>
                    <Logo />
                    <h2>
                        Become focused, organized, and calm with kanban. The
                        world’s #1 task manager and to-do list app.
                    </h2>
                </BannerHeading>
                <Figure>
                    <img
                        src={colorMode === 'light' ? BannerLight : BannerDark}
                        alt='Preview of app'
                    />
                </Figure>
            </BannerWrapper>
        </Wrapper>
    );
};

export default Auth;

//=====================
// CHILDREN STYLED
export const FormWrapper = styled.div`
    width: 100%;
    max-width: 416px;

    p {
        margin-top: -16px;
    }
`;

export const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const CenteredSpan = styled.span`
    font-size: var(--font-xs);
    text-align: center;
    color: var(--color-gray-600);
    font-weight: var(--font-bold);
`;

export const LogoTablet = styled.div`
    display: none;
    @media screen and ${BREAKPOINTS.tablet} {
        display: revert;
        svg {
            & path {
                fill: ${textColor};
            }
        }
    }
    @media screen and ${BREAKPOINTS.desktop} {
        display: none;
    }
`;

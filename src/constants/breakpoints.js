const BREAKPOINT_SIZES = {
    mobile: 320,
    tablet: 768,
    desktop: 1024,
};

export const BREAKPOINTS = {
    mobile: `(min-width: ${BREAKPOINT_SIZES.mobile / 16}rem)`,
    tablet: `(min-width: ${BREAKPOINT_SIZES.tablet / 16}rem)`,
    desktop: `(min-width: ${BREAKPOINT_SIZES.desktop / 16}rem)`,
};

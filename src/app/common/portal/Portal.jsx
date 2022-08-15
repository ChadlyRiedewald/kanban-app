import * as PortalPrimitive from '@radix-ui/react-portal';

const container = document.getElementById('portal');

const Portal = ({ children }) => (
    <PortalPrimitive.Root container={container}>
        {children}
    </PortalPrimitive.Root>
);

export default Portal;

import styled from 'styled-components/macro';
import { useState } from 'react';
import theme from 'styled-theming';

import * as Select from '@radix-ui/react-select';

const textColor = theme('colorMode', {
    light: 'var(--color-black)',
    dark: 'var(--color-white)',
});

const inputPlaceholderColor = theme('colorMode', {
    light: 'hsl(0 0% 0% / 0.25)',
    dark: 'hsl(0 0% 100% / 0.25)',
});

const inputBackgroundColor = theme('colorMode', {
    light: 'var(--color-white)',
    dark: 'var(--color-gray-200)',
});

export const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    function toggleOpen() {
        setIsOpen(!isOpen);
    }

    return (
        <Root open={isOpen} onOpenChange={toggleOpen} defaultValue='todo'>
            <Trigger aria-label='Food'>
                <Select.Value />
                {isOpen ? (
                    <svg
                        width='10'
                        height='7'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            stroke='#635FC7'
                            strokeWidth='2'
                            fill='none'
                            d='m1 1 4 4 4-4'
                        />
                    </svg>
                ) : (
                    <svg
                        width='10'
                        height='7'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            stroke='#635FC7'
                            strokeWidth='2'
                            fill='none'
                            d='M9 6 5 2 1 6'
                        />
                    </svg>
                )}
            </Trigger>
            {/*<Label.portal>*/}
            <Content>
                {/*<Label.Viewport>*/}
                <Group>
                    <Item value='todo'>
                        <Select.ItemText>Todo</Select.ItemText>
                    </Item>
                    <Item value='doing'>
                        <Select.ItemText>Doing</Select.ItemText>
                    </Item>
                    <Item value='done'>
                        <Select.ItemText>Done</Select.ItemText>
                    </Item>
                </Group>
                {/*</Label.Viewport>*/}
            </Content>
            {/*</Label.portal>*/}
        </Root>
    );
};

const Root = styled(Select.Root)`
    //isolation: isolate;
    //width: fit-content;
    //height: fit-content;
`;

const Trigger = styled(Select.Trigger)`
    all: unset;
    border: 1.5px solid var(--color-gray-400);
    color: ${textColor};
    background-color: ${inputBackgroundColor};
    font-weight: var(--font-medium);
    outline: none;
    border-radius: var(--radii-sm);
    font-size: var(--font-sm);
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-inline: 16px;

    &:focus {
        border-color: var(--color-purple-100);
    }

    &:focus:not(:focus-visible) {
        box-shadow: none;
    }

    &::placeholder {
        color: ${inputPlaceholderColor};
    }
`;

const Content = styled(Select.Content)`
    background-color: black;
    width: 100%;
    height: 100%;
    padding-left: 16px;
    border-radius: var(--radii-sm);
    position: absolute;
    left: 0;
    top: 120px;
`;

const Group = styled(Select.Group)`
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
`;

const Item = styled(Select.Item)`
    all: unset;
    color: var(--color-gray-600);
    font-size: var(--font-xs);
`;

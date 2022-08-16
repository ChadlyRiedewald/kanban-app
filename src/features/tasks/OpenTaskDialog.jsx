import { DialogWrapper } from '../../app/common/dialog';
import { Formik } from 'formik';
import { Form, FormikControl } from '../../app/common/form';
import styled from 'styled-components/macro';
import { OpenMenuButton } from '../../app/common/menu';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { openMenu } from '../../app/ui';

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-lg);
`;

const initialValues = {
    subtasks: ['', ''],
    column: '',
};

const columns = [
    { key: 'Todo', value: 'todo' },
    { key: 'Doing', value: 'doing' },
    { key: 'Done', value: 'done' },
];

const options = [
    { key: 'Research competitor pricing and business models', value: '1' },
    { key: 'Outline a business model that works for our solution', value: '2' },
    {
        key: 'Talk to potential customers about our proposed solution and ask for fair price expectancy',
        value: '3',
    },
];

export const OpenTaskDialog = () => {
    const dispatch = useDispatch();
    const portalId = nanoid();
    return (
        <DialogWrapper>
            <Formik
                initialValues={initialValues}
                onSubmit={values => console.log(values)}
            >
                {({ values, isSubmitting }) => (
                    <Form>
                        <TitleWrapper>
                            <h2>
                                Design settings and search pages and search
                                pages and search pages
                            </h2>
                            <OpenMenuButton
                                onClick={() =>
                                    dispatch(
                                        openMenu({
                                            menuType: 'taskMenu',
                                            variant: 'task',
                                            portalId: portalId,
                                        })
                                    )
                                }
                                portalId={portalId}
                            />
                        </TitleWrapper>
                        <p>
                            We know what we're planning to build for version
                            one. Now we need to finalise the first pricing model
                            we'll use. Keep iterating the subtasks until we have
                            a coherent proposition.
                        </p>
                        <FormikControl
                            control='checkbox-group'
                            label='Subtasks (2 of 3)'
                            name='subtasks'
                            options={options}
                        />
                        <FormikControl
                            label='Current Status'
                            control='select'
                            name='column'
                            options={columns}
                        />
                    </Form>
                )}
            </Formik>
        </DialogWrapper>
    );
};

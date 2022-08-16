import { Board } from '../board';
import { Column, ColumnTitle } from '../column';
import { TaskCard } from '../task';
import { useDispatch } from 'react-redux';

const Sandbox = () => {
    return (
        <Board>
            <Column>
                <ColumnTitle title='Todo' color='var(--color-1)' />
                <TaskCard
                    title='Build UI for onboarding flow'
                    num1='0'
                    num2='3'
                />
                <TaskCard title='Build UI for search' num1='0' num2='1' />
                <TaskCard title='Build settings UI' num1='0' num2='2' />
                <TaskCard
                    title='QA and test all major user journeys'
                    num1='0'
                    num2='2'
                />
            </Column>
            <Column>
                <ColumnTitle title='Doing' color='var(--color-purple-100)' />
                <TaskCard
                    title='Design settings and search pages'
                    num1='1'
                    num2='3'
                />
                <TaskCard
                    title='Add account management endpoints'
                    num1='2'
                    num2='3'
                />
                <TaskCard title='Design onboarding flow' num1='1' num2='3' />
                <TaskCard title='Add search endpoints' num1='1' num2='2' />
                <TaskCard
                    title='Add authentication endpoints'
                    num1='1'
                    num2='2'
                />
            </Column>
            <Column>
                <ColumnTitle title='Done' color='var(--color-2)' />
                <TaskCard title='Conduct 5 wireframe tests' num1='1' num2='1' />
                <TaskCard
                    title='Create wireframe prototype'
                    num1='1'
                    num2='1'
                />
                <TaskCard
                    title='Review results of usability tests and iterate'
                    num1='3'
                    num2='3'
                />
                <TaskCard
                    title='Create paper prototypes and conduct 10 usability tests
   with potential customers'
                    num1='2'
                    num2='2'
                />
                <TaskCard title='Market discovery' num1='1' num2='1' />
                <TaskCard title='Competitor analysis' num1='2' num2='2' />
                <TaskCard title='Research the market' num1='2' num2='2' />
            </Column>
        </Board>
    );
};

export default Sandbox;

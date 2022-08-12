export const ROUTES = [
    { path: '' },
    { path: '*' },
    { path: 'auth', children: [{ path: 'sign-in' }, { path: 'sign-up' }] },
    {
        path: 'dashboard',
        children: [
            { path: ':boardId' },
            { path: 'platform-launch' },
            { path: 'marketing-plan' },
            { path: 'roadmap' },
        ],
    },
];

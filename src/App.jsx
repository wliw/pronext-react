import React from 'react';

import Index from './views/index/index.js';
import About from './views/about/index.js';
import Team from './views/team/index.js';

import '@/assets/styles/common.scss';

function formatName (user) {
    return `${ user.firstName } ${ user.lastName }`;
}

const user = {
    firstName: 'Harper',
    lastName: 'Persz'
};
const App = () => (
    <h1>
        Hello, { formatName(user) }
        { Index() }
        { About() }
        { Team() }
    </h1>
);
const container = () => <App />;

export default container;

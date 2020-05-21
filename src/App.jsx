import React from 'react';
import "@/assets/styles/common.scss";

function formatName (user) {
    return `${user.firstName} ${user.lastName}`;
}

const user = {
    firstName: 'Harper',
    lastName: 'Persz'
};

const App = () => (
    <h1>
        Hello, {formatName(user)}
    </h1>
);

export default App;

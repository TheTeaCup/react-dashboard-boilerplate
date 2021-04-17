import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom';

const App = lazy(() => {
    return import('./App');
});

ReactDOM.render(
    <Suspense fallback={<div/>}>
        <App/>
    </Suspense>,
    document.getElementById('root')
);
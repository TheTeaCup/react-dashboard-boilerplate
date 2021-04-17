import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom';
import "./index.css";

const App = lazy(() => {
    return import('./App');
});

ReactDOM.render(
    <Suspense fallback={<div/>}>
        <App/>
    </Suspense>,
    document.getElementById('root')
);
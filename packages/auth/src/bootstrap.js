import React from "react";
import ReactDOM from 'react-dom'
import { createMemoryHistory, createBrowserHistory } from "history";
import App from './App';

const mount = (el, {onSignIn, onNavigate, defaultHistory, initialPath }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    });
    if (onNavigate) {
        history.listen(onNavigate);
    }

    ReactDOM.render(<App onSignIn={onSignIn} history={history} />, el);

    return {
       onParentNavigate(location) {
            if (history.location.pathname !== location.pathname) {
                history.push(location.pathname)
                console.log('conyaine just navig', location)
            }
       }
    }
}

console.log(process.env.NODE_ENV, 'env')

if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_auth-dev-root')
    if (devRoot) {
        mount(devRoot, {
            defaultHistory: createBrowserHistory()
        })
    }
}

export {mount}

import * as React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import App from './App'
import FirstComponent from './components/FirstComponent';
import SecondComponent from './components/SecondComponent';
import './css/styles.css';

export const AppRouter: React.StatelessComponent<{}> = () => {
    return (

        <BrowserRouter>
            <div>
                <main>
                    <Route exact={true} path="/" component={App} />
                    <Route path="/FirstComponent" component={FirstComponent} />
                    <Route path="/SecondComponent" component={SecondComponent} />
                    <Redirect from='*' to='/' />
                </main>
            </div>
        </BrowserRouter>

    );
}
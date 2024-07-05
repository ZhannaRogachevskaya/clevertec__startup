import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';

import 'normalize.css';
import './index.css';

import { HistoryRouter } from 'redux-first-history/rr6';
import { history } from './routes/store';
import { routes } from './routes/routes';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <HistoryRouter history={history}>{routes}</HistoryRouter>
    </React.StrictMode>,
);

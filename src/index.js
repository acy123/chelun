import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './util/rem'
import * as serviceWorker from './serviceWorker';
// 获取store
import { Provider } from 'mobx-react';
import stores from './store';

ReactDOM.render(<Provider {...stores}><App /></Provider>, document.getElementById('root'));

serviceWorker.unregister();

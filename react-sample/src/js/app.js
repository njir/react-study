import hello from './hello';
import ReactDom from 'react-dom';

hello();

ReactDom.render(
    <h1>Hello, Front</h1>,
    document.getElementById('root')
);

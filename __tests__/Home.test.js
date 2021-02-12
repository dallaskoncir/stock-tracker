import { render, unmountComponentAtNode } from 'react-dom';
import Home from '../pages/index';

let container = null;

beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

test('<Home /> should render correctly', () => {
    render(<Home />, container);

    expect(container).toMatchSnapshot();
});

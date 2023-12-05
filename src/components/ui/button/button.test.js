import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button';

describe('Button test', () => {
    it('render button with text', () => {
        const button = renderer
        .create(<Button text='text' />)
        .toJSON();
        expect(button).toMatchSnapshot();
    })

    it('render button without text', () => {
        const button = renderer
        .create(<Button text='' />)
        .toJSON();
        expect(button).toMatchSnapshot();
    })

    it('render disabled button', () => {
        const button = renderer
        .create(<Button disabled={true} />)
        .toJSON();
        expect(button).toMatchSnapshot();
    })

    it('render button with loader', () => {
        const button = renderer
        .create(<Button isLoader={true} />)
        .toJSON();
        expect(button).toMatchSnapshot();
    })

    it('onClick has been called', () => {
        window.alert = jest.fn();
        render(<Button text='text' onClick={() => alert('onClick has been called')} />)
        const link = screen.getByText('text');

        fireEvent.click(link);

        expect(window.alert).toHaveBeenCalledWith('onClick has been called');
    })
})
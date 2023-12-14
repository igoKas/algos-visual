import renderer from 'react-test-renderer';
import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';

describe('Circle test', () => {
    it('render circle without letter', () => {
        const circle = renderer
        .create(<Circle letter='' />)
        .toJSON();
        expect(circle).toMatchSnapshot();
    })

    it('render circle with letter', () => {
        const circle = renderer
        .create(<Circle letter='A' />)
        .toJSON();
        expect(circle).toMatchSnapshot();
    })

    it('render circle with head', () => {
        const circle = renderer
        .create(<Circle head={'A'} />)
        .toJSON();
        expect(circle).toMatchSnapshot();
    })

    it('render circle with head react element', () => {
        const circle = renderer
        .create(<Circle head={<Circle />} />)
        .toJSON();
        expect(circle).toMatchSnapshot();
    })

    it('render circle with tail', () => {
        const circle = renderer
        .create(<Circle tail={'A'} />)
        .toJSON();
        expect(circle).toMatchSnapshot();
    })

    it('render circle with tail react element', () => {
        const circle = renderer
        .create(<Circle tail={<Circle />} />)
        .toJSON();
        expect(circle).toMatchSnapshot();
    })

    it('render circle with index', () => {
        const circle = renderer
        .create(<Circle index={1} />)
        .toJSON();
        expect(circle).toMatchSnapshot();
    })

    it('render circle with prop isSmall=true', () => {
        const circle = renderer
        .create(<Circle isSmall={true} />)
        .toJSON();
        expect(circle).toMatchSnapshot();
    })

    it('render circle with default state', () => {
        const circle = renderer
        .create(<Circle state={ElementStates.Default} />)
        .toJSON();
        expect(circle).toMatchSnapshot();
    })

    it('render circle with changing state', () => {
        const circle = renderer
        .create(<Circle state={ElementStates.Changing} />)
        .toJSON();
        expect(circle).toMatchSnapshot();
    })

    it('render circle with modified state', () => {
        const circle = renderer
        .create(<Circle state={ElementStates.Modified} />)
        .toJSON();
        expect(circle).toMatchSnapshot();
    })
})
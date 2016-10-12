import maxValidator from './max';
import Control from '../control';



describe('validator: max', () => {
  it(`should not return an error with value='' `, () => {
    const control = new Control({
      type: 'input',
      props:{
        type: 'number',
        name: 'myField',
        value: '',
        max: 5
      }
    });

    const error = maxValidator(control);
    expect(error).toBe(false);
  })

  it(`should work with strings as both value and max `, () => {
    const control = new Control({
      type: 'input',
      props:{
        type: 'number',
        name: 'myField',
        value: '6',
        max: '5'
      }
    });

    const error = maxValidator(control);
    expect(error).toBe(true);
  })
})

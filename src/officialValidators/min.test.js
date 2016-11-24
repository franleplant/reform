import minValidator from './min';
import Control from '../control';



describe('validator: min', () => {
  it(`should not return an error with value='' `, () => {
    const control = new Control({
      type: 'input',
      props:{
        type: 'number',
        name: 'myField',
        value: '',
        min: 5
      }
    });

    const error = minValidator(control);
    expect(error).toBe(false);
  })

  it(`should work with strings as both value and min `, () => {
    const control = new Control({
      type: 'input',
      props:{
        type: 'number',
        name: 'myField',
        value: '4',
        min: '5'
      }
    });

    const error = minValidator(control);
    expect(error).toBe(true);
  })
})

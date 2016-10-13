import React, { Component } from 'react'
import { render } from 'react-dom'
import { Simulate, findRenderedComponentWithType } from 'react-addons-test-utils'
import assert from 'assert'
import Reform from './src/index.js'


class TestComponentRaw extends Component {
  handleSubmit() {

  }

  render() {
    const {reform} = this.props;


    return (
      <form onSubmit={reform.handleSubmit(this.handleSubmit)}>
        <input
          required
          id="field_email"
          type="email"
          {...reform('field_email')}
          />
        <span id="field_email_error">{reform('field_email').error}</span>
      </form>
    )
  }
}

let TestComponent = Reform(TestComponentRaw)

describe('Reform:', () => {
  beforeEach(function () {
     this.node = document.createElement('div')
  })

  it('displayName: reuse original component name', function() {
    assert.equal(TestComponent.displayName, 'Reform(TestComponentRaw)')
  })

  it('controlled elements: should hook onChange and value props to control the input', function() {
    const instance = render(<TestComponent/>, this.node)
    const field_email = this.node.querySelector('#field_email')
    const c_input = 'lalala'

    field_email.value = c_input
    Simulate.change(field_email)
    assert.equal(field_email.value, c_input)
  })

  it('error: should fill the error attr correctly', function() {
  
  })

  describe('handleSubmit:', function() {
    it('should run the callback if all fields validate: with 0 fields', function() {
      // Its difficult to get handleSubmit from the instance
      let called = false
      class TestComponentRaw extends Component {
        handleSubmit() { called = true}
        render() { return <form onSubmit={this.props.reform.handleSubmit(this.handleSubmit)}></form> }
      }

      const TestComponent = Reform(TestComponentRaw)

      const instance = render(<TestComponent/>, this.node)
      const form = this.node.querySelector('form')

      Simulate.submit(form)
      assert.ok(called)
    })

    it('should run the callback if all fields validate', function() {
      let called = false;
      class TestComponentRaw extends Component {
        handleSubmit() {called = true}
        render() {
          const {reform} = this.props;
          return (
            <form onSubmit={reform.handleSubmit(this.handleSubmit)}>
              <input id="field_email1" type="email" {...reform('field_email1')} />
              <input id="field_email2" type="email" {...reform('field_email2')} />
            </form>
          )
        }
      }

      const TestComponent = Reform(TestComponentRaw)
      const instance = render(<TestComponent/>, this.node)
      const form = this.node.querySelector('form')
      const field_email1 = this.node.querySelector('#field_email1')
      const field_email2 = this.node.querySelector('#field_email2')

      field_email1.value = '1valid@email.com'
      Simulate.change(field_email1)
      field_email2.value = '2valid@email.com'
      Simulate.change(field_email2)

      Simulate.submit(form)
      assert.ok(called)
    })

    it('should not run the callback if not all fields validate', function() {
      let called = false;
      class TestComponentRaw extends Component {
        handleSubmit() {called = true}
        render() {
          return (
            <form onSubmit={this.props.reform.handleSubmit(this.handleSubmit)}>
              <input id="field_email1" type="email" {...this.props.reform('field_email1')} />
            </form>
          )
        }
      }

      const TestComponent = Reform(TestComponentRaw)
      const instance = render(<TestComponent/>, this.node)
      const form = this.node.querySelector('form')
      const field_email1 = this.node.querySelector('#field_email1')

      field_email1.value = '1invalid'
      Simulate.change(field_email1)

      Simulate.submit(form)
      assert.ok(!called)
    })

    it('should revalidate all fields and fill the error messages', function() {
      class TestComponentRaw extends Component {
        handleSubmit() {}
        render() {
          const {reform} = this.props;
          return (
            <form onSubmit={reform.handleSubmit(this.handleSubmit)}>
              <input id="field_email1" type="email" {...reform('field_email1')} />
              <span id="field_email_error1">{reform('field_email1').error}</span>
              <input id="field_email2" type="email" {...reform('field_email2')} />
              <span id="field_email_error2">{reform('field_email2').error}</span>
            </form>
          )
        }
      }

      const TestComponent = Reform(TestComponentRaw)
      const instance = render(<TestComponent/>, this.node)
      const form = this.node.querySelector('form')
      const field_email1 = this.node.querySelector('#field_email1')
      const field_email_error1 = this.node.querySelector('#field_email_error1')
      const field_email2 = this.node.querySelector('#field_email2')
      const field_email_error2 = this.node.querySelector('#field_email_error2')

      field_email1.value = 'invalid1'
      field_email2.value = 'invalid2'

      Simulate.submit(form)
      assert.equal(field_email_error1.innerHTML, 'Invalid email format')
      assert.equal(field_email_error2.innerHTML, 'Invalid email format')
    })

  })


  it('type email: should validate correctly emails', function() {
    class TestComponentRaw extends Component {
      render() {
        const {reform} = this.props;
        return (
          <form>
            <input id="field_email" type="email" {...reform('field_email')} />
            <span id="field_email_error">{reform('field_email').error}</span>
          </form>
        )
      }
    }

    const TestComponent = Reform(TestComponentRaw)

    const instance = render(<TestComponent/>, this.node)
    const field_email = this.node.querySelector('#field_email')
    const c_input = 'lalala'

    field_email.value = c_input
    Simulate.change(field_email)
    assert.equal(field_email.value, c_input)
  })
})

//test('error messages', t => {
  //t.same([1, 2], [1, 2]);
//});

//test('clearForm', t => {
  //t.same([1, 2], [1, 2]);
//});

//test('submitting', t => {
  //t.same([1, 2], [1, 2]);
//});

//test('type=email', t => {
  //t.same([1, 2], [1, 2]);
//});

//test('required', t => {
  //t.same([1, 2], [1, 2]);
//});

//test('min', t => {
  //t.same([1, 2], [1, 2]);
//});

//test('max', t => {
  //t.same([1, 2], [1, 2]);
//});
//
//test('onError', t => {
  //t.same([1, 2], [1, 2]);
//});

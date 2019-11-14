import React from 'react'
import { Form, Button } from 'antd'

@Form.create()
class CustomForm extends React.Component {
  state = {
    submitting: false
  }

  setSubmitting = b => {
    this.setState({
      submitting: b
    })
  }

  handleSubmit = (e) => {
    const { form } = this.props

    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.triggerSubmit(values)
      }
    })
  }

  triggerSubmit = values => {
    const { onSubmit, form, noResetFields } = this.props
    if (typeof onSubmit === 'function') {
      this.setSubmitting(true)
      onSubmit(values).finally(() => {
        if (!noResetFields) form.resetFields()
        this.setSubmitting(false)
      })
    }
  }

  render () {
    const { submitting } = this.state
    const { children, form, submitText = '确定', ...otherProps } = this.props
    return <Form {...otherProps} onSubmit={this.handleSubmit}>
      {typeof children === 'function' ? children(form) : children}
      <Form.Item style={{ textAlign: 'right', marginBottom: -16 }}>
        <Button loading={submitting} type='primary'
          htmlType='submit'>{submitText}</Button>
      </Form.Item>
    </Form>
  }
}

export default CustomForm

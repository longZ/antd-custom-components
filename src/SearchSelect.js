import React from 'react'
import PropTypes from 'prop-types'
import { Select, Spin } from 'antd'

class SearchSelect extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    SearchMethod: PropTypes.func,
    value: PropTypes.any
  }

  constructor(props) {
    super(props)

    this.state = {
      value: props.value || props.defaultValue || null,
      items: [],
      fetching: false
    }
  }

  static getDerivedStateFromProps (nextProps, state) {
    if ('value' in nextProps && state.value !== nextProps.value) {
      return {
        value: nextProps.value
      }
    }
    return null
  }

  handleSearch = (value) => {
    const {SearchMethod} = this.props
    clearTimeout(this.searchTimer)
    this.searchTimer = setTimeout(() => {
      this.setState({
        fetching: true,
        items: []
      })
      if (value) {
        SearchMethod(value).then(res => {
          this.setState({
            items: res.map(({value, key, label}) => ({
              key: key || value,
              label
            })),
            fetching: false
          })
        })
      } else {
        this.setState({
          items: [],
          fetching: false
        })
      }
    }, 800)
  }

  triggerChange = (value) => {
    const { onChange } = this.props
    if (typeof onChange === 'function') {
      onChange(value)
    } else {
      this.setState({ value })
    }
  }

  handleChange = (changeValue) => {
    this.triggerChange(changeValue)
  }

  render () {
    const { mode, onChange, ...otherProps } = this.props
    const { value, items = [], fetching } = this.state

    return <Select
        {...otherProps}
        mode={mode}
        showSearch
        allowClear
        labelInValue
        value={value}
        dropdownMatchSelectWidth={false}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        notFoundContent={fetching ? <Spin size='small' /> : items.length ? null
            : '无数据'}
        onSearch={this.handleSearch}
        onChange={this.handleChange}
    >
      {items.map(d => <Select.Option key={d.key} value={d.key}>{d.label}</Select.Option>)}
    </Select>
  }
}

export default SearchSelect

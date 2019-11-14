import React from 'react'
import { Select, Spin } from 'antd'

class SearchSelect extends React.Component {
  state = {
    value: null,
    items: [],
    fetching: false
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
            items: res,
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
      this.setState({ value })
    }
  }

  handleChange = (value) => {
    const { items = [] } = this.state
    const obj = items.find(item => item.value === value)

    this.triggerChange(obj)
  }

  render () {
    const { onChange, ...otherProps } = this.props
    const { value, items = [], fetching } = this.state
    let label = null
    if (value && value.label) label = value.label

    return <Select
      {...otherProps}
      showSearch
      allowClear
      value={label}
      dropdownMatchSelectWidth={false}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      notFoundContent={fetching ? <Spin size='small' /> : items.length ? null
        : '无数据'}
      onSearch={this.handleSearch}
      onChange={this.handleChange}
    >
      {items.map(d => <Select.Option key={d.value}>{d.label}</Select.Option>)}
    </Select>
  }
}

export default SearchSelect

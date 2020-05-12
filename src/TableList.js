import React from 'react'
import {Table} from 'antd'

class TableList extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      pagination: {
        current: 1,
        pageSize: props.defaultPageSize? props.defaultPageSize: 10,
        pageSizeOptions: props.pageSizeOptions? props.pageSizeOptions: ['10', '20', '30', '40'],
        total: 0,
        showSizeChanger: true,
        showTotal: props.hideTotal ? null : (total => `共 ${total} 条`)
      },
      loading: false
    }
  }

  componentDidMount() {
    this.handleTableChange(this.state.pagination)
  }

  search = () => {
    const {pagination} = this.state
    this.handleTableChange({
      ...pagination,
      current: 1
    })
  }

  refresh = () => {
    const {items} = this.props
    const {pagination} = this.state
    if (!items || items.length === 0) {
      pagination.current = pagination.current > 0 ? pagination.current - 1 : 0
    }
    this.handleTableChange(pagination)
  }

  handleTableChange = (pagination) => {
    const {onPageChange} = this.props

    if (typeof onPageChange !== 'function') {
      return
    }

    this.setState({
      loading: true
    })

    let pageIndex = pagination.current - 1
    let pageSize = pagination.pageSize

    onPageChange({pageIndex, pageSize}).then(total => {
      if (total > 0 && pageIndex * pageSize >= total && pageIndex > 0) {
        this.setState({
          loading: false
        }, () => {
          this.handleTableChange({
            current: parseInt(`${total / pageSize}`, 10) + (total % pageSize
            === 0 ? 0 : 1), pageSize
          })
        })
      } else {
        this.setState({
          pagination: {
            ...pagination,
            total
          },
          loading: false
        })
      }
    })
  }

  render() {
    const {columns, onPageChange, items, ...otherProps} = this.props
    const {pagination, loading} = this.state
    items.forEach((item, i) => {
      let order = i + 1
      if (pagination.current > 1) {
        order += (pagination.current - 1) * pagination.pageSize
      }
      item.__order = order
    })
    return <>
      <Table
          columns={columns}
          rowKey={'id'}
          bordered
          dataSource={items}
          pagination={typeof onPageChange === 'function' ? pagination : false}
          loading={loading}
          onChange={this.handleTableChange}
          {...otherProps}
      />
    </>
  }
}

export default TableList

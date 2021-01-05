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
      filters: null,
      sorters: null,
      extra: null,
      loading: false
    }
  }

  componentDidMount() {
    const {pagination, filters, sorters, extra} = this.state
    this.handleTableChange(pagination, filters, sorters, extra)
  }

  search = () => {
    const {pagination, filters, sorters, extra} = this.state
    this.handleTableChange({
      ...pagination,
      current: 1
    }, filters, sorters, extra)
  }

  refresh = () => {
    const {items} = this.props
    const {pagination, filters, sorters, extra} = this.state
    if (!items || items.length === 0) {
      pagination.current = pagination.current > 0 ? pagination.current - 1 : 0
    }
    this.handleTableChange(pagination, filters, sorters, extra)
  }

  handleTableChange = (pagination, filters, sorters, extra) => {
    const {onPageChange} = this.props

    if (typeof onPageChange !== 'function') {
      return
    }

    this.setState({
      loading: true
    })

    let pageIndex = pagination.current - 1
    let pageSize = pagination.pageSize

    onPageChange({pageIndex, pageSize}, filters, sorters, extra).then(total => {
      if (total > 0 && pageIndex * pageSize >= total && pageIndex > 0) {
        this.setState({
          loading: false
        }, () => {
          this.handleTableChange({
            current: parseInt(`${total / pageSize}`, 10) + (total % pageSize
            === 0 ? 0 : 1), pageSize
          }, filters, sorters, extra)
        })
      } else {
        this.setState({
          pagination: {
            ...pagination,
            total
          },
          filters,
          sorters,
          extra,
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

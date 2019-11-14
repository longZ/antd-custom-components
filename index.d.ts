import * as React from 'react';
import {TableProps} from 'antd/es/table';
import {FormProps} from 'antd/es/form';
import {ModalProps} from 'antd/es/modal';
import {SelectProps} from 'antd/es/select';

const {Component} = React

type Pagination = {
  current?: number
  pageIndex?: number
  pageSize?: number
}

export declare type TableListProps = {
  columns: any[]
  onPageChange(pagination: Pagination): Promise
  items: any[]
} & TableProps

export declare type TableListState = {

}

export class TableList extends Component<TableListProps, TableListState>{
  search(): void
  refresh(): void
  handleTableChange(pagination: Pagination): void
}

export declare type CustomFormProps = {
  submitText?: string
} & FormProps

export declare type CustomFormState = {

}

export class CustomForm extends Component<CustomFormProps, CustomFormState> {
  setSubmitting(b: boolean): void
  handleSubmit(e: Event): void
  triggerSubmit(values: any): void
}

export declare type CustomModalProps = {} & ModalProps

export declare type CustomModalState = {}

export class CustomModal extends Component<CustomModalProps, CustomModalState> {
  show(data: any): void
  hide(): void
}

export declare type SearchSelectProps = {
  SearchMethod(value:any): Promise
} & SelectProps

export declare type SearchSelectState = {}

export class SearchSelect extends Component<SearchSelectProps, SearchSelectState> {
  handleSearch(value: string):void
  triggerChange(value: string):void
  handleChange(value: string):void
}
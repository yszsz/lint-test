import React from 'react';
import PropTypes from 'prop-types';
import { Table, Popconfirm, Button } from 'antd';

class ProductList extends React.Component {
  handleDelete(id) {
    this.props.delete({ id });
  }

  render() {
    const { products } = this.props;
    console.log('products', products)
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
    }, {
      title: 'Actions',
      render: (text, record) => {
        return (
          <Popconfirm title="Delete?" onConfirm={() => this.handleDelete(record.id)}>
            <Button>Delete</Button>
          </Popconfirm>
        );
      },
    }];
    return (
      <div>
        <h2>List of Product</h2>
        <Table
          dataSource={products}
          columns={columns}
        />
      </div>
    );
  }
};

export default ProductList;
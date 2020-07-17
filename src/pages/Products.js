import React from 'react';
import { connect } from 'dva';
import ProductList from '../components/ProductList';

function mapStateToProps({ products }) {
  return { products }
}

function mapDispatchToProps(dispatch) {
  return {
    delete({ id }) {
      dispatch({
        type: 'products/delete',
        payload: id,
      });
    }
  }
}
// export default Products;
export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
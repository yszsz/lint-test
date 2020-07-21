import { connect } from 'dva';
import Summary from 'components/Summary';

function mapStateToProps({ summary }) {
  return { ...summary };
}

function mapDispatchToProps() {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(Summary);

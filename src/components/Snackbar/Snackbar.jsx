import React, { PureComponent } from 'react';
import { Alert } from 'antd';
import {Context as AppContext} from '../../store/app/appContext';

class Snackbar extends PureComponent { 
  static contextType = AppContext;
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
    
  }

  

  render () {
    const {
      type,isShowIcon, message, description
    } = this.context.state.info_snackbar;

    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <Alert
      message={message}
      description={description}
      type={type}
      showIcon={isShowIcon}
    />
    );
  }
}

Snackbar.propTypes = {
  // bla: PropTypes.string,
};

Snackbar.defaultProps = {
  // bla: 'test',
};

export default Snackbar;

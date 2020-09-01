import React, { PureComponent } from 'react';

class Food extends PureComponent { 
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  
  render () {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <div className="FoodWrapper">
        Food nè
      </div>
    );
  }
}

Food.propTypes = {
  // bla: PropTypes.string,
};

Food.defaultProps = {
  // bla: 'test',
};

export default Food;

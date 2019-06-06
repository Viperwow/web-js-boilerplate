import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ThirdPage extends Component {
  render() {
    const {text} = this.props;

    return (
      <div className="page">
        {text}
        <ul>
          <li>
            <Link to="/1" replace>
              1
            </Link>
          </li>
          <li>
            <Link to="/2" replace>
              2
            </Link>
          </li>
          <li>
            <Link to="/not-found" replace>
              4
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default ThirdPage;

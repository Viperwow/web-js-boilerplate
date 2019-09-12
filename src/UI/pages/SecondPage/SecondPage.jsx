import React from 'react';
import {Link} from 'react-router-dom';

const SecondPage = ({text}) => (
  <div className="page">
    {text}
    <ul>
      <li>
        <Link to="/1" replace>
          1
        </Link>
      </li>
      <li>
        <Link to="/3" replace>
          3
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

export default SecondPage;

import React from 'react';

export const IconMock = React.forwardRef(
  (props, reference) => <span ref={reference} {...props} />,
);

export default 'SvgrURL';

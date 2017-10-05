import React from 'react';

const Icon = ({className, style, children, ...props}) => {
  return (
    <i className={`material-icons ${className}`}
       style={{verticalAlign: 'middle', ...style}}
       {...props}>
      {children}
    </i>
  );
}

export default Icon;
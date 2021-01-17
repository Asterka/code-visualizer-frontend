import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ msg, showMessage, setShowMessage}) => {
  return (
    <div className={`alert ${showMessage===true ? 'visible' : 'hidden'}`} role='alert'>
      {msg}
      <button
        onClick={()=>setShowMessage(false)}
      >
        <span aria-hidden='true'>&times;</span>
      </button>
    </div>
  );
};

Message.propTypes = {
  msg: PropTypes.string.isRequired
};

export default Message;
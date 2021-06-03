import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ msg, showMessage, setShowMessage, ok}) => {
  return (
    <div className={`alert ${showMessage===true ? 'visible' : 'hidden'}`} style={{color:"white"}} role='alert'>
      {msg}
      <button
        onClick={()=>setShowMessage(false)}
      >
        <span aria-hidden='true'>{ok?'Success':'Failure'}</span>
      </button>
    </div>
  );
};

Message.propTypes = {
  msg: PropTypes.string.isRequired
};

export default Message;
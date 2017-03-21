import React from 'react';
import './Modal.css';

class Modal extends React.Component {
  static propTypes = {
    children: React.PropTypes.element,
    openName: React.PropTypes.string,
    visible: React.PropTypes.bool,
  };


  render() {
    const { visible } = this.props;
    const { children, openName } = this.props;
    return (
      <div className="container-styling">
        {
          visible ?
            <div>
              <div className="modal">
                {children}
              </div>
              <div className="modal-mask" />
            </div>
          : null
        }
      </div>
    );
  }
}

export default Modal;

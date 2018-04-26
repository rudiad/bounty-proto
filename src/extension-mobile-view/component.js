import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ExtensionFrame } from '../extension-frame';
const { ExtensionMode, ExtensionViewType, getComponentPositionFromView, getComponentSizeFromView } = window['extension-coordinator'];

export class ExtensionMobileView extends Component {
  computeFrameStyles() {
    const height = Math.floor(this.props.overlaySize.height * 0.65);
    const top = this.props.frameSize - height;
    let viewStyles = {
      position: 'absolute',
      bottom: 0,
      width: `${this.props.overlaySize.width}px`,
      height: `${height}px`,
    }

    return viewStyles;
  }

  render() {
    return (
      <div
        className="view component-view"
        style={{
          background: 'repeating-linear-gradient(45deg, lightgrey, lightgrey 5px, grey 5px, grey 10px)',
          width: this.props.overlaySize.width + 'px',
          height: this.props.overlaySize.height + 'px',
        }}>
          <div style={this.computeFrameStyles()}>
          <ExtensionFrame
            className="view"
            frameId={`frameid-${this.props.id}`}
            extension={this.props.extension}
            type={ExtensionViewType.Mobile}
            mode={ExtensionMode.Viewer}
          />
        </div>
      </div>
    );
  }
}

ExtensionMobileView.propTypes = {
  id: PropTypes.string.isRequired,
  extension: PropTypes.object.isRequired,
  frameSize: PropTypes.object.isRequired,
  position: PropTypes.object.isRequired,
  role: PropTypes.string,
};

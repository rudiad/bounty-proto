import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ExtensionFrame } from '../extension-frame';
const { ExtensionMode, ExtensionViewType, getComponentPositionFromView, getComponentSizeFromView } = window['extension-coordinator'];

export class ExtensionMobileView extends Component {
  computeFrameStyles() {
    let frameStyles;

    if (this.props.orientation === 'portrait') {
      const height = Math.floor(this.props.overlaySize.height * 0.65);
      frameStyles = {
        width: `${this.props.overlaySize.width}px`,
        height: `${height}px`,
      }
    } else {
      const width = Math.floor(this.props.overlaySize.height * 0.65);
      frameStyles = {
        width: `${width}px`,
        height: `${this.props.overlaySize.width}px`,
      }
    }

    frameStyles.position = 'absolute';
    frameStyles.bottom = 0;
    return frameStyles;
  }
  computeViewStyles() {
    let viewStyles;
    if (this.props.orientation === 'portrait') {
      viewStyles = {
        width: this.props.overlaySize.width + 'px',
        height: this.props.overlaySize.height + 'px',
      }
    } else {
      viewStyles = {
        width: this.props.overlaySize.height + 'px',
        height: this.props.overlaySize.width + 'px',
      }
    }

    viewStyles.background = '#322F37';
    return viewStyles;
  }
  render() {
    return (
      <div
        className="view component-view"
        style={this.computeViewStyles()}>
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
  orientation: PropTypes.string.isRequired,
  extension: PropTypes.object.isRequired,
  frameSize: PropTypes.object.isRequired,
  position: PropTypes.object.isRequired,
  role: PropTypes.string,
};

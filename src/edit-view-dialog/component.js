import React, { Component } from 'react';
import PropTypes from 'prop-types';
import closeButton from '../img/close_icon.png';
import './component.sass';
import { RadioOption } from '../extension-view-dialog/radio-option';
import { DefaultMobileOrientation, MobileSizes } from '../constants/mobile';
import { OverlaySizes } from '../constants/overlay-sizes';
import { ViewerTypes } from '../constants/viewer-types';
import { IdentityOptions } from '../constants/identity-options';
import { MobileOrientation, MobileScreenSizes} from '../constants/mobile';
const { ExtensionViewType } = window['extension-coordinator'];

export class EditViewDialog extends Component {
  constructor(args) {
    super(args);
    this.state = {
      x: 0,
      y: 0,
      orientation: DefaultMobileOrientation,
      frameSize: {
        width: 0,
        height: 0,
      },
    }
  }

  renderFrameSizeComponents(sizeSet) {
    return Object.keys(sizeSet).map(key => {
      return <RadioOption key={key} name="frameSize" value={key} onChange={this.onChange} checked={key === this.state.frameSize}/>
    });
  }

  renderViewerTypeComponents() {
    return Object.keys(ViewerTypes).map(key => {
      return <RadioOption key={key} name="viewerType" value={ViewerTypes[key]} onChange={this.onChange} checked={ViewerTypes[key] === this.state.viewerType}/>
    });
  }

  renderIdentityOptionComponents() {
    return Object.keys(IdentityOptions).map(option => {
      return <RadioOption key={option} name="identityOption" value={option} onChange={this.onChange} checked={option === this.state.identityOption}/>
    });
  }

  renderOrientationComponents() {
    return Object.keys(MobileOrientation).map(option => {
      return <RadioOption key={option} name="orientation" value={MobileOrientation[option]} onChange={this.onChange} checked={option === this.state.orientation}/>
    });
  }
  onChange = (input) => {
    const newState = {};
    newState[input.target.name] = input.target.value;
    this.setState(newState);
  }

  componentDidMount() {
    this.props.views.forEach(element => {
      if (element.id === this.props.idToEdit) {
        this.setState({
          x: element.x,
          y: element.y,
          orientation: element.orientation,
          frameSize: element.frameSize,
          type: element.type
        });
      }
    });
  }

  editClassFromType() {
    let editClass;
    switch (this.state.type) {
      case ExtensionViewType.Component:
        editClass = 'edit-view__dialog-component';
        break;
      case ExtensionViewType.Mobile:
        editClass = 'edit-view__dialog-mobile';
        break;
      case ExtensionViewType.Overlay:
        editClass = 'edit-view__dialog-overlay';
        break;
      default:
        editClass = 'edit-view__dialog'
    }
    return editClass;
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className='edit-view'>
        <div className="edit-view__background"/>
        <div className={this.editClassFromType()}>
          <div className="dialog__top-bar-container">
            <div className="top-bar-container__title"> Edit View </div>
            <div className="top-bar-container__escape" onClick={this.props.closeHandler}><img alt="Close" src={closeButton}/></div>
          </div>
          <hr className="dialog__divider" />

          {this.state.type === ExtensionViewType.Component &&
            <div className="edit-view__content">
              <div className="type-and-size-container__type-title">
                Position (%)
              </div>
              <div className='overlay-custom-container'>
                <div className='overlay-custom-container'>
                  <div className="edit-subcontainer__input">
                    <label className="inputs__option-label">X</label>
                    <input type="text" name="x" value={this.state.x} onChange={this.onChange} />
                  </div>
                  <div className="edit-subcontainer__input">
                    <label className="inputs__option-label">Y</label>
                    <input type="text" name="y" value={this.state.y} onChange={this.onChange} />
                  </div>
                </div>
              </div>
            </div>}

            {this.state.type === ExtensionViewType.Overlay &&
            <div className="edit-view__content">
              <div className="type-and-size-container__type-title">
                Position (%)
              </div>
              <div className='overlay-custom-container'>
                <div className='overlay-custom-container'>
                  <div className="edit-subcontainer__input">
                    <label className="inputs__option-label">X</label>
                    <input type="text" name="x" value={this.state.x} onChange={this.onChange} />
                  </div>
                  <div className="edit-subcontainer__input">
                    <label className="inputs__option-label">Y</label>
                    <input type="text" name="y" value={this.state.y} onChange={this.onChange} />
                  </div>
                </div>
              </div>
            </div>}

            {this.state.type === ExtensionViewType.Mobile &&
            <div className="size-title__size-subcontainer">
            <div className="size-subcontainer__presets">
              <div className="type-and-size-container__type-title">
                Screen Size
              </div>
              <div className='size-subcontainer__presets-container'>
                <div className='size-subcontainer__size-selection'>
                  {this.renderFrameSizeComponents(MobileSizes)}
                </div>
                <div className='overlay-custom-container'>
                    <RadioOption className='overlay-custom' name="frameSize" value="Custom" onChange={this.onChange} checked={"Custom" === ''} />
                  <div className='overlay-custom-container'>
                    <div className="custom-subcontainer__input">
                      <label className="inputs__option-label inputs__width-offset"> Width </label>
                      <input type="text" name="width" onChange={this.onChange}/>
                    </div>
                    <div className="custom-subcontainer__input">
                      <label className="inputs__option-label"> Height </label>
                      <input type="text" name="height" onChange={this.onChange}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="size-subcontainer__presets">
              <div className="type-and-size-container__type-title">
                Orientation
              </div>
              <div className='overlay-custom-container'>
                {this.renderOrientationComponents()}
              </div>
            </div>
          </div>}

          <hr className="dialog__divider"/>
          <div className="dialog_bottom-bar">
            <div className="bottom-bar__save" onClick={() => this.props.saveViewHandler(this.state)}> Save </div>
            <div className="bottom-bar__cancel" onClick={this.props.closeHandler}> Cancel </div>
          </div>
        </div>
      </div>
    );
  }
}

EditViewDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  idToEdit: PropTypes.string.isRequired,
  views: PropTypes.array.isRequired,
  closeHandler: PropTypes.func.isRequired,
  saveViewHandler: PropTypes.func.isRequired,
};

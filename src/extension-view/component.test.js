import { setupShallowTest } from '../tests/enzyme-util/shallow';
import { ExtensionView } from './component';
import { ViewerTypes } from '../constants/viewer-types';
import { ExtensionForTest } from '../tests/constants/extension';
const { ExtensionAnchor, ExtensionMode, ExtensionViewType } = window['extension-coordinator'];

const DeleteButtonSelector = '.view__close_button';

describe('<ExtensionView />', () => {
  const setupShallow = setupShallowTest(ExtensionView, () => ({
    id: '0',
    extension: ExtensionForTest,
    type: ExtensionAnchor.Panel,
    role: ViewerTypes.Broadcaster,
    mode: 'viewer',
    linked: false,
    position: { x: 0, y: 0 },
    overlaySize: { width: 0, height: 0 },
    deleteViewHandler: jest.fn(),
    openEditViewHandler: jest.fn(),
  }));

  it('uses correct panel view styles if no type provided', () => {
    const { wrapper } = setupShallow({
      type: '',
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('when moused over displays the delete button', () => {
    const { wrapper } = setupShallow();
    wrapper.simulate('mouseEnter');
    expect(wrapper.state().mousedOver).toBe(true);
    expect(wrapper.find(DeleteButtonSelector)).toHaveLength(1);
  });

  it('when moused over and mouse leaves, no delete button displayed', () => {
    const { wrapper } = setupShallow();
    wrapper.simulate('mouseEnter');
    expect(wrapper.state().mousedOver).toBe(true);
    expect(wrapper.find(DeleteButtonSelector)).toHaveLength(1);
    wrapper.simulate('mouseLeave')
    expect(wrapper.state().mousedOver).toBe(false);
    expect(wrapper.find(DeleteButtonSelector)).toHaveLength(0);
  });

  it('when moused over and delete button is clicked, the deleteViewHandler is clicked', () => {
    const { wrapper } = setupShallow();
    wrapper.simulate('mouseEnter');
    expect(wrapper.state().mousedOver).toBe(true);
    expect(wrapper.find(DeleteButtonSelector)).toHaveLength(1);
    wrapper.find(DeleteButtonSelector).simulate('click');
    expect(wrapper.instance().props.deleteViewHandler).toHaveBeenCalled();
  });

  describe('config mode views', () => {
    it('renders correctly when in config mode', () => {
      const { wrapper } = setupShallow({
        type: ExtensionMode.Config
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('live config mode views', () => {
    it('renders correctly when in config mode', () => {
      const { wrapper } = setupShallow({
        type: ExtensionViewType.LiveConfig
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('component mode views', () => {
    it('renders component view when in component mode', () => {
      const { wrapper } = setupShallow({
        type: ExtensionAnchor.Component,
      });
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find('ExtensionComponentView').length).toBe(1);
    });

    it('brings up the edit dialog when edit is clicked', () => {
      const { wrapper } = setupShallow({
        type: ExtensionAnchor.Component,
      });

      wrapper.simulate('mouseEnter');
      expect(wrapper.state().mousedOver).toBe(true);
      wrapper.find('.view__edit_button').simulate('click');
      expect(wrapper.instance().props.openEditViewHandler).toHaveBeenCalled();
    });
  });

  describe('panel mode views', () => {
    it('renders correctly when in panel mode as a Broadcaster', () => {
      const { wrapper } = setupShallow();
      expect(wrapper).toMatchSnapshot();
    });

    it('sets correct panel height when panel height provided', () => {
      const extensionWithPanelHeight = Object.assign({}, ExtensionForTest, {
        ...ExtensionForTest,
        views: {
          config: {
            viewerUrl: "test",
          },
          liveConfig: {
            viewerUrl: "test",
          },
          panel: {
            viewerUrl: 'test',
            height: '300px'
          }
        },
      });
      const { wrapper } = setupShallow({
        extension: extensionWithPanelHeight
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly when in panel mode as a Logged In and Unlinked Viewer', () => {
      const { wrapper } = setupShallow({
        role: ViewerTypes.LoggedIn,
        linked: false,
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly when in panel mode as a Logged In and Linked Viewer', () => {
      const { wrapper } = setupShallow({
        role: ViewerTypes.LoggedIn,
        linked: true,
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly when in panel mode as a Logged Out', () => {
      const { wrapper } = setupShallow({
        role: ViewerTypes.LoggedOut,
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('overlay mode views', () => {
    it('renders correctly in overlay mode as a Broadcaster', () => {
      const { wrapper } = setupShallow({
        type: ExtensionAnchor.Overlay,
        overlaySize: {
          height: "1px",
          width: "1px"
        }
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly when in overlay mode as a Logged In and Unlinked Viewer', () => {
      const { wrapper } = setupShallow({
        role: ViewerTypes.LoggedIn,
        linked: false,
        overlaySize: {
          height: "1px",
          width: "1px"
        }
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly when in overlay mode as a Logged In and Linked Viewer', () => {
      const { wrapper } = setupShallow({
        role: ViewerTypes.LoggedIn,
        linked: true,
        overlaySize: {
          height: "1px",
          width: "1px"
        }
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly when in overlay mode as a Logged Out', () => {
      const { wrapper } = setupShallow({
        role: ViewerTypes.LoggedOut,
        overlaySize: {
          height: "1px",
          width: "1px"
        }
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
});

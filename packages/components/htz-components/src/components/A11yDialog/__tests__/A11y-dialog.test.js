import React, { Fragment, } from 'react';
import { FelaComponent, } from 'react-fela';
import EnzymeToJson from 'enzyme-to-json';
import { felaMount, } from '../../../test-helpers/felaEnzymeRenderers';
import A11yDialog from '../A11yDialog';

class DialogExample extends React.Component {
  state = {
    isOpen: false,
  };

  handleOpenClick = () => {
    this.setState({ isOpen: true, });
  };

  render() {
    return (
      <Fragment>
        <div
          style={{
            height: '400px',
            width: '600px',
            backgroundColor: 'lightblue',
            position: 'relative',
          }}
        >
          <div id="hide">
            <button type="button" onClick={this.handleOpenClick}>
              open
            </button>
            <A11yDialog
              appendTo="dialog-example-123"
              // set aria-hidden=true by id when Dialog is activated
              elementToHide="hide" // elementToHide can accept element to hide as id string
              isVisible={this.state.isOpen}
              closeOnOutsideClick
              overlayBgColor="rgba(0, 0, 0, 0.5)"
              render={({ isVisible, handleClose, isModal, }) => (
                <FelaComponent
                  style={{
                    backgroundColor: 'lightgreen',
                    padding: 10,
                  }}
                  render={({ className, }) => (
                    <div className={className}>
                      <div> this is Dialog content component </div>
                      <button type="button" onClick={handleClose}>
                        {' '}
                        Close Content
                        {' '}
                      </button>
                      <div>
                        <button type="button" onClick={handleClose}>
                          {' '}
                          Button
                          {' '}
                        </button>
                        <h3> No Focus trap!</h3>
                      </div>
                    </div>
                  )}
                />
              )}
            />
          </div>
          <div id="dialog-example-123" />
        </div>
      </Fragment>
    );
  }
}

describe('Dialog', () => {
  it('Should render dialog closed mode (should not render nested Dialog component)', () => {
    const wrapper = felaMount(<DialogExample />);
    expect(EnzymeToJson(wrapper)).toMatchSnapshot();
  });
  it('should open dialog with toggle state', () => {
    const wrapper = felaMount(<DialogExample />);
    wrapper
      .find('button')
      .first()
      .simulate('click');
    expect(EnzymeToJson(wrapper)).toMatchSnapshot();
  });
});

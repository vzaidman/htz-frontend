import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { Paragraph, A11yDialog, } from '@haaretz/htz-components';

import CloseModalButton from '../Elements/CloseModalButton';

const paragraphStyle = theme => ({
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '2rem',
  paddingBottom: '2rem',
  paddingInlineStart: '2rem',
  paddingInlineEnd: '2rem',
});

const propTypes = {
  closeModal: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  offerDisclaimer: PropTypes.arrayOf(PropTypes.object),
};

const defaultProps = {
  offerDisclaimer: null,
};

function Modal({ closeModal, offerDisclaimer, isVisible, }) {
  return (
    <FelaComponent
      render={({ theme, }) => (
        <A11yDialog
          appendTo="#modalsRoot"
          elementToHide="#pageRoot"
          isVisible={isVisible}
          onClose={closeModal}
          isModal
          closeOnOutsideClick
          overlayBgColor="rgba(22, 22, 22, 0.8)"
          containerMiscStyles={{
            width: [
              { until: 's', value: '90%', },
              { from: 's', until: 'l', value: '95rem', },
              { from: 'l', value: '100rem', },
            ],
          }}
          render={({ handleClose, }) => (
            <FelaComponent style={paragraphStyle}>
              <FelaComponent style={{ textAlign: 'end', }}>
                <CloseModalButton handleClose={handleClose} />
              </FelaComponent>
              {offerDisclaimer &&
                offerDisclaimer.map(disclaimerParagraph => (
                  <Paragraph
                    key={Math.random()}
                    marginBottom={{ marginBottom: '2rem', }}
                    {...disclaimerParagraph}
                  />
                ))}
            </FelaComponent>
          )}
        />
      )}
    />
  );
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;

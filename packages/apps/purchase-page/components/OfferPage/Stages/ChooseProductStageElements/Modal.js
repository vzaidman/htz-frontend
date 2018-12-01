import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { Paragraph, A11yDialog, H, } from '@haaretz/htz-components';

import CloseModalButton from '../Elements/CloseModalButton';

const paragraphStyle = theme => ({
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
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
      render={({
        theme,
        theme: {
          stage2: {
            disclaimer: { title, },
          },
        },
      }) => (
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
              <FelaComponent
                style={{
                  textAlign: 'end',
                  marginEnd: '2rem',
                  marginTop: '1rem',
                }}
              >
                <CloseModalButton handleClose={handleClose} />
              </FelaComponent>
              <FelaComponent
                style={{
                  textAlign: 'center',
                  marginBottom: '1rem',
                }}
                render={({ className, }) => <H className={className}>{title}</H>}
              />
              <FelaComponent
                render="div"
                style={{
                  marginStart: '4rem',
                  marginBottom: '4rem',
                  marginLeft: '4rem',
                }}
              >
                {offerDisclaimer
                  && offerDisclaimer.map(disclaimerParagraph => (
                    <Paragraph
                      key={Math.random()}
                      marginBottom={{ ...theme.type(-1), }}
                      {...disclaimerParagraph}
                    />
                  ))}
              </FelaComponent>
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

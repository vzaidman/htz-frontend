/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { Button, CheckBox, Form, BIAction, } from '@haaretz/htz-components';
import { ApolloConsumer, } from 'react-apollo';
import Router, { withRouter, } from 'next/router';

const propTypes = {
  pastDebts: PropTypes.arrayOf(
    PropTypes.shape({
      debt: PropTypes.number,
      productNumber: PropTypes.number,
    })
  ).isRequired,
  router: PropTypes.shape().isRequired,
};

const defaultProps = {};

const contStyle = theme => ({
  textAlign: 'center',
  paddingInlineStart: '2rem',
  paddingInlineEnd: '2rem',
  marginInlineStart: 'auto',
  marginInlineEnd: 'auto',
  maxWidth: '80rem',
  extend: [ theme.type(1), ],
});

const headerStyle = {
  fontWeight: 'normal',
};

const debtAmountStyle = {
  fontWeight: 'bold',
  display: 'block',
  marginTop: '3rem',
};

const underDebtAmountStyle = theme => ({
  display: 'block',
});

const mistakeStyle = theme => ({
  display: 'block',
  marginTop: '3rem',
  extend: [ theme.type(-1), ],
});

const linkStyle = theme => ({
  color: theme.color('offerPage', 'link'),
  ':visited': {
    color: theme.color('offerPage', 'link'),
  },
});

const formContStyle = theme => ({
  marginTop: '3rem',
  marginInlineStart: 'auto',
  marginInlineEnd: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'start',
});

function StageDebt({ pastDebts, router, }) {
  const totalDebt = pastDebts
    .map(singleProductDebt => singleProductDebt.debt)
    .reduce((a, b) => a + b);

  return (
    <FelaComponent
      style={contStyle}
      render={({
        className,
        theme: {
          debt: {
            header,
            amount,
            underAmount,
            currency,
            mistake: { text, href, content, },
            form: { validateError, checkBox: { label, note, }, submit, },
          },
        },
      }) => (
        <div className={className}>
          <FelaComponent style={headerStyle}>{header}</FelaComponent>
          <FelaComponent style={debtAmountStyle} render="span">
            {amount(totalDebt)} {currency}
          </FelaComponent>

          <FelaComponent style={underDebtAmountStyle} render="span">
            {underAmount}
          </FelaComponent>
          <FelaComponent style={mistakeStyle} render="span">
            {text}
            <FelaComponent
              style={linkStyle}
              render={({ className, }) => (
                <a href={href} className={className}>
                  {content}
                </a>
              )}
            />
          </FelaComponent>
          <ApolloConsumer>
            {cache => (
              <Form
                clearFormAfterSubmit={false}
                onSubmit={() => {
                  cache.writeData({
                    data: {
                      promotionsPageState: {
                        approveDebtClaim: true,
                        __typename: 'PromotionsPageState',
                      },
                    },
                  });
                  Router.push('/promotions-page/stage5', router.asPath);
                }}
                validate={({ terms, }) => {
                  const errors = [];
                  if (!terms) {
                    errors.push({
                      name: 'terms',
                      order: 1,
                      errorText: validateError,
                    });
                  }

                  return errors;
                }}
                render={({ getInputProps, handleSubmit, }) => (
                  <FelaComponent style={formContStyle}>
                    <CheckBox
                      {...getInputProps({
                        name: 'terms',
                        label: <div>{label}</div>,
                        noteText: note,
                        formElementType: 'checkBox',
                        miscStyles: { marginTop: '3rem', fontWeight: 'bold', },
                      })}
                    />
                    <BIAction>
                      {action => (
                        <Button
                          variant="salesOpaque"
                          onClick={evt => {
                            handleSubmit(evt);
                            action({
                              actionCode: 36,
                              additionalInfo: {
                                stage: 'debt',
                              },
                            });
                          }}
                          boxModel={{ hp: 3, vp: 1, }}
                          miscStyles={{
                            marginTop: '4rem',
                            marginBottom: '20rem',
                            display: 'block',
                            marginInlineEnd: 'auto',
                            marginInlineStart: 'auto',
                          }}
                        >
                          {submit}
                        </Button>
                      )}
                    </BIAction>
                  </FelaComponent>
                )}
              />
            )}
          </ApolloConsumer>
        </div>
      )}
    />
  );
}

StageDebt.propTypes = propTypes;

StageDebt.defaultProps = defaultProps;

export default withRouter(StageDebt);

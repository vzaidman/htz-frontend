import { border, } from '@haaretz/htz-css-tools';
import htzTheme from '@haaretz/htz-theme';
import React from 'react';
import { createComponent, } from 'react-fela';
import InputLabel from '../InputLabel/InputLabel';
import TextInput from '../TextInput/TextInput';

// Todo: Work on Component according to design

const formStyle = ({ theme, }) => ({
  backgroundColor: theme.color('white'),
  display: 'flex',
  flexDirection: 'column',
  // Todo: Remove rtl when global rtl is set
  direction: 'rtl',
});

const Form = createComponent(formStyle, 'form');

const inputWrapperStyle = ({ theme, }) => ({
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: theme.color('bg', 'base'),
  ...border('1px', 0, 'solid', theme.color('primary', '-4')),
});

const InputWrapper = createComponent(inputWrapperStyle);

const inputNoteStyle = ({ theme, }) => ({});

const InputNote = createComponent(inputNoteStyle);

const textInputStyle = {
  backgroundColor: 'transparent',
  border: 'none',
};
const inputLabelStyle = {
  color: htzTheme.color('primary', 'base'),
};

const AddCommentFooterStyle = () => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const StyledAddCommentFooter = createComponent(AddCommentFooterStyle);

const sendCommentButtonStyle = ({ theme, }) => ({});

const StyledSendCommentButton = createComponent(
  sendCommentButtonStyle,
  'button'
);

function CommentForm(props) {
  return (
    <Form>
      <InputWrapper>
        <InputLabel text="שם" styleObject={inputLabelStyle}>
          <TextInput
            aria-describedby={'note-name'}
            styleObject={textInputStyle}
          />
        </InputLabel>
      </InputWrapper>
      <InputNote>אנא הזינו שם שיוצג ככותב התגובה</InputNote>
      <InputWrapper>
        <InputLabel text="תגובה" styleObject={inputLabelStyle}>
          <TextInput
            isTextArea
            aria-describedby={'note-comment'}
            styleObject={textInputStyle}
          />
        </InputLabel>
      </InputWrapper>
      <StyledAddCommentFooter>
        <InputNote>
          בשליחת תגובה זו הנני מצהיר שהינני מסכים/ה עם תנאי השימוש של אתר הארץ
        </InputNote>
        <StyledSendCommentButton>שלח</StyledSendCommentButton>
      </StyledAddCommentFooter>
    </Form>
  );
}

export default CommentForm;

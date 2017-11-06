import { borderBottom, border, } from '@haaretz/htz-css-tools';
import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import Likes from '../Likes/Likes';
import CommentList from './CommentList.js';

const propTypes = {
  commentId: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  title: PropTypes.string,
  commentText: PropTypes.string,
  publishingDateForDisplay: PropTypes.string.isRequired,
  commentNumber: PropTypes.oneOfType([ PropTypes.number, PropTypes.string, ]).isRequired,
  isEditorPick: PropTypes.string,
  subComments: PropTypes.arrayOf(PropTypes.object),
  isSubComment: PropTypes.bool,
  commentsPlusRate: PropTypes.shape({
    id: PropTypes.number,
  }),
  commentsMinusRate: PropTypes.shape({
    id: PropTypes.number,
  }),
};
const defaultProps = {
  title: '',
  commentText: '',
  subComments: undefined,
  isEditorPick: 'false',
  commentsPlusRate: {},
  commentsMinusRate: {},
  isSubComment: false,
};

const wrapperStyle = ({ theme, isSubComment, }) => ({
  // todo: change padding and margin after getting fixed design
  padding: '10px',
  margin: '5px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  // todo: remove rtl after fixing it globally
  direction: 'rtl',
  extend: [
    {
      condition: isSubComment === false,
      style: borderBottom('1px', 1, 'solid', theme.color('neutral', '-4')),
    },
    {
      condition: isSubComment === true,
      style: borderBottom('1px', 1, 'solid', theme.color('primary', '-4')),
    },
  ],
});

const StyledWrapper = createComponent(wrapperStyle, 'section');

const commentNumberContainerStyle = ({ theme, }) => ({
  width: '10rem',
  color: theme.color('neutral', '-3'),
  ...theme.type(3),
});

const StyledCommentNumberContainer = createComponent(commentNumberContainerStyle);

const commentContainerStyle = () => ({
  width: '100%',
});

const StyledCommentContainer = createComponent(commentContainerStyle);

const CommentTitleStyle = ({ theme, }) => ({
  color: theme.color('primary', 'base'),
  padding: '0',
  margin: '0',
  display: 'inline-block',
  ...theme.type(0),
});

const StyledCommentTitle = createComponent(CommentTitleStyle, 'h4');

const PublishingDateStyle = ({ theme, }) => ({
  color: theme.color('neutral', '-3'),
  ...theme.type(-1),
  // Todo: fix padding according to designer instructions
  marginLeft: '1rem',
  marginRight: '1rem',
});

const StyledPublishingDate = createComponent(PublishingDateStyle, 'span');

const subCommentAuthorStyle = ({ theme, }) => ({
  color: theme.color('neutral', '-4'),
  fontStyle: 'italic',
});

const StyledSubCommentAuthor = createComponent(subCommentAuthorStyle, 'span');

const editorPickTagStyle = ({ theme, }) => ({
  // Todo: get design for editors pick tag
  color: theme.color('primary', '-2'),
});

const StyledEditorPickTag = createComponent(editorPickTagStyle, 'span');

const commentTextStyle = ({ theme, }) => ({
  // Todo: ask Jhonny about docs spec 'base' inside square brackets
  color: theme.color('bodyText', 'base'),
  margin: 0,
});

const StyledCommentText = createComponent(commentTextStyle, 'p');

const commentFooterStyle = () => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignContent: 'flex-start',
});

const StyledCommentFooter = createComponent(commentFooterStyle);

const commentFooterLikeAndReportStyle = () => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
});

const StyledCommentFooterLikeAndReport = createComponent(commentFooterLikeAndReportStyle);

const ReplyButtonStyle = ({ theme, }) => ({
  backgroundColor: 'transparent',
  padding: '0 2rem 0 2rem',
  color: theme.color('button', 'text'),
  fontWeight: 'bold',
  ...theme.type(-3),
  extend: [ border('1px', 0, 'solid', theme.color('button', 'text')), ],
});

const StyledReplyButton = createComponent(ReplyButtonStyle, 'div');

const likesStyleObj = {
  marginLeft: '4rem',
};

const ReportButtonStyle = ({ theme, }) => ({
  backgroundColor: 'transparent',
  border: 'none',
  color: theme.color('negative', 'a11yOnDark'),
  cursor: 'pointer',
});

const StyledReportButton = createComponent(ReportButtonStyle, 'button');

function Comment(props) {
  return (
    <StyledWrapper isSubComment={props.isSubComment}>
      <StyledCommentNumberContainer>
        <span>
          {props.isSubComment ? (props.commentNumber === 1 ? '>' : '') : props.commentNumber}
        </span>
      </StyledCommentNumberContainer>
      <StyledCommentContainer>
        <div>
          <StyledCommentTitle>{props.title}</StyledCommentTitle>

          <StyledPublishingDate>{props.publishingDateForDisplay}</StyledPublishingDate>

          {props.isSubComment ? (
            <StyledSubCommentAuthor>---> {props.author}</StyledSubCommentAuthor>
          ) : (
            undefined
          )}
          {props.isEditorPick === 'true' ? (
            <StyledEditorPickTag>| בחירת העורכים</StyledEditorPickTag>
          ) : (
            undefined
          )}
        </div>
        <StyledCommentText>{props.commentText}</StyledCommentText>
        <StyledCommentFooter>
          <StyledReplyButton>הגב</StyledReplyButton>
          <StyledCommentFooterLikeAndReport>
            <Likes
              styleObj={likesStyleObj}
              plusRate={
                Object.prototype.hasOwnProperty.call(props.commentsPlusRate, props.commentId)
                  ? props.commentsPlusRate[props.commentId]
                  : 0
              }
              minusRate={
                Object.prototype.hasOwnProperty.call(props.commentsMinusRate, props.commentId)
                  ? props.commentsMinusRate[props.commentId]
                  : 0
              }
            />
            <StyledReportButton>דווח כפוגעני</StyledReportButton>
          </StyledCommentFooterLikeAndReport>
        </StyledCommentFooter>
        {props.subComments ? <CommentList comments={props.subComments} isSubComment /> : null}
      </StyledCommentContainer>
    </StyledWrapper>
  );
}

Comment.propTypes = propTypes;

Comment.defaultProps = defaultProps;

export default Comment;

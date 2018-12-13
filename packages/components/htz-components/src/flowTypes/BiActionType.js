// @flow
export type BiActionType = ({
  actionCode: number,
  additionalInfo: {
    ArticleId: string,
    ListId: string,
    NoInList: number,
    ViewName: string,
  },
}) => void;

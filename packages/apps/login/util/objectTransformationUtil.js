const transformGraphQlObjectToFlowDispenserObject = ({ userByMail, }) => {
  const userStatus = userByMail.userStatus !== null;
  const crmStatus = userByMail.userCrmStatus !== null;
  return {
    user: {
      isUserExist: userByMail.ssoId !== null,
      isEmailValid: userStatus ? userByMail.userStatus.isEmailValidated : false,
      isPhoneValid: userStatus ? userByMail.userStatus.isMobileValidated : false,
      isPhoneConnectedWithEmail: userStatus && userByMail.userStatus.isPhoneEmailConn,
      isPremiumUser:
        crmStatus &&
        userByMail.userCrmStatus.id !== null &&
        (userByMail.userCrmStatus.isActiveEng ||
          userByMail.userCrmStatus.isActiveHeb ||
          userByMail.userCrmStatus.isActiveTm),
    },
  };
};

export default transformGraphQlObjectToFlowDispenserObject;

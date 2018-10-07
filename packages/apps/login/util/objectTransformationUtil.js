const transformGraphQlObjectToFlowDispenserObject = ({ userByMail, }) =>
  ({
    user: {
      isUserExist: userByMail.ssoId !== null,
      isEmailValid: userByMail.userStatus.isEmailValidated,
      isPhoneValid: userByMail.userStatus.isMobileValidated,
      isPhoneConnectedWithEmail:
        userByMail.userStatus !== null
        && userByMail.userStatus.isPhoneEmailConn,
      isPremiumUser:
        userByMail.userCrmStatus !== null
        && userByMail.userCrmStatus.id !== null
        && (userByMail.userCrmStatus.isActiveEng
          || userByMail.userCrmStatus.isActiveHeb
          || userByMail.userCrmStatus.isActiveTm),
    },
  });

export default transformGraphQlObjectToFlowDispenserObject;

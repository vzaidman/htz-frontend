const transformGraphQlObjectToFlowDispenserObject = ({ userByMail, }) => {
  console.log('in transform', userByMail)
  const userExist = userByMail !== null;
  const userStatus = userExist && userByMail.userStatus !== null;
  const crmStatus = userExist && userByMail.userCrmStatus !== null;
  return {
    user: {
      isUserExist: userExist && userByMail.ssoId !== null,
      isEmailValid: userExist && userStatus ? userByMail.userStatus.isEmailValidated : false,
      isPhoneValid: userExist && userStatus ? userByMail.userStatus.isMobileValidated : false,
      isPhoneConnectedWithEmail: userExist && userStatus && userByMail.userStatus.isPhoneEmailConn,
      isPremiumUser:
        userExist && crmStatus &&
        userByMail.userCrmStatus.id !== null &&
        (userByMail.userCrmStatus.isActiveEng ||
          userByMail.userCrmStatus.isActiveHeb ||
          userByMail.userCrmStatus.isActiveTm),
    },
  };
};

export default transformGraphQlObjectToFlowDispenserObject;

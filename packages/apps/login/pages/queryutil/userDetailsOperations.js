import { USER_DATA, PHONE_NUM, } from '../queries/InspectEmail';

const getUserData = client => client.readQuery({ query: USER_DATA, });
const getPhoneNum = client => client.readQuery({ query: PHONE_NUM, });

const saveUserData = client => userDataObj => client.writeData({ data: userDataObj, });
const savePhoneNum = client => phoneNumObj => client.writeData({ data: phoneNumObj, });

export { getPhoneNum, savePhoneNum, getUserData, saveUserData, };

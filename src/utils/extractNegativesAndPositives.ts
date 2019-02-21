import { isNegative } from "./isNegative";

interface UserData {
  name: string;
  payment: string;
}

export const extractNegativesAndPositives = (data: UserData[]) => {
  let negativePayment = [];
  let positivePayment = [];

  data.forEach(user => {
    if (isNegative(user.payment)) {
      negativePayment.push(user);
    } else {
      positivePayment.push(user);
    }
  });

  return {
    negativePayment,
    positivePayment
  };
};

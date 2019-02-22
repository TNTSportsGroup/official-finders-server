import { isNegative } from "./isNegative";
import { reverseName } from "./reverseName";

interface UserData {
  name: string;
  payment: string;
}

export const extractNegativesAndPositives = (data: UserData[]) => {
  let negativePayment = [];
  let positivePayment = [];

  data.forEach(user => {
    if (isNegative(user.payment)) {
      user = {
        name: reverseName(user.name),
        payment: user.payment
      };

      negativePayment.push(user);
    } else {
      user = {
        name: reverseName(user.name),
        payment: user.payment
      };
      positivePayment.push(user);
    }
  });

  return {
    negativePayment,
    positivePayment
  };
};
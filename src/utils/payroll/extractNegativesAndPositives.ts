import { isNegative } from "../isNegative";
import { reverseName } from "../reverseName";
import { sortByFirstName } from "./sortByFirstName";

interface UserData {
  name: string;
  amount: string;
  key?: string;
}

export const extractNegativesAndPositives = (data: UserData[]) => {
  let negativePayment = [];
  let positivePayment = [];

  data.forEach(user => {
    if (isNegative(user.amount)) {
      user = {
        name: reverseName(user.name),
        amount: user.amount,
        key: user.name
      };

      negativePayment.push(user);
    } else {
      user = {
        name: reverseName(user.name),
        amount: user.amount,
        key: user.name
      };
      positivePayment.push(user);
    }
  });

  negativePayment = sortByFirstName(negativePayment);
  positivePayment = sortByFirstName(positivePayment);

  return {
    negativePayment,
    positivePayment
  };
};

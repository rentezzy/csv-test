import statesList from "../data/states.json";
import { DataType } from "./csvParser";
import { checkPhone, checkStates } from "./validators";
const statesListLong = Object.keys(statesList);
const statesListShort = Object.values(statesList);

export const format = (employee: DataType, key: keyof DataType) => {
  switch (key) {
    case "phone":
      return formatPhone(employee.phone);
    case "hasChildren":
      return formatHasChildren(employee.hasChildren);
    case "licenseStates":
      return formatStates(employee.licenseStates);
    default:
      return employee[key];
  }
};

export const formatPhone = (phone: string) => {
  if (checkPhone(phone)) return phone;
  const numbers = phone.slice(-10);
  return "+1" + numbers;
};

const formatHasChildren = (hasChildren: string) => {
  if (hasChildren === "") return "FALSE";
  return hasChildren;
};
const formatStates = (states: string) => {
  if (checkStates(states)) return states;
  const splitedStates = states.split("|");
  return splitedStates.reduce((acc, state, index) => {
    const stateRegister =
      state.length > 3
        ? state[0].toUpperCase() + state.toLocaleLowerCase().slice(1)
        : state.toUpperCase();
    if (statesListLong.includes(stateRegister)) {
      // Type spelling because we check if state exist in previous line
      return (acc +=
        statesList[stateRegister as keyof typeof statesList] +
        (index === splitedStates.length - 1 ? "" : ", "));
    } else if (statesListShort.includes(stateRegister)) {
      return (acc +=
        stateRegister + (index === splitedStates.length - 1 ? "" : ", "));
    }
    return acc;
  }, "");
};

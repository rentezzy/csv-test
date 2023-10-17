// const checkNumber = (value: number) => value < 0;
import statesList from "../data/states.json";
import { DataType } from "./csvParser";
const statesListLong = Object.keys(statesList);
const statesListShort = Object.values(statesList);

export const cn = (employee: DataType, key: keyof DataType) => {
  switch (key) {
    case "phone":
      return checkPhone(employee.phone);
    case "email":
      return checkEmail(employee.email);
    case "age":
      return checkAge(employee.age);
    case "experience":
      return checkExpirience(employee.experience, employee.age);
    case "yearlyIncome":
      return checkIncome(employee.yearlyIncome);
    case "hasChildren":
      return checkHasChildren(employee.hasChildren);
    case "licenseStates":
      return checkStates(employee.licenseStates);
    case "expirationDate":
      return checkDate(employee.expirationDate);
    case "licenseNumber":
      return checkLicense(employee.licenseNumber);
  }
};
//VALIDATORS: RETURN FALSE IF VALUE IS VALID, AND TRUE IF ISN'T

//Check if age less than 21 or NaN.
const checkAge = (age: number) => age < 21 || isNaN(age);

//Check if age less than 21 or NaN or expirience less than 0 or age less than expirience or expirience is NaN.
const checkExpirience = (expirience: number, age: number) =>
  checkAge(age) || expirience < 0 || age <= expirience || isNaN(expirience);

const checkIncome = (value: string) => parseFloat(value) > 1_000_000;

// For this task, it's much better to use lightweight libraries for working with time, such as Luxon, day.js, date-fns, etc.
// But since this is a test task, I decided to do it manually and without RegExp.

const checkDate = (date: string) => {
  //YYYY-MM-DD or MM/DD/YYYY
  const firstFormat = date.split("-");
  const secondFormat = date.split("/");
  if (
    (firstFormat.length === 1 && secondFormat.length === 1) ||
    firstFormat.length > 3 ||
    secondFormat.length > 3
  )
    return true;
  if (firstFormat.length > 1) {
    //YYYY-MM-DD

    const [year, month, day] = firstFormat;
    if (year.length !== 4 || +month > 12 || +day > 31) return true;
    const dateTime = new Date(date);

    try {
      dateTime.toISOString();
    } catch (e) {
      return true;
    }

    if (dateTime.getTime() < Date.now()) return true;
    return false;
  } else if (secondFormat.length > 1) {
    // MM/DD/YYYY

    const [month, day, year] = secondFormat;
    if (year.length !== 4 || +month > 12 || +day > 31) return true;
    const dateTime = new Date(`
      ${year}-
      ${month}-
      ${day}`);

    try {
      dateTime.toISOString();
    } catch (e) {
      return true;
    }

    if (dateTime.getTime() < Date.now()) return true;
    return false;
  }
  return true;
};

export const checkPhone = (phone: string) => {
  if (phone.length > 12 || phone.length < 10) return true;
  const phoneNumber = phone.slice(-10);
  if ("1" + phoneNumber === phone || "+1" + phoneNumber === phone) return false;
  return true;
};

const checkHasChildren = (hasChildren: string) =>
  hasChildren !== "FALSE" && hasChildren !== "TRUE" && hasChildren !== "";

const checkLicense = (license: string) =>
  license.length !== 6 || !RegExp("^[a-zA-Z0-9]*$").test(license);

// RFC2822 RegExp for email (simplyfied)

const checkEmail = (email: string) =>
  !RegExp(
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
  ).test(email);

export const checkStates = (states: string) => {
  const splitedStates = states.split("|");

  // console.log(parsedStates);
  for (const state of splitedStates) {
    const trimmedState = state.trim();
    if (
      statesListLong.includes(trimmedState) ||
      statesListShort.includes(trimmedState)
    )
      continue;
    return true;
  }
  return false;
};

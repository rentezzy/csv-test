import { csvParse } from "d3-dsv";
import { useState } from "react";
// Csv parser is needed to map types from human readable to JS standard, trim and parse some strings into numbers.

import _data from "../data/data.csv";
type rawCsv = {
  "full name": string;
  phone: string;
  email: string;
  age: string;
  experience: string;
  "yearly income": string;
  "has children": string;
  "license states": string;
  "expiration date": string;
  "license number": string;
};
export type DataType = {
  fullName: string;
  phone: string;
  email: string;
  age: number;
  experience: number;
  yearlyIncome: string;
  hasChildren: string;
  licenseStates: string;
  expirationDate: string;
  licenseNumber: string;
};
const headersToLower = (data: Record<string, unknown>) => {
  const res: Record<string, unknown> = {};
  const headers = Object.keys(data);
  for (const header of headers) {
    res[header.toLowerCase()] = data[header];
  }
  return res as rawCsv;
};

// Temp solution, need refactoring

const rawParse = (data: rawCsv[]) => {
  const parsedData: DataType[] = [];
  for (const dataItem of data) {
    const parsedDataItem: Partial<DataType> = {};
    for (const key in dataItem) {
      switch (key as keyof rawCsv) {
        case "phone": {
          parsedDataItem["phone"] = dataItem["phone"].trim();
          break;
        }
        case "email": {
          parsedDataItem["email"] = dataItem["email"].trim();
          break;
        }
        case "age": {
          parsedDataItem["age"] = parseInt(dataItem["age"]);
          break;
        }
        case "experience": {
          parsedDataItem["experience"] = parseInt(dataItem["experience"]);
          break;
        }
        case "full name": {
          parsedDataItem["fullName"] = dataItem["full name"].trim();
          break;
        }
        case "yearly income": {
          parsedDataItem["yearlyIncome"] = parseFloat(
            dataItem["yearly income"]
          ).toFixed(2);
          break;
        }
        case "has children": {
          parsedDataItem["hasChildren"] = dataItem["has children"].trim();
          break;
        }
        case "license states": {
          parsedDataItem["licenseStates"] = dataItem["license states"].trim();
          break;
        }
        case "expiration date": {
          parsedDataItem["expirationDate"] = dataItem["expiration date"].trim();
          break;
        }
        case "license number": {
          parsedDataItem["licenseNumber"] = dataItem["license number"].trim();
          break;
        }
      }
    }
    parsedData.push(parsedDataItem as DataType);
  }
  return parsedData;
};

const parsedData: DataType[] = rawParse(
  _data.map((item: Record<string, unknown>) => headersToLower(item))
);
export const headers = Object.keys(_data[0]);

export const useParse = (data: File | null) => {
  const [userData, setUserData] = useState<DataType[]>(parsedData);

  if (!data && userData !== parsedData) setUserData(parsedData);
  if (data && data.type !== "text/csv") return { message: "Wrong format!" };

  if (userData === parsedData && data)
    data
      .text()
      .then((d) =>
        setUserData(rawParse(csvParse(d, (rawData) => headersToLower(rawData))))
      );

  const currentHeaders = Object.keys(userData[0]);
  if (
    !currentHeaders.includes("fullName") ||
    !currentHeaders.includes("phone") ||
    !currentHeaders.includes("email")
  )
    return { message: "Wrong format!" };
  return { data: userData };
};

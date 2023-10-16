import _data from "../data.csv";
const data = _data as rawCsv[];
type rawCsv = {
  "Full Name": string;
  Phone: string;
  Email: string;
  Age: string;
  Experience: string;
  "Yearly Income": string;
  "Has children": string;
  "License states": string;
  "Expiration date": string;
  "License number": string;
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

export const parsedData: DataType[] = [];
export const headers = Object.keys(data);

for (const dataItem of data) {
  const parsedDataItem: Partial<DataType> = {};
  parsedDataItem["fullName"] = dataItem["Full Name"].trim();
  parsedDataItem["phone"] = dataItem["Phone"].trim();
  parsedDataItem["email"] = dataItem["Email"].trim();
  parsedDataItem["hasChildren"] = dataItem["Has children"].trim();
  parsedDataItem["licenseStates"] = dataItem["License states"].trim();
  parsedDataItem["expirationDate"] = dataItem["Expiration date"].trim();
  parsedDataItem["licenseNumber"] = dataItem["License number"].trim();
  parsedDataItem["age"] = parseInt(dataItem["Age"]);
  parsedDataItem["experience"] = parseInt(dataItem["Experience"]);
  parsedDataItem["yearlyIncome"] = parseFloat(
    dataItem["Yearly Income"]
  ).toFixed(2);
  parsedData.push(parsedDataItem as DataType);
}

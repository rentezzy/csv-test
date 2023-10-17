import { DataType } from "./csvParser";
import { formatPhone } from "./formating";

export const duplicateWith = (
  data: DataType[],
  employee: DataType,
  id: number
) => {
  const same = data.findIndex((item, index) => {
    return (
      (item.email.toLowerCase() === employee.email.toLowerCase() ||
        formatPhone(item.phone) === formatPhone(employee.phone)) &&
      index !== id
    );
  });
  return same === -1 ? "-" : same;
};

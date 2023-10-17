import { DataType, headers } from "../utils/csvParser";
import { duplicateWith } from "../utils/duplicateWith";
import { format } from "../utils/formating";
import { cn } from "../utils/validators";

export const Table = ({ data }: { data: DataType[] }) => {
  return (
    <table className="table">
      <thead className="table__head">
        <tr>
          <th>ID</th>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
          <th>Duplicate with</th>
        </tr>
      </thead>
      <tbody className="table__body">
        {data.map((employee, index) => (
          <tr key={employee.email + employee.phone + index}>
            <td>{index}</td>
            {Object.entries(employee).map(([key, value]) => (
              <td
                key={value}
                className={
                  cn(employee, key as keyof DataType) ? "table__error" : ""
                }
              >
                {format(employee, key as keyof DataType)}
              </td>
            ))}
            <td>{duplicateWith(data, employee, index)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

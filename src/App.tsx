import { DataType, headers, parsedData } from "./utils/csvParser";
import { duplicateWith } from "./utils/duplicateWith";
import { format } from "./utils/formating";
import { cn } from "./utils/validators";

export function App() {
  return (
    <main className="container">
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
          {parsedData.map((employee, index) => (
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
              <td>{duplicateWith(parsedData, employee, index)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

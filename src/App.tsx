import { headers, parsedData } from "./utils/csvParser";

export function App() {
  return (
    <main className="container">
      <table className="table">
        <thead className="table__head">
          <th>ID</th>
          {headers.map((header) => (
            <th>{header}</th>
          ))}
          <th>Duplicate with</th>
        </thead>
        <tbody className="table__body">
          {parsedData.map((employee, index) => (
            <tr key={employee.email + employee.phone}>
              <td>{index}</td>
              {Object.values(employee).map((value) => (
                <td key={value}>{value}</td>
              ))}
              <td>-</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

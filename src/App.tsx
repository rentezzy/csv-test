import { useState } from "react";
import { Table } from "./components/Table";
import { useParse } from "./utils/csvParser";

export function App() {
  const [file, setFile] = useState<File | null>(null);
  const data = useParse(file);
  return (
    <main className="container">
      <div className="controls">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        ></input>
        {data.message && <p className="controls__error">{data.message}</p>}
      </div>
      <Table data={data.data || []} />
    </main>
  );
}

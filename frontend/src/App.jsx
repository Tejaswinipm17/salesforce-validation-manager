import { useState } from "react";

const API = "http://localhost:5000/api/salesforce";

function App() {
  const [rules, setRules] = useState([]);

  const login = () => {
    window.location.href = `${API}/login`;
  };

  const getRules = async () => {
    const res = await fetch(`${API}/validation-rules`);
    const data = await res.json();
    setRules(data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Salesforce Validation Manager</h2>

      <button onClick={login}>Login to Salesforce</button>

      <button onClick={getRules} style={{ marginLeft: 10 }}>
        Get Validation Rules
      </button>

      <table border="1" cellPadding="10" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Object</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {rules.map((r) => (
            <tr key={r.Id}>
              <td>{r.ValidationName}</td>
              <td>{r.EntityDefinition?.QualifiedApiName}</td>
              <td>{r.Active ? "Active" : "Inactive"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
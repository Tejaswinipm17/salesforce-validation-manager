import { useState } from "react";

function App() {
  const [rules, setRules] = useState([]);

  const loginToSalesforce = () => {
    window.open(
      "http://localhost:5000/api/salesforce/login",
      "_self"
    );
  };

  const loadRules = async () => {
    const response = await fetch(
      "http://localhost:5000/api/salesforce/validation-rules"
    );

    const data = await response.json();
    setRules(data);
  };

  const toggleRule = (index) => {
    const updatedRules = [...rules];

    updatedRules[index].active =
      !updatedRules[index].active;

    setRules(updatedRules);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Salesforce Validation Manager</h1>

      <button onClick={loginToSalesforce}>
        Login With Salesforce
      </button>

      <br />
      <br />

      <button onClick={loadRules}>
        Get Validation Rules
      </button>

      <br />
      <br />

      {rules.map((rule, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px"
          }}
        >
          <h3>{rule.name}</h3>

          <p>
            Status:
            {rule.active ? " Active" : " Inactive"}
          </p>

          <button
            onClick={() => toggleRule(index)}
          >
            {rule.active
              ? "Deactivate"
              : "Activate"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
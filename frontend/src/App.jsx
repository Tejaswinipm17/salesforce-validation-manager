import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [rules, setRules] = useState([]);

  const login = () => {
    window.location.href =
      "https://salesforce-validation-manager-djva.onrender.com/api/salesforce/login";
  };

  const fetchRules = async () => {
    const res = await axios.get(
      "https://salesforce-validation-manager-djva.onrender.com/api/salesforce/validation-rules"
    );
    setRules(res.data);
  };

  const toggleRule = async (id, active) => {
    await axios.patch(
      `https://salesforce-validation-manager-djva.onrender.com/api/salesforce/toggle-rule/${id}`,
      { active: !active }
    );
    fetchRules();
  };

  return (
    <div className="container">

      <>
  <h1 className="main-title">
  ☁ Salesforce Validation Manager
</h1>

  <p className="subtitle">
    Manage Validation Rules Across Your Salesforce Org
  </p>
</>

      <div className="button-group">
        <button className="btn login" onClick={login}>
          Login with Salesforce
        </button>

        <button className="btn" onClick={fetchRules}>
          Get Validation Rules
        </button>
      </div>

      <div className="card-container">
        {rules.map((rule) => (
          <div className="card" key={rule.Id}>
            <h2>{rule.ValidationName}</h2>

            <p>
              Status:{" "}
              <span className={rule.Active ? "active" : "inactive"}>
                {rule.Active ? "ACTIVE" : "INACTIVE"}
              </span>
            </p>

            <button
              className="btn toggle"
              onClick={() => toggleRule(rule.Id, rule.Active)}
            >
              {rule.Active ? "Deactivate" : "Activate"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
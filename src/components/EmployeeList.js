import React, { useState } from "react";
import "./EmployeeList.css";
import useFetch from "../hooks/useFetch";

const EmployeeList = () => {
  const [url, setUrl] = useState("http://localhost:3000/employee");
  const { data: employee, error, isPending } = useFetch(url);

  console.log(employee);
  return (
    <div className="employee-list">
      <h2>Employee List</h2>
      {isPending && <div>Loading Employees</div>}
      {error && <div>{error}</div>}
      <ul className="card">
        {employee &&
          employee.map((employees) => (
            <li key={employees.id}>
              <h3>{employees.firstName}</h3>
              <h3>{employees.lastName}</h3>
              <p>Phone Number: {employees.number}</p>
            </li>
          ))}
      </ul>

      {/* buttons */}
      <div className="filter-buttons">
        <button
          className="male-btn"
          onClick={() => {
            setUrl("http://localhost:3000/employee?gender=male");
          }}
        >
          Male Employees
        </button>
        <button
          className="female-btn"
          onClick={() => {
            setUrl("http://localhost:3000/employee?gender=female");
          }}
        >
          Female Employees
        </button>
        <button
          className="showall-btn"
          onClick={() => {
            setUrl("http://localhost:3000/employee");
          }}
        >
          Show All Employees
        </button>
      </div>
    </div>
  );
};

export default EmployeeList;

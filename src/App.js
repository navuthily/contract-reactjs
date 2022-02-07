import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateAttribute from "./components/CreateAttribute";
import CreateContract from "./components/CreateContract";
import Employee from "./components/Employee";
import EmployeeDetail from "./components/EmployeeDetail";
import UpdateAllContract from "./components/UpdateAllContract";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/employee">Thông tin nhân viên</Link>
            </li>
            <li>
              <Link to="/update-template">Update Template</Link>
            </li>
            <li>
              <Link to="/create-contract">Create Contract</Link>
            </li>
            <li>
              <Link to="/create-attribute">Create Attribute</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/update-template" element={<UpdateAllContract />} />
          <Route path="/create-contract" element={<CreateContract />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/employee/detail/:id" element={<EmployeeDetail />} />
          <Route path="/create-attribute" element={<CreateAttribute />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

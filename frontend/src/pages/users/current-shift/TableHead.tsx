import React from "react";

function TableHead() {
  return (
    <thead className="bg-gray-200">
      <tr>
        <th className="p-3 border border-gray-300">Avatar</th>
        <th className="p-3 border border-gray-300">Doctor</th>
        <th className="p-3 border border-gray-300">Rank</th>
        <th className="p-3 border border-gray-300">Clinic</th>
        <th className="p-3 border border-gray-300">Patients Handled</th>
        <th className="p-3 border border-gray-300">Status</th>
      </tr>
    </thead>
  );
}

export default TableHead;

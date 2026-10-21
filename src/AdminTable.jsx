import React from 'react';

function AdminTable({ rows, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th scope="col">User ID</th>
          <th scope="col">Username</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan={3}>No users found.</td>
          </tr>
        ) : (
          rows.map((row) => (
            <tr key={row.userid}>
              <td>{row.userid}</td>
              <td>{row.username}</td>
              <td>
                <button type="button" onClick={() => onDelete(row.userid)}>
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default AdminTable;

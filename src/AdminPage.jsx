import React from 'react';
import { useState } from 'react';
import AdminTable from './AdminTable.jsx';

function AdminPage() {
  const [rows, setRows] = useState([]);

  function handleDelete(userid) {
    setRows((currentRows) =>
      currentRows.filter((row) => row.userid !== userid),
    );
  }

  return (
    <main
      style={{
        maxWidth: '800px',
        margin: '40px auto',
        padding: '0 20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1>User admin</h1>
      <AdminTable rows={rows} onDelete={handleDelete} />
    </main>
  );
}

export default AdminPage;

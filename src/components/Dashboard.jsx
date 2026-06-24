import React, { useState } from "react";

function Dashboard() {
  
  const [users, setUsers] = useState([
    { id: 1, name: "Clare, Alex", email: "a_clare42@gmail.com", status: "Active", lastSeen: "5 minutes ago" },
    { id: 2, name: "Morrison, Jim", email: "dmtimer9@dealyaari.com", status: "Active", lastSeen: "less than a minute ago" },
    { id: 3, name: "Simone, Nina", email: "marishabelin@giftcode-ao.com", status: "Blocked", lastSeen: "3 weeks ago" },
    { id: 4, name: "Zappa, Frank", email: "zappa_f@citybank.com", status: "Unverified", lastSeen: "less than a minute ago" },
  ]);

  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [filterText, setFilterText] = useState("");

 
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(filterText.toLowerCase()) ||
    user.email.toLowerCase().includes(filterText.toLowerCase())
  );

  
  const handleBlock = () => {
    setUsers(users.map(user => 
      selectedUserIds.includes(user.id) ? { ...user, status: "Blocked" } : user
    ));
    setSelectedUserIds([]);
  };

  const handleUnblock = () => {
    setUsers(users.map(user => 
      selectedUserIds.includes(user.id) ? { ...user, status: "Active" } : user
    ));
    setSelectedUserIds([]);
  };

  const handleDelete = () => {
    setUsers(users.filter(user => !selectedUserIds.includes(user.id)));
    setSelectedUserIds([]);
  };

  
  const handleDeleteUnverified = () => {
    setUsers(users.filter(user => user.status !== "Unverified"));
    setSelectedUserIds([]);
  };

  
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUserIds(filteredUsers.map((user) => user.id));
    } else {
      setSelectedUserIds([]);
    }
  };

  const handleSelectUser = (id) => {
    if (selectedUserIds.includes(id)) {
      setSelectedUserIds(selectedUserIds.filter((userId) => userId !== id));
    } else {
      setSelectedUserIds([...selectedUserIds, id]);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", color: "#333", backgroundColor: "#fff", minHeight: "100vh" }}>
      
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBlockEnd: "30px", borderBottom: "1px solid #e2e8f0", paddingBottom: "15px" }}>
        <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "600" }}>User Management</h2>
        <button style={{ padding: "8px 16px", background: "#ef4444", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "500" }}>Logout</button>
      </div>

      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBlockEnd: "20px" }}>
        <div style={{ display: "flex", gap: "6px" }}>
          
         
          <button onClick={handleBlock} style={{ padding: "6px 14px", background: "#3b82f6", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: "500" }}>
            🔒 Block
          </button>
          
         
          <button onClick={handleUnblock} title="Unblock" style={{ padding: "6px 12px", background: "white", color: "#3b82f6", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer", fontSize: "14px" }}>
            🔓
          </button>
          
          
          <button onClick={handleDelete} title="Delete" style={{ padding: "6px 12px", background: "white", color: "#ef4444", border: "1px solid #fca5a5", borderRadius: "4px", cursor: "pointer", fontSize: "14px" }}>
            🗑️
          </button>

         
          <button onClick={handleDeleteUnverified} title="Delete Unverified" style={{ padding: "6px 12px", background: "white", color: "#b91c1c", border: "1px solid #fca5a5", borderRadius: "4px", cursor: "pointer", fontSize: "14px" }}>
            🧹
          </button>
        </div>
        
       
        <div>
          <input 
            type="text" 
            placeholder="Filter" 
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            style={{ padding: "6px 12px", borderRadius: "4px", border: "1px solid #ccc", inlineSize: "200px", fontSize: "14px" }} 
          />
        </div>
      </div>

      
      <table style={{ inlineSize: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
            <th style={{ padding: "12px 8px", inlineSize: "30px" }}>
              <input 
                type="checkbox" 
                onChange={handleSelectAll} 
                checked={selectedUserIds.length === filteredUsers.length && filteredUsers.length > 0}
              />
            </th>
            <th style={{ padding: "12px 8px", color: "#4a5568", fontWeight: "600" }}>Name</th>
            <th style={{ padding: "12px 8px", color: "#4a5568", fontWeight: "600" }}>Email ⬇️</th>
            <th style={{ padding: "12px 8px", color: "#4a5568", fontWeight: "600" }}>Status</th>
            <th style={{ padding: "12px 8px", color: "#4a5568", fontWeight: "600" }}>Last seen</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} style={{ borderBottom: "1px solid #f1f5f9", background: selectedUserIds.includes(user.id) ? "#f0fdf4" : "transparent" }}>
              <td style={{ padding: "12px 8px" }}>
                <input 
                  type="checkbox" 
                  checked={selectedUserIds.includes(user.id)} 
                  onChange={() => handleSelectUser(user.id)}
                />
              </td>
              <td style={{ padding: "12px 8px" }}>
                <div style={{ fontWeight: "500", color: "#1e293b" }}>{user.name}</div>
                <div style={{ fontSize: "12px", color: "#94a3b8" }}>N/A</div>
              </td>
              <td style={{ padding: "12px 8px", color: "#334155" }}>{user.email}</td>
              <td style={{ padding: "12px 8px" }}>
                <span style={{ 
                  color: user.status === "Active" ? "#16a34a" : user.status === "Blocked" ? "#dc2626" : "#475569",
                  fontWeight: "500"
                }}>
                  {user.status}
                </span>
              </td>
              <td style={{ padding: "12px 8px", color: "#64748b" }}>{user.lastSeen}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
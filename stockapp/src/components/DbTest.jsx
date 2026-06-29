import { useState, useEffect } from "react";
import axios from "axios";

function DbTest() {

  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: ""
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await axios.get("http://localhost:5000/users");
    setUsers(res.data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submit = async (e) => {

    e.preventDefault();

    await axios.post(
      "http://localhost:5000/users",
      form
    );

    setForm({
      name: "",
      email: "",
      age: ""
    });

    loadUsers();
  };

  return (
    <div className="add-user px-4 py-4 border border-gray rounded mt-2" >

      <h2>Add User for TEST DB</h2>

      <form onSubmit={submit}>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
        />

        <br /><br />

        <button>Add User</button>

      </form>

      <hr />

      <h2>User List</h2>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
          </tr>
        </thead>

        <tbody>

          {users.map((user) => (

            <tr key={user.id}>

              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default DbTest;
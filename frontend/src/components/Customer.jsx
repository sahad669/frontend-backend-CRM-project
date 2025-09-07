import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const AddCustomer = ({ onCustomerAdded }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/customers/create",
        { name, email, phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
      setName("");
      setEmail("");
      setPhone("");
      onCustomerAdded();
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || error.message || "Error adding customer";
      alert(msg);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 bg-gray-50 p-6 rounded-lg shadow-md m-20 ">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Customer
          </button>
        </form>
      </div>
    </>
  );
};

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", email: "", phone: "" });
  const token = localStorage.getItem("token");

  const fetchCustomers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/customers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomers(res.data.customers);
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || error.message || "Could not fetch customers";
      alert(msg);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/customers/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(res.data.message);
      fetchCustomers();
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || error.message || "Delete failed";
      alert(msg);
    }
  };

  const handleEdit = (customer) => {
    setEditingId(customer._id);
    setEditData({ name: customer.name, email: customer.email, phone: customer.phone });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `http://localhost:3000/api/customers/edit/${editingId}`,
        editData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
      setEditingId(null);
      fetchCustomers();
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || error.message || "Update failed";
      alert(msg);
    }
  };

  return (
    <div className="p-8">
      
      <AddCustomer onCustomerAdded={fetchCustomers} />
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              {["Name", "Email", "Phone", "Created By", "Actions"].map((th) => (
                <th
                  key={th}
                  className={`text-left py-3 px-4 uppercase font-semibold text-sm ${
                    th !== "Actions" ? "border-r border-blue-700" : "text-center"
                  }`}
                >
                  {th}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) =>
              editingId === customer._id ? (
                <tr key={customer._id} className="bg-gray-100">
                  <td className="border border-gray-300 p-2">
                    <input
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      value={editData.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="border border-gray-300 p-2 text-gray-700">
                    {customer.createdBy?.name || "Unknown"}
                  </td>
                  <td className="border border-gray-300 p-2 text-center space-x-2 whitespace-nowrap">
                    <button
                      onClick={handleUpdate}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={customer._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-3">{customer.name}</td>
                  <td className="border border-gray-300 p-3">{customer.email}</td>
                  <td className="border border-gray-300 p-3">{customer.phone}</td>
                  <td className="border border-gray-300 p-3">{customer.createdBy?.name || "Unknown"}</td>
                  <td className="border border-gray-300 p-3 text-center space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(customer)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(customer._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;





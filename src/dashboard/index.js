import { useState } from "react";
import Modal from "../frames/alert";
import { employeesData } from "../data";

export function Dashboard({ onLogout }) {
  const [employees, setEmployees] = useState(employeesData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataToPass, setDataToPass] = useState(null);
  const [typeEditInsert, setTypeEditInsert] = useState("");

  const logout = () => {
    localStorage.setItem("isLoginIn", JSON.stringify(false));
    onLogout(); // Notify App to update its state
  };

  const handleEditClick = (employee) => {
    setIsModalOpen(true);
    setDataToPass(employee);
    setTypeEditInsert("edit");
  };

  const handleAddClick = (employee) => {
    setIsModalOpen(true);
    setDataToPass({});
    setTypeEditInsert("insert");
  };
  const handleDelete = (toDelete) => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee.id !== toDelete.id),
    );
  };

  const handleSave = (updatedEmployee) => {
    //to be modified to manipulate file system
    setEmployees((prevEmployees) =>
      prevEmployees.map((e) =>
        e.id === updatedEmployee.id ? updatedEmployee : e,
      ),
    );
    setIsModalOpen(false); // Close the modal after saving
  };
  const handleAdd = (addedEmployee) => {
    setEmployees((prevEmployees) => [
      ...prevEmployees,
      {
        ...addedEmployee,
        id: prevEmployees.length + 1,
      },
    ]);

    setIsModalOpen(false); // Close the modal after saving
  };

  return (
    <>
      {employees.length > 0 ? (
        <div className="container mx-auto p-4 mt-3">
          <Modal
            type={typeEditInsert}
            informations={dataToPass}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={typeEditInsert === "insert" ? handleAdd : handleSave}
          />
   

          <div className="overflow-x-auto">
          <button
  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out transform hover:scale-105 mb-4"
  onClick={handleAddClick}
>
  Add User
</button>
<button
  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow-md ml-4 transition duration-300 ease-in-out transform hover:scale-105 mb-4"
  onClick={logout}
>
  Logout
</button>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  {Object.keys(employees[0]).map((e) => (
                    <th
                      key={e}
                      className="px-6 py-3 border-b border-gray-200 text-left text-lg font-bold text-gray-600 uppercase"
                    >
                      {e}
                    </th>
                  ))}
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-lg font-bold text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {employees.map((e) => (
                  <tr key={e.id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 border-b border-gray-200 text-sm">
                      {e.id}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 text-sm">
                      {e.firstName}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 text-sm">
                      {e.lastName}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 text-sm">
                      {e.email}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 text-sm">
                      {e.salary}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 text-sm">
                      {e.date}
                    </td>
                    <td>
                      <button
                        onClick={() => handleEditClick(e)}
                        className="bg-green-500 mr-2 items-center content-center text-white hover:bg-green-950 w-1/3 border rounded-lg"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(e)}
                        className="bg-red-500 mr-2 items-center content-center text-white hover:bg-red-950 w-1/3 border rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <h1> no data to show </h1>
      )}
    </>
  );
}

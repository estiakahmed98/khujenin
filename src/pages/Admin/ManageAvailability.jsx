jsx
import React, { useState, useEffect } from 'react';
import AdminService from '../../firebase/adminService';

function ManageAvailability() {
  const [availabilities, setAvailabilities] = useState([]);
  const [availabilityName, setAvailabilityName] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const adminService = new AdminService();

  const handleCreateAvailability = async () => {
    try {
      await adminService.createAvailability({ name: availabilityName });
      setAvailabilityName('');
      setSelectedAvailability(null);
      toggleModal();
      handleGetAllAvailability();
    } catch (error) {
      console.error('Error creating availability:', error);
    }
  };

  const handleGetAvailability = async (id) => {
    try {
      const availability = await adminService.getAvailability(id);
      setSelectedAvailability(availability);
      setAvailabilityName(availability.name);
    } catch (error) {
      console.error('Error getting availability:', error);
    }
  };

  const handleUpdateAvailability = async () => {
    try {
      await adminService.updateAvailability(selectedAvailability.id, { name: availabilityName });
      setAvailabilityName('');
      setSelectedAvailability(null);
      toggleModal();
      handleGetAllAvailability();
    } catch (error) {
      console.error('Error updating availability:', error);
    }
  };

  const handleDeleteAvailability = async (id) => {
    try {
      await adminService.deleteAvailability(id);
      handleGetAllAvailability();
    } catch (error) {
      console.error('Error deleting availability:', error);
    }
  };

  const handleGetAllAvailability = async () => {
    try {
      const availabilitiesData = await adminService.getAllAvailability();
      setAvailabilities(availabilitiesData);
    } catch (error) {
      console.error('Error getting availabilities:', error);
      setAvailabilities([]);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    handleGetAllAvailability();
  }, []);

  return (
    <div className="manage-availability-container">
      <h1>Manage Availability</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          selectedAvailability === null
            ? handleCreateAvailability()
            : handleUpdateAvailability();
        }}
        className="availability-form"
      >
        <input type="text" placeholder="Availability Name" value={availabilityName} onChange={(e) => setAvailabilityName(e.target.value)} />
        <button type="submit">{selectedAvailability === null ? 'Create Availability' : 'Update Availability'}</button>
      </form>

      {/* Modal */}
      {isModalOpen && selectedAvailability && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={toggleModal}>&times;</span>
            <h3>Update Availability</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateAvailability();
              }}
            >
                <input type="text" placeholder="Availability Name" value={availabilityName} onChange={(e) => setAvailabilityName(e.target.value)} />
              <button type="submit">Update Availability</button>
            </form>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="action-column">Actions</th>
          </tr>
        </thead>
        <tbody>
          {availabilities.map((availability) => (
            <tr key={availability.id}>
              <td>{availability.id}</td>
              <td>{availability.name}</td>
              <td className="action-column">
                <button onClick={() => { handleGetAvailability(availability.id); toggleModal() }}>Get</button>
                <button onClick={() => { handleGetAvailability(availability.id); toggleModal() }}>Update</button>
                <button onClick={() => handleDeleteAvailability(availability.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageAvailability;
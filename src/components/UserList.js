import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Userlist() {
  const [userData, setUserData] = useState([]);
  const [message, setMessage] = useState('');
  const [id, setId] = useState('');
  const [formvalue, setFormvalue] = useState('');

  useEffect(() => {
    getUserData();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    const input = document.querySelector('input[name="' + name + '"]');
    input.value = value;
  };

  const getUserData = async () => {
    const reqData = await fetch('http://localhost/reactcrudphp/api/user.php');
    const resData = await reqData.json();
    setUserData(resData);
  };

  const handleDelete = async (id) => {
    const res = await axios.delete('http://localhost/reactcrudphp/api/user.php/' + id);
    setMessage(res.data.success);
    getUserData();
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-10 mt-4">
            <h5 className="mb-4">User List</h5>
            <p className="text-danger">{message} </p>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">NPM</th>
                  <th scope="col">Nama</th>
                  <th scope="col">Kelas</th>
                  <th scope="col">Jurusan</th>
                  <th scope="col">Nomor Handphone</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((uData, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{uData.npm}</td>
                    <td>{uData.nama}</td>
                    <td>{uData.kelas}</td>
                    <td>{uData.jurusan}</td>
                    <td>{uData.noHP}</td>
                    <td>{uData.status == 1 ? 'Active' : 'Inactive'} </td>
                    <td>
                      <Link to={'/edituser/' + uData.id} className="btn btn-success mx-2">
                        Edit
                      </Link>
                      <button className="btn btn-danger" onClick={() => handleDelete(uData.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Userlist;

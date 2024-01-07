import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Edituser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formvalue, setFormvalue] = useState({ npm: '', nama: '', kelas: '', jurusan: '', noHP: '', status: '' });
  const [message, setMessage] = useState('');

  const handleInput = (e) => {
    setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const userRowdata = async () => {
      const getUserdata = await fetch('http://localhost/reactcrudphp/api/user.php/' + id);
      const resuserdata = await getUserdata.json();
      setFormvalue(resuserdata);
    };
    userRowdata();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(formvalue);
    const formData = { id: id, npm: formvalue.npm, nama: formvalue.nama, kelas: formvalue.kelas, jurusan: formvalue.jurusan, noHP: formvalue.noHP, status: formvalue.status };
    const res = await axios.put('http://localhost/reactcrudphp/api/user.php/', formData);
    //let jsonres= res.data.json();
    if (res.data.success) {
      setMessage(res.data.success);
      setTimeout(() => {
        navigate('/userlist');
      }, 2000);
    }
  };
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-4">
            <h5 className="mb-4">Edit Data </h5>
            <p className="text-sucess"> {message}</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 row">
                <label className="col-sm-2">NPM</label>
                <div className="col-sm-10">
                  <input type="text" name="npm" value={formvalue.npm} className="form-control" onChange={handleInput} />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-2">Nama</label>
                <div className="col-sm-10">
                  <input type="text" name="nama" value={formvalue.nama} className="form-control" onChange={handleInput} />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-2">Kelas</label>
                <div className="col-sm-10">
                  <input type="text" name="kelas" value={formvalue.kelas} className="form-control" onChange={handleInput} />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-2">Jurusan</label>
                <div className="col-sm-10">
                  <input type="text" name="jurusan" value={formvalue.jurusan} className="form-control" onChange={handleInput} />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-2">Nomor Handphone</label>
                <div className="col-sm-10">
                  <input type="text" name="noHP" value={formvalue.noHP} className="form-control" onChange={handleInput} />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-2">Status</label>
                <div className="col-sm-10">
                  <select name="status" className="form-control" value={formvalue.status} onChange={handleInput}>
                    <option value="">--Select Status--</option>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-2"></label>
                <div className="col-sm-10">
                  <button type="submit" name="submit" className="btn btn-success">
                    Edit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Edituser;

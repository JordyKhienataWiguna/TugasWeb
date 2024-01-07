import React from 'react';
import photo from '../asset/1.png';
import style from './style.css';

function Home() {
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-start mt-4">
            <img src={photo} className="image" alt="photo" />
            <h2>Empowering Minds, Connecting Futures.</h2>
            <p>
              Hai, selamat datang di Project kami! Di sini, siapapun bisa memulai perjalanan coding mereka, dari nol hingga hero! Tak perlu takut salah, mari kita belajar bersama dan wujudkan ide - ide kita menjadi karya digital yang keren.
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Home;

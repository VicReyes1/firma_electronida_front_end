import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import Heder from './heder';
import '../css/Login.css';
import axios from 'axios';
import Swal from 'sweetalert2'

const Login_recuperar_contra = () => {

  const [email, setEmail] = useState('');
  const [rfc, setRFC] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos del formulario al servidor
    const url = `http://localhost:3001/auth/login&RecuperarContraseña`;
    const data = {
      correo: email,
      rfc: rfc
    };

    try {
      const response = await axios.post(url, data);
      console.log(response);
  
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        console.log(response.data.token)
        window.location.href = '/login';
      }
      
    } catch (error) {
      Swal.fire({
        title: "Error al restablecer contraseña",
        text: "No se tienen registro de sus datos verifique por favor.",
        icon: "error",
        allowOutsideClick: false
    })
    }
    console.log('Email:', email);
    console.log('RFC:', rfc);
  };

  return (
    <div>
      <Heder />
      <div className='login_conteiner'>
        <h2 className='titulo_login'>Recuperar Cuenta</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              style={{ width: '60%', marginLeft:'20%', height:'60px', fontSize:'2em', marginBottom:'5%', borderWidth:'2px', fontFamily:'Montserrat' }}
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicText">
            <Form.Control
              style={{ width: '60%', marginLeft:'20%', height:'60px', fontSize:'2em', marginBottom:'1%', borderWidth:'2px', fontFamily:'Montserrat' }}
              type="text"
              placeholder="RFC"
              value={rfc}
              onChange={(e) => setRFC(e.target.value)}
            />
          </Form.Group>

          <div
          style={{ 
            fontSize:'1.2em' ,
            marginLeft:'20%',
            marginRight:'20%',
            fontFamily:'Montserrat'
             }}
          >
            El RFC deberá contener letras en mayúscula y homoclave, sin espacios ni caracteres especiales.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20%' }}>
          <Link to="/login"  style={{ marginRight: '20%' }}>
            <Button className='boton33' variant="primary" type="submit" >
              Atrás
            </Button>
          </Link>
            <Button className='boton33' variant="primary" type="submit" onClick={handleSubmit}>
              Enviar
            </Button>
          </div>
          

        
        </Form>
      </div>
    </div>
  );
};

export default Login_recuperar_contra;

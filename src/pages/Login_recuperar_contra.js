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
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos del formulario al servidor
    const url = `${apiUrl}/auth/solicitudRecuperarContra`;
    const data = {
      correo: email,
    };

    try {
      const response = await axios.post(url, data);
      console.log(response);
  
      if (response.status === 200) {
        Swal.fire({
          title: "Instrucciones enviadas",
          text: "Revisa tu correo electrónico para recuperar tu contraseña.",
          icon: "success",
          allowOutsideClick: false
        }).then(() => {
          window.location.href = '/login';
        })
      }
      
    } catch (error) {
      if (error.status === 404){
        Swal.fire({
          title: "Correo electrónico no encontrado",
          text: "Por favor verifique su correo electrónico.",
          icon: "error",
          allowOutsideClick: false
        })
      }
      else{
        Swal.fire({
          title: "Error al solicitar restablecer contraseña",
          text: "No se tienen registro de sus datos verifique por favor.",
          icon: "error",
          allowOutsideClick: false
      })
      }}

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

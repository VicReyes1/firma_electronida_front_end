import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import Heder from './heder';
import '../css/Login.css';
import axios from 'axios';
import Swal from 'sweetalert2'

const Login_recuperar_contra_2 = () => {

  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [codigo, setCodigo] = useState('');
  const [rfc, setRFC] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos del formulario al servidor
    const url = `${apiUrl}/auth/actualizarContrasena`;
    const data = {
      correo: email,
      codigo: codigo, 
      nuevaContrasena: contrasena,
    };

    try {
      const response = await axios.post(url, data);
      //console.log(response);
  
      if (response.status === 200) {
        Swal.fire({
          title: '¡Bien hecho!',
          text: 'Contraseña actualizada con éxito',
          icon: 'success',
          allowOutsideClick: false,
        }).then(() =>{
          window.location.href = '/login'
        }
          //window.location.href = '/login';
      )}
      
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Error al restablecer contraseña. Verifique por favor.";

      Swal.fire({
          title: "Error",
          text: errorMessage,
          icon: "error",
          allowOutsideClick: false
      });
    }
    //console.log('Email:', email);
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

          <Form.Group controlId="formBasicCodigo">
            <Form.Control
              style={{ width: '60%', marginLeft:'20%', height:'60px', fontSize:'2em', marginBottom:'5%', borderWidth:'2px', fontFamily:'Montserrat' }}
              type="email"
              placeholder="Código"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicText">
            <Form.Control
              style={{ width: '60%', marginLeft:'20%', height:'60px', fontSize:'2em', marginBottom:'1%', borderWidth:'2px', fontFamily:'Montserrat' }}
              type="text"
              placeholder="Nueva Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
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

export default Login_recuperar_contra_2;

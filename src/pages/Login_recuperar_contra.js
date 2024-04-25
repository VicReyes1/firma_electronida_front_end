import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import Heder from './heder';
import '../css/Login.css';

const Login_recuperar_contra = () => {

  const [email, setEmail] = useState('');
  const [rfc, setRFC] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos del formulario al servidor
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
              style={{ width: '60%', marginLeft:'20%', height:'60px', fontSize:'2em', marginBottom:'5%', borderWidth:'2px' }}
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicText">
            <Form.Control
              style={{ width: '60%', marginLeft:'20%', height:'60px', fontSize:'2em', marginBottom:'1%', borderWidth:'2px' }}
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
          <Link to="/login"  style={{ marginRight: '30%' }}>
            <Button className='boton33' variant="primary" type="submit" >
              Atras
            </Button>
          </Link>
            <Button className='boton33' variant="primary" type="submit">
              Entrar
            </Button>
          </div>
          

        
        </Form>
      </div>
    </div>
  );
};

export default Login_recuperar_contra;

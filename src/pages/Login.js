import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import Heder from './heder';
import '../css/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos del formulario al servidor
    console.log('Email:', email);
    console.log('Contraseña:', password);
  };

  return (
    <div>
      <Heder />
      <div className='login_conteiner'>
        <h2 className='titulo_login'>Iniciar sesión</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              className="form-control-veda"
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control 
              className="form-control-veda"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20%' }}>
          <Link to="/login&RecuperarContraseña" style={{ color: 'black', textDecoration: 'underline', fontSize: '1.5em', fontFamily: 'Futura', }}>¿Olvidaste tu Contraseña?</Link>

            <Button className='boton_login' variant="primary" type="submit" style={{ marginRight: '10px' }}>
              Entrar
            </Button>
           
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;

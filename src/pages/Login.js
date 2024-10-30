import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Usar useNavigate para la navegación
import Heder from './heder';
import '../css/Login.css';
import axios from 'axios';
import Swal from 'sweetalert2';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate(); // Hook para la navegación programática

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${apiUrl}/auth/login`;
    const data = {
      correo: email,
      password: password
    };

    try {
      const response = await axios.post(url, data);
      console.log(response);

      if (response.status === 200) {
        const expirationTime = Date.now() + 3600000; // 1 hora en milisegundos
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('tokenExpiration', expirationTime);

        // Configura el setTimeout para eliminar el token después de 1 hora
        setTimeout(() => {
          console.log('Borrando token');
          localStorage.removeItem('token');
          localStorage.removeItem('tokenExpiration');
        }, 3600000); // 1 hora en milisegundos

        if (response.data.admin) {
          navigate('/admin&solicitudes'); // Navegación usando navigate
        } else {
          navigate('/mi_solicitud'); // Navegación usando navigate
        }
      }

    } catch (error) {
      Swal.fire({
        title: "Credenciales incorrectas",
        text: "Las credenciales de acceso son incorrectas",
        icon: "error",
        allowOutsideClick: false
      });
    }
  };

  return (
    <div>
      <Heder />
      <div className='login_conteiner'>
        <h2 className='titulo_login'>Iniciar Sesión</h2>
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

          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '15%' }}>
            <Link to="/login&RecuperarContraseña" style={{ color: 'black', textDecoration: 'underline', fontSize: '1.5em', fontFamily: 'Montserrat' }}>¿Olvidaste tu Contraseña?</Link>

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

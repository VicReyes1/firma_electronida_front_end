import React, { useState } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
//import Button from 'react-bootstrap/Button';
import '../css/Landing_Page.css'; // Verifica la ruta a tu archivo CSS
import Logo from '../Images/logotipo-09.png'; // Verifica la ruta a tu imagen
import Swal from 'sweetalert2'



const Landing_Page = () => {

  const apiUrl = process.env.REACT_APP_API_URL;

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contrasena: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Hola 1')
      const response = await fetch(`${apiUrl}/crearUsuario`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      console.log('Hola 2')
      if (response.ok) {
        Swal.fire({
          title: 'Éxito',
          text: 'Solicitud creada correctamente. Espere a que sea aceptada',
          icon: 'success'
        }).then(() => {
          handleClose(); // Cierra el modal en caso de éxito
        });
      } else {
        //const errorData = await response.json();
        if (response.status === 409) {
          Swal.fire({
            title: 'Error',
            text: 'El correo electrónico ya está en uso.',
            icon: 'error'
          }).then(() => {
            handleClose(); // Cierra el modal en caso de conflicto
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error al enviar el formulario.',
            icon: 'error'
          }).then(() => {
            handleClose(); // Cierra el modal en caso de error general
          });
        }
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al enviar el formulario.',
        icon: 'error'
      }).then(() => {
        handleClose(); // Cierra el modal en caso de error de red
      });
    }
  };

  return (
    <div className="container">
      <div className="header">
          <img src={Logo} alt="Logo" className="Logo" />

      </div>
      <div className="content">
      <div className='texto'>
      Bienvenidos
        </div>

        <div className='titulo'>
        FIRMA ELECTRÓNICA AVANZADA
        PARA EL ESTADO DE HIDALGO
        </div>

        <div className='texto'>
        Es de uso exclusivo para trámites Gubernamentales del Estado de Hidalgo y no se emplea en trámites de tipo federal.
        </div>
        <br/><br/>
        <div className='texto'>
        Realice el trámite para
        </div>  
        <div className='titulo'>
        Obtener tu Firma Electrónica Avanzada
        </div>
      </div>
      <div className="footer">
        
        <a href="/login">
          <Button className='boton' variant="primary">Iniciar Sesión</Button>
        </a>
      </div>
      <div className="footer1">
        {/*<a href="/preregistro">
          <Button className='boton' variant="primary">Crear Cuenta</Button>
        </a>*/}
      </div>
      <div className="footer2">
      <a>
          <Button onClick={handleShow} className='boton' variant="primary">Registro</Button>
      </a>
      </div>


      <Modal show={showModal} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Formulario de Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formnombre">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su nombre completo"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese su correo electrónico"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
  <div className="input-container">
    <Form.Label className="form-label">Crea tu Contraseña:</Form.Label>
    <Form.Control
      type={showPassword ? "text" : "password"}
      value={formData.contrasena}
      name="contrasena"
      onChange={handleChange}
      placeholder="Contraseña"
      maxLength={15}
      className="custom-input"
    />
    <div className="eye-icon" onClick={toggleShowPassword}>
      {showPassword ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={"1.5rem"}>
          <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
          <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={"1.5rem"}>
          <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
          <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
          <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
        </svg>
      )}
    </div>
  </div>
  <br/>
</Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>
      {/* 
<div className="footer2">
  <a href="/preregistro-presencial">
    <Button className='boton' variant="primary">Registro Presencial</Button>
  </a>
</div> 
*/}


    </div>
  );
}

export default Landing_Page;

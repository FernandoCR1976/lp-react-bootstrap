import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Button, 
  Card, 
  Carousel, 
  Form, 
  Modal,
  Alert 
} from 'react-bootstrap';
import { send } from '@emailjs/browser'; 

function App() {
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();

    const templateParams = {
      from_name: event.target.formBasicName.value,
      from_email: event.target.formBasicEmail.value,
      message: event.target.formBasicMessage.value,
      to_email: 'info@autosfcm.com' 
    };

    send(
      'YOUR_SERVICE_ID', 
      'YOUR_TEMPLATE_ID', 
      templateParams, 
      'YOUR_USER_ID'
    )
    .then((response) => {
      console.log('Correo electrónico enviado con éxito!', response.status, response.text);
      setShowAlert(true);
      event.target.reset();
    })
    .catch((err) => {
      console.error('Error al enviar el correo electrónico:', err);
    });
  };

  return (
    <div>
      {/* Hero */}
      <Container 
        fluid 
        className="py-5" 
        style={{ 
          backgroundImage: "url('img/hero.jpg')", 
          backgroundSize: 'cover', 
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          color: 'white' 
        }}
      >
        <Container>
          <h1 className="display-4">Encuentra tu auto ideal</h1>
          <p className="lead">
            Tenemos una amplia selección de vehículos para satisfacer tus necesidades.
          </p>
          <Button variant="primary" size="lg" onClick={handleShow}>Ver modelos</Button>
        </Container>
      </Container>

      {/* Características */}
      <Container className="py-5">
        <h2 className="text-center mb-4">Características que te encantarán</h2>
        <Row>
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src="img/seguridad.jpg" />
              <Card.Body>
                <Card.Title>Seguridad</Card.Title>
                <Card.Text>
                  Nuestros vehículos cuentan con los sistemas de seguridad más avanzados para protegerte a ti y a tu familia.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src="img/tecnologia.jpg" />
              <Card.Body>
                <Card.Title>Tecnología</Card.Title>
                <Card.Text>
                  Disfruta de la última tecnología en conectividad, entretenimiento y asistencia al conductor.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src="img/diseno.jpg" />
              <Card.Body>
                <Card.Title>Diseño</Card.Title>
                <Card.Text>
                  Vehículos con un diseño moderno y elegante que te harán destacar en la carretera.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modelos (Modal) */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Nuestros Modelos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="img/modelo1.jpg"
                alt="Modelo 1"
              />
              <Carousel.Caption>
                <h3>Modelo 1</h3>
                <p>Descripción del modelo 1.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="img/modelo2.jpg"
                alt="Modelo 2"
              />
              <Carousel.Caption>
                <h3>Modelo 2</h3>
                <p>Descripción del modelo 2.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="img/modelo3.jpg"
                alt="Modelo 3"
              />
              <Carousel.Caption>
                <h3>Modelo 3</h3>
                <p>Descripción del modelo 3.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Contacto */}
      <Container className="py-5">
        <h2 className="text-center mb-4">Contáctanos</h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formBasicName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Ingresa tu nombre" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control type="email" placeholder="Ingresa tu correo" />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="formBasicMessage">
            <Form.Label>Mensaje</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Enviar
          </Button>
        </Form>
        <Alert show={showAlert} variant="success" onClose={() => setShowAlert(false)} dismissible>
          <Alert.Heading>¡Mensaje enviado!</Alert.Heading>
          <p>Gracias por contactarnos, te responderemos a la brevedad.</p>
        </Alert>
      </Container>
    </div>
  );
}

export default App;
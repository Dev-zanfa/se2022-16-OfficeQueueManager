import { Form, Row, Col, Button } from 'react-bootstrap';


function LoginForm(props) {

    return (

        <Form>
        <Row className="justify-content-md-center" >
                <Col md={4}>
                    <Form.Group className='mb-3' controlId='username'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type='text' required={true} />
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password'  required={true} minLength={6} />
                    </Form.Group>
                    <Row className="justify-content-md-center" >
                        <Col md={2}>
                        <Button  className="mt-3" type="submit">Login</Button>
                        </Col>
                           
                            </Row>
  
                    </Col>
                    </Row>

        </Form>


    );


}

export { LoginForm };
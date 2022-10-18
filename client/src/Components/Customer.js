import {Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

function Customer(props) {
    const [service, setService] = useState("Choose service type");
    const [error, setError] = useState(false);

    return <>
    <Row className='justify-content-center align-items-center w-100 vh-100'>
        <Row className='justify-content-center'> 
            <Dropdown className='text-center'>
                <Dropdown.Toggle variant="primary" id="dropdown-basic" style={{width: "200px"}}>
                    <a style={{marginRight:'10px'}}>{service}</a>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setService('information')}>Information</Dropdown.Item>
                    <Dropdown.Item onClick={() => setService('delivery')}>Delivery</Dropdown.Item>
                    <Dropdown.Item onClick={() => setService('something')}>Something</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown> 

            {error ? <p className='text-center text-danger' >Select a type of service</p> : null}

            <Button style={{width: "200px", height: "100px", marginTop: "20px"}}
            onClick={() => {
                if(service != 'Choose service type'){
                    setError(false);
                    // GIVE TICKET
                } else 
                    setError(true);
            }}>
                <p>Get ticket</p>
            </Button>
        </Row>
    </Row>
    </>;
}

export { Customer };
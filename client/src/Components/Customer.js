import {Row, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import API from '../API';

function Customer(props) {
    const [service, setService] = useState("Choose service type");
    const [serviceTypes, setServiceTypes] = useState([]);
    const [error, setError] = useState(false);
    const [ticket, setTicket] = useState("");

    useEffect(() => {
        API.getService()
            .then(services => {
                setServiceTypes(services);
            })
            .catch(err => console.log(err))
    }, []);

    return <>
        <Row className='justify-content-center align-items-center w-100 vh-100'>
            <Row className='justify-content-center'> 
                {
                    ticket ? 
                    <>
                        <Row className='justify-content-center'> 
                            <Row className='text-center align-items-center align-middle' 
                            style={{width: "200px", height: "100px", border: 'solid black', marginTop: "20px"}}>
                                <div>
                                    <p>ticket number:</p>
                                    <h2>{ticket}</h2>
                                </div>
                            </Row>
                        </Row>
                
                        <Button style={{width: "200px", height: "50px", marginTop: "20px"}} onClick={() => setTicket("")}>
                            <div>New ticket</div>
                        </Button>
                    </> : 
                    <>
                        <Dropdown className='text-center'>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic" style={{width: "200px"}}>
                                <span style={{marginRight:'10px'}}>{service}</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {serviceTypes.map(s => <Dropdown.Item key={s.tag}
                                onClick={() => setService(s.tag)}>{s.name}</Dropdown.Item>)}
                            </Dropdown.Menu>
                        </Dropdown> 

                        {error ? <p className='text-center text-danger' >Select a type of service</p> : null}

                        <Button style={{width: "200px", height: "100px", marginTop: "20px"}}
                        onClick={() => {
                            if(service !== 'Choose service type'){
                                setError(false);
                                API.newTicket(service)
                                    .then(number => setTicket(number))
                                    .catch(() => setTicket('error'));
                            } else 
                                setError(true);
                        }}>
                            <div>Get ticket</div>
                        </Button>
                    </>
                }
            </Row>
        </Row>
    </>;
}

export { Customer };
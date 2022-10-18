import {Row, } from 'react-bootstrap';
import { useState } from 'react';

function Counter(props) {
    const [count, setCount] = useState(123);
    const [type, setType] = useState('service type');

    return <>
    <Row className='justify-content-center align-items-center w-100 vh-100'>
        <Row className='justify-content-center'> 
            <Row className='text-center align-items-center align-middle' 
            style={{width: "200px", height: "100px", border: 'solid black'}}>
                <div>
                    <h3>{count}</h3>
                    <p>{type}</p>
                </div>
            </Row>
        </Row>
    </Row>
    </>;
}

export { Counter };
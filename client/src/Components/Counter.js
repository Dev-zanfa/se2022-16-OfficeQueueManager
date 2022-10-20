import { Row, Button } from 'react-bootstrap';

function Counter(props) {

    return <>
    <Row className='justify-content-center align-items-center w-100 vh-100'>
        <Row className='justify-content-center'> 
            <Button style={{width: "200px", height: "100px", marginTop: "20px"}} onClick={() => {}}>
                    <div>Next customer</div>
            </Button>
        </Row>
    </Row>
    </>;
}

export { Counter };
import {Row, Col }from 'react-bootstrap';
const ContactItem = ({item})=>{
    return(
        <Row style={{ backgroundColor: 'grey', margin: '10px', padding: '10px', borderRadius: '5px' }}>
            <Col lg={2}>
                <img width={50} src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"></img>
            </Col>
            <Col lg={10}>
                <div> {item.name}</div>
                <div> {item.phoneNumber}</div>
            </Col>
        </Row>
    )
}
export default ContactItem
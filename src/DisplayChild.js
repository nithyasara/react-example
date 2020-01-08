import React from 'react';
import './App.css';
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle, ListGroup, ListGroupItem
} from 'reactstrap';

class DisplayChild extends React.Component {
    render() {
        return (
            this.props.items.map((value) => {
                return (
                    <div className="display_child">
                        <Card id="card_style">
                            <CardImg id="image_style" top width="30%" src={value.image} alt="Characters" />
                            <CardBody>
                                <CardTitle>NAME {value.name}</CardTitle>
                                <CardSubtitle>SPECIES {value.species}</CardSubtitle>
                                <ListGroup>
                                    <ListGroupItem>ID {value.id}</ListGroupItem>
                                    <ListGroupItem>STATUS {value.status}</ListGroupItem>
                                    <ListGroupItem>GENDER {value.gender}</ListGroupItem>
                                    <ListGroupItem>CREATED ON {value.created}</ListGroupItem>
                                    <ListGroupItem>LOCATION {value.location.name}</ListGroupItem>
                                </ListGroup>
                            </CardBody>
                        </Card>
                    </div>
                );
            })
        )
    }
}

export default DisplayChild;
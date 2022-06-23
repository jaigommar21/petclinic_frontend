import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class PetList extends Component {

    constructor(props) {
        super(props);
        this.state = {pets: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/pets')
            .then(response => response.json())
            .then(data => this.setState({pets: data}));
    }

    async remove(id) {
        await fetch(`/pets/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedPets = [...this.state.pets].filter(i => i.id !== id);
            this.setState({pets: updatedPets});
        });
    }
    
    render() {
        const {pets, isLoading} = this.state;
    
        if (isLoading) {
            return <p>Loading...</p>;
        }
    
        const petList = pets.map(pet => {
            return <tr key={pet.id}>
                <td>{pet.id}</td>
                <td style={{whiteSpace: 'nowrap'}}>{pet.name}</td>
                <td>{pet.typeId}</td>
                <td>{pet.ownerId}</td>
                <td>{pet.birthDate}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/pets/" + pet.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(pet.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });
    
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/pets/new">Add Pet</Button>
                    </div>
                    <h3>Pets</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="5%">Id</th>
                            <th width="15%">Name</th>
                            <th width="5%">TypeId</th>
                            <th width="5%">OwnerId</th>
                            <th width="10%">birthDate</th>
                            <th width="10%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {petList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }

}
export default PetList;
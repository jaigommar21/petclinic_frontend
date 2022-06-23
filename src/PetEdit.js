import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class PetEdit extends Component {

    emptyItem = {
        name: '',
        birthDate: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const pet = await (await fetch(`/pets/${this.props.match.params.id}`)).json();
            this.setState({item: pet});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
    
        await fetch('/pets' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/pets');
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Pet' : 'Add Pet'}</h2>;
    
        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={item.name || ''}
                               onChange={this.handleChange} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="name">TypeId</Label>
                        <Input type="text" name="typeId" id="typeId" value={item.typeId || ''}
                               onChange={this.handleChange} autoComplete="typeId"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="name">OwnerId</Label>
                        <Input type="text" name="ownerId" id="ownerId" value={item.ownerId || ''}
                               onChange={this.handleChange} autoComplete="ownerId"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="birthDate">BirthDate</Label>
                        <Input type="date" name="birthDate" id="birthDate" value={item.birthDate || ''}
                               onChange={this.handleChange} autoComplete="birthDate"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/pets">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }

}
export default withRouter(PetEdit);
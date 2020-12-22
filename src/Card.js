import Card from 'react-bootstrap/Card';
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus} from "@fortawesome/free-solid-svg-icons";
// import { connect } from 'react-redux';
// import { createItem, deleteItem, updateItem, readItems } from 'actions'

class BMCCard extends Component {

    constructor(props) {
        super(props);
        this.state = {value: ''}
        this.handleChange = this.handleChange.bind(this)
        this.addItem = this.addItem.bind(this)
    }

    handleChange(event){
        this.setState({value: event.target.value})
    }

    createList(content_list){
        const content = content_list
        const content_items = content.map((item, idx)=>
            <ListGroup.Item eventKey={item.toString()}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                {item.toString()}
                <Button onClick={()=>this.deleteItem(idx)} variant="outline-secondary" style={{border: "none"}}><FontAwesomeIcon icon={faMinus}/></Button>
            </div>
            </ListGroup.Item>
        )
        return (
            <ListGroup variant="flush">{content_items}</ListGroup>
        )
    }

    addItem(event){
        event.preventDefault()
        //console.log(event.target.value)

        this.props.content.push(this.state.value)
        this.setState(this.props.content)
    }

    deleteItem(event){
        //this.setState({content: [...this.stat]})
        console.log(event.target.value)
    }

    render() {
        return (
            <Card className="m-4" border={"primary"} style={{width: '18rem'}}>
                <Card.Header as="h5">{this.props.title}</Card.Header>
                {this.createList(this.props.content)}
                <Form onSubmit={this.addItem} style={{display: "flex", justifyContent: "space-between"}}>
                <Form.Control type="text" value={this.state.value} onChange={this.handleChange} placeholder="Insert here" />
                <Button onClick={this.addItem} variant="primary">Add</Button>
                </Form>
            </Card>
        )
    }
}


export default BMCCard

// //subscribing to redux store updates
// const mapStateToProps = ({ menuItems, loading, errors }) => ({
//     menuItems, loading, errors
// })
//
// //connecting our main component to redux store
// export default connect(mapStateToProps, { createItem, deleteItem, updateItem, readItems })(Menu);

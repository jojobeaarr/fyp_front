import Card from 'react-bootstrap/Card';
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus} from "@fortawesome/free-solid-svg-icons";
import {updateCards} from "./middleman";
// import { connect } from 'react-redux';
// import { createItem, deleteItem, updateItem, readItems } from 'actions'

class BMCCard extends Component {

    constructor(props) {
        super(props);
        this.state = {title: this.props.title, content:this.props.content, value: '', card_id: this.props.card_id}
        this.handleChange = this.handleChange.bind(this)
        this.addItem = this.addItem.bind(this)
    }

    handleChange(event){
        this.setState({value: event.target.value})
    }

    createList(content_list){
        const content = content_list
        const content_items = content.map((item, idx)=>
            <ListGroup.Item eventKey={idx}>
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
        this.state.content.push(this.state.value)
        updateCards(this.state.card_id, this.state.content)
        this.setState(this.state.content)
    }

    deleteItem(event){
        //this.setState({content: [...this.stat]})
        console.log(event)
        this.state.content.splice(event, 1)
        updateCards(this.state.card_id, this.state.content)
        this.setState(this.state.content)
    }

    render() {
        return (
            <div className="align-content-between">
                <Card className="m-4" border={"primary"} style={{width: '18rem'}}>
                    <Card.Header as="h5">{this.props.title}</Card.Header>
                    {this.createList(this.props.content)}
                    <Form onSubmit={this.addItem} style={{display: "flex", justifyContent: "space-between"}}>
                    <Form.Control type="text" value={this.state.value} onChange={this.handleChange} placeholder="Insert here" />
                    <Button onClick={this.addItem} variant="primary">Add</Button>
                    </Form>
                </Card>
            </div>
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

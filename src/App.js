import logo from './logo.svg';
import './App.css';
import Card from'./Card';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {getCards, getContainer} from "./middleman";

class App extends React.Component {
    constructor() {
        super();
        this.state = {counter: 0, card_data: undefined};
    }

    componentDidMount() {
        this.getCards()
    }

    async getCards(){
        //user1 is a dummy, cards return list of card objects
        let userid = "user1"
        let cards
        let cardsHtml
        await getContainer(userid).then(container =>
            getCards(container, null).then(function(res){
                cards = res
                console.log(cards)
                cardsHtml = (cards.map((item)=> <Card title={item["title"]} content={item["content"]} card_id={item["card_id"]}/>));
            }))
        this.setState({card_data: cardsHtml});
    }

    render() {
        return (
            <div className="App">
                <header>
                    <h5 className="h-25 m-4">Business Model Canvas {this.state.counter}</h5>
                    <button onClick={()=>{this.setState({counter: this.state.counter + 1})}}></button>
                </header>
                <body>
                <div>
                    <div className="d-flex align-content-between flex-wrap ml-4 mt-4">
                        {this.state.card_data}
                        {/*<Card title={dummyjson["bmc_cards"][0]["title"]}*/}
                        {/*      content={dummyjson["bmc_cards"][0]["content"]}/>*/}
                    </div>
                </div>
                </body>
            </div>
        );
    }
}

export default App;

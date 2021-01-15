import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {getCards, getContainer} from "./middleman";
import Card from "./Card";
import {Redirect} from "react-router-dom";
import './Dashboard.css';
import {Button, CardGroup} from "react-bootstrap";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {card_data: undefined};
    }

    componentDidMount() {
        this.getCards()
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.innerHTML = " window.watsonAssistantChatOptions = {\n" +
            "      integrationID: \"d7c893d3-bd2f-465b-8a4f-e01728e41144\", // The ID of this integration.\n" +
            "      region: \"eu-gb\", // The region your integration is hosted in.\n" +
            "      serviceInstanceID: \"fe62cd5d-da3a-486f-9840-bea53b31b826\", // The ID of your service instance.\n" +
            "      onLoad: function(instance) { instance.render(); }\n" +
            "    };\n" +
            "  setTimeout(function(){\n" +
            "    const t=document.createElement('script');\n" +
            "    t.src=\"https://web-chat.global.assistant.watson.appdomain.cloud/loadWatsonAssistantChat.js\";\n" +
            "    document.head.appendChild(t);\n" +
            "  });"
        document.body.appendChild(s);
    }

    splitToChunks(array, parts) {
        let result = [];
        for (let i = parts; i > 0; i--) {
            result.push(array.splice(0, Math.ceil(array.length / i)));
        }
        return result;
    }

    async getCards() {
        let auth_token = this.props.token
        let cards
        let cardsArray, cardsHtml, cardsSplit

        await getContainer(auth_token).then((container) =>
            getCards(container, null).then(function (res) {
                cards = res
                cardsArray = (cards.map((item) =>
                    <Card title={item["title"]} content={item["content"]}
                          card_id={item["card_id"]}/>
                ));
            }))

        cardsSplit = this.splitToChunks(cardsArray, 3)
        cardsHtml = (cardsSplit.map((item) => <CardGroup>{item}</CardGroup>))

        this.setState({card_data: cardsHtml});
    }

    render() {

        if (this.props.token == ""){
            console.log("to login")
            return (
                <Redirect to="/login"/>
            )
        }

        return (
            <div className="Dashboard">
                <div className="topnav">
                    <a className="active" href="#dashboard">Business Model Canvas</a>
                    <a href="#news">News</a>
                    <a href="#contact">Contact</a>
                    <a href="#about">About</a>
                    <Button onClick={() => {
                        sessionStorage.removeItem('token')
                        window.location.href = '/login';
                    }}>Sign Out</Button>
                </div>
                <header className="text-left">
                    <h6 className="lead ml-3 mt-2">Fill in each segment and start a design thinking process using Watson to improve
                        your canvas!</h6>
                </header>
                <body>
                <div>
                    <div className="d-flex align-content-between flex-wrap ml-4 mt-4 justify-content-center">
                        {this.state.card_data}
                    </div>
                </div>
                </body>
            </div>
        );
    }
}
export default Dashboard;

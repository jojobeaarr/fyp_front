import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {getCards, getContainer} from "./middleman";
import Card from "./Card";

class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {card_data: undefined};
    }

    componentDidMount() {
        this.getCards()
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.innerHTML = "window.watsonAssistantChatOptions = {\n" +
            "      integrationID: \"d7c893d3-bd2f-465b-8a4f-e01728e41144\", // The ID of this integration.\n" +
            "      region: \"eu-gb\", // The region your integration is hosted in.\n" +
            "      serviceInstanceID: \"fe62cd5d-da3a-486f-9840-bea53b31b826\", // The ID of your service instance.\n" +
            "      onLoad: function(instance) { instance.render(); }\n" +
            "    };\n" +
            "  setTimeout(function(){\n" +
            "    const t=document.createElement('script');\n" +
            "    t.src=\"https://web-chat.global.assistant.watson.appdomain.cloud/loadWatsonAssistantChat.js\";\n" +
            "    document.head.appendChild(t);\n" +
            "  });";
        document.body.appendChild(s);
    }

    async getCards() {
        //user1 is a dummy, cards return list of card objects
        let userid = "user1"
        let cards
        let cardsHtml
        await getContainer(userid).then(container =>
            getCards(container, null).then(function (res) {
                cards = res
                console.log(cards)
                cardsHtml = (cards.map((item) => <Card title={item["title"]} content={item["content"]}
                                                       card_id={item["card_id"]}/>));
            }))
        this.setState({card_data: cardsHtml});
    }

    render() {

        return (
            <div className="Dashboard">
                <header className="text-center">
                    <h5 className="h-25 m-4">Business Model Canvas</h5>
                    <h6 className="m-4">Fill in each segment and start a design thinking process using Watson to improve
                        your canvas!</h6>
                </header>
                <body>
                <div>
                    <div className="d-flex align-content-between flex-wrap ml-4 mt-4">
                        {this.state.card_data}
                    </div>
                </div>
                </body>
            </div>
        );
    }
}
export default Dashboard;

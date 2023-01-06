import React, {Component, useState, useEffect} from "react"

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: {
                base_asset: {
                    name: '',
                    symbol: '',
                    type: ''
                },
                quote_asset: {
                    name: '',
                    symbol: '',
                    type: ''
                }
            },
            assetPairs: []
        };
    }


    async componentDidMount() {
        try {
            const res = await fetch('http://localhost:8000/api/asset-pairs/');
            const assetPairs = await res.json();
            this.setState({
                assetPairs
            });
        } catch (e) {
            console.log(e);
        }
    }

    renderItems = () => {
        return this.state.assetPairs.map(item => (
                <div>
                    <span>{item.base_asset.name}/{item.quote_asset.name}</span>
                    <h1>{item.base_asset.symbol}/{item.quote_asset.symbol}</h1>
                </div>
            )
        );
    };

    render() {
        return (
            <main className="content">
                <div className="row">
                    <div className="col-md-6 col-sm-10 mx-auto p-0">
                        <div className="card p-3">
                            <ul className="list-group list-group-flush">
                                {this.renderItems()}
                            </ul>
                            <MyComponent />
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default App;

function MyComponent()
{
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Connect to the websocket server
        const ws = new WebSocket('ws://localhost:8000/ws/orders/');

        // Set up event handlers for the websocket events
        ws.onopen = () => {
            console.log('Websocket connection opened');
        };
        ws.onclose = () => {
            console.log('Websocket connection closed');
        };
        ws.onmessage = event => {
            let data = JSON.parse(event.data)
            console.log(data)
        };
        ws.onerror = error => {
            console.log(`Websocket error: ${error}`);
        };

        // Save the websocket object in state so we can use it later
        setSocket(ws);

        return () => {
            ws.close()
        }
    }, [])
}
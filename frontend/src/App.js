import React, {Component} from "react"

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
            console.log(assetPairs)
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
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default App;

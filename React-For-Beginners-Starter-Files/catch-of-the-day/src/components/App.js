import React from 'react';
import Header from './Header';
import Inventory from './Inventory'; 
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from "../base";


class App extends React.Component {
	state = {
		fishes: {},
		order: {}
	};
	componentDidMount() {
		const { params } = this.props.match;
		//reinstate our localstorage
		const localStorageRef = localStorage.getItem(params.storeId);
		console.log(localStorageRef);
		if (localStorageRef) {
			this.setState({ order: JSON.parse(localStorageRef) });
		}
		this.ref = base.syncState(`${params.storedId}/fishes`, {
			context: this,
			state:'fishes'
		});
	}
	
	componentDidUpdate() {
		console.log(this.state.order);
		localStorage.setItem(
			this.props.match.params.storedId,
			JSON.stringify(this.state.order));
		
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	
 
	addFish = fish => {
		//1. take a copy of the existing state
		const fishes = { ...this.state.fishes };
		//2. Add our new fish to that fishes variable 
		fishes[`fish${Date.now()}`] = fish;
		// 3. set the new fishes object to state
		this.setState({ fishes });
	};

	updateFish = (key, updatedFish) => {
		//1. take a copy of the existing state
		const fishes = { ...this.state.fishes };
		//2. Add our new fish to that fishes variable 
		fishes[key] = updatedFish;
		// 3. set the new fishes object to state
		this.setState({ fishes });
	};

	deleteFish = (key) => {
		const fishes = { ...this.state.fishes };
		fishes[key] = null;
		this.setState({ fishes });
	}




	loadSampleFishes = () => {
		this.setState({ fishes: sampleFishes });
	};

	addToOrder = (key) => {
		// 1. Take a copy of state
		const order = { ...this.state.order };
		// 2. Either add to the order, or update the number in our order
		order[key] = order[key] + 1 || 1;
		// 3. Call setstate to update our state object
		this.setState({ order }); 
	} 

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seadfood Market" />
					<ul className="fishes" >
						{Object.keys(this.state.fishes).map(key => (
							<Fish
							key={key}
							index={key} 
							details={this.state.fishes[key]}
							addToOrder={this.addToOrder}
						/>
						))}
					</ul>

				</div>
				
				<Order fishes={this.state.fishes} order ={this.state.order} />

				<Inventory
					addFish={this.addFish}
					updateFish={this.updateFish}
					deleteFish={this.deleteFish}
					loadSampleFishes={this.loadSampleFishes}
					fishes= {this.state.fishes}
				 />
				
			</div>
		);
	}
}
export default App;

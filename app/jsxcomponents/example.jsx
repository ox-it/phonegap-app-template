define(['react'], function (React) {
	
	var ExampleComponent = React.createClass({
		render: function () {
			return (<div>
					<h1>Example React component</h1>
					
					My name is {this.props.name}<br/>
					I have a {this.props.data}
				</div>)
		}
	});
	
	return ExampleComponent;
});

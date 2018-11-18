var Screen = React.createClass({
  render: function(){
    return (
      <div id="display">
        <span className="clean" onClick={this.props.onClickClean}>x</span>
        {this.props.displayText}
      </div>
    );
  }
});

var Inputs = React.createClass({
  render: function(){
    return (
      <div id="inputs">
        <Numbers onClick={this.props.onClickOperando} onClickTotal={this.props.onClickOperador}/>
        <Operations onClick={this.props.onClickOperador}/>
      </div>
    );
  }
});

var Numbers = React.createClass({
  getInitialState: function(){
    return {
      buttons: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.']
    }
  },
  render: function(){
    var buttonElements = [];
    for(var i = 0; i < this.state.buttons.length; i++){
      buttonElements.push(
        <Button label={this.state.buttons[i]} onClick={this.props.onClick}/>
      );
    }
    return (
      <div id="numbers">
        {buttonElements}
        <Button label="=" onClick={this.props.onClickTotal} className="greenBtn"/>
      </div>
    );
  }
});

var Operations = React.createClass({
  getInitialState: function(){
    return {
      buttons: ['+', '-', '/', 'x']
    }
  },
  render: function(){
    var buttonElements = [];
    for(var i = 0; i < this.state.buttons.length; i++){
      buttonElements.push(
        <Button label={this.state.buttons[i]} onClick={this.props.onClick}/>
      );
    }
    return (
      <div id="operations">
        {buttonElements}
      </div>
    );
  }
});

var Button = React.createClass({
  render: function(){
    var classes = ['defaultButton'];
    classes.push(this.props.className);
    return (
      <button type="button" className={classes.join(' ')} onClick={(e) => this.props.onClick(e, this.props.label)}>
        {this.props.label}
      </button>
    );
  }
});

var Container = React.createClass({
  getInitialState: function(){
    return {
      operando: '',
      operador: '',
      display: '0',
      resultDisplayed: false
    }
  },
  onClickOperando: function(e, label){
    if(this.state.display == '0' || isNaN(this.state.display) || this.state.resultDisplayed){
      var display = label;
      this.setState({ resultDisplayed: false, });
    } else {
      var display = this.state.display + label;
    }
    
    this.setState({ display: display });
  },
  onClickOperador: function(e, label){
    if(this.state.operador.length > 0){
      this.calculate();
      if(label == '='){
        this.setState({
          resultDisplayed: true,
          operador: ''
        });
      } else {
        this.setState({
          resultDisplayed: true,
          operador: label
        });
      }
    } else {
      this.setState({
        operando: this.state.display,
        operador: label,
        display: label
      });
    }
  },
  onClickClean: function(){
    this.setState(this.getInitialState);
  },
  calculate: function(){var displayResult;
      switch(this.state.operador){
        case '+':
          displayResult = parseFloat(this.state.operando) + parseFloat(this.state.display);
          break;
        case '-':
          displayResult = parseFloat(this.state.operando) - parseFloat(this.state.display);
          break;
        case '/':
          displayResult = parseFloat(this.state.operando) / parseFloat(this.state.display);
          break;
        case 'x':
          displayResult = parseFloat(this.state.operando) * parseFloat(this.state.display);
          break;
      }
      this.setState({
        operando: displayResult,
        display: displayResult
      });
  },
  render: function() {
    return (
      <div id="container">
        <Screen displayText={this.state.display} onClickClean={this.onClickClean}/>
        <Inputs onClickOperando={this.onClickOperando} onClickOperador={this.onClickOperador}/>
      </div>
    );
  }
});

React.render(<Container/>, document.getElementById('calculadora'));
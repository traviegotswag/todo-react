class App extends React.Component {
  constructor(){
    super()
    this.changeHandler = this.changeHandler.bind( this );
    this.submitHandler = this.submitHandler.bind( this );
  }

  state = {
    task : "",
    list : []
  }

  changeHandler(event){
    this.setState({task:event.target.value});
    console.log("logging", event.target.value);
  }

  submitHandler(event){
    event.preventDefault();
    this.setState({list: [...this.state.list, this.state.task]});
  }

  render() {
      // render the list with a map() here

      // console.log("rendering");
      return (
        <div className="list">
          <form className="App" onSubmit={this.submitHandler}>
            <input onChange={this.changeHandler} value={this.state.task}/>
            <button>Add Item</button>
          </form>
          <List list={this.state.list}/>
        </div>
      );
  }
}

class List extends React.Component {

  render() {
    
    const ToDoList = this.props.list.map(task => (
        <li key={task.id}>{task}</li>
    ));

    return (
        <ul>{ToDoList}</ul>
    )
  }
  // state = {
  //   task : "",
  //   list : []
  // }

}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);


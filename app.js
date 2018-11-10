class App extends React.Component {
  constructor(){
    super()
    this.changeHandler = this.changeHandler.bind( this );
    this.submitHandler = this.submitHandler.bind( this );
    this.deleteHandler = this.deleteHandler.bind( this );
    this.updateHandler = this.updateHandler.bind( this );
    this.submitUpdateHandler = this.submitUpdateHandler.bind( this );
    this.doneHandler = this.doneHandler.bind( this );
  }

  state = {
    // count: 0,
    task : '',
    list : [],
    donelist: [],
    // states that relate to max word limit and warning messages
    warning: '',
    maxwords: 5,
    warningmessage: '',
    // data from child

  }
// Method of class means its a function
// Property means it could be anything
  changeHandler(event){
    if (event.target.value.length < this.state.maxwords) {
      this.setState({warning: ''});
      this.setState({warningmessage: ''});
      this.setState({task:event.target.value});
      console.log("logging", event.target.value);
    } else {
      this.setState({warning: 'warning'});
      this.setState({warningmessage: 'Bro, you hit the maximum word limit.'});
    }
  }

  submitHandler(event){
    event.preventDefault();
    this.setState({list: [...this.state.list, this.state.task]});
  }


  updateHandler(event) {
    this.setState({task:event.target.value});
    console.log("logging", event.target.value);
  }

 submitUpdateHandler(itemToBeUpdated) {
    // console.log(itemToBeUpdated)
    this.setState({list: [...this.state.list, this.state.task]});
    // Why doesn't this method work?
    var updatedList = this.state.list.filter((task) => {
      return task != itemToBeUpdated
    })
    this.setState({list: updatedList})
  }

  deleteHandler(itemToBeDeleted){
    //to check if the task we want to delete is passed in correctly
    console.log(itemToBeDeleted);
    // list out all the items within list, then returns all the items except the one that is passed in here (itemToBeDeleted)
    var newList = this.state.list.filter((task) => {
      return task != itemToBeDeleted
    })
    this.setState({list: newList})
  }

  doneHandler(itemToBeMarkedDone){
    // list out all the items within list, then returns all the items except the one that is passed in here (itemToBeDeleted)
    var newList = this.state.list.filter((task) => {
      return task != itemToBeMarkedDone
    })
    this.setState({list: newList})
    this.setState({donelist: [...this.state.donelist, itemToBeMarkedDone]})
  }

  // handleAdd = () => {
  //   this.setState(prevState => ({ count: prevState.count + 1 }));
  // }

  // handleSubtract = () => {
  //   this.setState(prevState => ({ count: prevState.count === 0 ? 0 : prevState.count - 1 }));
  // }

  render() {
      // console.log("rendering"); --> What's the point of this?
      return (

        <div className="list">
          <h5>To-do list App using React</h5>
          <form className="App" onSubmit={this.submitHandler}>
            <input className={this.state.warning} onChange={this.changeHandler} value={this.state.task}/>
            <select>
              <option value="lista">List A</option>
              <option value="listb">List B</option>
            </select>
          <button>Add Item</button>
          </form>

          <List 
          list={this.state.list} 
          warningmessage={this.state.warningmessage} 
          deleteHandler={this.deleteHandler}
          updateHandler={this.updateHandler}
          submitUpdateHandler={this.submitUpdateHandler}
          doneHandler={this.doneHandler}
          donelist={this.state.donelist}
          />

          {/* <div>
            <p>Count: {this.state.count}</p>
            <button onClick={this.handleAdd}>Add</button>
            <button onClick={this.handleSubtract}>Subtract</button>
          </div> */}
        </div>
      );
  }
}

class List extends React.Component {

  render() {
    // let whichList;
    // list == 'lista' ? (whichList = "lista") : (whichList = "listb");

    // How to make this list a dynamic one?
    const toDoList = this.props.list.map((task, index) => (
      <div>
        <li key = {index}><input onChange = {this.props.updateHandler} defaultValue = {task}/></li>
          <br></br>
          <button onClick = {this.props.submitUpdateHandler.bind(null,task)}>Update task</button>
          <br></br>
          {/* this sets context for this, task is the parameter*/}
          <button onClick = {this.props.deleteHandler.bind(null,task)}>Delete task</button>
          <br></br>
          <button onClick = {this.props.doneHandler.bind(null,task)}>Mark as done</button>
      </div>
    ));

    // const toDoListB = this.props.list.map((task, index) => (
    //   <div>
    //     <li key = {index}><input onChange = {this.props.updateHandler} defaultValue = {task}/></li>
    //       <br></br>
    //       <button onClick = {this.props.submitUpdateHandler.bind(null,task)}>Update task</button>
    //       <br></br>
    //       {/* this sets context for this, task is the parameter*/}
    //       <button onClick = {this.props.deleteHandler.bind(null,task)}>Delete task</button>
    //       <br></br>
    //       <button onClick = {this.props.doneHandler.bind(null,task)}>Mark as done</button>
    //   </div>
    // ));

    const doneList = this.props.donelist.map((task, index) => (
      <div>
        <li key = {index}>{task}</li>
      </div>
    ));

    return (
      <div>
       <h4>{this.props.warningmessage}</h4>
        <h5>To do list</h5>
        <ul>{toDoList}</ul>
        <br></br>
        <hr></hr>

        <h5>Completed Items</h5>
        <ul>{doneList}</ul>
        <br></br>
        <hr></hr>
      </div>
    )
  }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);


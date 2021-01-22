import React, { Component } from 'react';

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id : '',
      name : '',
      status : true
    }
  }

  componentWillMount(){
    if(this.props.task){
      this.setState({
        id: this.props.task.id,
        name: this.props.task.name,
        status: this.props.task.status
      })
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.task){
      this.setState({
        id: nextProps.task.id,
        name: nextProps.task.name,
        status: nextProps.task.status
      });
    }
    else if(!nextProps.task){
      this.setState (
        {
          id : '',
          name : '',
          status : false
        }
      ) 
    }
  }

  componentDidMount(){
    this.searchInput.focus();
  }
  
  onCloseForm = ()=>{
    this.props.onCloseForm();
  }

  onChange = (event)=>{
    var target = event.target;
    var name = target.name;
    var value = target.value;
    if(name==='status'){
      value = target.value === 'false' ? false : true;
    }
    this.setState({
      [name] : value
    })
  }

  onSubmit = (event)=>{
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.onClear();
    this.onCloseForm();
  }

  onClear = ()=>{
    this.setState({
      name: '',
      status : true
    })
    this.searchInput.focus();
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){

        event.preventDefault();
        this.props.onSubmit(this.state);
        this.onClear();
        this.onCloseForm();
    }
  }
    render() {
      var { id } =this.state;
        return (
          <div className="addToDo">
            <div className="card" onSubmit={this.onSubmit}>
              <div className="card-header">
                <div className="tittle">{id !== '' ? 'Edit todo' : 'Add todo'}</div>
                <div className="icon" onClick={this.onCloseForm}><i className="fal fa-times" />
                </div>
              </div>
              <div className="card-body">
                <div>
                  {/* <label>Name:</label> */}
                  <input type="text" className="form-control" placeholder="What needs to be done?"  name="name" value={this.state.name} onChange={this.onChange} onKeyPress={this.handleKeyPress} ref={inputEl => (this.searchInput = inputEl)}/>
                </div>
                <div>
                {/* <label>Status:</label> */}
                <select className="form-control" id="exampleFormControlSelect1" name="status" value={this.state.status} onChange={this.onChange}>
                <option value={false}>Done</option>     
                  <option value={true}>New</option>            
                </select>
                </div>
              </div>
              <div className="card-footer text-muted">
                <button type="submit" onClick={this.onSubmit} className="btn btn-warning">Save</button>
                <button type="button" onClick={this.onClear} className="btn btn-danger">Cancel</button>
              </div>
            </div>
          </div>
        );
    }
}

export default TaskForm;

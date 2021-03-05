import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id : '',
      name : '',
      status : false
    }
    this.myRef = React.createRef();
  }

  UNSAFE_componentWillMount(){
    if(this.props.itemEditing && this.props.itemEditing.id !== null){
      this.setState({
        id: this.props.itemEditing.id,
        name: this.props.itemEditing.name,
        status: this.props.itemEditing.status
      })
    }
    else{
      this.onClear();
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.itemEditing){
      this.setState({
        id: nextProps.itemEditing.id,
        name: nextProps.itemEditing.name,
        status: nextProps.itemEditing.status
      });
    }
    else {
      this.onClear()
    }
    if(this.myRef.current) {
      this.myRef.current.focus()
    }
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

  onSave = (event)=>{
    this.props.onSaveTask(this.state);
    this.onClear();
    this.onCloseForm();
  }

  onClear = ()=>{
    this.setState({
      name : '',
      status : true
    })
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
        // event.preventDefault();
        this.onSave();
        this.onClear();
        this.onCloseForm();
    }
  }

    render() {
      var { id } =this.state;
      if(!this.props.isDisplayForm) return '';
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
                  <input autoFocus ref={this.myRef} type="text" className="form-control" placeholder="What needs to be done?"  name="name" value={this.state.name} onChange={this.onChange} onKeyPress={this.handleKeyPress}/>
                </div>
                <div>
                {/* <label>Status:</label> */}
                <select className="form-control" id="exampleFormControlSelect1" name="status" value={this.state.status} onChange={this.onChange}>
                <option value={false}>Completed</option>     
                  <option value={true}>New</option>            
                </select>
                </div>
              </div>
              <div className="card-footer text-muted">
                <button type="submit" onClick={this.onSave} className="btn btn-warning">Save</button>
                <button type="button" onClick={this.onClear} className="btn btn-danger">Cancel</button>
              </div>
            </div>
          </div>
        );
    }
}

const mapStateToProps = state =>{
  return {
    isDisplayForm : state.isDisplayForm,
    itemEditing : state.itemEditing
  }
};

const mapDispatchToProps = (dispatch, props) =>{
  return{
    onSaveTask : (task) =>{
      dispatch(actions.saveTask(task));
    },
    onCloseForm : ()=>{
      dispatch(actions.closeForm())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps ) (TaskForm);

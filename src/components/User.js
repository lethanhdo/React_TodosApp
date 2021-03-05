import React, { Component } from 'react';
import './../App.css';
import Control from './Control';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { connect } from 'react-redux';
import * as actions from './../actions/index';



class User extends Component {
  
  onGenerateData = () =>{
    var tasks = [
      {
        id:this.generateID(),
        name: 'study',
        status: true
      },
      {
        id:this.generateID(),
        name: 'swim',
        status: true
      },
      {
        id:this.generateID(),
        name: 'play',
        status: true
      },
    ]
    this.setState({
      tasks : tasks
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
  }

  onToggleForm =()=>{
    var {itemEditing} = this.props;
    if(itemEditing && itemEditing.id !== ''){
      this.props.onOpenForm();
    }
    else{
      this.props.onToggleForm();
    }
    this.props.onClearTask({
      id : '',
      name : '',
      status : true
    })
   
  }



  // onShowForm = ()=>{
  //   this.setState({
  //     isDisplayForm : true
  //   })
  // }

  // onSubmit = (data) => {
  //   var {tasks} = this.state;
  //   if(data.id===''){
  //     data.id = this.generateID();
  //     tasks.push(data);
  //   }else{
  //     var index = this.findIndex(data.id);
  //     tasks[index] =data;
  //   }
    
    
  //   this.setState({
  //     tasks : tasks,
  //     taskEditing : null
  //   });
  //   localStorage.setItem('tasks',JSON.stringify(tasks))
  // }


  onUpdate = (id)=>{
    var {tasks} = this.state;
    var index = this.findIndex(id);
    this.setState({
      taskEditing : tasks[index]
    });
    this.onShowForm();
  }

  handleLogout = ()=>{
    this.props.handleLogout();
  }

  render(){


    var {isDisplayForm} = this.props;

    
    

    
    // if(keyword){
    //   tasks = tasks.filter((task)=>{
    //    return task.name.toLowerCase().indexOf(keyword) !== -1
    //   })
    // }

    // if(sortBy === 'name'){
    //   tasks.sort((a,b)=>{
    //     if(a.name>b.name) return sortValue;
    //     else if(a.name<b.name) return -sortValue;
    //     else return 0;
    //   })
    // }


    return (
      <div className="App">
        
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#/">Todos</a>

          <button className="btn-logout" onClick={this.handleLogout}>Log out</button>
        </nav>


        <div className="container">
       
          <div className="row">
            <div className="col-md-12 header">
              <hr />
              <button type="button" className="btn-add" onClick={this.onToggleForm}><i className="fas fa-plus" /> Add</button>
            </div>
            <div className="col-md-12">
              <div className="row row-reverse">
                <div className={isDisplayForm ? 'col-md-8' : 'col-md-8'}>
                  <Control/>
                  <TaskList 
                            onUpdate={this.onUpdate}
                            countCom={this.count}
                  />
                </div>     
                <div className={isDisplayForm ? 'col-md-4' : ''}>
                <TaskForm />
              </div>     
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}

const mapStateToProps = state => {
  return {
    isDisplayForm : state.isDisplayForm,
    itemEditing : state.itemEditing
  }
}

const mapDispatchToProps = (dispatch, props) =>{
  return {
    onToggleForm : ()=>{
      dispatch(actions.toggleForm())
    },
    onClearTask : (task) =>{
      dispatch(actions.editTask(task));
    },
    onOpenForm : () =>{
      dispatch(actions.openForm());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);

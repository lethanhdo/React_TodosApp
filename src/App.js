import React, { Component } from 'react';
import './App.css';
import Control from './components/Control';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Search from './components/Search';
// import {filter} from 'lodash';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks : [],
      isDisplayForm : false,
      taskEditing : null,
      countCom :0,
      filter:{
        name : '',
        status:-1
      },
      keyword:'',
      sortBy : 'name',
      sortValue : 1
    }
  }
  componentWillMount(){
    if(localStorage && localStorage.getItem('tasks')){
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks : tasks
      });

      var count =0;
    // console.log(tasks)
    tasks.forEach((item)=>{
      if(item.status===true){
        count++;
      }
    });
    // console.log('count:'+count)
    }
  }

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
  
  

  s4(){
    return Math.floor((1+Math.random()) * 0x1000).toString(16).substring(1);
  }

  generateID(){
    return this.s4() + this.s4() +'-' +this.s4() +this.s4() +'-'+ this.s4()+this.s4()+'-'+ this.s4()+this.s4();
  }

  onToggleForm =()=>{
    if(this.state.isDisplayForm && this.state.taskEditing !== null){
      this.setState({
        isDisplayForm : true,
        taskEditing : null
      })
    }
    else{
      this.setState({
        isDisplayForm : !this.state.isDisplayForm,
        taskEditing : null
      })
    }
  }

  onCloseForm = ()=>{
    this.setState({
      isDisplayForm : false
    })
  }

  onShowForm = ()=>{
    this.setState({
      isDisplayForm : true
    })
  }

  onSubmit = (data) => {
    var {tasks} = this.state;
    if(data.id===''){
      data.id = this.generateID();
      tasks.push(data);
    }else{
      var index = this.findIndex(data.id);
      tasks[index] =data;
    }
    
    
    this.setState({
      tasks : tasks,
      taskEditing : null
    });
    localStorage.setItem('tasks',JSON.stringify(tasks))
  }

  onUpdateStatus = (id)=>{
    var {tasks} = this.state;
    var index = this.findIndex(id);
    if(index!==-1){
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks : tasks
      })
    localStorage.setItem('tasks',JSON.stringify(tasks))
    }
  }

  findIndex =(id)=>{
    var {tasks} = this.state;
    var result=-1;
    tasks.forEach((task, index)=>{
      if(task.id === id){
        result = index;
      }
    })
    return result;
  }

  onDelete = (id)=>{
    var {tasks} = this.state;
    var index = this.findIndex(id);
    if(index!==-1){
      tasks.splice(index,1);
      this.setState({
        tasks : tasks
      })
    localStorage.setItem('tasks',JSON.stringify(tasks))
    }
    this.onCloseForm();
  }

  onUpdate = (id)=>{
    var {tasks} = this.state;
    var index = this.findIndex(id);
    // var taskEditing = tasks[index];
    this.setState({
      taskEditing : tasks[index]
    });
    this.onShowForm();
  }



  onFilter = (filterName,filterStatus)=>{
    filterStatus = parseInt(filterStatus,10)
    this.setState({
      filter:{
        name : filterName.toLowerCase(),
        status : filterStatus
      }
    })
  }

  onSearch = (keyword)=>{
    this.setState({
      keyword : keyword
    })
  }

  onSort = (sortBy,sortValue)=>{
    this.setState({
      sortBy : sortBy,
      sortValue : sortValue
    })
    console.log(this.state)
  }

  render(){

    var { tasks, isDisplayForm, taskEditing,filter,keyword,sortBy,sortValue } = this.state; 


    var count =0;
    // console.log(tasks)
    tasks.forEach((item)=>{
      if(item.status===true){
        count++;
      }
    });
    

    if(filter){
      if(filter.name){
        tasks = tasks.filter((task)=>{
          return task.name.toLowerCase().indexOf(filter.name) !== -1
        })
      }

      tasks = tasks.filter((task)=>{
        if(filter.status===-1){
          return task
        }
        else{
          return task.status === (filter.status ===0 ? true : false)
        }
      })
    }

    if(keyword){
      tasks = tasks.filter((task)=>{
       return task.name.toLowerCase().indexOf(keyword) !== -1
      })
    }

    if(sortBy === 'name'){
      tasks.sort((a,b)=>{
        if(a.name>b.name) return sortValue;
        else if(a.name<b.name) return -sortValue;
        else return 0;
      })
    }


    var elmTaskForm = isDisplayForm ? 
      <TaskForm onSubmit={this.onSubmit} 
        onCloseForm={this.onCloseForm}
        task={taskEditing}
        /> : '';

    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-md-12 header">
              <h2>To do list</h2> 
              <p className="p-count">{ count===1 ? count+' icon left' : count+ ' icons left'}</p>
              <hr />
              <button type="button" className="btn btn-info btn-add" onClick={this.onToggleForm}><i className="fas fa-plus" /> Add</button>
            </div>
            <div className="col-md-12">
              <div className="row">
             
                <div className={isDisplayForm ? 'col-md-8' : 'col-md-8'}>
                  <Control onSearch={this.onSearch}
                          onSort={this.onSort}
                          sortBy={sortBy}
                          sortValue={sortValue}
                  />
                  <TaskList tasks = {tasks} 
                            onUpdateStatus={this.onUpdateStatus}
                            onDelete={this.onDelete}
                            onUpdate={this.onUpdate}
                            onFilter={this.onFilter}
                            countCom={this.count}
                  />
                </div>     
                <div className={isDisplayForm ? 'col-md-4' : ''}>
                {elmTaskForm}
              </div>     
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}

export default App;

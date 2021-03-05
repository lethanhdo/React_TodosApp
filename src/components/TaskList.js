import React, { Component } from 'react';
import TaskItem from './TaskItem';
import Sort from './Sort';
import * as actions from './../actions/index';
import { connect } from 'react-redux';

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName : '',
            filterStatus : -1 //active:0  completed:1
        }
    }

    onChange = (event)=>{

        var target = event.target
        var name = target.name
        var value = target.value

        var filter = {
            name : name === 'filterName' ? value : this.state.filterName,
            status : name === 'filterStatus' ? value : this.state.filterStatus
        }
        setTimeout(
         function() {
            this.props.onFilterTable(filter);
            this.setState({
                [name]:value
            })
        }
            .bind(this),
            1000
        );
        
        
    }
    render() {
        var {tasks, filterTable, sort}  = this.props;
        // console.log(sort)

        //filter on table
        if(filterTable){
            if(filterTable.name){
                tasks = tasks.filter((task)=>{
                return task.name.toLowerCase().indexOf(filterTable.name.toLowerCase()) !== -1
                })
            }
            tasks =tasks.filter((task) =>{
                if(filterTable.status === -1){
                    return task;
                }
                else{
                    return task.status === (filterTable.status === 1 ? true : false)
                }
                
            })
        }

        //sort    
        if(sort.by === 'name'){
            tasks.sort((a,b)=>{
                if(a.name>b.name) return sort.value;
                else if(a.name<b.name) return -sort.value;
                else return 0;
            })
        }
        else{
            tasks.sort((a,b)=>{
                if(a.status>b.status) return -sort.value;
                else if(a.status<b.status) return sort.value;
                else return 0;
            })
        }
        

        if(tasks){
            var elmTasks = tasks.map((task,index)=>{
                return (<TaskItem key={task.id} index={index} task={task} 
                                    onUpdate={this.props.onUpdate}
                        />)
            });
        }
        


        return (
            <div className="table-container">
                <div>
                    <div><span>{this.props.countCom}</span></div>
                    <div className="Control">
                        <input 
                            placeholder="Search by name"
                            type="text"
                            className="Control-search-by-name form-control"
                            name="filterName"
                            value={this.filterName}
                            onChange={this.onChange}
                        />
                        
                        
                        <div className="Control-filter-by-status">
                            <select 
                                name='filterStatus'  
                                value={this.filterStatus} 
                                onChange={this.onChange}>
                                <option value={-1} >All</option>
                                <option value={0}>Completed</option>
                                <option  value={1}>New</option>
                            </select>
                        </div>


                        <div className="Control-sort-by-name">
                            <Sort/>
                        </div>
                        
                    </div>
                    
                </div>
                           
                        
                <table className="table">
                    <tbody>{elmTasks}</tbody>      
                </table>
                </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        tasks :state.tasks,
        filterTable : state.filterTable,
        sort : state.sort
    }
}

const mapDispatchToProps = (dispatch, props) =>{
    return {
      onFilterTable : (filter) =>{
          dispatch(actions.filterTask(filter));
      }
    }
  }

export default connect(mapStateToProps,mapDispatchToProps) (TaskList);

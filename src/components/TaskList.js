import React, { Component } from 'react';
import TaskItem from './TaskItem';
import Sort from './Sort';

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

        this.props.onFilter(   
            name === 'filterName' ? value : this.state.filterName,
            name === 'filterStatus' ? value : this.state.filterStatus

        )
        this.setState({
            [name]:value
        })
    }
    render() {
        var tasks  = this.props.tasks;
        if(tasks){
            var elmTasks = tasks.map((task,index)=>{
                return (<TaskItem key={task.id} index={index} task={task} 
                                    onUpdateStatus={this.props.onUpdateStatus}
                                    onDelete={this.props.onDelete}
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
                                <option value={0}>New</option>
                                <option  value={1}>Done</option>
                            </select>
                        </div>


                        <div className="Control-sort-by-name">
                            <Sort onSort={this.props.onSort}
                            sortBy={this.props.sortBy}    
                            sortValue={this.props.sortValue}    
                            />
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

export default TaskList;

import React, { Component } from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterStatus : -1 //active:0  completed:1
        }
    }

    onChange = (event)=>{
        var target = event.target
        var name = target.name
        var value = target.value

        this.props.onFilter(   
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
                    <select name='filterStatus'  value={this.filterStatus} onChange={this.onChange}>
                        <option value={-1} >All</option>
                        <option value={0}>Active</option>
                        <option  value={1}>Completed</option>
                    </select>
                </div>
                           
                        
                <table className="table">
                    <tbody> {elmTasks} </tbody>      
                </table>
                </div>
        );
    }
}

export default TaskList;

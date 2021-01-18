import React, { Component } from 'react';

class TaskItem extends Component {
    onUpdateStatus = ()=>{
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDelete = ()=>{
        this.props.onDelete(this.props.task.id);
    }

    onUpdate = ()=>{
        this.props.onUpdate(this.props.task.id);
    }

    render() {
        var {task} = this.props;
        return (
            <tr>
                {/* <th scope="row">{index+1}</th> */}
                <td className="td-check">
                    <span type="text" className={task.status ===true ? 'badge badge-success' : 'badge badge-danger'}
                    onClick = {this.onUpdateStatus}
                    >{task.status === true ? <i className="fad fa-check-circle  icon-check-none"></i>: <i className="fal fa-check-circle icon-check-green"></i> }</span>
                </td>

                <td className={task.status===true ? 'name-new' : 'name-done'} onClick = {this.onUpdateStatus}>{task.name}</td>
               
                <td  className="td-button">
                    <button type="button" id="do" className="btn btn-warningg" onClick={this.onUpdate}><i className="fas fa-edit" /></button>
                    <button type="button" className="btn btn-dangerr" onClick={this.onDelete}><i className="fas fa-trash-alt" /> </button>
                </td>
            </tr>       
        );
    }
}

export default TaskItem;

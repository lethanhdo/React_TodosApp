import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';


class TaskItem extends Component {
    onUpdateStatus = ()=>{
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDelete = ()=>{
        this.props.onDeleteTask(this.props.task.id);
        this.props.onCloseForm();
    }

    onEditTask = ()=>{
      this.props.onOpenForm();
      this.props.onEditTask(this.props.task);
    }

    render() {
        var {task} = this.props;
        return (
            <tr>
                <td className="td-check">
                    <span type="text" className={task.status ===true ? 'badge badge-success' : 'badge badge-danger'}
                    onClick = {this.onUpdateStatus}
                    >{task.status === true ? <i className="far fa-check  icon-check-none"></i>: <i className="far fa-check icon-check-green"></i> }</span>
                </td>
                <td className={task.status===true ? 'name-new' : 'name-done'} onClick = {this.onEditTask}>{task.name}</td>
                <td  className="td-button">
                    <button type="button" id="do" className="btn btn-warningg" onClick={this.onEditTask}><i className="fas fa-edit" /></button>
                    <button type="button" className="btn btn-dangerr" onClick={this.onDelete}><i className="fas fa-trash-alt" /> </button>
                </td>
            </tr>       
        );
    }
}

const mapStateToProps = state => {
    return {  
    }
  }
  
const mapDispatchToProps = (dispatch, props) =>{
  return {
    onUpdateStatus : (id)=>{
      dispatch(actions.updateStatus(id))
    },
    onDeleteTask : (id)=>{
      dispatch(actions.deleteTask(id))
    },
    onCloseForm : ()=>{
      dispatch(actions.closeForm())
    },
    onOpenForm : ()=>{
      dispatch(actions.openForm())
    },
    onEditTask : (task)=>{
      dispatch(actions.editTask(task))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps) (TaskItem);

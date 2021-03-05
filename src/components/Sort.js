import React, { Component } from 'react';
import * as actions from './../actions/index';
import { connect } from 'react-redux';

class Sort extends Component {

    

    onClick = (sortBy, sortValue)=>{
        this.props.onSort({
            by : sortBy,
            value : sortValue
        });
    }

    render() {
        return (
            <div className="d-flex">
                
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Sort
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <ul className="">
                            <li onClick = { ()=> this.onClick('name' , 1) }>
                                <a href="#/" role="button" className={(this.props.sort.by==='name'&&this.props.sort.value===1)?'sort-selected':''}><span>A<i className="fal fa-long-arrow-right"></i>Z</span></a>
                            </li>
                            <li onClick = { ()=> this.onClick('name' , -1) }>
                                <a href="#/" role="button"className={(this.props.sort.by==='name'&&this.props.sort.value===-1)?'sort-selected':''}><span>Z<i className="fal fa-long-arrow-right"></i>A</span></a>
                            </li>
                            <li onClick = { ()=> this.onClick('status' , 1) }>
                                <a href="#/" role="button" className={(this.props.sort.by==='status'&&this.props.sort.value===1)?'sort-selected':''}><span>N<i className="fal fa-long-arrow-right"></i>C</span></a>
                            </li>
                            <li onClick = { ()=> this.onClick('status' , -1) }>
                                <a href="#/" role="button"className={(this.props.sort.by==='status'&&this.props.sort.value===-1)?'sort-selected':''}><span>C<i className="fal fa-long-arrow-right"></i>N</span></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        sort : state.sort
    }
}

const mapDispatchToProps = (dispatch, props) =>{
    return {
      onSort : (sort) =>{
          dispatch(actions.sortTask(sort));
      }
    }
  }

export default connect(mapStateToProps,mapDispatchToProps) (Sort);
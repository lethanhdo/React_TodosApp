import React, { Component } from 'react';

class Sort extends Component {

    

    onClick = (sortBy, sortValue)=>{
        this.props.onSort(sortBy,sortValue);
        console.log(sortBy,sortValue)
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
                                <a href="#/" role="button" className={(this.props.sortBy==='name'&&this.props.sortValue===1)?'sort-selected':''}><span>A<i className="fal fa-long-arrow-right"></i>Z</span></a>
                            </li>
                            <li onClick = { ()=> this.onClick('name' , -1) }>
                                <a href="#/" role="button"className={(this.props.sortBy==='name'&&this.props.sortValue===-1)?'sort-selected':''}><span>Z<i className="fal fa-long-arrow-right"></i>A</span></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sort;

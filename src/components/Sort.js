import React, { Component } from 'react';

class Sort extends Component {

    

    onClick = (sortBy, sortValue)=>{
        this.props.onSort(sortBy,sortValue);
    }

    render() {
        
        return (
            <div>
                <ul className="">
                    <li onClick = { ()=> this.onClick('name' , 1) }>
                        <a role="button" className={(this.props.sortBy==='name'&&this.props.sortValue===1)?'sort-selected':''}><span>A-Z</span></a>
                    </li>
                    <li onClick = { ()=> this.onClick('name' , -1) }>
                        <a role="button"className={(this.props.sortBy==='name'&&this.props.sortValue===-1)?'sort-selected':''}><span>Z-A</span></a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Sort;

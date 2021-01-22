import React, { Component } from 'react';
import Search from './Search'

class Control extends Component {
    render() {
        return (
            <div className="col-md-8">
                <Search onSearch={this.props.onSearch}/>
            </div>
        );
    }
}

export default Control;

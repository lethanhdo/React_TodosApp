import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword : ''
        }
    }

    onChange = (event)=>{
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]:value
        })
    }

    onSearch = ()=>{
        this.props.onSearch(this.state.keyword)
    }
    
    render() {
        var { keyword } = this.state;

        return (
            <div className="Search">
                <form className="form-inline my-2 my-lg-0">
                    <input name="keyword" value={keyword} onChange={this.onChange} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button onClick={this.onSearch} className="btn btn-outline-success my-2 my-sm-0" type="button">Search</button>
                </form>
            </div>
        );
    }
}

export default Search;

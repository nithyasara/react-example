import React from 'react';
import './App.css';
import axios from 'axios';
import DisplayChild from './DisplayChild';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resultData: {},
            searchData: '',
            items: [],
            itemsSort: [],
            selectDropdownValue: 'Select',
            setGender: '',
            setSpecies : '',
        }
    }
    componentDidMount() {
        axios.get('https://rickandmortyapi.com/api/character/')
            .then(result => {
                this.setState({
                    resultData: result.data.results,
                    items: result.data.results,
                    itemsSort: result.data.results,
                });
            })
    }

    handleChange = event => {
        this.setState({
            searchData: event.target.value,
        });
        var updatedList = this.state.resultData;
        updatedList = updatedList.filter((item) => {
            if (item.name.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1) {
                return item;
            }
        });
        if (event.target.value === '') {
            this.setState({
                items: this.state.resultData,
                itemsSort: this.state.resultData,
                selectDropdownValue: 'Choose here',
                setGender: false,
                setSpecies: false,
            });
            let items1 = document.getElementsByName('gender');
            for (var i = 0; i < items1.length; i++) {
                if (items1[i].type == 'radio')
                    items1[i].checked = false;
            }
            let items2 = document.getElementsByName('species');
            for (var i = 0; i < items2.length; i++) {
                if (items2[i].type == 'radio')
                    items2[i].checked = false;
            }
        } else {
            this.setState({ items: updatedList, itemsSort: updatedList });
        }
    }

    handleDropdownChange = event => {
        this.setState({ selectDropdownValue: event.target.value });
        if (event.target.value === 'Ascending') {
                this.setState({items : this.state.items.sort((a, b) => (a.id - b.id))
                });
        } else if (event.target.value === 'Descending') {
            this.setState({items : this.state.items.sort((a, b) => (b.id - a.id))
            });
        }
        this.setState({
            itemsSort: this.state.items,
        })
        let items1 = document.getElementsByName('gender');
        for (var i = 0; i < items1.length; i++) {
            if (items1[i].type == 'radio')
                items1[i].checked = false;
        }
        let items2 = document.getElementsByName('species');
        for (var i = 0; i < items2.length; i++) {
            if (items2[i].type == 'radio')
                items2[i].checked = false;
        }
        this.setState({
            setSpecies: '',
            setGender: '',
        })
    }

    setGender = event => {
        this.setState({
            setGender: event.target.value
        });
        if (this.state.itemsSort.length !== this.state.items.length) {
            this.setState({ itemsSort: this.state.itemsSort.filter((value) => value.gender === event.target.value) });
        }
        else {
            this.setState({ itemsSort: this.state.items.filter((value) => value.gender === event.target.value) });
        }
    }

    setSpecies = event => {
        this.setState({
            setSpecies: event.target.value
        });
        if (this.state.itemsSort.length !== this.state.items.length) {
            this.setState({ itemsSort: this.state.itemsSort.filter((value) => value.species === event.target.value) });
        } else {
            this.setState({ itemsSort: this.state.items.filter((value) => value.species === event.target.value) });
        }
    }

    resetFilter = () => {
        this.setState({
            items: this.state.resultData,
            itemsSort: this.state.resultData,
            selectDropdownValue: 'Choose here',
            setGender: false,
            setSpecies: false,
            searchData: '',
        });
        let items1 = document.getElementsByName('gender');
        for (var i = 0; i < items1.length; i++) {
            if (items1[i].type == 'radio')
                items1[i].checked = false;
        }
        let items2 = document.getElementsByName('species');
        for (var i = 0; i < items2.length; i++) {
            if (items2[i].type == 'radio')
                items2[i].checked = false;
        }
    }

    render() {
        console.log("... ",this.state.itemsSort);
        return (
            <div>
                <div className="App">
                        <input className="search_input_style" placeholder="Search" type="textbox" value={this.state.searchData} onChange={this.handleChange} />
                    <div>
                        <select
                         className="dropdown_style"
                        value={this.state.selectDropdownValue}
                        onChange={this.handleDropdownChange}
                        disabled={this.state.searchData === ''}
                        >
                            <option value="" selected>Sort by Id</option>
                            <option value="Ascending">Ascending</option>
                            <option value="Descending">Descending</option>
                        </select>
                    </div>
                    <div className="main_checkbox_style">
                        <div className="checkerbox">
                            <div className="label_style"> GENDER
                                <div className="checkbox_style1" onChange={this.setGender}>
                                    <input type="radio" value="Male" name="gender" disabled={this.state.setGender === "Female"} /> Male
                                    <input type="radio" value="Female" name="gender" disabled={this.state.setGender === "Male"} /> Female
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main_checkbox_style">
                        <p className="label_style">SPECIES
                            <div className="checkbox_style2" onChange={this.setSpecies}>
                                <input type="radio" name="species" value="Human" disabled={this.state.setSpecies === "Alien" || this.state.setSpecies === "Others"}/> Human
                                <input type="radio" name="species" value="Alien" disabled={this.state.setSpecies === "Human" || this.state.setSpecies === "Others"} /> Alien
                                <input type="radio" name="species" value="Others" disabled={this.state.setSpecies === "Alien" || this.state.setSpecies === "Human"} /> Others
                            </div>
                        </p>
                    </div>
                    <button className="button_style" onClick={this.resetFilter}>RESET FILTERS</button>
                </div>
                {this.state.items.length > 0 && <DisplayChild items={this.state.itemsSort} />}
                {this.state.items.length === 0 || this.state.itemsSort.length === 0 && <div className="negative_style">No matching results found!</div>}
            </div>
        );
    }
}

export default App;

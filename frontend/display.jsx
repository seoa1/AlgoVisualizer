import React from 'react';
import Header from './header';
import SortingDisplay from './sorting_algos/sorting_display';

export default class Display extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <SortingDisplay/>
            </div>
        )
    }
}
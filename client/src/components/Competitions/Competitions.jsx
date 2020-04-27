import React, { Component } from 'react'
import List from "../List/List";
import Competition from './Competition/Competition';

export default class Competitions extends Component {
    render() {
        return (
            <React.Fragment>
                <List endpoint={'http://localhost:8080/competition/'} Item={Competition}></List>
            </React.Fragment>
        )
    }
}

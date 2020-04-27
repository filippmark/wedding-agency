import React, { Component } from 'react'
import AdminPlace from './AdminPlace/AdminPlace';
import AdminList from '../AdminList/AdminList';

export default class AdminPlaces extends Component {
    render() {
        return (
            <React.Fragment>
                <AdminList endpoint={'http://localhost:8080/place/'} Item={AdminPlace}></AdminList>
            </React.Fragment>
        )
    }
}

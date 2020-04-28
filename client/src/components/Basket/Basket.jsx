import React, { Component } from 'react';
import axios from 'axios';

export default class Basket extends Component {


    state = {

    }

    getBasketInfo =  async () =>{
        try {
            
            let response = await axios('http://localhost:8080/basket',{
                withCredentials: true
            });

            console.log(response.data);

        } catch (error) {
            console.log(error);
        }
    }


    componentDidMount(){
        this.getBasketInfo();
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

import React from 'react';

import Header from './Header';
import LeftMenu from './LeftMenu';

export default class NewApp extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <Header />
                <LeftMenu />
            </div>
        );
    }
}
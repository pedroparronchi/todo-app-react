import React from 'react';
import If from './if';

export default props => {
    
    return (
        <If teste={!props.hide} >
            <button type='button' className={'btn btn-' + props.style}
                onClick={props.onClick}>
                <i className={'fa fa-' + props.icon}></i>
            </button>
        </If>
    )
}
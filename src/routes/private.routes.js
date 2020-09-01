
import React from 'react';
import Template from '../templates/Template/Template';
import styles from './styles.routes.scss';
import { Route } from 'react-router-dom';
const PrivateLayout = (props) => {
    return (
        <div className={styles.container} style={{height:"100%"}} >
            <Template {...props}>
                {props.children}
            </Template>
        </div>
    )
}
const PrivateLayoutRoute = ({ component: Component, ...rest }) => {
    return (
        <Route render={matchProps => (
            <PrivateLayout
                {...matchProps}
                {...rest}>
                <Component {...matchProps}
                    {...rest} />
            </PrivateLayout>
        )} />
    )
}
export default PrivateLayoutRoute;
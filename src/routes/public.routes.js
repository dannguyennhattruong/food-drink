
import React from 'react';
import styles from './styles.routes.scss';
import { Route } from 'react-router-dom';
const PublicLayout = (props) => {
    return (
            <div className={styles.container}  style={{height:"100%"}}>
                {props.children}
            </div>
    )
}
const PublicLayoutRoute = ({ component: Component, ...rest }) => {
    return (
        <Route render={matchProps => (
            <PublicLayout
                {...matchProps}
                {...rest}>
                <Component {...matchProps}
                {...rest} />
            </PublicLayout>
        )} />
    )
}
export default PublicLayoutRoute
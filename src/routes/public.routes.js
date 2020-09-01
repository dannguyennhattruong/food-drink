
import React from 'react';
import Template from '../templates/Template/Template';
const PublicLayout = (props) => {
    return (
            <div className={styles.container} >
                <Template>
                    {props.children}
                </Template>
            </div>
    )
}
const PublicLayoutRoute = ({ component: Component, ...rest }) => {
    return (
        <Route render={matchProps => (
            <PublicLayout
                {...matchProps}
                {...rest}>
                <Component
                    userId={_getUserId()}
                    autherize={autherize()} />
            </PublicLayout>
        )} />
    )
}
export default PublicLayoutRoute
import React, {ComponentType} from 'react';

function connect(store: any, WrappedComponent: ComponentType<any>) {
    return class extends React.Component {
        state = store;
        private unsubscribe: Promise<PushSubscription> | any;

        componentDidMount() {
            this.unsubscribe = store.subscribe((newValue: any) => {this.setState(newValue)});
        }

        componentWillUnmount() {
            this.unsubscribe();
        }

        render() {
            const joinedProps = {...this.props, ...this.state};
            return <WrappedComponent {...joinedProps} />;
        }
    };
}

export default connect;
import React, {ComponentType} from 'react';

function defaultMapStateToProps(state: any) {
    return state;
}

function connect(store: any, WrappedComponent: ComponentType<any>, mapStateToProps = defaultMapStateToProps) {
    return class extends React.Component {
        state = mapStateToProps(store);
        private unsubscribe: Promise<PushSubscription> | any;

        componentDidMount() {
            this.unsubscribe = store.subscribe((newValue: any) => {
                this.setState(mapStateToProps(newValue))
            });
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
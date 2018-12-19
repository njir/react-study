import * as React from 'react';
import { match } from 'react-router-dom';
import { MessageFeed, MessageForm } from '../components';

interface ChannelMatch {
    channelName: string;
}

interface ChannelProps {
    match: match<ChannelMatch>; 
    // match는 react-router의 타입 정의임
    // route url 관련
    // ```js
    // export interface match<P> {
    //     params: P;
    //     ...
    // }
    // ```
}

interface ChannelState {
    shouldReload: boolean;
}

export class Channel extends React.Component<ChannelProps, ChannelState> {
    constructor(props: ChannelProps) {
        super(props);
        this.state = {
            shouldReload: false
        };
    }

    public render() {
        const { channelName } = this.props.match.params;
        return (
            [
                <MessageFeed 
                    key='message-feed'
                    channelName={channelName}
                    shouldReload={this.state.shouldReload}
                    setShouldReload={this.setShouldReload}
                />,
                <MessageForm 
                    key='message-form'
                    channelName={channelName}
                    setShouldReload={this.setShouldReload}
                />
            ]
        );
    }

    private setShouldReload = (shouldReload: boolean) => {
        this.setState({ shouldReload });
    }
}
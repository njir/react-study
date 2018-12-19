import * as React from 'react';
import { fetchMessages, Message } from '../client';
import { Segment, Image, Comment, Header } from 'semantic-ui-react';
import Axios, { CancelTokenSource } from 'axios';

interface MessageFeedProps {
    channelName: string;
    shouldReload: boolean;
    setShouldReload: (shouldReload: boolean) => void;
}

interface MessageFeedState {
    messages: Message[];
}

export class MessageFeed extends React.Component<MessageFeedProps, MessageFeedState> {

    private cancelTokenSource: CancelTokenSource;

    constructor(props: MessageFeedProps) {
        super(props);
        this.state = {
            messages: []
        };
        this.cancelTokenSource = null;
    }

    public componentDidMount() {
        this.setMessages(this.props.channelName);
        // 여기만 해주면 채널이 바꼈을 때는 unmount 되지 않아서 다시 요청을 안함
        // props가 업데이트 되면 다시 요청하도록 componentDidUpdate() 구현
    }

    public componentDidUpdate(prevProps: MessageFeedProps) {
        const isSameChannel = prevProps.channelName === this.props.channelName;
        const shouldReload = !prevProps.shouldReload && this.props.shouldReload;
        if (!isSameChannel || shouldReload) {
            this.setMessages(this.props.channelName);
        }
    }

    public componentWillUnmount() {
        if (this.cancelTokenSource) {
            this.cancelTokenSource.cancel('This component has benn unmounted')
        }
    }

    public render() {
        return (
            <Comment.Group>
                <Header as='h3' dividing>{this.props.channelName}</Header>
                {this.state.messages.slice().reverse().map(message => 
                    <Comment key={message.id}>
                        <Comment.Avatar src={message.user.avatar || '/img/avatar.png'} />
                        <Comment.Content>
                            <Comment.Author as='a'>{message.user.name}</Comment.Author>
                            <Comment.Metadata><div>{message.date}</div></Comment.Metadata>
                            <Comment.Text>{message.body}</Comment.Text>
                        </Comment.Content>
                    </Comment>
                )}
            </Comment.Group>
        );
    }

    private setMessages = (channlName: string) => {
        this.props.setShouldReload(false);
        this.cancelTokenSource = Axios.CancelToken.source();
        fetchMessages(channlName, {}, this.cancelTokenSource.token)
            .then(response => {
                this.setState({ messages: response.data.messages });
            })
            .catch(err => {
                if (Axios.isCancel(err)) {
                    console.log(err);
                } else {
                    console.log(err);
                }
            });
    }

}
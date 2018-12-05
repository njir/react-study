import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';

// export class ChannelList extends React.Component<{}, {}> {

//     public render() {
//         const channels = ['general', 'random'];

//         return (
//             <Menu inverted vertical fixed={'left'}>
//                 <Menu.Item>
//                     Channels
//                     <Menu.Menu>
//                         {channels.map((channel) => {
//                             <Menu.Item key={channel} as={NavLink} to={{ pathnem: `/channels/${channel}` }}>
//                                 {channel}
//                             </Menu.Item>
//                         })}
//                     </Menu.Menu>
//                 </Menu.Item>
//             </Menu>
//         );
//     }
// }

// 함수형 컴포넌트
const channels = ['general', 'random'];

export const ChannelList = () => {
    return (
        <Menu inverted vertical fixed={'left'}>
            <Menu.Item>
                Channels
                <Menu.Menu>
                    {channels.map(channel => 
                        <Menu.Item 
                            key={channel}
                            name={channel}
                            as={NavLink} to={{ pathname: `/channels/${channel}` }}>
                            {channel}
                        </Menu.Item>
                    )}
                </Menu.Menu>
            </Menu.Item>
        </Menu>
    )
};
import React from 'react';
import {Table, Tag} from 'antd';
import axios from 'axios'

import {
    CheckCircleOutlined,
    SyncOutlined,
    CloseCircleOutlined,
} from '@ant-design/icons';


const STETHO_SERVER_URL = "http://10.12.7.122:5000/get-status";
const columns = [
    {
        title: 'Node Name',
        dataIndex: 'name',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        sorter: {
            compare: (a, b) => a - b
        },
        render: (status) => {
            let color;
            let icon;
            if (status === "Alive") {
                color = 'green';
                icon = <CheckCircleOutlined/>
            }else if (status === "Temp Failure") {
                color = "orange";
                icon = <SyncOutlined spin />
            } else {
                color = "red";
                icon = <CloseCircleOutlined/>
            }
            return (
                <Tag icon = {icon} color={color} key={status}>
                    { " "+status.toUpperCase()}
                </Tag>
            )
        }

    },

];

function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
}

export default class StatusTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    render() {
        return (
            <div>
                <Table columns={columns} dataSource={this.state.data} onChange={onChange}/>
            </div>
        )
    }

    componentDidMount() {
        this.timer = setInterval(() => this.getData(), 1000);
    }

    getData() {

        axios.get(STETHO_SERVER_URL).then((res) => {
            console.log(res);
            this.setState({
                data: res.data.StatusArray.map(
                    (node) => {
                        return {
                            key: node.name,
                            name: node.name[0],
                            status: this.mapStatus(parseInt(node.status, 10))
                        }

                    })
            })
        })

    }

    mapStatus(statusInt) {
        if (statusInt === -1) {
            var statusString = "Permanent Failure"
        } else if (statusInt === 0) {
            statusString = "Alive"
        } else {
            statusString = "Temp Failure"
        }

        return statusString
    }
}

// ReactDOM.render(<Table columns={columns} dataSource={data} onChange={onChange} />, mountNode);

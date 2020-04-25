import React from 'react';
import './App.css';
import ApexChart from "./ApexChart";
import StatusTable from "./StatusTable";
import {Tabs} from 'antd';
const { TabPane } = Tabs;

class App extends React.Component {

  render() {

    return (<div>
      <Tabs defaultActiveKey="1" onChange={(key)=>{console.log(key)}}>
        <TabPane tab="Consistent Hashing Ring Structure" key="1">
          <ApexChart/>
        </TabPane>
        <TabPane tab="Status of Nodes" key="2">
          <StatusTable/>
        </TabPane>
      </Tabs>,

    </div>)
  }
}
export default App;

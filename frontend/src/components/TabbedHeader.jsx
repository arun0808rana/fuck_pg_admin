// import { Tabs } from 'antd';
// import { useState } from 'react';
// import TableView from './TableView';

// const TabbedHeader = () => {
//   const [tabs, setTabs]  = useState([]);
//   return (
//     <div>
//       <Tabs
//         defaultActiveKey="1"
//         tabPosition='top'
//         style={{
//           height: 220,
//         }}
//         items={new Array(3).fill(null).map((_, i) => {
//           const id = String(i);
//           return {
//             label: `Tab-${id}`,
//             key: `Tab-${id}`,
//             disabled: i === 28,
//             children: <TableView/>,
//           };
//         })}
//       />
      
//     </div>
//   );
// };
// export default TabbedHeader;

import React, { useRef, useState } from 'react';
import { Tabs } from 'antd';
import TableView from './TableView';
const initialItems = [
  {
    label: 'Tab 1',
    children: <TableView/>,
    key: '1',
  },
  {
    label: 'Tab 2',
    children: 'Content of Tab 2',
    key: '2',
  },
  {
    label: 'Tab 3',
    children: 'Content of Tab 3',
    key: '3',
    closable: false,
  },
];
const TabbedHeader = () => {
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);
  const newTabIndex = useRef(0);
  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
  };
  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    const newPanes = [...items];
    newPanes.push({
      label: 'untitled',
      children: 'Content of new Tab',
      key: newActiveKey,
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };
  const remove = (targetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };
  const onEdit = (targetKey, action) => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };
  return (
    <Tabs
      type="editable-card"
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit}
      items={items}
    />
  );
};
export default TabbedHeader;
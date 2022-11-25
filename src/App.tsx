import React, { createContext, useState } from 'react';
import './App.css';
import Info from './components/info';
import Material from './components/material';
import Phone from './components/phone';
import RNPageTemplate from './config/RNPageTemplate';
import { initState } from './config/StoreConfig';
import { I_DispathType } from './modules/I_DispathType';
import I_Node from './modules/I_Node';
export const GLOBAL = createContext(initState)
/**
 * APP 主页面
 * @returns 
 */
function App() {

  const [clickInfo, setClickInfo] = useState(initState.store.clickInfo);

  /** 拖拽节点详情 */
  const [draggedNode, setDraggedNode] = useState(initState.store.draggedNode);

  /** 模拟器最终渲染的json */
  const [phoneRenderJson, setPhoneRenderJson] = useState(initState.store.phoneRenderJson)

  const [initBaseComponents, setInitBaseComponents] = useState(initState.store.initBaseComponents)

  function dispatch<T extends I_Node>(type: I_DispathType, value: T | T[]) {
    const map: any = {
      setDraggedNode,
      setPhoneRenderJson,
      setClickInfo,
      setInitBaseComponents
    }

    if (typeof map[type] === 'function') {
      map[type](value)
    }
  }

  function exportRNPage(data: I_Node) {

  }
  // TODO:点击app页面需要区分id清空clickInfo
  return (
    <GLOBAL.Provider value={{
      store: { clickInfo, draggedNode, phoneRenderJson, initBaseComponents },
      dispatch
    }}>
      <div className="App">
        <div className='materials-area' id="ui-container">
          <Material />
        </div>
        <div className='phone-container' id="phone-container">
          <div className='App-simulator'>Iphone 6</div>
          <Phone />
        </div>
        <div className='info-area' id="info-container">
          <Info />
        </div>
        <div className='App-export' onClick={() => {

        }}>导出</div>
      </div>
    </GLOBAL.Provider>
  );
}

export default App;

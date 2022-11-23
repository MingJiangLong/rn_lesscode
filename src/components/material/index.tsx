import { useContext } from "react"
import { GLOBAL } from "../../App"
import Label from "../label"
import './index.css'
import '../../App.css'
export default function Material() {
    const { store: { initBaseComponents }, dispatch } = useContext(GLOBAL)
    return (
        <div className="material_container">
            <div className="App-title">组件区</div>
            <div className="App-subtitle">基础组件</div>
            <div>
                {

                    initBaseComponents.map((item, index) => (
                        <Label
                            key={item.id}
                            {...item}
                        />
                    ))
                }
            </div>
            <div>业务组件</div>
        </div>
    )
}
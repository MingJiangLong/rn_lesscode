import { CSSProperties, Fragment, useContext, useMemo, useRef } from "react"
import { GLOBAL } from "../../App"
import { findTarget } from "../../util";
import "../../App.css"
import StyleProp from "../styleProp";
import { Input } from 'antd';
import { isBaseComponent, isPhoneRenderComponent } from "../../util/is";
export default function Info() {
    const { store: {
        clickInfo,
        clickInfo: { props: defaultProps, id: storedclickElementId },
        initBaseComponents,
        phoneRenderJson
    }, dispatch } = useContext(GLOBAL)

    const timer = useRef<any>();

    function onTextChange(e: React.ChangeEvent<HTMLTextAreaElement>, valueKey: string) {
        const { target: { value } } = e;

        let validatedValue: any;
        try {
            validatedValue = JSON.parse(value)
        } catch (error) {
            validatedValue = value
        }

        // 更新点击组件信息
        clickInfo.props[valueKey] = validatedValue;
        dispatch("setClickInfo", { ...clickInfo })

        // 更新点击信息
        if (timer.current) {
            clearTimeout(timer.current)
            timer.current = 0
        }
        timer.current = setTimeout(() => {
            // 基础组件
            if (isBaseComponent(storedclickElementId)) {
                const find = initBaseComponents.find(item => item.id === storedclickElementId)
                if (!find) return;
                find.props[valueKey] = validatedValue;
                dispatch("setInitBaseComponents", [...initBaseComponents])
            }

            if (isPhoneRenderComponent(storedclickElementId)) {
                const find = findTarget(clickInfo.id, phoneRenderJson)
                if (!find) return;
                find.props[valueKey] = validatedValue;
                dispatch("setPhoneRenderJson", { ...phoneRenderJson })
            }
        }, 800)

    }

    function renderStyleProps(value: CSSProperties, storeId: string) {
        return (
            <StyleProp style={value} storeId={storeId} />
        )
    }

    const render = useMemo(() => {
        if (!defaultProps) return void 0;
        return Object.keys(defaultProps).map((key, index) => {
            const map = {
                style: (
                    <Fragment key={index}>
                        {
                            renderStyleProps(defaultProps.style as CSSProperties, storedclickElementId)
                        }
                    </Fragment>
                ),
            }
            if (key === 'style') {
                return (
                    <Fragment key={index}>
                        {
                            renderStyleProps(defaultProps.style as CSSProperties, storedclickElementId)
                        }
                    </Fragment>
                )
            }
            return (
                <div
                    key={index}
                    style={{ display: 'flex', flexDirection: 'row', margin: '10px' }}
                >
                    <div style={{ minWidth: "20%" }}>{key}:</div>
                    {/* @ts-ignore */}
                    <Input
                        value={defaultProps[key]}
                        onChange={(e: any) => {
                            onTextChange(e, key)
                        }}
                    />
                </div>
            )
        })
    }, [clickInfo])
    return (
        <div style={{ margin: '20px' }}>
            <div className="App-title">信息展示</div>
            <div className="App-subtitle">Props</div>
            <div>
                {render}
            </div>
        </div>
    )
}
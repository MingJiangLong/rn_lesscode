import React, { CSSProperties, PropsWithChildren } from "react";

export default function Horizontal(props: HorizontalProps) {

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            ...props.style
        }}>
            {props.children}
        </div>
    )
}

type HorizontalProps = PropsWithChildren<{
    style?: CSSProperties
}>
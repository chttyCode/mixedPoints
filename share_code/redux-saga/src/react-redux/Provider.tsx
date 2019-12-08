import React from 'react'
import RootContext from './context'
export default function Provider(props: any) {
    return <RootContext.Provider value={props.store}>{props.children}</RootContext.Provider>
}

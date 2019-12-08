import React, { useContext, useState, useEffect, useMemo } from "react";
import { bindActionCreators } from "../redux";
import RootContext from "./context";
export default function connect(mapStateToProps: any, mapDispatchToProps: any) {
  return function wrapWithConnect(WrappedComponent: any) {
    return function WrapComponent() {
      const context = useContext(RootContext);
      const [state, setstate] = useState(() =>
        mapStateToProps(context.getState())
      );
      useEffect(() => {
        let unsubscribe = context.subscribe(() =>
          setstate(() => mapStateToProps(context.getState()))
        );
        return unsubscribe;
      }, []);
      let actions = useMemo(
        () => bindActionCreators(mapDispatchToProps, context.dispatch),
        []
      );
      return <WrappedComponent {...state} {...actions} />;
    };
  };
}

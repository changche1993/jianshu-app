import Loadable from "react-loadable";
import React from "react";

const LoadableComponent = Loadable({
  loader: () => import("./"),
  loading() {
    return <div style={{"margin":"0 auto"}}>正在加载。。。</div>;
  },
});
export default ()=><LoadableComponent />


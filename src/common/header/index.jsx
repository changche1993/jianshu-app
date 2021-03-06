import React, { Component } from "react";
import headerStyle from "./style.module.scss";
import {
  SearchOutlined,
  EditFilled,
  SyncOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { actionCreators } from "./store";
import { ActionCreator as LoginActionCreator } from "../../page/login/store";
import { Link } from "react-router-dom";

// ----------------------------------
class Header extends Component {
  getItemList() {
    const {
      focused,
      list,
      page,
      mouseIn,
      totalPage,
      handleMouseEnter,
      handleMouseLeave,
      handleItemSwitch,
    } = this.props;
    const pageList = [];
    const loading = () => {
      return (
        <div className={`${headerStyle.loading}`}>
          <LoadingOutlined />
        </div>
      );
    };
    const jsList = list.toJS();
    if (jsList.length) {
      for (let i = (page - 1) * 10; i < page * 10; i++) {
        pageList.push(
          <a className={`${headerStyle.searchInfoItem}`} key={jsList[i]}>
            {jsList[i]}
          </a>
        );
      }
    }
    if (focused || mouseIn) {
      return (
        <div
          className={`${headerStyle.searchInfo}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={`${headerStyle.searchInfoTitle}`}>
            热门搜索
            <div
              className={`${headerStyle.searchInfoSwitch}`}
              onClick={() => {
                handleItemSwitch(page, totalPage, this.switchIcon);
              }}
            >
              <SyncOutlined
                ref={(icon) => {
                  this.switchIcon = icon;
                }}
                className={`${headerStyle.switchicon}`}
              />
              换一换
            </div>
          </div>
          <div className={`${headerStyle.searchInfoList}`}>
            {pageList.length ? pageList : loading()}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    const { focused, list, onFocus, onBlur } = this.props;
    return (
      <div>
        <div className={headerStyle.headWarpper}>
          <Link to="/">
            <div className={headerStyle.logo}></div>
          </Link>
          <ul className={headerStyle.Nav}>
            <li
              className={`${headerStyle.navitem} ${headerStyle.active} ${headerStyle.left} `}
            >
              首页
            </li>
            <li className={`${headerStyle.navitem} ${headerStyle.left}`}>
              下载APP
            </li>
            <li className={`${headerStyle.navitem} ${headerStyle.left}`}>
              <div className={`${headerStyle.searchWarpper}`}>
                <input
                  className={`${headerStyle.search} ${
                    focused ? headerStyle.focused : ""
                  }`}
                  placeholder="搜索"
                  onFocus={() => {
                    onFocus(list.size);
                  }}
                  onBlur={onBlur}
                />
                <i
                  className={
                    focused
                      ? `${headerStyle.focused} ${headerStyle.iconfont} `
                      : `${headerStyle.iconfont}`
                  }
                >
                  <SearchOutlined />
                </i>
                {/* serachlist */}
                {this.getItemList()}
              </div>
            </li>
            {this.props.loginStatus ? (
              <li
                className={`${headerStyle.navitem} ${headerStyle.right}`}
                onClick={this.props.logout}
              >
                退出
              </li>
            ) : (
              <Link to="/login">
                {" "}
                <li className={`${headerStyle.navitem} ${headerStyle.right}`}>
                  登录
                </li>
              </Link>
            )}

            <li className={`${headerStyle.navitem} ${headerStyle.right}`}>
              Aa
            </li>
          </ul>

          <div className={`${headerStyle.addtion}`}>
            <button className={`${headerStyle.btn_rigister}`}>注册</button>
            <Link to="/write">
              <button className={`${headerStyle.btn_write}`}>
                <EditFilled />
                写文章
              </button>{" "}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    focused: state.getIn(["header", "focused"]),
    list: state.getIn(["header", "list"]),
    page: state.getIn(["header", "page"]),
    totalPage: state.getIn(["header", "totalPage"]),
    mouseIn: state.getIn(["header", "mouseIn"]),
    loginStatus: state.getIn(["login", "loginStatus"]),
  };
};
const mapDispatchToState = (dispatch) => {
  return {
    onFocus(listsize) {
      listsize === 0 && dispatch(actionCreators.getList());
      const action = actionCreators.searchOnFocus();
      dispatch(action);
    },
    onBlur() {
      const action = actionCreators.searchOnBlur();
      dispatch(action);
    },
    handleMouseEnter() {
      const action = actionCreators.mouseEnter();
      dispatch(action);
    },
    handleMouseLeave() {
      const action = actionCreators.mouseLeave();
      dispatch(action);
    },
    handleItemSwitch(page, totalPage) {
      if (page < totalPage) {
        dispatch(actionCreators.changePage(page + 1));
      } else {
        dispatch(actionCreators.changePage(1));
      }
    },
    logout() {
      console.log("tuichu");
      dispatch(LoginActionCreator.logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToState)(Header);

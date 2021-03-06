import React, { PureComponent } from "react";
import topicStyle from "../style.module.scss";
import { connect } from "react-redux";

class Topic extends PureComponent {
  render() {
    const { topicList } = this.props;
    return (
      <div className={`${topicStyle.topicWrapper}`}>
        {topicList ? (
          topicList.map((item) => {
            return (
              <div className={`${topicStyle.topicItem} `} key={item.get('id')}>
                <img
                  src={item.get("imgUrl")}
                  className={`${topicStyle.topicItemImg}`}
                />
                {item.get("title")}
              </div>
            );
          })
        ) : (
          <div>暂时没有内容哦~</div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    topicList: state.getIn(["home", "topicList"]),
  };
};

export default connect(mapStateToProps, null)(Topic);

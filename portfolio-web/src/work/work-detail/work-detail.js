import React, { Component } from 'react';
import './work-detail.css';

import gsap from 'gsap';
import TextPlugin from "gsap/TextPlugin";

import workData from './../work-detail-data';

export default class WorkDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      path: "",
      dataObj: null,
      titleDescY: 0,
      titleDescHeight: 0,
    };

    this.tl = gsap.timeline();
    gsap.registerPlugin(TextPlugin);

    this.introNameRef = null;
    this.descriptionRef = null;

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidUpdate(prevProps) {
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
    window.addEventListener('scroll', this.updateScroll);

    if (this.props.location.state) {
      console.log(this.props.location.state);
      // TODO: animation
    }

    const index = this.props.match.params.id;

    this.setState({
      dataObj: workData[index],
      titleDescY: window.getComputedStyle(this.introNameRef).getPropertyValue('margin-top'),
    });

    setTimeout(() => {
      this.setState({
        titleDescHeight: this.descriptionRef.clientHeight
      })
    }, 1);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
    window.removeEventListener('scroll', this.updateScroll);
  }

  updateWindowDimensions() {
    this.setState({
      titleDescY: window.getComputedStyle(this.introNameRef).getPropertyValue('margin-top'),
    });
  }

  updateScroll() {

  }

  renderFixedContent() {
    const title = this.state.dataObj && this.state.dataObj.title;
    const category = this.state.dataObj && this.state.dataObj.category;

    let calcTop = parseInt(this.state.titleDescY, 10) - (this.state.titleDescHeight*0.9);

    return (
      <div className="introduction-container detail-page">
        <span
          className="title-description"
          style={{marginTop: calcTop}}
          ref={span => this.descriptionRef = span}
        >
          {category}
        </span>
         <h1
           className="name"
           ref={h1 => this.introNameRef = h1}
         >
           {title}
         </h1>
      </div>
    );
  }

  renderThumbnail() {
    const imgPath = this.state.dataObj && this.state.dataObj.thumbnail_image_path;

    // if (this.state.dataObj)
    //   console.log(this.state.dataObj.thumbnail_image_path);

    return (
      <div className="thumbnail-wrapper">
        <div className="img-wrapper">
          <img
            className="thumbnail-img"
            src={imgPath}
            alt="thumbnail"
          />
        </div>
      </div>
    );
  }

  renderContent(content) {
    return (
      <div className={"content-" + content.content_id} key={content.content_id}>
        <h2>{content.content_title}</h2>
        {this.renderDetailedContent(content)}
      </div>
    );
  }

  renderDetailedContent(content) {
    let type = content.content_data_type;

    switch (type) {
      case "text-plain":
        return (
          <div className="data-wrapper">
            <p
              className={content.content_title === "objective" ? "text-objective" : ""}
            >
              {content.content_data}
            </p>
          </div>
        );

        case "text-complex":
          let keyArray = Object.keys(content.content_data);
          let data = content.content_data;

          if (content.content_title === "overview") {
            return (
              <div className="data-wrapper">
                {
                  keyArray.map((item, index) => {
                    if (keyArray[index].startsWith("_")) {
                      return (
                        <p key={index} className="overview-p">
                          {data[keyArray[index]]}
                        </p>
                      );
                    }
                    else {
                      return (
                        <dl key={index} className="overview-dl">
                          <dt>{keyArray[index]}</dt>
                          <dd>{data[keyArray[index]]}</dd>
                        </dl>
                      );
                    }
                  })
                }
              </div>
            );
          }
          else if (content.content_title === "research") {
            return (
              <div className="data-wrapper">
                {
                  keyArray.map((item, index) => {
                    if (item.includes("details")) {
                      return (
                        <p className="research-detail" key={index}>
                          {data[keyArray[index]]}
                        </p>
                      );
                    }
                    else {
                      return (
                        <p className="research-quote" key={index}>
                          &#9657; {data[keyArray[index]]}
                        </p>
                      );
                    }
                  })
                }
              </div>
            );
          }

          return (
            <div className="data-wrapper">
            </div>
          );

        case "image-single":
          return (
            <div className="data-wrapper">
              <img src={content.content_data} className="image-single" alt="image" />
            </div>
          );

        case "image-multi":
          let keyArray1 = Object.keys(content.content_data);
          let data1 = content.content_data;
          return (
            <div className="data-wrapper">
              {
                keyArray1.map((item, index) => {
                  return (
                    <div className="image-multi-wrapper">
                      <img
                        className="image-single multi"
                        src={data1[keyArray1[index]]}
                        alt="image"
                        key={index}
                      />
                      {
                        index !== keyArray1.length - 1 &&
                        <div className="divider"></div>
                      }
                    </div>
                  )
                })
              }
            </div>
          );

        case "mixed-image":
          let keyArray0 = Object.keys(content.content_data);
          let data0 = content.content_data;
          let imageIndex = [];
          let rowCount = 0;

          for (let i = 0; i < keyArray0.length; i++) {
            if (keyArray0[i].includes("image"))
              imageIndex.push(i);
          }
          rowCount = imageIndex.length % 3;

          if (content.content_title === "wireframe") {
            return (
              <div className="data-wrapper">
                {
                  keyArray0.map((item, index) => {
                    if (item.includes("text")) {
                      return (
                        <p key={index}>
                          {data0[keyArray0[index]]}
                        </p>
                      );
                    }
                  })
                }
                <div className="flex-wrapper dark-mode">
                  <div className="flex-row">
                    {
                      imageIndex.length > 0 &&
                      imageIndex.map((item, index) => {
                        return (
                          <div className="flex-column" key={index}>
                            <img
                              className={"wireframe-image" + item}
                              src={data0[keyArray0[item]]}
                              key={index}
                            />
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            );
          }

          else if (content.content_title === "brainstorm") {
            return (
              <div className="data-wrapper">
                {
                  keyArray0.map((item, index) => {
                    if (item.includes("text")) {
                      return (
                        <p className="brainstorm-p" key={index}>
                          {data0[keyArray0[index]]}
                        </p>
                      )
                    }
                    else {
                      return (
                        <img
                          className="image-single"
                          src={data0[keyArray0[index]]}
                          alt="image"
                          key={index}
                        />
                      )
                    }
                  })
                }
              </div>
            );
          }

          return (
            <div className="data-wrapper">
            </div>
          );

        case "video":
          let keyArray2 = Object.keys(content.content_data);
          let data2 = content.content_data;

          return (
            <div className="data-wrapper">
              {
                keyArray2.map((item, index) => {
                  if (item.includes("text")) {
                    return (
                      <p className="video-p">
                        &#9657; {data2[keyArray2[index]]}
                      </p>
                    )
                  }
                  else if (item.includes("vid")) {
                    return (
                      <div>
                        <div className="video-wrapper">
                          <iframe src={data2[keyArray2[index]]} frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
                        </div>
                        {
                          index !== keyArray2.length - 1 &&
                          <div className="divider"></div>
                        }
                      </div>
                    )
                  }
                })
              }

            </div>
          );

      default:
        return (
          <div></div>
        );
    }

    return (
      <div></div>
    );
  }

  render() {
    return (
      <div className="work-detail-container">
        {this.renderFixedContent()}
        {this.renderThumbnail()}
        {
          this.state.dataObj && this.state.dataObj.content &&
          this.state.dataObj.content.map((item, index) => {
            return this.renderContent(item);
          })
        }
      </div>
    );
  }
}

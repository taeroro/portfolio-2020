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
      projectId: -1,
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
      projectId: index,
      dataObj: workData[index],
      titleDescY: window.getComputedStyle(this.introNameRef).getPropertyValue('margin-top'),
    });

    setTimeout(() => {
      this.setState({
        titleDescHeight: this.descriptionRef.clientHeight,
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
                    else if (item.includes("quote")) {
                      if (this.state.projectId === "0") {
                        return (
                          <p className="research-quote research-p-section" key={index}>
                            &#9657; {data[keyArray[index]]}
                          </p>
                        );
                      }
                      else if (this.state.projectId === "1") {
                        return (
                          <p className="research-quote" key={index}>
                            &#9657; {data[keyArray[index]]}
                          </p>
                        );
                      }
                    }
                    else if (item.includes("image")) {
                      return (
                        <img
                          src={data[keyArray[index]]}
                          className="image-single research"
                          key={index}
                        />
                      );
                    }
                    else if (item.includes("desc")) {
                      return (
                        <p className="img-desc"  key={index}>
                          {data[keyArray[index]]}
                        </p>
                      );
                    }
                    else if (item.includes("text")) {
                      return (
                        <p key={index}>
                          {data[keyArray[index]]}
                        </p>
                      );
                    }
                    else if (item.includes("point")) {
                      return (
                        <p className="research-point" key={index}>
                          {data[keyArray[index]]}
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

          if (this.state.projectId === "2") {
            return (
              <div className="data-wrapper jazzin">
                {
                  keyArray1.map((item, index) => {
                    return (
                      <div className="jazzin-image-wrapper" key={index}>
                        <img
                          className={"image-single multi"}
                          src={data1[keyArray1[index]]}
                          alt="image"
                        />
                      </div>
                    )
                  })
                }
              </div>
            );
          }
          else {
            return (
              <div className="data-wrapper">
                {
                  keyArray1.map((item, index) => {
                    return (
                      <div className="image-multi-wrapper" key={index}>
                        <img
                          className="image-single multi"
                          src={data1[keyArray1[index]]}
                          alt="image"
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
          }
          break;

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
            if (this.state.projectId === "0") {
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
                      else {
                        return (
                          <div className="wireframe-single-wrapper" key={index}>
                            <img
                              className="image-single less-height"
                              src={data0[keyArray0[index]]}
                            />
                            {
                              index !== keyArray0.length - 1 &&
                              <p className="image-arrow">&#8659;</p>
                            }
                          </div>
                        )
                      }
                    })
                  }
                </div>
              );
            }
            else if (this.state.projectId === "1") {
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

          else if (content.content_title === "analyze") {
            if (imageIndex.length > 0) {
              imageIndex.splice(2, 0, -1);
              imageIndex.splice(5, 0, -1);
              imageIndex.splice(6, 0, -1);
              // imageIndex.splice(1, 0, -1);
              // imageIndex.splice(2, 0, -1);
            }
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
                <div className="analyze-wrapper">
                  {
                    imageIndex.length > 0 &&
                    imageIndex.map((item, index) => {
                      if (item === -1) {
                        return (
                          <div className="analyze-container placeholder" key={index}></div>
                        )
                      }
                      else {
                        return (
                          <div className="analyze-container" key={index}>
                            <img
                              className={"image-analyze"}
                              src={data0[keyArray0[item]]}
                              key={index}
                            />
                          </div>
                        )
                      }
                    })
                  }
                </div>

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
                      <p className="video-p" key={index}>
                        &#9657; {data2[keyArray2[index]]}
                      </p>
                    )
                  }
                  else if (item.includes("vid")) {
                    return (
                      <div key={index}>
                        <div className="video-wrapper">
                          <iframe src={data2[keyArray2[index]]} frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe>
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

      case "jazzin-deliverables":
        let keyArrayj = Object.keys(content.content_data);
        let dataj = content.content_data;

        let elements = keyArrayj || [];
        let components = elements.map(
            (item) => {
              if (item.includes("text")) {
                return (
                  <p className="jazzin-p">&#9657; {dataj[item]}</p>
                );
              }
              else if (item.includes("poster")) {
                return (
                  <div className="jazzin-poster">
                    <img className="image-single poster" src={dataj[item]} alt="poster" />
                  </div>
                );
              }
              else if (item.includes("social")) {
                if (item === "social9") {
                  return (
                    <img className={"jazzin-" + item} src={dataj[item]} alt="social" />
                  );
                }
                return (
                  <img className={"jazzin-" + item} src={dataj[item]} alt="social" />
                );
              }
              else if (item.includes("web")) {
                return (
                  <img className={"jazzin-" + item} src={dataj[item]} alt="web" />
                );
              }
              else if (item.includes("app")) {
                return (
                  <div className="video-wrapper">
                    <iframe src={dataj[item]} frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe>
                  </div>
                );
              }
            }
        );

        let toDisplay = [];
        let text = [];
        let poster = [];
        let social = [];
        let web = [];
        let app = [];

        for (let i = 0; i < components.length; i++) {
          let name = keyArrayj[i];

          if (name.includes("text")) {
            text.push(components[i]);
          }
          else if (name.includes("poster")) {
            poster.push(components[i]);
          }
          else if (name.includes("social")) {
            social.push(components[i]);
          }
          else if (name.includes("web")) {
            web.push(components[i]);
          }
          else if (name.includes("app")) {
            app.push(components[i]);
          }
        }

        let textIndex = 0;
        for (let j = 0; j < text.length; j++) {
          toDisplay.push(text[j]);
          if (j === 0) {
            toDisplay.push(
              <div className="jazzin-poster-wrapper">
                {poster}
              </div>
            );
          }
          else if (j === 1) {

            console.log(this.state.overviewImgWidth);

            toDisplay.push(
              <div className="social-9-wrapper">
                {social.slice(0, 9)}
              </div>
            );
            toDisplay.push(
              <div className="social-9-d-wrapper">
                <div className="d-post-wrapper">
                  {/* <div className="line-vertical"></div> */}
                  {social.slice(9, 10)}
                </div>
              </div>
            );
            toDisplay.push(
              <div className="social-sticker-wrapper">
                {social.slice(10, 14)}
              </div>
            );
            toDisplay.push(
              <div className="social-schedule-wrapper">
                {social.slice(14)}
                <div className="a-link-wrapper">
                  <a className="a-link" href="https://www.instagram.com/jazzin_2019/" target="_blank">
                    Click here to open jazzin's Instagram
                  </a>
                </div>
              </div>
            );
          }
          else if (j === 2) {
            toDisplay.push(
              <div className="jazzin-web-wrapper">
                {web}
                <a className="a-link" href="https://promotion-website.blueman3963.now.sh/" target="_blank">
                  Click here to open the website
                </a>
              </div>
            );
          }
          else if (j === 3) {
            toDisplay.push(app);
          }
        }

        return (
          <div className='data-wrapper jazzin'>
            {toDisplay}
          </div>
        );


        // while(components.length > 0) {
        //   children.push(components.shift());
        //
        //   if (children.length === 5) {
        //       groups.push(<div className="grid grid-pad">{children}</div>);
        //       children = [];
        //   }
        // }


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

import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import './work-detail.css';

import gsap from 'gsap';
import { Parallax } from 'react-scroll-parallax';

import workData from './../work-detail-data';
import Image from './../../Image';

const indexToPath = [
  "fourtwenty",
  "jazzin",
  "focused",
  "apark",
  "yintechlabs",
  "faces",
  "michaelkors",
];


class WorkDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      path: "",
      projectId: -1,
      dataObj: null,
      titleDescY: 0,
      titleDescHeight: 0,
      windowWidth: 0,
      windowHeight: 0,
      reachedFirst: false,
    };

    this.fadeInTl = gsap.timeline();
    this.imgTl = gsap.timeline();

    this.isMouseScroll = false;
    this.oldY = window.pageYOffset;

    this.fadeInRef = null;
    this.introNameRef = null;
    this.descriptionRef = null;
    this.fixedContainerRef = null;
    this.thumbnailImageRef = null;
    this.titleRef = [];

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.updateScroll = this.updateScroll.bind(this);
    this.onClickComplete = this.onClickComplete.bind(this);

    this.tl = [];
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.location.pathname);

    this.oldY = window.pageYOffset;
    this.fadeInRef = null;
    this.introNameRef = null;
    this.descriptionRef = null;
    this.fixedContainerRef = null;
    this.thumbnailImageRef = null;

    this.tl = [];
    this.forceUpdate(() => {
      this.fadeInTl.from(this.fadeInRef, {delay: 0.5, duration: 1, opacity: 0, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"});

      const index = indexToPath.indexOf(nextProps.match.params.id).toString();
      this.setState({
        projectId: index,
        dataObj: workData[index],
      }, () => {
        this.titleRef = [];
        this.updateScroll();
      });

      setTimeout(() => {
        this.setState({
          titleDescHeight: this.descriptionRef.clientHeight,
        });

        window.scrollTo(0, 1);
        window.scrollTo({ top: 0 });
      }, 10);
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
    window.addEventListener('scroll', this.updateScroll);

    this.fadeInTl.from(this.fadeInRef, {delay: 0.5, duration: 1, opacity: 0, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"});

    const index = indexToPath.indexOf(this.props.match.params.id).toString();
    this.setState({
      projectId: index,
      dataObj: workData[index],
      titleDescY: window.getComputedStyle(this.introNameRef).getPropertyValue('margin-top'),
    });

    setTimeout(() => {
      this.setState({
        titleDescHeight: this.descriptionRef.clientHeight,
      });

      window.scrollTo(0, 1);
      window.scrollTo({ top: 0 });
    }, 10);
  }

  componentWillUnmount() {
    window.scrollTo({ top: 0 });
    console.log(window.pageYOffset);

    window.removeEventListener('resize', this.updateWindowDimensions);
    window.removeEventListener('scroll', this.updateScroll);

    this.fadeInTl.kill();
    this.imgTl.kill();
    for (let i = 0; i < this.tl.length; i++) this.tl[i].kill();

  }

  updateWindowDimensions() {
    this.setState({
      titleDescY: window.getComputedStyle(this.introNameRef).getPropertyValue('margin-top'),
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });
  }

  updateScroll() {
    // this.titleRef.length !== 0 &&
    if (!this.state.reachedFirst && this.titleRef[0] && window.pageYOffset >= this.titleRef[0].offsetTop - this.fixedContainerRef.clientHeight + 50) {
      // console.log("reached");
      this.setState({ reachedFirst: true });
    }
    else if (this.state.reachedFirst && this.titleRef[0] && window.pageYOffset < this.titleRef[0].offsetTop - this.fixedContainerRef.clientHeight + 50) {
      this.setState({ reachedFirst: false });
    }


    let dY = window.pageYOffset - this.oldY;
    let shadowYPreset = 5;
    if (window.innerWidth < 576) {
      shadowYPreset = 2;
    }

    let dY_new = Math.abs(dY) > shadowYPreset
      ? dY >= 0 ? -shadowYPreset : shadowYPreset
      : -dY;
    let shadow = "3px " + dY_new + "px 0 #0000FF";

    for (let i = 0; i < this.titleRef.length; i++) {
      if (this.tl[i])
        this.tl[i].kill();

      this.tl[i] = gsap.timeline({onComplete: () => this.onClickComplete(i)});
      this.tl[i].set(this.titleRef[i], {textShadow: "0 0 0 #0000FF"});
      this.tl[i].to(this.titleRef[i], 0.25, {textShadow: shadow, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"});
    }

    this.oldY = window.pageYOffset;
    // this.isMouseScroll = false;
  }

  onClickComplete(index) {
    if (this.tl[index]) {
      this.tl[index].to(this.titleRef[index], 0.25, {textShadow: "0px 0px 0 #0000FF", ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"});

      setTimeout(() => {
        this.tl[index].kill();
      }, 300);
    }
  }

  renderFixedContent() {
    const title = this.state.dataObj && this.state.dataObj.title;
    const category = this.state.dataObj && this.state.dataObj.category;

    let calcTop = parseInt(this.state.titleDescY, 10) - (this.state.titleDescHeight*0.9);

    if (this.state.projectId === -1 || this.state.projectId === "5") {
      return (
        <div
          className="introduction-container detail-page"
          ref={div => this.fixedContainerRef = div}
        >
          <span
            className="title-description"
            style={{marginTop: calcTop}}
            ref={span => this.descriptionRef = span}
          >

          </span>
           <h1
             className="name"
             ref={h1 => this.introNameRef = h1}
           >

           </h1>
        </div>
      );
    }
    // FOURTWENTY
    else if (this.state.projectId === "0") {
      return (
        <div
          // className="introduction-container detail-page"
          className={this.state.reachedFirst ? "introduction-container detail-page hidden" : "introduction-container detail-page"}
          ref={div => this.fixedContainerRef = div}
        >
          <span
            className="title-description fourtwenty"
            style={{marginTop: calcTop}}
            ref={span => this.descriptionRef = span}
          >
            {category}
          </span>
           <h1
             className="name fourtwenty"
             ref={h1 => this.introNameRef = h1}
           >
             {title}
           </h1>
        </div>
      );
    }
    // JAZZIN background color
    else if (this.state.projectId === "1") {
      return (
        <div
          // className="introduction-container detail-page"
          className={this.state.reachedFirst ? "introduction-container detail-page hidden" : "introduction-container detail-page"}
          ref={div => this.fixedContainerRef = div}
        >
          <span
            className="title-description jazzin"
            style={{marginTop: calcTop}}
            ref={span => this.descriptionRef = span}
          >
            {category}
          </span>
           <h1
             className="name jazzin"
             ref={h1 => this.introNameRef = h1}
           >
             {title}
           </h1>
        </div>
      );
    }

    return (
      <div
        // className="introduction-container detail-page"
        className={this.state.reachedFirst ? "introduction-container detail-page hidden" : "introduction-container detail-page"}
        ref={div => this.fixedContainerRef = div}
      >
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
    const objText = this.state.dataObj && this.state.dataObj.objective;

    if (this.state.dataObj && this.state.dataObj.thumbnail_image_path.includes("mp4")) {
      // return (
      //   <div className="thumbnail-wrapper">
      //     <div className="img-wrapper">
      //       <video
      //         playsInline loop muted autoPlay
      //         preload="none"
      //         className="thumbnail-vid"
      //       >
      //         <source src={imgPath} type="video/webm" />
      //         <source src={imgPath.replace("webm", "mp4")} type="video/mp4" />
      //       </video>
      //     </div>
      //   </div>
      // );
      return (
        <div style={
          {
            width: "100vw",
            height: "100vh",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }
        }>
          <img
            src="/work/noun_Construction_1624974.svg"
            alt="construction"
            style={
              {
                alignSelf: "center",
                width: "25%",
                height: "25%",
              }
            }
          />
          <div className="content-99 no-padding">
            <p>
              This project is protected, content available on request via <a href="mailto:hello@ryanfandesign.com">email</a>.
            </p>
          </div>
        </div>
      );
    }


    return (
      <div className="thumbnail-wrapper">
        <div className="objective-wrapper">
          <p>{objText}</p>
        </div>

          <div className={"img-wrapper first-img-" + this.state.projectId}>
            {/* <Parallax y={[-20, 20]}> */}
              <Image
                className="thumbnail-img"
                src={imgPath}
                alt="thumbnail"
                ref={img => this.thumbnailImageRef = img}
              />
            {/* </Parallax> */}
          </div>
      </div>
    );
  }

  renderContent(content) {
    if (this.state.projectId === "0" && content.content_id === 1) {
      return (

        <div className={"content-" + content.content_id + " portfolio-view"} key={content.content_id}>
          {this.renderDetailedContent(content)}
        </div>
      );
    }

    return (
      <div className={"content-" + content.content_id} key={content.content_id}>
        <h2
          ref={h2 => this.titleRef[parseInt(content.content_id, 10)] = h2}
        >
          {content.content_title}
        </h2>
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
            <div className="row row-customize">
              <div className="col-xl-4 col-lg-2 col-customize"></div>
              <div className="col-xl-4 col-lg-8 col-customize">
                <p>{content.content_data}</p>
              </div>
              <div className="col-xl-4 col-lg-2 col-customize"></div>
            </div>
          </div>
        );

        case "text-complex":
          let keyArray = Object.keys(content.content_data);
          let data = content.content_data;

          if (content.content_title === "overview") {
            let temp_i = 0;
            let elements = keyArray || [];
            let components = elements.map(
              (item) => {
                if (item.startsWith("_")) {
                  return (
                    <p className="overview-p" key={temp_i++}>{data[item]}</p>
                  );
                }
                else {
                  return (
                    <dl key={temp_i++} className="overview-dl">
                      <dt>{item}</dt>
                      <dd>{data[item]}</dd>
                    </dl>
                  );
                }
              }
            );

            let toDisplay = [];
            let arr0 = components.slice(0,3);
            let arr1 = components.slice(3, components.length-1);
            let arr2 = components.slice(components.length-1);

            if (this.state.dataObj.title === "JAZZIN" || this.state.dataObj.title === "YINTECH LABS") {
              arr0 = components.slice(0,4);
              arr1 = components.slice(4, components.length-1);
              arr2 = components.slice(components.length-1);
            }

            toDisplay.push(
              <div className="row row-customize">
                <div className="col-xl-4 col-lg-2 col-customize"></div>
                <div className="col-xl-2 col-lg-4 col-md-6 col-customize">{arr0}</div>
                <div className="col-xl-2 col-lg-4 col-md-6 col-customize">{arr1}</div>
                <div className="col-xl-4 col-lg-2 col-customize"></div>
              </div>
            );
            toDisplay.push(
              <div className="row row-customize">
                {/* <div className="col-lg-4 col-customize"></div>
                <div className="col-lg-4 col-md-12 col-customize">
                  {arr2}
                </div>
                <div className="col-lg-4 col-customize"></div> */}
                <div className="col-xl-4 col-lg-2 col-customize"></div>
                <div className="col-xl-4 col-lg-8 col-customize">{arr2}</div>
                <div className="col-xl-4 col-lg-2 col-customize"></div>
              </div>
            );

            return (
              <div className="data-wrapper">
                {toDisplay}
              </div>
            );
          }

          else if (content.content_title === "research") {
            let temp_i = 0;
            let elements = keyArray || [];
            let components = elements.map(
              (item) => {
                if (item.includes("title")) {
                  return (
                    <p className="title-sm" key={temp_i++}>{data[item]}</p>
                  );
                }
                else if (item.includes("text")) {
                  return (
                    <p key={temp_i++}>{data[item]}</p>
                  );
                }
                else if (item.includes("image")) {
                  return (
                    <img className="image-single" src={data[item]} key={temp_i++} alt="screenshot" />
                  );
                }
                else if (item.includes("desc")) {
                  return (
                    <p className="desc-p" key={temp_i++}>{data[item]}</p>
                  );
                }
                else if (item.includes("point")) {
                  return (
                    <p className="point-p" key={temp_i++}>{data[item]}</p>
                  );
                }
                else if (item.includes("quote")) {
                  let str = data[item];
                  str = str.replace(/(^|\s)(")/g, "$1“");
                  str = str.replace(/"/g, "”");

                  return (
                    <p className="quote-p" key={temp_i++}>{str}</p>
                  );
                }
              }
            );

            if (this.state.projectId === "3") {
              let toDisplay = [];
              let arr0 = components.slice(0, 2);
              let arr1 = components.slice(2, 3);
              let arr2 = components.slice(3, 4);
              let arr3 = components.slice(4, components.length);

              toDisplay.push(
                <div className="row row-customize">
                  <div className="col-xl-4 col-lg-2 col-customize"></div>
                  <div className="col-xl-4 col-lg-8 col-customize">{arr0}</div>
                  <div className="col-xl-4 col-lg-2 col-customize"></div>
                </div>
              );
              toDisplay.push(
                <div className="row row-customize">
                  <div className="col-lg-2 col-customize"></div>
                  <div className="col-lg-2 col-md-2 col-customize col-apark-research col-align-bottom">{arr2}</div>
                  <div className="col-lg-4 col-md-8 col-customize col-apark-research">{arr1}</div>
                  <div className="col-lg-4 col-md-2 col-customize"></div>
                </div>
              );
              toDisplay.push(
                <div className="row row-customize">
                  <div className="col-xl-4 col-lg-2 col-customize"></div>
                  <div className="col-xl-4 col-lg-8 col-customize">{arr3}</div>
                  <div className="col-xl-4 col-lg-2 col-customize"></div>
                </div>
              );

              return (
                <div className="data-wrapper">
                  {toDisplay}
                </div>
              );
            }

            else if (this.state.projectId === "2") {
              let toDisplay = [];
              let arr0 = components.slice(0, 1);
              let arr1 = components.slice(1, 2);
              let arr2 = components.slice(2, 3);
              let arr3 = components.slice(3);

              toDisplay.push(
                <div className="row row-customize">
                  <div className="col-md-4 col-customize"></div>
                  <div className="col-md-4 col-customize">{arr0}</div>
                  <div className="col-md-4 col-customize"></div>
                </div>
              );
              toDisplay.push(
                <div className="row row-customize">
                  <div className="col-md-6 col-customize"></div>
                  <div className="col-md-4 col-customize">{arr1}</div>
                  <div className="col-md-2 col-customize"></div>
                </div>
              );
              toDisplay.push(
                <div className="row row-customize">
                  <div className="col-md-2 col-customize"></div>
                  <div className="col-md-4 col-customize">{arr2}</div>
                  <div className="col-md-6 col-customize"></div>
                </div>
              );
              toDisplay.push(
                <div className="row row-customize focused-image-margin">
                  <div className="col-xl-4 col-lg-2 col-customize"></div>
                  <div className="col-xl-4 col-lg-8 col-customize">{arr3}</div>
                  <div className="col-xl-4 col-lg-2 col-customize"></div>
                </div>
              );

              return (
                <div className="data-wrapper">
                  {toDisplay}
                </div>
              );
            }
          }

          return (
            <div className="data-wrapper"></div>
          );

        case "image-single":
          return (
            <div className="data-wrapper">
              <div className="row row-customize">
                <div className="col-md-2 col-customize"></div>
                <div className={"col-xl-" + content.content_data.size + " col-lg-12 col-customize"}>
                  <img
                    src={content.content_data.img}
                    // className="image-single"
                    className={this.state.windowWidth <= 768 ? "image-single full-width" : "image-single"}
                    alt="image" />
                </div>
                <div className="col-md-2 col-customize"></div>

              </div>
            </div>
          );

        case "image-multi":
          let keyArray1 = Object.keys(content.content_data);
          let data1 = content.content_data;

          // FOURTWENTY
          if (this.state.projectId === "0") {
            let temp_i = 0;
            let elements = keyArray1 || [];
            let components = elements.map(
              (item, index) => {
                if (index >= 0 && index <= 3) {
                  return (
                    <img className="image-single full-width" src={data1[item]} alt="image" />
                  );
                }
                return (
                  <img className="image-single outline full-width" src={data1[item]} alt="image" />
                );
              }
            );

            let toDisplay = [];

            toDisplay.push(
              <div className="row row-customize">
                <div className="col-md-12 col-customize">{components[4]}</div>
              </div>
            );

            toDisplay.push(
              <div className="row row-customize">
                <div className="col-md-6 col-customize col-md-space">{components[0]}</div>
                <div className="col-md-6 col-customize">{components[1]}</div>
              </div>
            );

            toDisplay.push(
              <div className="row row-customize">
                <div className="col-md-6 col-customize col-md-space">{components[2]}</div>
                <div className="col-md-6 col-customize">{components[3]}</div>
              </div>
            );

            toDisplay.push(
              <div className="row row-customize">
                <div className="col-md-12 col-customize">{components[5]}</div>
              </div>
            );

            toDisplay.push(
              <div className="row row-customize">
                <div className="col-md-12 col-customize">{components[6]}</div>
              </div>
            );

            return (
              <div className="data-wrapper">
                {toDisplay}
              </div>
            );
          }

          else if (this.state.projectId === "3") {
            let temp_i = 0;
            let elements = keyArray1 || [];
            let components = elements.map(
              (item) => {
                return (
                  <img className="image-single outline full-width" src={data1[item]} alt="image" />
                );
              }
            );

            let toDisplay = [];
            let arr0 = components.slice(0, 1);
            let arr1 = components.slice(1);

            toDisplay.push(
              <div className="row row-customize">
                <div className="col-lg-6 col-md-space col-customize">{arr0}</div>
                <div className="col-lg-6 col-customize">{arr1}</div>
              </div>
            );

            return (
              <div className="data-wrapper">
                {toDisplay}
              </div>
            );
          }

          else if (this.state.projectId === "2") {
            let temp_i = 0;
            let elements = keyArray1 || [];
            let components = elements.map(
              (item) => {
                return (
                  <img className="image-single outline full-width" src={data1[item]} alt="image" />
                );
              }
            );

            let toDisplay = [];
            let arr0 = components.slice(0, 1);
            let arr1 = components.slice(1, 2);
            let arr2 = components.slice(2, 3);
            let arr3 = components.slice(3);

            toDisplay.push(
              <div className="row row-customize">
                <div className="col-lg-6 col-customize col-md-space">{arr0}</div>
                <div className="col-lg-6 col-customize">{arr1}</div>
              </div>
            );
            toDisplay.push(
              <div className="row row-customize">
                <div className="col-lg-6 col-customize col-md-space">{arr2}</div>
                <div className="col-lg-6 col-customize">{arr3}</div>
              </div>
            );

            return (
              <div className="data-wrapper">
                {toDisplay}
              </div>
            );
          }

          else if (this.state.projectId === "1") {
            let temp_i = 0;
            let elements = keyArray1 || [];
            let components = elements.map(
              (item) => {
                return (
                  <img className="image-single outline full-width" src={data1[item]} alt="image" />
                );
              }
            );

            let toDisplay = [];
            let arr0 = components.slice(0, 1);
            let arr1 = components.slice(1, 2);
            let arr2 = components.slice(2, 3);
            let arr3 = components.slice(3, 4);
            let arr4 = components.slice(4);

            toDisplay.push(
              <div className="row row-customize">
                <div className="col-md-6 col-customize col-md-space">{arr0}</div>
                <div className="col-md-6 col-customize">{arr1}</div>
              </div>
            );
            toDisplay.push(
              <div className="row row-customize">
                <div className="col-md-12 col-customize">{arr2}</div>
              </div>
            );
            toDisplay.push(
              <div className="row row-customize">
                <div className="col-md-6 col-customize col-md-space">{arr3}</div>
                <div className="col-md-6 col-customize">{arr4}</div>
              </div>
            );

            return (
              <div className="data-wrapper">
                {toDisplay}
              </div>
            );
          }
          break;

        case "mixed-image":
          let keyArray0 = Object.keys(content.content_data);
          let data0 = content.content_data;

          if (content.content_title === "wireframe") {
            if (this.state.projectId === "3") {
              let temp_i = 0;
              let elements = keyArray0 || [];
              let components = elements.map(
                (item) => {
                  if (item.includes("text")) {
                    return (
                      <p className="analyze" key={temp_i++}>{data0[item]}</p>
                    );
                  }
                  else {
                    return (
                      <img className="image-single outline" src={data0[item]} alt="image" />
                    );
                  }
                }
              );

              let toDisplay = [];
              // let arr0 = components.slice(0, 1);
              let arr1 = components.slice(0, 1);
              let arr2 = components.slice(1);

              // toDisplay.push(
              //   <div className="row row-customize">
              //     <div className="col-xl-4 col-lg-2 col-customize"></div>
              //     <div className="col-xl-4 col-lg-8 col-customize">{arr0}</div>
              //     <div className="col-xl-4 col-lg-2 col-customize"></div>
              //   </div>
              // );
              toDisplay.push(
                <div className="row row-customize">
                  <div className="col-lg-2 col-customize"></div>
                  <div className="col-lg-8 col-md-12 col-customize">{arr1}</div>
                  <div className="col-lg-2 col-customize"></div>
                </div>
              );
              toDisplay.push(
                <div className="row row-customize">
                  <div className="col-md-12 col-customize">
                    <p className="down-arrow">&#8595;</p>
                  </div>
                </div>
              );
              toDisplay.push(
                <div className="row row-customize">
                  <div className="col-lg-2 col-customize"></div>
                  <div className="col-lg-8 col-md-12 col-customize">
                    <div className="apark-wireframe">
                      {arr2}
                    </div>
                  </div>
                  <div className="col-lg-2 col-customize"></div>
                </div>
              );

              return (
                <div className="data-wrapper">
                  {toDisplay}
                </div>
              );
            }

            else if (this.state.projectId === "2") {
              let temp_i = 0;
              let elements = keyArray0 || [];
              let components = elements.map(
                (item) => {
                  if (item.includes("text")) {
                    return (
                      <p className="analyze" key={temp_i++}>{data0[item]}</p>
                    );
                  }
                  else {
                    return (
                      <img className={"image-single outline screenshot focused-" + item} src={data0[item]} alt="image" />
                    );
                  }
                }
              );

              let toDisplay = [];
              let arr0 = components.slice(0, 1);
              let arr1 = [components.slice(1, 2), components.slice(4, 5)];
              let arr2 = components.slice(2, 3);
              let arr3 = [components.slice(3, 4), components.slice(5)];

              toDisplay.push(
                <div className="row row-customize">
                  <div className="col-xl-4 col-lg-2 col-customize"></div>
                  <div className="col-xl-4 col-lg-8 col-customize">{arr0}</div>
                  <div className="col-xl-4 col-lg-2 col-customize"></div>
                </div>
              );
              toDisplay.push(
                <div className="row row-customize">
                  <div className="col-lg-4 col-customize col-center focused-wireframe">{arr1}</div>
                  <div className="col-lg-4 col-customize col-center">{arr2}</div>
                  <div className="col-lg-4 col-customize col-center focused-wireframe">{arr3}</div>
                </div>
              );

              return (
                <div className="data-wrapper">
                  {toDisplay}
                </div>
              );
            }
          }

          else if (content.content_title === "brainstorm") {
            let temp_i = 0;
            let elements = keyArray0 || [];
            let components = elements.map(
              (item) => {
                if (item.includes("text")) {
                  return (
                    <p className="brainstorm" key={temp_i++}>{data0[item]}</p>
                  );
                }
                else {
                  return (
                    <div className="row row-customize">
                      <div className="col-md-2 col-customize"></div>
                      <div className="col-xl-8 col-lg-12 col-customize">
                        <img className="image-single full-width" src={data0[item]} alt="image" />
                      </div>
                      <div className="col-md-2 col-customize"></div>
                    </div>
                  );
                }
              }
            );

            let toDisplay = [];
            let arr0 = components.slice(0, 1);
            let arr1 = components.slice(1);

            toDisplay.push(
              <div className="row row-customize">
                <div className="col-md-12 col-customize">{arr0}</div>
              </div>
            );
            toDisplay.push(
              <div className="row row-customize focused-image-margin">
                <div className="col-xl-4 col-lg-2 col-customize"></div>
                <div className="col-xl-4 col-lg-8 col-customize">{arr1}</div>
                <div className="col-xl-4 col-lg-2 col-customize"></div>
              </div>
            );

            return (
              <div className="data-wrapper">
                {toDisplay}
              </div>
            );
          }

          else if (content.content_title === "analyze") {
            let temp_i = 0;
            let elements = keyArray0 || [];
            let components = elements.map(
              (item) => {
                if (item.includes("text")) {
                  return (
                    <p className="analyze" key={temp_i++}>{data0[item]}</p>
                  );
                }
                else {
                  return (
                    <img className="image-single outline" src={data0[item]} alt="image" />
                  );
                }
              }
            );

            let toDisplay = [];
            let arr0 = components.slice(0, 1);
            let arr1 = components.slice(1, 2);
            let arr2 = components.slice(2, 3);
            let arr3 = components.slice(3, 4);
            let arr4 = components.slice(4, 5);
            let arr5 = components.slice(5);

            toDisplay.push(
              <div className="row row-customize">
                <div className="col-xl-4 col-lg-2 col-customize"></div>
                <div className="col-xl-4 col-lg-8 col-customize">{arr0}</div>
                <div className="col-xl-4 col-lg-2 col-customize"></div>
              </div>
            );
            toDisplay.push(
              <div className="row row-customize">
                <div className="col-lg-6 col-customize">{arr1}</div>
                <div className="col-lg-6 col-customize"></div>
              </div>
            );
            toDisplay.push(
              <div className="row row-customize">
                <div className="col-lg-6 col-customize"></div>
                <div className="col-lg-6 col-customize">{arr2}</div>
              </div>
            );
            toDisplay.push(
              <div className="row row-customize">
                <div className="col-lg-6 col-customize">{arr3}</div>
                <div className="col-lg-6 col-customize"></div>
              </div>
            );
            toDisplay.push(
              <div className="row row-customize">
                <div className="col-lg-6 col-customize col-md-space">{arr4}</div>
                <div className="col-lg-6 col-customize">{arr5}</div>
              </div>
            );

            return (
              <div className="data-wrapper">
                {toDisplay}
              </div>
            );
            // TODO
          }

          return (
            <div className="data-wrapper">
            </div>
          );

        case "video":
          let keyArray2 = Object.keys(content.content_data);
          let data2 = content.content_data;


          if (this.state.projectId === "0") {
            let temp_q = 0;
            let elements = keyArray2 || [];

            let components = elements.map(
              (item) => {
                return (
                  <div className="video-wrapper fourtwenty" key={temp_q++}>
                    <iframe src={data2[item]} frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe>
                  </div>
                );
              }
            );

            let toDisplay9 = [];

            toDisplay9.push(
              <div className="row row-customize">
                <div className="col-md-3 col-customize fourtwenty">{components[0]}</div>
                <div className="col-md-3 col-customize fourtwenty">{components[1]}</div>
                <div className="col-md-3 col-customize fourtwenty">{components[2]}</div>
                <div className="col-md-3 col-customize fourtwenty">{components[3]}</div>
              </div>
            );

            return (
              <div className="data-wrapper">
                {toDisplay9}
              </div>
            );
          }

          let temp_i_0 = 0;
          let elements0 = keyArray2 || [];
          let video_count = keyArray2.length/2;

          let components0 = elements0.map(
            (item) => {
              if (item.includes("text")) {
                return (
                  <p className="title-sm video" key={temp_i_0++}>
                    {data2[item]}
                  </p>
                );
              }
              else {
                return (
                  <div className="video-wrapper outline" key={temp_i_0++}>
                    <iframe src={data2[item]} frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe>
                  </div>
                );
              }
            }
          );

          let toDisplay0 = [];
          for (let i = 0; i < video_count; i++) {
            toDisplay0.push(
              <div className="row row-customize video">
                <div className="col-md-12 col-customize">
                  {components0.slice(i*2, i*2+2)}
                </div>
              </div>
            );
          }

          return (
            <div className="data-wrapper">
              {toDisplay0}
            </div>
          );

      case "jazzin-deliverables":
        let keyArrayj = Object.keys(content.content_data);
        let dataj = content.content_data;

        let elements = keyArrayj || [];
        let temp_i = 0;
        let components = elements.map(
            (item) => {
              if (item.includes("text")) {
                return (
                  <p className="title-sm jazzin" key={temp_i++}>{dataj[item]}</p>
                );
              }
              else if (item.includes("poster")) {
                return (
                  <img className="image-single" src={dataj[item]} alt="poster" key={temp_i++} />
                );
              }
              else if (item.includes("social")) {
                if (item === "social9") {
                  return (
                    <img className="image-single" src={dataj[item]} alt="social" key={temp_i++} />
                  );
                }
                return (
                  <img className={"jazzin-" + item} src={dataj[item]} alt="social" key={temp_i++} />
                );
              }
              else if (item.includes("web")) {
                return (
                  <img className="image-single full-width" src={dataj[item]} alt="web" key={temp_i++} />
                );
              }
              else if (item.includes("app")) {
                return (
                  <div className="video-wrapper" key={temp_i++}>
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
              <div className="row row-customize">
                <div className="col-md-6 col-customize col-md-space">{poster[0]}</div>
                <div className="col-md-6 col-customize">{poster[1]}</div>
              </div>
            );
          }
          else if (j === 1) {
            toDisplay.push(
              <div className="row row-customize">
                <div className="col-md-12 col-customize">
                  <div className="social-9-wrapper" key={temp_i++}>
                    {social.slice(0, 9)}
                  </div>
                </div>
              </div>
            );
            toDisplay.push(
              <div className="row row-customize row-jazzin-img-margin">
                <div className="col-md-4 col-customize col-align-bottom col-md-space">
                  <div className="social-sticker-wrapper" key={temp_i++}>
                    {social.slice(10, 14)}
                  </div>
                </div>
                <div className="col-md-2 col-customize"></div>
                <div className="col-md-6 col-customize">
                  {social.slice(9, 10)}
                </div>
              </div>
            );
            toDisplay.push(
              <div className="row row-customize row-jazzin-img-margin">
                <div className="col-md-12 col-customize col-align-bottom">
                  {social.slice(14)}
                </div>
              </div>
            );
            toDisplay.push(
              <div className="row row-customize">
                <div className="col-md-12 col-customize col-center">
                  <div className="a-link-wrapper">
                    <a className="a-link" href="https://www.instagram.com/jazzin_2019/" target="_blank">
                      Click here to open jazzin's Instagram
                    </a>
                  </div>
                </div>
              </div>
            );
          }
          else if (j === 2) {
            toDisplay.push(
              <div className="row row-customize">
                <div className="col-md-6 col-customize">
                  {web[0]}
                </div>
                <div className="col-md-6 col-customize">
                  {web[1]}
                </div>
              </div>
            );
            toDisplay.push(
              <div className="row row-customize">
                <div className="col-md-12 col-customize col-center">
                  <a className="a-link" href="https://promotion-website.blueman3963.now.sh/" target="_blank">
                    Click here to open the website
                  </a>
                </div>
              </div>
            );
          }
          else if (j === 3) {
            toDisplay.push(
              <div className="row row-customize">
                <div className="col-md-12 col-customize">
                  {app}
                </div>
              </div>
            );
          }
        }

        return (
          <div className='data-wrapper jazzin'>
            {toDisplay}
          </div>
        );

      case "yintech-website":
        let keyArrayy = Object.keys(content.content_data);
        let datay = content.content_data;
        let temp_y = 0;

        let elements1 = keyArrayy || [];
        let components1 = elements1.map(
          (item) => {
            if (item.includes("title")) {
              return (
                <p className="title-sm" key={temp_y++}>{datay[item]}</p>
              );
            }
            else if (item.includes("text")) {
              return (
                <p key={temp_y++}>{datay[item]}</p>
              );
            }
            else if (item.includes("image")) {
              return (
                <img className="image-single full-width" src={datay[item]} alt="screenshots" />
              );
            }
            else if (item.includes("vid")) {
              return (
                <div className="video-wrapper outline" key={temp_y++}>
                  <iframe src={datay[item]} frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe>
                </div>
              );
            }
          }
        );

        let toDisplay1 = [];
        let arr0 = components1.slice(0, 1);
        let arr1 = components1.slice(1, 2);
        let arr2 = components1.slice(2, 3);
        let arr3 = components1.slice(3, 4);
        let arr4 = components1.slice(4, 5);
        let arr5 = components1.slice(5);

        toDisplay1.push(
          <div className="row row-customize">
            <div className="col-md-12 col-customize">{arr0}</div>
          </div>
        );
        toDisplay1.push(
          <div className="row row-customize">
            <div className="col-xl-4 col-lg-2 col-customize"></div>
            <div className="col-xl-4 col-lg-8 col-customize">{arr1}</div>
            <div className="col-xl-4 col-lg-2 col-customize"></div>
          </div>
        );
        toDisplay1.push(
          <div className="row row-customize yintech-row-margin">
            <div className="col-md-12 col-customize">{arr2}</div>
          </div>
        );
        toDisplay1.push(
          <div className="row row-customize">
            <div className="col-md-12 col-customize">{arr3}</div>
          </div>
        );
        toDisplay1.push(
          <div className="row row-customize yintech-row-margin">
            <div className="col-md-12 col-customize">{arr4}</div>
          </div>
        );
        toDisplay1.push(
          <div className="row row-customize video">
            <div className="col-md-12 col-customize">{arr5}</div>
          </div>
        );

        return (
          <div className='data-wrapper'>
            {toDisplay1}
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
      <div className="work-detail-container" ref={div => this.fadeInRef = div}>
        {this.renderFixedContent()}
        {this.renderThumbnail()}
        {
          this.state.dataObj && this.state.dataObj.content &&
          this.state.dataObj.content.map((item, index) => {
            return this.renderContent(item);
          })
        }
        {
          this.state.dataObj && this.state.dataObj.id === 0 &&
          <div className="content-99">
            <span>
              Full case study available on request via <a href="mailto:hello@ryanfandesign.com">email</a>.
            </span>
          </div>
        }
      </div>
    );
  }
}

export default withRouter(WorkDetail);

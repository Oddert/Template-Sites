"use strict";

var links = {
  "About": ["What is NGEM"],
  "The Data": 'po',
  "API": 'oi',
  "Network": 'oi',
  "News and Updates": 'io'
};

var NavLink = React.createClass({
  displayName: "NavLink",
  getInitialState: function getInitialState() {
    var x = links[this.props.text];
    return {
      links: x
    };
  },
  render: function render() {
    var classInput = "nav-link nav-link-desktop";
    if (this.props.mobileMode == "open") {
      classInput = "nav-link nav-link-drop-open";
    }
    //console.log(links[this.props.text]);
    return React.createElement(
      "div",
      { className: "isThisIt" },
      React.createElement(
        "a",
        { href: "https://oddert.github.io/msc/bigger_picture/default_index.html" },
        React.createElement(
          "div",
          { className: classInput },
          React.createElement(
            "p",
            null,
            this.props.text
          )
        )
      ),
      React.createElement("div", { className: "isThisIt-drop" })
    );
  }
});

var Navbar = React.createClass({
  displayName: "Navbar",
  getInitialState: function getInitialState() {
    return {
      navState: "closed",
      navHideToggleIcon: "fa fa-angle-down fa-3x",
      navObject: []
    };
  },
  handleClick: function handleClick() {
    var navState = this.state.navState;
    var navIcon = this.state.navHideToggleIcon;

    switch (navState) {
      case "open":
        navState = "closed";
        navIcon = "fa fa-angle-down fa-3x";
        break;
      case "closed":
        navState = "open";
        navIcon = "fa fa-angle-up fa-3x";
        break;
      default:
        break;
    }

    this.setState({
      navState: navState,
      navHideToggleIcon: navIcon
    });
  },
  render: function render() {
    if (this.state.navState == "open") {
      var iconClass = "drop-link-container link-decoration";
      //iconClass = "link-decoration";
    } else {
        var iconClass = "drop-link-container link-decoration hide";
        //iconClass = "link-decoration hide";
      }
    if (this.props.mobileDesktop == "desktop") {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "link-decoration desktop-link-container" },
          React.createElement(NavLink, { text: "About" }),
          React.createElement(NavLink, { text: "The Data" }),
          React.createElement(NavLink, { text: "API" }),
          React.createElement(NavLink, { text: "Network" }),
          React.createElement(NavLink, { text: "News and Updates" })
        )
      );
    } else if (this.props.mobileDesktop == "mobile") {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "button",
          { className: "nav-hide-toggle-button", onClick: this.handleClick },
          React.createElement("i", { className: this.state.navHideToggleIcon })
        ),
        React.createElement(
          "div",
          { className: iconClass },
          React.createElement(NavLink, { text: "About", mobileMode: this.state.navState }),
          React.createElement(NavLink, { text: "The Data", mobileMode: this.state.navState }),
          React.createElement(NavLink, { text: "API", mobileMode: this.state.navState }),
          React.createElement(NavLink, { text: "Network", mobileMode: this.state.navState }),
          React.createElement(NavLink, { text: "News and Updates", mobileMode: this.state.navState })
        )
      );
    }
  }
});

var Header = React.createClass({
  displayName: "Header",
  getInitialState: function getInitialState() {
    return {
      navMode: "desktop",
      trackTime: "placeholder"
    };
  },
  componentDidMount: function componentDidMount() {
    this.updateSize();
    window.addEventListener("resize", this.updateSize);
    var time = new Date().toLocaleTimeString();
    console.log(time);
    this.setState({
      trackTime: time
    });
  },
  componentWillUnmount: function componentWillUnmount() {
    window.removeEventListener("resize", this.updateSize);
  },
  updateSize: function updateSize() {
    if (window.innerWidth < 764) {
      this.setState({
        navMode: "mobile"
      });
    } else {
      this.setState({
        navMode: "desktop"
      });
    }
  },
  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "header-container" },
        React.createElement(
          "div",
          { className: "header-icon" },
          React.createElement(
            "a",
            { href: "#" },
            React.createElement("img", { src: "https://oddert.github.io/img/logo_no_text.png" })
          )
        ),
        React.createElement(
          "div",
          { className: "nav-container" },
          React.createElement(Navbar, { mobileDesktop: this.state.navMode })
        )
      ),
      React.createElement(
        "p",
        { className: "refreshTime" },
        "Refresh Time: ",
        this.state.trackTime
      )
    );
  }
});

ReactDOM.render(React.createElement(Header, null), document.getElementById("header"));

var PageOne = React.createClass({
  displayName: "PageOne",
  getInitialState: function getInitialState() {
    return {
      style: { height: "700px" }
    };
  },
  componentDidMount: function componentDidMount() {
    this.updateHeight();
    window.addEventListener("resize", this.updateHeight);
  },
  componentWillUnmount: function componentWillUnmount() {
    window.removeEventListener("resize", this.updateHeight);
  },
  updateHeight: function updateHeight() {
    var thisHeight = $('.pageOne').outerHeight();
    var winHeight = window.innerHeight;
    var state = { height: thisHeight };
    if (thisHeight < winHeight) {
      state = { height: winHeight };
    }
    this.setState({
      style: state
    });
    return;
  },
  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "pageOne", style: this.state.style },
        React.createElement(
          "div",
          { className: "testHead" },
          React.createElement(
            "h1",
            null,
            "The NGEM",
            React.createElement("i", { className: "fa fa-trademark" }),
            " Project"
          ),
          React.createElement(
            "h1",
            null,
            "Sustainability. Solved."
          )
        )
      )
    );
  }
});

var PageTwo = React.createClass({
  displayName: "PageTwo",
  getInitialState: function getInitialState() {
    return {
      style: { height: "700px" }
    };
  },
  componentDidMount: function componentDidMount() {
    this.updateHeight();
    window.addEventListener("resize", this.updateHeight);
  },
  componentWillUnmount: function componentWillUnmount() {
    window.removeEventListener("resize", this.updateHeight);
  },
  updateHeight: function updateHeight() {
    var thisHeight = $('.pageTwo').outerHeight();
    var winHeight = window.innerHeight;
    var state = { height: thisHeight };
    if (thisHeight < winHeight) {
      state = { height: winHeight };
    }
    this.setState({
      style: state
    });
    return;
  },
  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "pageTwo conatiner-fluid" },
        React.createElement(
          "div",
          { className: "pageTwo-block-container" },
          React.createElement(
            "div",
            { className: "pageTwo-block pageTwo-text" },
            React.createElement(
              "p",
              null,
              "The NGEM project is a platform for creating long term action for sustainability."
            ),
            React.createElement(
              "p",
              null,
              "Utilizing an artificial intelligence network based on the ARIES modeler, the Network for Global Eco-modeling and Sustainability Research is a platform for global ecological computational modelling. The Something platform collaboratively connects individuals and organisations for the purpose of research and enacting policy change to push for a fully sustainable future."
            ),
            React.createElement(
              "p",
              null,
              "With a global network of researchers, a world-wide ecological map will be constructed and refined providing currently unimaginable research opportunities and the ability to understand, on a regional or global, the impact of policy decision and large scale climate change action."
            ),
            React.createElement(
              "p",
              null,
              "For the first time in human history, simulating the ecology of the entire earth will be possible. And it will be open-source."
            )
          ),
          React.createElement("img", {
            src: "https://oddert.github.io/msc/bigger_picture/img/23972583_10214243150537281_2112592975_n.jpg",
            className: "flow-chart pageTwo-block"
          })
        )
      )
    );
  }
});

var PageThree = React.createClass({
  displayName: "PageThree",
  getInitialState: function getInitialState() {
    return {
      style: { height: "700px" }
    };
  },
  componentDidMount: function componentDidMount() {
    this.updateHeight();
    window.addEventListener("resize", this.updateHeight);
  },
  componentWillUnmount: function componentWillUnmount() {
    window.removeEventListener("resize", this.updateHeight);
  },
  updateHeight: function updateHeight() {
    var thisHeight = $('.pageThree').outerHeight();
    var winHeight = window.innerHeight;
    var state = { height: thisHeight };
    if (thisHeight < winHeight) {
      state = { height: winHeight };
    }
    this.setState({
      style: state
    });
    return;
  },
  handleClick: function handleClick() {
    window.open("https://oddert.github.io/msc/bigger_picture/default_index.html");
  },
  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "pageThree" },
        React.createElement(
          "div",
          { className: "pageThree-head" },
          React.createElement(
            "h1",
            null,
            "How do you simulate the planet?"
          )
        ),
        React.createElement(
          "div",
          { className: "pageThree-mainPs" },
          React.createElement(
            "p",
            null,
            "Lots of things stand in our way of a fully sustainable world, one of which is the cost and expense of organizing and executing large scale ecological engineering projects and the ethical and financial risks they entail."
          ),
          React.createElement(
            "p",
            null,
            "What is needed is some way to simulate entire biomes and the global eco system itself."
          ),
          React.createElement(
            "p",
            null,
            "Now, with the aid of artificial intelligence we have the capacity to do s for the first time ever. And you can help."
          )
        ),
        React.createElement(
          "div",
          { className: "pageThree-callToAction" },
          React.createElement(
            "p",
            { className: "pageThree-callToAction-p" },
            "We are always looking for researchers, theoretical and applied to contribute knowledge, data and computational models to connect with others in our mission to understand the global ecological system. With on cost, join our network to build, share and explore. Together."
          ),
          React.createElement(
            "button",
            { className: "pageThree-callToAction-button btn btn-default", onClick: this.handleClick },
            "Find Out More about the Network",
            " ",
            React.createElement("i", { className: "fa fa-angle-right" })
          )
        ),
        React.createElement(
          "p",
          { style: { opacity: "0" } },
          "."
        )
      )
    );
  }
});

var PageFour = React.createClass({
  displayName: "PageFour",
  getInitialState: function getInitialState() {
    return {
      style: { height: "700px" }
    };
  },
  componentDidMount: function componentDidMount() {
    this.updateHeight();
    window.addEventListener("resize", this.updateHeight);
  },
  componentWillUnmount: function componentWillUnmount() {
    window.removeEventListener("resize", this.updateHeight);
  },
  updateHeight: function updateHeight() {
    var thisHeight = $('.pageFour').outerHeight();
    var winHeight = window.innerHeight;
    var state = { height: thisHeight };
    if (thisHeight < winHeight) {
      state = { height: winHeight };
    }
    this.setState({
      style: state
    });
    return;
  },
  handleClick: function handleClick() {
    window.open("https://oddert.github.io/msc/bigger_picture/default_index.html");
  },
  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "pageFour" },
        React.createElement(
          "div",
          { className: "pageFour-head" },
          React.createElement(
            "h1",
            null,
            "Effecting Lasting Change"
          )
        ),
        React.createElement(
          "div",
          { className: "pageFour-icons-container" },
          React.createElement(
            "p",
            { className: "pageFour-icons-title" },
            "A sample of the organizations we’ve worked with"
          ),
          React.createElement(
            "a",
            { href: "https://www.un.org/sustainabledevelopment/sustainable-development-goals/", target: "_blank" },
            React.createElement("img", {
              src: "https://blogs.un.org/wp-content/uploads/2017/03/logo.svg",
              className: "pageFour-icon"
            })
          ),
          React.createElement(
            "a",
            { href: "https://www.ewg.org/", target: "_blank" },
            React.createElement("img", {
              src: "http://www.peacefulmountain.com/wp-content/uploads/2015/07/EWG-logo.png",
              className: "pageFour-icon"
            })
          ),
          React.createElement(
            "a",
            { href: "https://www.gcint.org/", target: "_blank" },
            React.createElement("img", {
              src: "https://www.gcint.org/wp-content/uploads/Green%20Cross%20logo.png",
              className: "pageFour-icon"
            })
          ),
          React.createElement(
            "a",
            { href: "https://svn.org/", target: "_blank" },
            React.createElement("img", {
              src: "https://oddert.github.io/msc/bigger_picture/img/SVNLogo_SPO.jpg",
              className: "pageFour-icon"
            })
          )
        ),
        React.createElement(
          "div",
          { className: "pageFour-mainPs" },
          React.createElement(
            "p",
            null,
            "The NGEM network functions in two ways, the first being a network of researchers, scientists and engineers to communicate and integrate their ecological models. The second function is that of creating systemic and political change."
          ),
          React.createElement(
            "p",
            null,
            "We do this by working with regional lobby groups, activists, NGO’s and governments to use our findings and community to provide resources and push for change. Real change."
          ),
          React.createElement(
            "p",
            null,
            "We have already worked with a range of organisations, from tiny teams of less than five all the way up to the UN. We have shown that systemic change is entirely possible with enough determination and the larger our network, the more influence we can collectively have."
          ),
          React.createElement(
            "button",
            { className: "btn btn-default pageFour-button", onClick: this.handleClick },
            "Find Out More about Systemic Sustainability"
          )
        ),
        React.createElement(
          "p",
          null,
          "."
        )
      )
    );
  }
});

var Footer = React.createClass({
  displayName: "Footer",
  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "footer-container" },
        React.createElement(
          "p",
          { className: "footer-text-one" },
          "A website designed and created by Robyn Veitch, Camille Roded, Max Master and Yilin Lu."
        ),
        React.createElement(
          "p",
          { className: "footer-text-two" },
          React.createElement("i", { className: "fa fa-copyright" }),
          " Copyright ",
          React.createElement(
            "a",
            { href: "https://oddert.github.io/" },
            "Robyn Veitch"
          ),
          " 2017 all rights reserved."
        ),
        React.createElement(
          "div",
          { className: "footer-links" },
          React.createElement(
            "p",
            { className: "footer-link-one" },
            "Site map"
          ),
          React.createElement(
            "a",
            { href: "http://www.un.org/sustainabledevelopment/sustainable-development-goals/", target: "_blank" },
            React.createElement(
              "p",
              { className: "footer-link-two" },
              "United Nations Sustainability Goals"
            )
          )
        )
      )
    );
  }
});

var Pages = React.createClass({
  displayName: "Pages",
  render: function render() {
    return React.createElement(
      "div",
      { className: "pages" },
      React.createElement(PageOne, null),
      React.createElement(PageTwo, null),
      React.createElement(PageThree, null),
      React.createElement(PageFour, null),
      React.createElement(Footer, null)
    );
  }
});

ReactDOM.render(React.createElement(Pages, null), document.getElementById("pages"));

var Popup = React.createClass({
  displayName: "Popup",
  render: function render() {
    return React.createElement("div", { className: "initialPopUp" });
  }
});

//ReactDOM.render(<Popup />, document.getElementById('popup'));

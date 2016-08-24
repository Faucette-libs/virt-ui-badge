var virt = require("@nathanfaucett/virt"),
    virtDOM = require("@nathanfaucett/virt-dom"),
    propTypes = require("@nathanfaucett/prop_types"),
    Badge = require("../..");


var AppPrototype;


function App(props, children, context) {
    var _this = this;

    virt.Component.call(this, props, children, context);

    this.state = {
        size: {
            width: 0,
            height: 0
        }
    };

    this.onResize = function(data, next) {
        return _this.__onResize(data, next);
    };
}
virt.Component.extend(App, "App");
AppPrototype = App.prototype;

App.childContextTypes = {
    theme: propTypes.object.isRequired,
    size: propTypes.object.isRequired
};

AppPrototype.__onResize = function(data, next) {
    this.setState({
        size: data
    }, next);
};

AppPrototype.componentDidMount = function() {
    var _this = this;

    this.onMessage("virt.resize", this.onResize);

    this.emitMessage("virt.getDeviceDimensions", null, function(error, data) {
        if (!error) {
            _this.setState({
                size: data
            });
        }
    });
};

AppPrototype.componentWillUnmount = function() {
    RouteStore.removeChangeListener(this.onChange);
    this.offMessage("virt.resize", this.onResize);
};

AppPrototype.getChildContext = function() {
    return {
        size: this.state.size,
        theme: {
            palette: {
                primaryColor: "#3E50B4",
                secondaryColor: "#303F9F",
                accentColor: "#FF3F80",
                disabledColor: "rgba(0,0,0,0.12)",
                primaryTextColor: "rgba(0,0,0,0.87)",
                secondaryTextColor: "rgba(0,0,0,0.5)",
                disabledTextColor: "rgba(0,0,0,0.38)",
                lightText: "#FFFFFF"
            }
        }
    };
};

AppPrototype.render = function() {
    var size = this.state.size;

    return (
        virt.createView("App",
            virt.createView(Badge, {
                badgeContent: "+"
            }, virt.createView("p", {
                style: {
                    margin: "0px"
                }
            }, "Add"))
        )
    );
};

virtDOM.render(virt.createView(App), document.getElementById("app"));

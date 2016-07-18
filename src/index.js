var virt = require("@nathanfaucett/virt"),
    css = require("@nathanfaucett/css"),
    extend = require("@nathanfaucett/extend"),
    propTypes = require("@nathanfaucett/prop_types");


var BadgePrototype;


module.exports = Badge;


function Badge(props, children, context) {
    virt.Component.call(this, props, children, context);
}
virt.Component.extend(Badge, "virt-ui-Badge");

Badge.contextTypes = {
    muiTheme: propTypes.implement({
        palette: propTypes.implement({
            primaryColor: propTypes.string,
            secondaryColor: propTypes.string,
            disabledColor: propTypes.string,
            primaryTextColor: propTypes.string,
            secondaryTextColor: propTypes.string,
            disabledTextColor: propTypes.string,
            backgroundColor: propTypes.string,
            lightText: propTypes.string
        }).isRequired
    }).isRequired
};

Badge.propTypes = {
    badgeContent: propTypes.any.isRequired,
    badgeStyle: propTypes.object,
    radius: propTypes.number,
    className: propTypes.string,
    primary: propTypes.bool,
    secondary: propTypes.bool,
    style: propTypes.object
};

Badge.defaultProps = {
    radius: 12,
    paddingRadius: 12,
    primary: false,
    secondary: false
};

BadgePrototype = Badge.prototype;

BadgePrototype.getStyles = function() {
    var props = this.props,
        palette = this.context.muiTheme.palette,

        radius = props.radius,
        radius2x = radius * 2,

        paddingRadius = props.paddingRadius,
        paddingRadius2x = paddingRadius * 2,

        styles = {
            root: {
                position: "relative",
                display: "inline-block",
                padding: paddingRadius2x + "px " + paddingRadius2x + "px " + paddingRadius + "px " + paddingRadius + "px"
            },
            badge: {
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                position: "absolute",
                top: "0px",
                right: "0px",
                fontWeight: 500,
                fontSize: radius + "px",
                width: radius2x + "px",
                height: radius2x + "px",
                backgroundColor: palette.primaryTextColor,
                color: palette.lightText
            }
        };

    css.borderRadius(styles.badge, "50%");

    if (props.primary) {
        styles.badge.backgroundColor = palette.primaryColor;
        styles.badge.color = palette.primaryTextColor;
    } else if (props.secondary) {
        styles.badge.backgroundColor = palette.accentColor;
        styles.badge.color = palette.secondaryTextColor;
    }

    return styles;
};

BadgePrototype.render = function() {
    var props = this.props,
        styles = this.getStyles(),
        children = this.children.slice();

    children.push(
        virt.createView("span", {
            style: extend(styles.badge, props.badgeStyle)
        }, props.badgeContent)
    );

    return (
        virt.createView("div", extend(props, {
                className: "virt-ui-Badge" + (props.className ? " " + props.className : ""),
                style: extend(styles.root, props.badgeStyle)
            }),
            children
        )
    );
};

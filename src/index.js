var virt = require("virt"),
    css = require("css"),
    extend = require("extend"),
    propTypes = require("prop_types");


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
    className: propTypes.string,
    primary: propTypes.bool,
    secondary: propTypes.bool,
    style: propTypes.object
};

Badge.defaultProps = {
    primary: false,
    secondary: false
};

BadgePrototype = Badge.prototype;

BadgePrototype.getStyles = function() {
    var props = this.props,
        primary = props.primary,
        secondary = props.secondary,
        palette = this.context.muiTheme.palette,

        radius = 12,
        radius2x = radius * 2,

        styles = {
            root: {
                position: "relative",
                display: "inline-block",
                padding: radius2x + "px " + radius2x + "px " + radius + "px " + radius + "px"
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
                backgroundColor: palette.disabledTextColor,
                color: palette.lightText
            }
        };

    css.borderRadius(styles.badge, "50%");

    if (primary) {
        styles.badge.badgeBackgroundColor = palette.primaryColor;
        styles.badge.badgeTextColor = palette.primaryTextColor;
    } else if (secondary) {
        styles.badge.badgeBackgroundColor = palette.secondaryColor;
        styles.badge.badgeTextColor = palette.secondaryTextColor;
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

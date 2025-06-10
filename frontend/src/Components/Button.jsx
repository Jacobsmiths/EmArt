import { NavLink } from "react-router";

const Button = ({ href, icon, ...props }) => {
    const Content = href ? "a" : "button";
    const Icon = icon;

    const component = (
        <Content className={props.className}>
            <div className="flex items-center">{props.children}</div>
        </Content>
    );

    return href ? <NavLink to={href}>{component}</NavLink> : component;
};

export default Button;

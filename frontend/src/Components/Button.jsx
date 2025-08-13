import { NavLink } from "react-router";
import { motion } from "motion/react";

const Button = ({ href, ...props }) => {
  return href ? (
    <NavLink to={href}>
      <a className={props.className}>{props.children}</a>
    </NavLink>
  ) : (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8 }}
      {...props}
      className={`cursor-pointer ${props.className}`}
    >
      {props.children}
    </motion.button>
  );
};
export default Button;

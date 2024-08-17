import logo from "../assets/images/logo.png";

const Logo = ({width}) => {
  return <img src={logo} alt='emp' className="logo" width={width}></img>;
};

export default Logo;
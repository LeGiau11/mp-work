import { FC } from "react";

import { OptionProp } from "./interface";

const Option: FC<OptionProp> = ({ children, ...rest }) => {
  return <option {...rest}>{children}</option>;
};

export default Option;

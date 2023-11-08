import React from 'react'
import { styled } from '@mui/material/styles';
interface IPops{
    color?:string;
    componentName:any;
    stroke?:string;
    width?:string
    height?:string
}
const Svg:React.FC<IPops> = ({color,stroke,componentName,width,height}) => {
    const CustomizedSlider = styled(componentName)`
    path{
    fill:${color};
    stroke:${stroke}
    }
    ellipse{
      stroke:${stroke}
    }
    rect{
    fill:${color};
    }
    circle{
    fill:${color};
    }
`;
  return (
<CustomizedSlider width={width} height={height} />
  )
}

export default Svg
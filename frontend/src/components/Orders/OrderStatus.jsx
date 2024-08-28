import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import TimerIcon from '@mui/icons-material/Timer';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import HailIcon from '@mui/icons-material/Hail';
import "./OrderStatus.css"
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 136deg, rgb(42, 114, 248) 0%, rgb(64, 106, 233) 50%, rgb(62, 129, 223) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 136deg, rgb(42, 114, 248) 0%, rgb(64, 106, 233) 50%, rgb(62, 129, 223) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(42, 114, 248) 0%, rgb(64, 106, 233) 50%, rgb(62, 129, 223) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(42, 114, 248) 0%, rgb(64, 106, 233) 50%, rgb(62, 129, 223) 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <TimerIcon />,
    2: <LocalShippingIcon />,
    3: <HailIcon />,
    4: <DoneAllIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * @default false
   */
  completed: PropTypes.bool,

  icon: PropTypes.node,
};

const steps = [
  { text: "processing", icon: <LocalShippingIcon /> },
  { text: "shipped", icon: <LocalShippingIcon /> },
  { text: "Out For Delivery", icon: <LocalShippingIcon /> },
  { text: "Delivered", icon: <LocalShippingIcon /> }
];
export default function CustomizedSteppers({ step }) {

  const status = ["processing", "shipped", "out for delivery", "delivered"]
  return (
    <Stack sx={{ width: '100%', padding: "20px" }} spacing={4}>
      <Stepper orientation={window.innerWidth < 600 ? "vertical" : "horizontal"} alternativeLabel={window.innerWidth < 600 ?false:"true"} activeStep={status.indexOf(step)} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label.text}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label.text}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}
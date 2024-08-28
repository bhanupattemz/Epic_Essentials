import React, { useEffect, useState } from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { FaCartPlus } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom"
import { userLogout } from "../..//actions/UserAction"
import { useDispatch, useSelector } from "react-redux"
import { FaDropbox } from "react-icons/fa";
import "./UserOptions.css"
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
export default function UserOptions({ user }) {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
   
    const order = () => { navigate("/orders") }
    const cart = () => { navigate("/cart") }
    const account = () => { navigate("/profile") }
    const logout = () => {
        dispatch(userLogout())
        
    }
    const dashbord = () => { navigate("/admin/dashboard") }
    const { isauthenticate } = useSelector(state => state.user)
    const actions = [
        { icon: <AccountCircleIcon />, name: "profile", func: account },
        { icon: <FaCartPlus />, name: "cart", func: cart },
        { icon: <FaDropbox />, name: "orders", func: order },
        { icon: <IoMdLogOut />, name: "logout", func: logout },

    ]
    if (user && user.role == "admin") {
        actions.unshift({ icon: <DashboardCustomizeIcon />, name: "DashBoard", func: dashbord })
    }
    return (
        <div className='dail-box'>
            <SpeedDial
                ariaLabel="User Options"
                icon={user ? <img src={user.avatar[0].url} className='img-icon' /> : <img className='img-icon' src='https://res.cloudinary.com/dmvxvzb5n/image/upload/v1721047699/Epic%20Essentials/pjlmvwy41tdhblpskhnj.png'></img>}
                direction='down'
                sx={{
                    position: 'absolute', top: 16, right: 16, zIndex: 11, '& .MuiFab-primary': { width: 40, height: 40 },
                    '& .MuiSpeedDialAction-staticTooltipLabel': { fontSize: '0.75rem' },
                }}>
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                        onClick={action.func}
                    />
                ))}
            </SpeedDial>
        </div>
    );
}

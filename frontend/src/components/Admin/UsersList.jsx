import SideBar from "./SideBar"
import React, { Fragment, useEffect, useState } from "react"
import "./OrdersList.css"
import { useDispatch, useSelector } from "react-redux"
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router"
import { adminGetAllUsers, adminDeleteUser } from "../../actions/UserAction"

export default function OrderList() {
    const dispatch = useDispatch()
    const { users, loading, error } = useSelector(state => state.allUsers);
    const [deleteUserPop, setDeleteUserPop] = useState(false)
    const [msg, setmsg] = useState('')
    const [user, setuser] = useState({})
    const updateUserhandler = (_id) => {
        navigate(`/admin/user/update/${_id}`)
    }
    const deleteUserhandler = async () => {
        setDeleteUserPop(false)
        dispatch(adminDeleteUser(user._id, { msg }))

    }
    const navigate = useNavigate()
    const getRoleColor = (role) => {
        switch (role) {
            case 'admin':
                return 'green';
            case 'blocked':
                return 'red';
            default:
                return 'black';
        }
    };

    const columns = [
        { field: "id", headerName: "User Id", hide: true, flex: 0.7 },
        { field: "email", headerName: "Email", flex: 0.7 },
        { field: "name", headerName: "Name", flex: 0.6 },
        {
            field: "role",
            headerName: "Role",
            flex: 0.3,
            renderCell: (params) => (
                <span style={{ color: getRoleColor(params.value.role) }}>
                    {params.value.role} {params.value.isBlocked && <span style={{ color: getRoleColor('blocked') }}>{'(Blocked)'}</span>}
                </span>
            )
        },
        {
            field: "action",
            headerName: "Action",
            flex: 0.5,
            renderCell: (params) => {
                return (
                    <div className="data-grid-orders-actions">
                        <p onClick={() => updateUserhandler(params.value._id)}><CiEdit /></p>
                        <p onClick={() => {
                            setuser(params.value)
                            setDeleteUserPop(true)
                        }}><MdDeleteOutline /></p>
                    </div>
                )
            }
        }
    ];
    let rows = users ? users.map((item) => ({
        id: item._id,
        email: item.email,
        name: item.username,
        role: item,
        action: item
    })) : [];
    useEffect(() => {
        rows = users ? users.map((item) => ({
            id: item._id,
            email: item.email,
            name: item.username,
            role: item.role,
            action: item
        })) : [];
    }, [users, rows])


    useEffect(() => {
        if (error) {
            console.log(error)
        }
        dispatch(adminGetAllUsers());

    }, [adminGetAllUsers, dispatch, error])
    return (
        <Fragment>
            <main className="admin-orders-main">
                {deleteUserPop &&
                    <section className="admin-delete-user-conformation">
                        <div className="admin-delete-user-box">
                            <h3>Delete Account</h3>
                            <p>Are you sure you want to delete {user.username}'s account?<br />
                                This action cannot be undone and all {user.username}'s data will be permanently removed. Please confirm to proceed.</p>
                            <div className="admin-user-update-msg-div">
                                <label htmlFor="msg">Enter Msg to User:</label>
                                <textarea name="msg" id="msg" value={msg}
                                    onChange={(e) => setmsg(e.target.value)} required>"Msg TO User About Changes"</textarea>
                            </div>
                            <div>
                                <button className="admin-update-user-delete-btn" onClick={deleteUserhandler}>Delete</button>
                                <button className="admin-update-user-delete-cancel-btn" onClick={(e) => {
                                    e.preventDefault();
                                    setDeleteUserPop(false)
                                }}>Cancel</button>
                            </div>
                        </div>
                    </section>}
                <section className="admin-orders-slidebar">
                    <SideBar />
                </section>
                {!deleteUserPop &&
                    <section className="admin-orders-details">

                        <h2>Users</h2>
                        <Box sx={{ height: 480, width: '100%' }}>
                            <DataGrid
                                columns={columns}
                                rows={rows}
                                loading={loading}
                                rowHeight={38}
                                disableRowSelectionOnClick
                            />
                        </Box>
                    </section>
                }

            </main>
        </Fragment>
    )
}
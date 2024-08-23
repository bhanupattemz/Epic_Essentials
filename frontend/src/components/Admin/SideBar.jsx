import "./SideBar.css"
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { Fragment } from "react";
import { FaDropbox } from "react-icons/fa";
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
export default function SideBar() {
    const navigate = useNavigate()
    return (
        <Fragment>
            <section className="sidebar-main-container">
                <div>
                    <h1>Epic Essentials</h1>
                </div>
                <div className="sidebar-items">
                    <div onClick={() => navigate("/admin/dashboard")}>
                        <p><DashboardIcon />Dashboard</p>
                    </div>
                    <div>
                        <SimpleTreeView>
                            <TreeItem itemId="grid" label="Products">
                                <p onClick={() => navigate("/admin/products")}><TreeItem itemId="grid-community" label="Products" /></p>
                                <p onClick={() => navigate("/admin/product/new")}><TreeItem itemId="grid-pro" label="+ add Products" /></p>

                            </TreeItem>

                        </SimpleTreeView>

                    </div>
                    <div onClick={() => navigate("/admin/orders")}>
                        <p><FaDropbox />Orders</p>
                    </div>
                    <div onClick={() => navigate("/admin/users")}>
                        <p><GroupIcon />Users</p>
                    </div>
                    <div onClick={() => navigate("/admin/reviews")}>
                        <p><RateReviewIcon />Reviews</p>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}
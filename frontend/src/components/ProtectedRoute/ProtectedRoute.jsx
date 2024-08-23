import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { setlocation } from "../../actions/CurrentLocation";
import Restricted from "./Restricted"

function ProtectedRoute({ isadmin, element }) {
    const { loading, isauthenticate, user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        if (!isauthenticate && !loading) {
            dispatch(setlocation(location.pathname));
        }
    }, [isauthenticate, loading, location.pathname, dispatch]);

    if (loading) {
        return <Loader />;
    }

    if (isauthenticate) {
        if (isadmin) {
            if (user && user.role == "admin") {
                return element;
            } else {
                return <Restricted />;
            }
        }
        return element;
    } else {
        return <Navigate to="/loginsignup" />;
    }
}

export default ProtectedRoute;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";

import { clearErrors as clearUserError, clearSuccess as clearUserSuccess } from "./reducers/userReducer/UserReducer";
import { clearErrors as clearCartError, clearSuccess as clearCartSuccess } from "./reducers/cartReducer/CartReducer";
import { clearErrors as clearAllOrdersError, clearSuccess as clearAllOrdersSuccess } from "./reducers/orderRreducer/AllOrders";
import { clearErrors as clearOrdersDetailsError, clearSuccess as clearOrdersDetailsSuccess } from "./reducers/orderRreducer/OrderDetailsReducer";
import { clearErrors as clearOrdersError, clearSuccess as clearOrdersSuccess } from "./reducers/orderRreducer/orderReducer";
import { clearErrors as clearProductDetailsError, clearSuccess as clearProductDetailsSuccess } from "./reducers/productReducer/productDetailsReducer";
import { clearErrors as clearProductsError, clearSuccess as clearProductsSuccess } from "./reducers/productReducer/ProductReducer";
import { clearErrors as clearAllReviewsError, clearSuccess as clearAllReviewsSuccess } from "./reducers/reviewReducer/AllReviewsReducer";
import { clearErrors as clearReviewError, clearSuccess as clearReviewSuccess } from "./reducers/reviewReducer/ReviewReducer";
import { clearErrors as clearAllUsersError, clearSuccess as clearAllUsersSuccess } from "./reducers/userReducer/AllUsersReducer";
import { clearErrors as clearUserDetailsError, clearSuccess as clearUserDetailsSuccess } from "./reducers/userReducer/UserDetailsReducer";


const reducers = [
  { stateKey: 'user', clearErrors: clearUserError, clearSuccess: clearUserSuccess },
  { stateKey: 'cart', clearErrors: clearCartError, clearSuccess: clearCartSuccess },
  { stateKey: 'allOrders', clearErrors: clearAllOrdersError, clearSuccess: clearAllOrdersSuccess },
  { stateKey: 'ordersDetails', clearErrors: clearOrdersDetailsError, clearSuccess: clearOrdersDetailsSuccess },
  { stateKey: 'orders', clearErrors: clearOrdersError, clearSuccess: clearOrdersSuccess },
  { stateKey: 'productDetails', clearErrors: clearProductDetailsError, clearSuccess: clearProductDetailsSuccess },
  { stateKey: 'products', clearErrors: clearProductsError, clearSuccess: clearProductsSuccess },
  { stateKey: 'allReviews', clearErrors: clearAllReviewsError, clearSuccess: clearAllReviewsSuccess },
  { stateKey: 'review', clearErrors: clearReviewError, clearSuccess: clearReviewSuccess },
  { stateKey: 'allUsers', clearErrors: clearAllUsersError, clearSuccess: clearAllUsersSuccess },
  { stateKey: 'userDetails', clearErrors: clearUserDetailsError, clearSuccess: clearUserDetailsSuccess }
];

export default function Alert() {
  const dispatch = useDispatch();
  const alert = useAlert();

  // Extract errors and success messages from the state
  const state = useSelector(state => state);

  useEffect(() => {
    reducers.forEach(({ stateKey, clearErrors, clearSuccess }) => {
      const { error, success } = state[stateKey] || {};

      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
      if (success) {
        alert.success(success);
        dispatch(clearSuccess());
      }
    });
  }, [dispatch, alert, state]);

  return null;
}

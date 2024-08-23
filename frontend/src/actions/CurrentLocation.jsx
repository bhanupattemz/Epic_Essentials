import { CURRENT_LOCATION } from "../constants/Constants";

const setlocation = (location) => {
    return {
        type: CURRENT_LOCATION,
        payload: location
    };
};

export { setlocation };

import {getAllAdmin} from "../axios/admin";
import {HomeDashboardActionType} from "../reducer/HomeDashboard";

export const getAllAdminAction = async (dispatch) => {
    dispatch({type: HomeDashboardActionType.LOAD__START});
    try {
        const admin = await getAllAdmin();
        dispatch({
            type: HomeDashboardActionType.LOAD__SUCCES,
            payload: admin.data,
            name: "admin",
        });
    } catch (error) {
        console.log(error);
    }
};

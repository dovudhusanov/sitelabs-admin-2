import { getAllService } from "../axios/service";
import { HomeDashboardActionType } from "../reducer/HomeDashboard";

export const getAllServiceAction = async (dispatch) => {
  dispatch({ type: HomeDashboardActionType.LOAD__START });
  try {
    const service = await getAllService();
    dispatch({
      type: HomeDashboardActionType.LOAD__SUCCES,
      payload: service.data,
      name: "service",
    });
  } catch (error) {
    console.log(error);
  }
};

import { getAllJobApi } from "../axios/job";
import { HomeDashboardActionType } from "../reducer/HomeDashboard";

export const getAllJobAction = async (dispatch) => {
  dispatch({ type: HomeDashboardActionType.LOAD__START });
  try {
    const job = await getAllJobApi();
    dispatch({
      type: HomeDashboardActionType.LOAD__SUCCES,
      payload: job.data,
      name: "job",
    });
  } catch (error) {
    console.log(error);
  }
};

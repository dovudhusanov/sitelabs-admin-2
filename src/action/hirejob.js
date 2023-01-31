import { getAllHireJobStats } from "../axios/hirejob";
import {
  HomeDashboardActionType,
} from "../reducer/HomeDashboard";

export const getAllHireJobStatsAction = async (dispatch) => {
  dispatch({ type: HomeDashboardActionType.LOAD__START });
  try {
    const data = await getAllHireJobStats();
    dispatch({
      type: HomeDashboardActionType.LOAD__SUCCES,
      name: "hirejob",
      payload: data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

import { allSubscriberApi } from "../axios/subscribe";
import { HomeDashboardActionType } from "../reducer/HomeDashboard";

export const getAllSubscriberAction = async (dispatch) => {
  dispatch({ type: HomeDashboardActionType.LOAD__START });
  try {
    const subcribe = await allSubscriberApi();
    dispatch({
      type: HomeDashboardActionType.LOAD__SUCCES,
      payload: subcribe.data,
      name: "subscribe",
    });
  } catch (error) {
    console.log(error);
  }
};

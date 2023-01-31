import { getAllBlogApi } from "../axios/blog";
import { HomeDashboardActionType } from "../reducer/HomeDashboard";

export const getAllBlogAction = async (dispatch) => {
  dispatch({ type: HomeDashboardActionType.LOAD__START });
  try {
    const blog = await getAllBlogApi();
    dispatch({
      type: HomeDashboardActionType.LOAD__SUCCES,
      payload: blog.data,
      name: "blog",
    });
  } catch (error) {
    console.log(error);
  }
};

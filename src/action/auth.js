import {LoginApi} from "../axios/auth";
import {ActionType} from "../reducer/LoginReducer";

export const LoginAction = async (userInfo, dispatch, navigate) => {
    dispatch({type: ActionType.LOGIN__START});
    try {
        const admin = await LoginApi(userInfo);
        localStorage.setItem("admin", JSON.stringify(admin.data));
        navigate("/");
    } catch (error) {
        dispatch({
            type: ActionType.LOGIN__FAILURE,
            payload: error.response.data.message,
        });
    }
};

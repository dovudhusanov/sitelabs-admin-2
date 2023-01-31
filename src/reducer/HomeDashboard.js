const MONTH = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentyabr",
    "Octyabr",
    "Noyaber",
    "Dekabr",
];

export const homeDashboardState = {
    admin: null,
    blog: null,
    job: null,
    hirejob: null,
    error: "",
    loading: false,
};

export const HomeDashboardActionType = {
    LOAD__SUCCES: "LOAD__SUCCES",
    LOAD__FAILURE: "LOAD__FAILURE",
    LOAD__START: "LOAD__START",
};

export const HomeDashboardReducer = (state, action) => {
    switch (action.type) {
        case HomeDashboardActionType.LOAD__START:
            return {...state, loading: true};
        case HomeDashboardActionType.LOAD__FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case HomeDashboardActionType.LOAD__SUCCES:
            const stats = action.payload.data.sort((a, b) => a._id - b._id);
            const newPayload = stats.map((statistic) => {
                return {
                    name: MONTH[statistic._id - 1],
                    "qo'shilgan": statistic.total,
                };
            });
            return {
                ...state,
                loading: false,
                [action.name]: newPayload,
            };
        default:
            return state;
    }
};
import React, {useEffect, useState} from "react";
import {
    AreaChart,
    Area,
    XAxis,
    CartesianGrid,
    Tooltip,
    YAxis,
} from "recharts";
import "./style.homedashboard.css";
import {HomeContextValue} from "../../context/HomeDashboardContext";
import {getAllAdminAction} from "../../action/admin";
import {getAllBlogAction} from "../../action/blog";
import {getAllJobAction} from "../../action/job";
import {getAllHireJobStatsAction} from "../../action/hirejob";

const HomeDashboard = () => {
    const [{admin, blog, job, hirejob}, dispatch] = HomeContextValue();
    const [chartData, setChartData] = useState();
    const handleChart = (str) => {
        // eslint-disable-next-line default-case
        switch (str) {
            case "admin":
                setChartData(admin);
                break;
            case "blog":
                setChartData(blog);
                break;
            case "hirejob":
                setChartData(hirejob);
                break;
            default:
                setChartData(job);
                break;
        }
    };

    const [width, setWidth] = useState(1010);

    useEffect(() => {
        getAllAdminAction(dispatch);
        getAllBlogAction(dispatch);
        getAllHireJobStatsAction(dispatch);
        getAllJobAction(dispatch);
        handleChart("admin");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (window.screen.availWidth < 1200) {
            setWidth(900);
        }
        if (window.screen.availWidth < 992) {
            setWidth(760);
        }
        if (window.screen.availWidth < 768) {
            setWidth(560);
        }
        if (window.screen.availWidth < 560) {
            setWidth(300);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width]);

    return (
        <div className="homedashboard">
            <div className="homedashboard-container" style={{maxWidth: width + 50}}>
                <div
                    onClick={() => handleChart("admin")}
                    className="homedashboard-statistic"
                >
                    <h1> {admin && admin[0]["qo'shilgan"]} </h1>
                    <p> Adminlar </p>
                </div>
                <div
                    onClick={() => handleChart("blog")}
                    className="homedashboard-statistic"
                >
                    <h1> {blog && blog[0]["qo'shilgan"]} </h1>
                    <p> Bloglar </p>
                </div>
                <div
                    onClick={() => handleChart("job")}
                    className="homedashboard-statistic"
                >
                    <h1> {hirejob && hirejob[0]["qo'shilgan"]} </h1>
                    <p> Ish E'lonlari </p>
                </div>
                <div
                    onClick={() => handleChart("hirejob")}
                    className="homedashboard-statistic"
                >
                    <h1> {blog && blog[0]["qo'shilgan"]} </h1>
                    <p> Bloglar </p>
                </div>
            </div>
            {chartData && (
                <div className={"home__dashboard-chart"} style={{width: width + 50}}>
                    <AreaChart
                        width={width}
                        height={700}
                        data={chartData}
                        margin={{top: 10, right: 30, left: 0, bottom: 0}}
                    >
                        <defs>
                            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <YAxis dataKey="index"/>
                        <XAxis dataKey="qo'shilgan" stroke="gray"/>
                        <CartesianGrid strokeDasharray="3 3" className="chartGrid"/>
                        <Tooltip/>
                        <Area
                            type="monotone"
                            dataKey="name"
                            stroke="#8884d8"
                            fillOpacity={1}
                            fill="url(#total)"
                        />
                    </AreaChart>
                </div>
            )}
        </div>
    );
};

export default HomeDashboard;

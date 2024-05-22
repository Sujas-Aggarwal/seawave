import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
    const [videoData, setVideoData] = useState(null);
    const [url, setUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    async function handleSubmit(e) {
        setIsLoading(true);
        e.preventDefault();
        const result = await axios.get(
            `https://cdn35.savetube.me/info?url=${url}`
        );
        setIsLoading(false);
        if (result.data.data != null) {
            setVideoData(result.data.data);
        } else {
            alert("Invalid URL");
            return;
        }
        console.log(videoData);
    }
    let navBar = ["Home", "About", "Tools"];
    return (
        <div id="Home" className="w-full h-full relative">
            {/* <div className="absolute right-5 sm:right-10 top-5 z-[1000] text-white font-[500]">
                <ul className="flex justify-center items-center gap-4 sm:gap-8">
                    {navBar.map((item, index) => {
                        return (
                            <li key={index}>
                                <Link
                                    to={
                                        item.toLowerCase() == "home"
                                            ? "/"
                                            : `/${item.toLowerCase()}`
                                    }
                                >
                                    {item}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div> */}
            <div className="w-full h-[80vh] relative bg-[linear-gradient(#03045e,#0077b6)] flex justify-center items-center">
                <div className="absolute bottom-[-5px] left-0 w-full ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1440 320"
                    >
                        <path
                            fill="#0099ff"
                            fillOpacity="1"
                            d="M0,192L48,181.3C96,171,192,149,288,160C384,171,480,213,576,234.7C672,256,768,256,864,234.7C960,213,1056,171,1152,149.3C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        ></path>
                    </svg>
                </div>
                <div className="flex z-[10] flex-col justify-center items-center ">
                    <p className="text-xs text-white">Ad-Free Youtube Video Downloader</p>
                    <div className="flex gap-4 justify-center items-center">
                        <h1 className="text-5xl sm:text-6xl font-bold text-[#0099FF]">
                            Seawave
                        </h1>
                        <div className="w-[45px] h-[45px] bg-center bg-[url(/favicon.svg)] bg-no-repeat bg-cover rounded-full"></div>
                    </div>
                    
                    <form
                        onSubmit={handleSubmit}
                        className="w-full flex flex-col justify-center items-stretch"
                    >
                        <input
                            type="url"
                            value={url}
                            required
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Enter URL Here"
                            className="p-2 sm:p-3 font-sans  mt-2 rounded-md w-full sm:w-[450px] outline-none select-none "
                        />
                        <button
                            type="submit"
                            className="p-2 outline-none mt-1 font-light text-white rounded-md w-full bg-[#0099FF] active:bg-[#2b80ff]"
                        >
                            {isLoading ? "Loading..." : "Download"}
                        </button>
                    </form>
                </div>
            </div>
            {videoData && (
                <div
                    id="video"
                    className="w-full flex flex-col md:flex-row gap-4 justify-evenly items-center md:items-start h-full p-4"
                >
                    <div className="md:w-[40%] w-[95%] py-2 flex flex-col justify-center text-white  font-[500]">
                        <img
                            src={videoData.thumbnail}
                            alt="Thumbnail"
                            className="w-full rounded-xl"
                        />
                        <p className="mt-2">{videoData.title}</p>
                        <p>{videoData.durationLabel}</p>
                    </div>
                    <div className="md:w-[50%] w-[95%]  gap-4 mt-2 py-2 flex flex-col justify-center items-center bg-[#03045e] text-white rounded-md">
                        <div className="w-full px-2  flex flex-col gap-2">
                            <p className="bg-white/20 p-2 rounded-md ">
                                Video Formats
                            </p>
                            {videoData.video_formats?.map((item, index) => {
                                if (item.url == null) return;
                                if (item.default_selected == 1) return;
                                return (
                                    <div
                                        key={index}
                                        className="flex w-full justify-between items-center px-2"
                                    >
                                        <p className="text-center items-center flex justify-center">
                                            {item.quality}p
                                        </p>
                                        <a
                                            href={item.url}
                                            target="_blank"
                                            className="bg-blue-800 rounded-md px-2 py-1"
                                        >
                                            Download
                                        </a>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="w-full px-2 flex flex-col gap-2">
                            <p className="bg-white/20 p-2 rounded-md">
                                Audio Formats
                            </p>
                            {videoData.audio_formats?.map((item, index) => {
                                if (item.url == null) return;
                                if (item.default_selected == 1) return;
                                return (
                                    <div
                                        key={index}
                                        className="flex w-full justify-between items-center px-2"
                                    >
                                        <p className="">{item.quality}p</p>
                                        <a href={item.url} target="_blank">
                                            Download
                                        </a>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;

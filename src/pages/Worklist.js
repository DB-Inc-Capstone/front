import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import MenuBar from "../components/MenuBar";

const Worklist = () => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <MenuBar />
            <div className="List">
                hello
            </div>
        </div>
    );
};

export default Worklist;
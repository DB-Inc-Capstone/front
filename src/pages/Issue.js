import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import MenuBar from "../components/MenuBar";

function Issue() {
    return (
      <div className="container">
            <MenuBar />
      </div>
    );
  }
  
  export default Issue;
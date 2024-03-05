import React from "react";

import Controller from "./Controller";

import O_A_BP_FaD from "./data/questions/O_A_BP_FaD.json"

const Lolz = () => {
    const jsonData = () => JSON.parse(JSON.stringify(O_A_BP_FaD));
    
    return(
        <>
         <Controller 
            filename={"O_A_BP_FaD"}
            category={"Marketplace"}
            jsonData={jsonData}
         />
        </>
    );
};

export default Lolz;
import React, { useState, useEffect } from "react";
import QuestionCarousel from "./subcomponents/QuestionCarousel";

import O_A_BP_FaD from "./data/questions/O_A_BP_FaD.json"

const Controller = () => {
    const [marketplaceSlides, setMarketplaceSlides] = useState([]);
    const loadData = () => JSON.parse(JSON.stringify(O_A_BP_FaD));

    useEffect(() => {
        fetchMarketplaceQuestions();
    }, []);

    const fetchMarketplaceQuestions = async () => {
        try {
            const data = loadData();

            const marketplaceSlidesArray = data.marketplace.map((item) => ({
                question: item.question,
                imgLinks: item.answers.map((answer) => answer.id),
            }));
            
            // Set the transformed 'MarketplaceSlides' array to the state
            setMarketplaceSlides(marketplaceSlidesArray);
        } catch (error) {
            // Log error if fetching fails
            console.error("Error fetching marketplace questions:", error);
        }
    };
    

    return (
        <>
            <QuestionCarousel slides={marketplaceSlides} />
        </>
    );
};

export default Controller;
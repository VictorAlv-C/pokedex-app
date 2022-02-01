const getColorType = (type) => {

     let background;

    switch (type) {
        case 'fighting': 
            return "rgba(151, 63, 38,.6)";
        case 'flying': 
            return "#48677b";
        case 'poison': 
            return "#5b2d86";
        case 'gound': 
            return "#a37324";
        case 'rock': 
            return "#46180b";
        case 'bug': 
            return "#8bc34a";
        case 'ghost': 
            return "#31336a";
        case 'steel': 
            return "#5d736c";
        case 'fire': 
            return "#fb6c6c";
        case 'water': 
            return "#70b7fa";
        case 'grass': 
            return "#48d0b0";
        case 'phychic': 
            return "#a12b6a";
        case 'ice': 
            return "#86d2f4";
        case 'dragon': 
            return "#448a94";
        case 'dark': 
            return "#030706";
        case 'water': 
            return "#70b7fa";
        case 'fairy': 
            return "#48d0b0";
        case 'electric': 
            return "rgba(255, 235, 59,.6)";
        case 'shadow': 
            return "#000000";
        default: 
             return "#735159";
    }
};

export default getColorType;
export function useRatingStarConverter() {
    function wholeStars(rating: number) {
        return Math.floor(rating)
    }
    
    function emptyStars(rating: number) {
        return  Math.floor(5 - rating)
    }
    
    function percentageStarFill(rating: number) {
        return (rating - Math.floor(rating)) * 100
    }
    
    function starColor(rating: number) {
        rating = Math.ceil(rating)
        switch (rating) {
            case 1:
                return "black"
            case 2:
                return "red"
            case 3:
                return "orange"
            case 4:
                return "gold"
            case 5:
                return "lime"
            default:
                return ""
        }
    }

    return {
        starColor,
        wholeStars,
        emptyStars,
        percentageStarFill
    }
}
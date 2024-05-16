export function HandleColorStatus(status) {
    if (status === 3) {
        return "green";
    } else if (status === 2) {
        return "#ffd21f";
    } else if (status === 1) {
        return "red";
    } else if (status === 0) {
        return "grey";
    } else if (status === "") {
        return "orange";
    }
}

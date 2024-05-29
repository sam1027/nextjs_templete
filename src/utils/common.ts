export const truncate = function(len: number, str?: string | null) {
    if(str === null || str === undefined){
        return "";
    }else{
        return str.length > len ? str.substring(0, len) + "..." : str;
    }
}
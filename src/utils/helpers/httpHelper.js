export const buildParameters = (filter) => {
    let params = {};
    const objectParameters = Object.keys(filter).filter(key => {
        if(filter[key] > 0 || !!filter[key]){
            return {[key]: filter[key]};
        }
    }) || {};
    
    objectParameters.map(item => {
        return params[item] = filter[item];
    });

    return params;
}
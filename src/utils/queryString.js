import queryString from 'query-string';

export const encodeQuery = (url, params = null) => 
{
    const query = !params ? url : url + '?' + queryString.stringify(params);
    return query;
};

export const decodeQuery = (query) => {
    return queryString.parse(query);
};
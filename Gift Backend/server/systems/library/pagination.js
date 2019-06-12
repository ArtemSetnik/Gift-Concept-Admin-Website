module.exports = async (model, query, page, size, complete, control) => {
    // var query = Query.getQuery();
    var totalCount = await model.find(query).count(),
        skip = (page - 1) * size,
        Query = model.find(query);

    if (skip < 0) {
        page = Math.ceil(totalCount / size);
        skip = (page - 1) * size;
    } else if (skip >= totalCount) {
        skip -= size;
        page --;
    }
    skip < 0 && (skip = 0);
    
    complete && typeof complete == 'function' && (Query = complete(Query));

    return Query.skip(skip).limit(size).then(data => {
        return {
            totalCount,
            count: data.length,
            page,
            size,
            data
        }
    })
}
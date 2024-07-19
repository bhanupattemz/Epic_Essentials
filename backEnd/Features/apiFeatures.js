class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const searchQuery = this.queryStr.keyWord ? {
            name: {
                $regex: this.queryStr.keyWord,
                $options: "i"
            }
        } : {};
        this.query = this.query.find({ ...searchQuery });
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };

        const removeFields = ["keyWord", "page", "limits"];
        removeFields.forEach(key => delete queryCopy[key]);
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
        const queryObj = JSON.parse(queryStr);
        if (queryObj.rating) {
            queryObj.rating = { $gte: queryObj.rating };
        }

        this.query = this.query.find(queryObj);
        return this;
    }

    pagenation(resultPerPage) {
        const currentPage = parseInt(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

module.exports = ApiFeatures;

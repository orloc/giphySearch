import Giphy from "./../provider/GiphyProvider";
import GiphyManager from "./../service/GiphyManager";

class SearchCtrl {
    
    constructor(){
        this.giphy = new Giphy();
    }

    /**
     * Call to giphy then map our responses back with our business logic applied
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    doSearch(req, res, next) {
        const param = req.params.term || false;
        
        if (!param) return next('Invalid function call');
        
        this.giphy.getResponse('gifs','search',{ q: param })
            .then((data) => res.status(200).send(GiphyManager.mapGiphyResponse(data)))
            .catch((err) => next(err));
    }
}

export default SearchCtrl;
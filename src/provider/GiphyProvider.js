import qs from "querystring";
import request from 'request';
import * as q from "q";
import * as _ from "lodash";

class GiphyProvider {

    constructor(){
        this.giphyPath = 'http://api.giphy.com';
        this.apiVersion = 'v1';

        this.apiKey = '986822963b8c4339a9e01f3d6c77513c';
        this.limit = 5;
        
        this.validResources = [
            'gifs'
        ];
    }
    
    getResponse(resource, action, params){
        if (!this.isValid(resource)) throw new Error('Invalid Resource specified');

        const deferred = q.defer();
        
        const url = this.getApiUrl(
            resource,
            action,
            this.addAuthentication(params)
        );

        request(url, (err, req, body) => {
            if (err){
                deferred.reject(err);
                return deferred.promise;
            } 
            
            try {
                const parsed = JSON.parse(body);
                deferred.resolve(parsed);
            } catch (e){
                deferred.reject(e);
            }
        });
        
        return deferred.promise;
    }

    addAuthentication(params){
        return _.assign({}, params, {
            api_key: this.apiKey,
            limit: this.limit
        });
    }
    
    isValid(resource){
        return this.validResources.indexOf(resource) >= 0;
    }

    getApiUrl(endpoint, action, params){
        const url = [this.giphyPath, this.apiVersion, endpoint, action].join('/');
        return typeof params !== 'undefined' 
            ? url + '?' + qs.stringify(params) 
            : url;
    }
    
}

export default GiphyProvider;
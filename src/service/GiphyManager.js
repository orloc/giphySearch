/**
 * Buisness logic for giphy implementation details outside of interfacing with the service 
 * and pertaining to this applications needs
 */
class GiphyManager {

    /**
     * Maps out the response we want  to send
     * @param giphyResponse
     * @returns {{data: Array}}
     */
    static mapGiphyResponse(giphyResponse){
       if (giphyResponse.data.length !== 5){
           return { data: []};
       } 
        
       return {
           data: giphyResponse.data.map((d) => {
               return {
                   gif_id: d.id,
                   url: d.url
               };
           })
       };
    }
}

export default GiphyManager;


class GiphyManager {

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

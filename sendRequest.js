import $ from 'jquery';

export default class SendRequest {
    fullReq(method, url, data) {
        return new Promise((resolve, reject) => {            
            $.ajax({
                type: method,
                url: url,
                data: data, 
                dataType: 'json', 
                success: (data, stat) => {
                    if (stat !== 200) {
                        resolve(data);
                    }
                    else {
                        return reject(data);
                    }
                },
                error: () => {
                    return reject({error: 'server connection error'});
                }, 
                crossDomain: true
            });            
        });
    }
}

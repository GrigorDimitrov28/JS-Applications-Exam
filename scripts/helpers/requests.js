
async function post(apiKey, object){
    fetch(apiKey, {method: 'POST', body: JSON.stringify(object)})
}

async function del(apiKey){
    fetch(apiKey, {method: 'DELETE'});
}

async function patch(apiKey, object){
    fetch(apiKey, {method: 'PATCH', body: JSON.stringify(object)});
}

export {
    post,
    del,
    patch
}


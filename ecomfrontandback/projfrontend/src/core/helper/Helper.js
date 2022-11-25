export function resetStates(emptyEl){
    for(let a in emptyEl){
        if(typeof emptyEl[a] !== 'object') {
            // if(typeof emptyEl[a] ==='boolean'){
            //     emptyEl[a] = !emptyEl[a];
            // }else{
                emptyEl[a] = '';
            // }
        }else if (Array.isArray(emptyEl[a])){
            emptyEl[a] = [];
        }else{
            emptyEl[a] = {};
        }
    }
    return emptyEl;
}
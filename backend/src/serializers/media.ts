
export function mediaList(media: Array<any>) {

    var mediaList = [];
    for (let mediaRow of media || []) {
        mediaList.push(mediaObj(mediaRow));
    }

    return mediaList;
}

export function mediaObj(media: any) {

    if(!media)
        return {}

    return {
       type: media.type,
       url: media.url
    }
}

export function imageUrl(media: any) {

    if(!media)
        return null;

    return media.url;
}
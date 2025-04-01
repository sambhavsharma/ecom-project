
export function mediaList(media: Array<any>) {

    var mediaList = [];
    for (let mediaRow of media || []) {
        mediaList.push(mediaObj(mediaRow));
    }

    return mediaList;
}

export function mediaObj(media: any) {

    return {
       type: media.type,
       url: media.url
    }
}
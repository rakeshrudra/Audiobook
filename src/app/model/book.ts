import { chapter } from './chapter';

export interface book {
    name: string,
    nameurdu : string,
    creadted: string,
    uploaddate: string,
    status: string,
    synopsys: string,
    details: string,
    detailsurdu: string,
    profile_image: string,
    profile_image_min: string,
    modules: string,
    synopsysurdu : string,
    id : any,
    horizontal_img : string,
    fav : boolean,
    chapters : Array<chapter>,
    color : string

}
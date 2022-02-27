import { FileEntry } from '@ionic-native/file/ngx';

export interface track {
    id: string,
    name: string,
    content: string,
    url : string,
    status: string,
    date: string,
    book_id: string,
    chapter: string,
    topic: string,
    synopsys: string,
    details: string,
    newaudios : Array<string>,
    booknameurdu : string,
    bookdetailsenglish : string,
    bookdetailsurdu : string,
    booksynopsysenglish : string,
    booksynopsysurdu : string,
   new : string,
    modules: Array<any>,
    slno: string,
    fav : boolean,
    logo_min : string,
    horizontal_img : string,
    logo : string,
    chapterurdu : string,
    bookname : string
    audionameurdu : string,
    audioname : string,
    chapter_id : string,
    audio_tag : string,
    download : number,
    color : string,
    location : FileEntry,
    downloading : boolean,
    downloaded : boolean,
    fullpath : string,
    contentText : string,
    contentTextArabic : string


}

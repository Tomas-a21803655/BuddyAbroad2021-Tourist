export class HomeTripCardsModel {
    public id?: any;
    public name?: string;
    public image?:string;
    public description?: string;
    public price?: number;
    public time?: number;
    public rating?: number;
    public details?: string;
    public size?: number;



    constructor(homeTripCardsModel?: HomeTripCardsModel) {
        this.id = homeTripCardsModel ? homeTripCardsModel.id : null;
        this.name = homeTripCardsModel ? homeTripCardsModel.name : null;
        this.image = homeTripCardsModel ? homeTripCardsModel.image : null;
        this.description = homeTripCardsModel ? homeTripCardsModel.description : null;
        this.price = homeTripCardsModel ? homeTripCardsModel.price : null;
        this.time = homeTripCardsModel ? homeTripCardsModel.time : null;
        this.rating = homeTripCardsModel ? homeTripCardsModel.rating : null;
        this.details = homeTripCardsModel ? homeTripCardsModel.details : null
        this.size = homeTripCardsModel ? homeTripCardsModel.size : null;
    }
}

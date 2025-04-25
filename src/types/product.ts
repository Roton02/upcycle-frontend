export interface IListing {
    // Required Fields
    _id: string
    title: string
    description: string
    category: string
    brand: string
    price: number
    condition: string
    images: string[]
    status: 'available' | 'sold' | 'reserved'
    createdAt: string; 
    updatedAt: string; 
    userID: {
        _id: string;
        email: string;
        phone: string;
    };
    length: number

    // Optional Fields
    model?: string
    negotiable?: boolean
    usageDuration?: string
    warranty?: boolean
    warrantyDetails?: string
    purchaseDate?: Date
    location?: string
    deliveryOptions?: string[]
    tags?: string[]
    isFeatured?: boolean
    rating?: number
    soldDate?: Date
}
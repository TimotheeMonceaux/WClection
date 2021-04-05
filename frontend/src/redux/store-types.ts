export type UserProfile = {
    email: string,
    firstName: string,
    middleName: string,
    lastName: string
}

export type CarouselSlide = {
    image: string,
    name: string,
    description: string
}

export type Product = {
    id: number,
    name: string,
    description: string,
    image1: string,
    image2: string,
    image3: string
}

export type Collection = {
    name: string,
    products: Array<number>
}
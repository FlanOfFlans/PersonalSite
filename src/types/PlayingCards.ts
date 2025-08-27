export enum Rank {
    Ace,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Ten,
    Jack,
    Queen,
    King,
}

export enum Suit {
    Hearts,
    Diamonds,
    Clubs,
    Spades,
}

export type PlayingCard = {
    rank: Rank;
    suit: Suit;
};

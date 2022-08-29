export interface ISlideBetProps {
    betIndex: number;
    instructions: string;
    cars: any[];
    bettingPrizes: any[];
    btnText: string;
    onBetsChange: (index: number, bet: string) => void;
};

export interface IBetItem {
    index: number;
    car: string;
}
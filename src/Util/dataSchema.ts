export interface dataType {
    youtubeID: string;
    title: string;
    views: number;
    likes: number;
    dislikes: number;
}

export interface gameModeProps {
    score: () => void;
}
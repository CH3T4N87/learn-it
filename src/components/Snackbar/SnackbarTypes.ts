export type SnackType = "success" | "error";
export type Listener = () => void;
export interface SnackItem {
    id: string,
    message: string,
    type: SnackType
}
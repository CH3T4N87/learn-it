import { v4 } from "uuid";
import type { Listener, SnackItem, SnackType } from "../SnackbarTypes";
import { useSyncExternalStore } from "react";

const listeners = new Set<Listener>();

let snapshot: SnackItem[] = [];  

const getSnapshot: () => SnackItem[] =  () => snapshot;

const notify = () => {
    for (const listener of listeners) {
        listener();
    }
}

const subscribe = (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

export const snack = (message: string, type: SnackType = "success") => {
    const id = v4()
    snapshot = [...snapshot, { id, message, type }];
    notify();

    setTimeout(() => {
        snapshot = snapshot.filter(snap => snap.id !== id);
        notify();
    },5000);
}

snack.success = (message: string) => snack(message, "success");
snack.error = (message: string) => snack(message, "error");

export const useSnackbarStore: () => SnackItem[] = () => useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
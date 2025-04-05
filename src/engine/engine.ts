export class EngineImpl {
    private rows: number;
    private columns: number;

    constructor(rows: number, columns: number) {
        this.rows = rows;
        this.columns = columns;
    }
}

export interface Engine {
    onTimerTick(callback: () => void): void
    reset(): void
}
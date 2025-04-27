
export interface Observer<T> {
    value: T
    subscribe(sub: (v: T) => void): void
}

export class ObserverImpl<T> implements Observer<T> {
    private subscribers: ((v: T) => void)[] = []
    private _value: T

    get value(): T {
        return this._value
    }

    set value(value: T) {
        this._value = value
        for (const subscriber of this.subscribers) {
            subscriber(value)
        }
    }

    constructor(value: T) {
        this._value = value
    }

    subscribe(subscriber: (v: T) => void): void {
        this.subscribers.push(subscriber)
    }
}

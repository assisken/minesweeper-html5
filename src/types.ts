type Point = { x: number, y: number }
export type Align = (point0: Point, point1: Point) => Point

export namespace Align {
    export function left(point0: Point, point1: Point): Point {
        return point0
    }

    export function center(point0: Point, point1: Point): Point {
        return {
            x: (point0.x + point1.x) / 2,
            y: (point0.y + point1.y) / 2,
        }
    }

    export function right(point0: Point, point1: Point): Point {
        return point1
    }
}

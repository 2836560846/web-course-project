/// <reference types="vite/client" />
declare module '@w4ng3/tools' {
    export class Person {
        constructor(name: string, plan: string)
        get slogan(): string
    }
}

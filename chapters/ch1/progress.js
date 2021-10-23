import Rx from 'rxjs'

const progressbar$ = new Rx.Observable(
    (observer) => {
        const OFFSET = 3000
        const SPEED = 50

        let val = 0
        const progress = () => {
            if (++val <= 100) {
                observer.next(val)
                setTimeout(progress, SPEED)
            }
            else {
                observer.complete()
            }
        }
        setTimeout(progress, OFFSET)
}
)

const progressConsoleDisplay = {
    next: val => console.log(val),
    complete: () => console.log("100%")
}

const progressConsoleDisplay2 = {
    next: val => console.log(`${val} second`),
    complete: () => console.log("100% second")
}

let progress1 = progressbar$.subscribe(progressConsoleDisplay)

setTimeout(() => progress1.unsubscribe(), 3600)
setTimeout(() => progressbar$.subscribe(progressConsoleDisplay2), 3500)

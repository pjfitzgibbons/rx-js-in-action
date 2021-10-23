import {Observable, of, from, map} from "rxjs";
import Rx from "rxjs"

of(42).subscribe(console.log)

const fortyTwo = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(42)
    }, 1000)
})

const increment = (num) => num + 1

from(fortyTwo).pipe(
    map(increment)
)
    .subscribe(console.log)

const observable = events => {
    const INTERVAL = 1000
    let schedulerId

    return {
        subscribe: observer => {
            schedulerId = setInterval(() => {
                if (events.length === 0) {
                    observer.complete()
                    clearInterval(schedulerId)
                    schedulerId = undefined
                } else {
                    observer.next(events.shift())
                }
            }, INTERVAL)

            return {
                unsubscribe: () => {
                    if (schedulerId) {
                        clearInterval(schedulerId)
                    }
                }
            }
        }
    }
}

let sub = observable([1, 2, 3]).subscribe({
    next: console.log,
    complete: () => console.log('Done!')
})

const source$ = new Observable(
    function subscribe(observer) {
        observer.next('4111111111111111');
        observer.next('5105105105105100');
        observer.next('4342561111111118');
        observer.next('6500000000000002');
        observer.complete();
    }
)

const subscription = source$.subscribe(console.log)

from(['The quick brown fox',
'jumps over the lazy dog'
]).pipe(
    map(str => str.split(' ')),
    Rx.tap(arr => console.log(arr.length))
)
.subscribe(console.log)
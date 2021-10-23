import {filter, from, map, Observable, pluck, reduce, scan} from "rxjs";

let candidates = [
    {name: 'Brendan Eich', experience: 'JavaScript Inventor'},
    {name: 'Emmet Brown', experience: 'Historian'},
    {name: 'George Lucas', experience: 'Sci-fi writer'},
    {name: 'Alberto Perez', experience: 'Zumba Instructor'},
    {name: 'Bjarne Stroustrup', experience: 'C++ Developer'}
];

const hasJsExperience = bg => bg.toLowerCase().includes('javascript')

const candidates$ = from(candidates)

candidates$.pipe(
    filter(candidate => hasJsExperience(candidate.experience))
).subscribe(console.log)

const add = (x, y) => x + y

const bankAccount = from([
    {
        date: '2016-07-01',
        amount: -320.00,
    },
    {
        date: '2016-07-13',
        amount: 1000.00,
    },
    {
        date: '2016-07-22',
        amount: 45.0,
    },
])

bankAccount.pipe(
    pluck('amount'),
    reduce(add, 0)
).subscribe(console.log)

bankAccount.pipe(
    pluck('amount'),
    scan(add, 0)
).subscribe(console.log)

const exclude = (predicate) => {
    return (observable) =>
        new Observable(
        (subscriber) => {

            const subscription = observable.subscribe({
                next: value => {
                    try {
                        if (!predicate(value)) {
                            subscriber.next(value)
                        }
                    } catch (err) {
                        subscriber.error(err)
                    }
                },
                error: err => subscriber.error(err),
                complete:
                    () => subscriber.complete()
            })

            return () => {
                subscription.unsubscribe()
            }
        }
    )
}

Observable.prototype.exclude = exclude

from([1, 2, 3, 4, 5]).pipe(
    exclude(x => x % 2 == 0)
).subscribe(console.log)

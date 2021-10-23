const { interval, skip, take, tap, timeInterval, timer } = requirejs(['rxjs'])
const Rx = requirejs(['rxjs'])

const timoeut$ = new Rx.Observable((observer) => {
  const timeoutId = setTimeout(() => {
    observer.next();
    observer.complete();
  }, 1000);
});

const intervals$ = new Rx.Observable((observer) => {
  let num = 0;
  const intervalId = setInterval(() => {
    observer.next(num++);
  }, 2000);

  return () => {
    clearInterval(intervalId);
    observer.complete();
  };
});

// const intervalTimer = intervals$.subscribe({
//     next: val => console.log(`${val}`),
//     error: err => console.log(err.message),
//     complete: () => console.log("Completed Interavls"),
//   });

//   setTimeout(() => {
//     intervalTimer.unsubscribe();
//     console.log("Unsubscribed intervalTimer");
//   }, 4200);

const unsub = interval(100).pipe(
    timeInterval(),
    skip(1),
    take(5),
    tap((tiObject)=> console.log(tiObject.value))
)
    .subscribe({
        next: (val) => console.log(`${val.value} ticker`),
        complete: () => console.log("Complete")
    })

setTimeout(() => {
    unsub.unsubscribe()
}, 1100);

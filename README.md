# Random event generators

That are related to the Poisson distribution in the probability of
n events happening by time T and that the times between events are distributed
exponentially.


Each "worker" would be a "thread" in thread-capable languages and it represents
a single stream of events with exponentially distributed times.


### Run it

```
npm install
node index.js

```

### Parameters

- `MAX_WORKERS`: the amount of "streams" or "workers" (use to simulate load in the system)
- `EVENTS_PER_MINUTE`: this is the "rate" or the inverse of the Poisson mean that we use to generate random event times.
